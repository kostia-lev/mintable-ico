pragma solidity 0.6.2;

import "./ERC20Mintable/ERC20Mintable.sol";

contract MyMintableToken is ERC20Mintable {
    constructor() ERC20("Konstantin Capucino mintable Token", "CONST") public {
    _setupDecimals(uint8(0));
    }
}
