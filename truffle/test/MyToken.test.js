const Token = artifacts.require("MyMintableToken");

var chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Test", async (accounts)=>{
    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.myToken = await Token.new();
    });

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = this.myToken;
        expect(await instance.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(0));
        await instance.mint(recipient, sendTokens)
        let totalSupply = instance.totalSupply();
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
        expect(totalSupply).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })
})

