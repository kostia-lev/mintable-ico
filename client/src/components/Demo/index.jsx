import { useRef, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Demo() {
  const { state: {accounts, kycInstance, tokenSaleInstance, loaded, userTokens, kycCompleted, isOwner, totalSupply,
    networkID, updateState, pending} } = useEth();
  const  kycInput  = useRef(null);
  const  [tokensInput, setTokensInput]  = useState(100);
  const sepoliaNetoworkId = 11155111;

  return (
    <div className="demo">
        {!loaded ? '...' : networkID === sepoliaNetoworkId ? <>
            <h2>Welcome to the CAPPU token ICO of Vahrushev Konstantin</h2>
            <p>current wallet address: {accounts?.[0]}</p>
            <p>is owner: {isOwner ? 'yes' : 'no'}</p>
            <p>kyc completed: {kycCompleted ? 'yes' : 'no'}</p>
            <p style={{fontWeight: 'bold'}}>current user have: {userTokens} CAPPU </p>
            <p>total supply is: {totalSupply} CAPPU </p>
            <form>
                Address to allow:
                <input disabled={!isOwner} ref={kycInput} id="kycAddress"/>
                <button disabled={!isOwner} onClick={async () => {
                    try {
                        await kycInstance.methods.setKycCompleted(kycInput.current.value).send({from: accounts[0]});
                    } catch (e) {
                        alert('kyc failed')
                        console.log(e);
                    }
                }} type="button">set Address for kyc
                </button>
                <div>
                    <p>
                        Tokens to buy:
                        <input disabled={!loaded || pending} placeholder="0" value={tokensInput}
                               onChange={(e) => setTokensInput(e.target.value)} id="buyInput"/>
                    </p>
                    <button disabled={!loaded || pending || !tokensInput } onClick={async () => {
                      updateState({pending: true});
                        try {
                          await tokenSaleInstance.methods.buyTokens(accounts[0]).send({
                                from: accounts[0],
                                value: tokensInput
                            });
                          updateState({pending: false});
                        } catch (e) {
                          updateState({pending: false});
                        }
                    }} type="button">buy tokens
                    </button>
                </div>
            </form>
        </> : "Please switch to Sepolia network"}
    </div>
  );
}

export default Demo;
