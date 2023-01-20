// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Betis is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Betis", "BET") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
