pragma solidity 0.6.2;

import "./ERC20Mintable/ERC20Mintable.sol";

contract MyMintableToken is ERC20Mintable {
    constructor() ERC20("StarDucks Capucino mintable Token", "CAPPU") public {}
}
