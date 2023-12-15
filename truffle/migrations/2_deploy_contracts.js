const MyMintableToken = artifacts.require("MyMintableToken.sol");
var MyMintableTokenSale = artifacts.require("MyMintableTokenSale");
var MyKycContract = artifacts.require("KycContract");
require("dotenv").config({path: "../.env"})

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyMintableToken);
  await deployer.deploy(MyKycContract);
  await deployer.deploy(MyMintableTokenSale, 1, addr[0], MyMintableToken.address, MyKycContract.address);
  let tokenInstance = await MyMintableToken.deployed();
  await tokenInstance.addMinter(MyMintableTokenSale.address);
};
