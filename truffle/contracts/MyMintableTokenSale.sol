pragma solidity 0.6.2;
import "./MintedCrowdsale.sol";
import "./KycContract.sol";

contract MyMintableTokenSale is MintedCrowdsale  {
    KycContract kyc;
    constructor(uint256 rate, address payable wallet, IERC20 token, KycContract _kyc )
    Crowdsale(rate, wallet, token)
    public
    {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "KkyC not completed, purchage not aloweed");
    }
}