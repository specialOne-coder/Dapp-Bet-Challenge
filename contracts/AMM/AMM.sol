//SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AMM is ERC20, Ownable {
    // Contract tokens
    IERC20 public immutable tokenA;
    IERC20 public immutable tokenB;

    // contract pools
    uint public reserve0;
    uint public reserve1;

    // fee
    uint public FEE = 997;

    constructor(address _token0, address _token1) ERC20("LPToken", "LPT") {
        tokenA = IERC20(_token0);
        tokenB = IERC20(_token1);
    }

    function modifyFee(uint _fee) external onlyOwner {
        FEE = _fee;
    }

    // for computing
    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }

    // for compute lp token amount
    function _sqrt(uint y) private pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    // update pool reserves
    function _updateReserve(uint _reserve0, uint _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    // Add liquidity function
    // 1. Transfer tokens from user to contract
    // 2. Calculate the amount of lp tokens to mint
    // 3. Mint lp tokens to user
    // 4. Update reserves
    function addLiquidity(
        uint256 _amount0,
        uint256 _amount1
    ) external returns (uint shares) {
        tokenA.transferFrom(msg.sender, address(this), _amount0);
        tokenB.transferFrom(msg.sender, address(this), _amount1);

        // same token amount deposit check
        if (reserve0 > 0 || reserve1 > 0) {
            require(
                reserve0 * _amount1 == reserve1 * _amount0,
                "x / y != dx / dy"
            );
        }

        // compute lp token amount
        if (totalSupply() == 0) {
            shares = _sqrt(_amount0 * _amount1);
        } else {
            shares = _min(
                (_amount0 * totalSupply()) / reserve0,
                (_amount1 * totalSupply()) / reserve1
            );
        }
        require(shares > 0, "shares = 0");
        _mint(msg.sender, shares); // mint lp token to user

        _updateReserve( // update reserves
            tokenA.balanceOf(address(this)),
            tokenB.balanceOf(address(this))
        );
    }

    function getUserLiquidity(
        address _user
    ) external view returns (uint amount0, uint amount1) {
        uint shares = balanceOf(_user);
        amount0 = (shares * reserve0) / totalSupply();
        amount1 = (shares * reserve1) / totalSupply();
        return (amount0, amount1);
    }

    // Remove liquidity function
    // 1. Burn lp tokens from user
    // 2. Transfer tokens to user
    // 3. Update reserves
    function removeLiquidity(
        uint _shares
    ) external returns (uint amount0, uint amount1) {
        uint bal0 = tokenA.balanceOf(address(this));
        uint bal1 = tokenB.balanceOf(address(this));

        amount0 = (_shares * bal0) / totalSupply();
        amount1 = (_shares * bal1) / totalSupply();
        require(amount0 > 0 && amount1 > 0, "amount0 or amount1 = 0");

        _burn(msg.sender, _shares);
        _updateReserve(bal0 - amount0, bal1 - amount1);

        tokenA.transfer(msg.sender, amount0);
        tokenB.transfer(msg.sender, amount1);
    }

    // Swap function
    // 1. Transfer tokenA from user to contract
    // 2. Calculate the amount of tokens to transfer to user
    // 3. Transfer tokenB to user
    // 4. Update reserves
    function swap(
        address _tokenIn,
        uint _amountIn
    ) external returns (uint amountOut) {
        require(
            _tokenIn == address(tokenA) || _tokenIn == address(tokenB),
            "invalid token"
        );

        // check _amountIn > 0
        require(_amountIn > 0, "amount in = 0");

        // reordering and get correct token and reserves
        bool isToken0 = _tokenIn == address(tokenA);
        (
            IERC20 tokenIn,
            IERC20 tokenOut,
            uint reserveIn,
            uint reserveOut
        ) = isToken0
                ? (tokenA, tokenB, reserve0, reserve1)
                : (tokenB, tokenA, reserve1, reserve0);

        require(_amountIn < reserveOut / 2, "Price impact too high");

        tokenIn.transferFrom(msg.sender, address(this), _amountIn);

        // 0.3% fee
        uint amountInWithFee = (_amountIn * FEE) / 1000;
        amountOut =
            (reserveOut * amountInWithFee) /
            (reserveIn + amountInWithFee);

        // Price impact (Slippage)
        // uint market_price = amountInWithFee / amountOut;
        // uint mid_price = reserve0 / reserve1;
        // uint price_impact = 1 - (mid_price / market_price);

        // require(amountOut > reserveOut / 2, "Price impact too high");

        tokenOut.transfer(msg.sender, amountOut);

        _updateReserve(
            tokenA.balanceOf(address(this)),
            tokenB.balanceOf(address(this))
        );
    }
}
