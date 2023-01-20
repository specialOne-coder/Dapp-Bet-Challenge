//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

//1673902880

import "./lib/DateLib.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract Bets is ChainlinkClient, ConfirmedOwner {
    uint256 betIds = 0;

    using Chainlink for Chainlink.Request;

    uint256 public volume; // just for testing
    bytes32 private jobId;
    uint256 private fee;

    IERC20 public immutable betToken;

    event RequestVolume(bytes32 indexed requestId, uint256 volume);
    enum Status {
        START,
        LOAD,
        FINISH
    }
    struct Bet {
        uint256 betAmount;
        uint futurePrice;
        uint256 time;
        uint256 lastTimeToParticipate;
        Status status;
        uint finalPrice;
    }

    struct Player {
        address payable player;
        uint256 pricePrediction;
        uint256 depositAmount;
    }

    // app bet and betPlayers
    mapping(uint256 => Bet) public bets;
    mapping(uint256 => Player[]) public betPlayers;
    //mapping(uint256 => mapping(uint256 => uint256)) betRequestResponse; // test tomorrow
    mapping(uint256 => bytes32) public betRequest;
    mapping(bytes32 => uint256) public requestResponse;

    /**
     * Network: Goerli
     * Aggregator: ETH/USD
     * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
     */
    constructor(address _betToken) ConfirmedOwner(msg.sender) {
        // Goerli
        // setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        // setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        // Mumbai
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        betToken = IERC20(_betToken);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    // increment
    function _incrementBetId() private {
        betIds++;
    }

    // abs
    function _abs(int x) private pure returns (int) {
        return x >= 0 ? x : -x;
    }

    // closest number
    function _closest(int feed, int[] memory arr) private pure returns (int) {
        int curr = arr[0];
        int diff = _abs(feed - curr);
        for (uint val = 0; val < arr.length; val++) {
            int newdiff = _abs(feed - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        return curr;
    }

    function testCloset(int feed, int[] memory arr) public pure returns (int) {
        int resp = _closest(feed, arr);
        return resp;
    }

    function timestampToDate(
        uint timestamp
    ) public pure returns (string memory) {
        (uint y, uint m, uint d) = DateLib.timestampToDate(timestamp);
        string memory formatMonth;
        if (m <= 9) {
            formatMonth = string.concat("0", Strings.toString(m));
        } else {
            formatMonth = Strings.toString(m);
        }
        string memory formatDate = string.concat(
            Strings.toString(d),
            "-",
            formatMonth,
            "-",
            Strings.toString(y)
        );
        return formatDate;
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        uint256 _volume
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestVolume(_requestId, _volume);
        requestResponse[_requestId] = _volume;
        volume = _volume;
    }

    function getHistoricalPrice(
        uint timestamp,
        uint _betId
    ) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory formatDate = timestampToDate(timestamp);
        string memory url = string.concat(
            "https://api.coingecko.com/api/v3/coins/ethereum/history?date=",
            formatDate
        );
        console.log("Url => ", url);
        // Set the URL to perform the GET request on
        req.add("get", url);

        req.add("path", "market_data,current_price,usd"); // Chainlink nodes 1.0.0 and later support this format

        // Multiply the result by 1000000000000000000 to remove decimals
        int256 timesAmount = 10 ** 18;
        req.addInt("times", timesAmount);
        requestId = sendChainlinkRequest(req, fee);
        betRequest[_betId] = requestId;
        // Sends the request
        return requestId;
    }

    // bet on token price
    function createBet(
        uint _time,
        uint _lastTimeToParticipate,
        uint _pricePrediction,
        uint _betAmount
    ) external payable {
        require(
            _betAmount > 0 && _pricePrediction > 0,
            "You must send some ETH and predict price"
        );
        betToken.transferFrom(msg.sender, address(this), _betAmount);
        Bet memory userBet = Bet(
            _betAmount,
            _pricePrediction,
            _time,
            _lastTimeToParticipate,
            Status.START,
            0
        );
        bets[betIds] = userBet;
        betPlayers[betIds].push(
            Player(payable(msg.sender), _pricePrediction, msg.value)
        );
        _incrementBetId();
    }

    // join bet
    function bet(uint256 _betId, uint256 _pricePrediction,uint256 _betAmount) external payable {
        betToken.transferFrom(msg.sender, address(this), _betAmount);
        require(
            bets[_betId].status == Status.START ||
                bets[_betId].status == Status.LOAD,
            "BET_NOT_STARTED"
        );
        require(betIds >= _betId, "BET_NOT_EXIST");
        require(
            block.timestamp < bets[_betId].lastTimeToParticipate,
            "You can not participate, time is due"
        );
        require(
            _betAmount >= bets[_betId].betAmount,
            "You must bet the same or more amount"
        );
        for (uint i = 0; i < betPlayers[_betId].length; i++) {
            require(
                betPlayers[_betId][i].player != msg.sender,
                "You already joined this bet"
            );
            require(
                betPlayers[_betId][i].pricePrediction != _pricePrediction,
                "You can't bet on the same price"
            );
        }
        betPlayers[_betId].push(
            Player(payable(msg.sender), _pricePrediction, msg.value)
        );
        Bet storage betm = bets[_betId];
        betm.status = Status.LOAD;
    }

    //check bet and claim reward
    function rewards(uint256 _betId) external {
        require(block.timestamp >= bets[_betId].time, "Time is not due yet");
        require(betIds >= _betId, "BET_NOT_EXIST");
        require(bets[_betId].status == Status.LOAD, "BET_ALREADY_FINISH");
        uint256 reward = 0;
        uint256 length = betPlayers[_betId].length;
        int256[] memory _playersBets;
        for (uint256 i = 0; i < length; i++) {
            reward += betPlayers[_betId][i].depositAmount;
            _playersBets[i] = int(betPlayers[_betId][i].pricePrediction);
        }
        bytes32 request = getHistoricalPrice(bets[_betId].time, _betId);
        int finalResult = int(requestResponse[request]);
        uint256 clos = uint(_closest(finalResult, _playersBets));
        for (uint256 i = 0; i < betPlayers[_betId].length; i++) {
            if (betPlayers[_betId][i].pricePrediction == clos) {
                betToken.transfer(betPlayers[_betId][i].player, reward);
                //betPlayers[_betId][i].player.transfer(reward);
                return;
            }
        }
        Bet storage betM = bets[_betId];
        betM.status = Status.FINISH;
        betM.finalPrice = uint(finalResult);
    }
}
