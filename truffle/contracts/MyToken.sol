pragma solidity 0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StarDucks Capucino Token", "GLD") public {
        _mint(msg.sender, initialSupply);
    }
}
