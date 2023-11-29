const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

var chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

require("dotenv").config({path: "../.env"});


contract("TokenSale Test", async (accounts)=>{
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in my deployerAccount", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in token sale smart contract by default", async () => {
        let instance = await Token.deployed();
        let instance2 = await TokenSale.deployed();
        //console.log('kostya', instance);
        return expect(instance.balanceOf(instance2.address)).to.eventually.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS));
    })

    it("should be possible to buy tokens", async () => {
        let instance = await Token.deployed();
        let instanceTS = await TokenSale.deployed();
        let instanceKyc = await KycContract.deployed();
        const balanceBefore = await instance.balanceOf(deployerAccount);
        await instanceKyc.setKycCompleted(deployerAccount, {from: deployerAccount});
        // await instanceKyc.setKycRevoked(deployerAccount);
        await instanceTS.sendTransaction({from: deployerAccount, value: web3.utils.toWei('1', 'wei')});
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    })
})

