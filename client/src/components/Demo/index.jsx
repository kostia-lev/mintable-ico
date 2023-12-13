import { useState, useRef } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Demo() {
  const { state: {accounts, kycInstance, tokenSaleInstance, loaded, userTokens, kycCompleted} } = useEth();
  const  kycInput  = useRef(null);
  const  buyInput  = useRef(null);
  const  [buyAmount, setBuyAmount]  = useState(0);

  return (
    <div className="demo">
        {
            loaded? 'loaded' : 'loading'
        }
        <h4>If you want to buy tokens, send them to the address</h4>
        <h3>smart contract address: {tokenSaleInstance?._address}</h3>
        <div>your address: {accounts?.[0]}</div>
        <div>kyc completed: {kycCompleted ? 'yes' : 'no'}</div>
        <div>current user have: {userTokens} GLD </div>
        <form>
            Address to allow:
            <input ref={kycInput} id="kycAddress" />
            <button onClick={async () => {
                try {
                    await kycInstance.methods.setKycCompleted(kycInput.current.value).send({from: accounts[0]});
                } catch (e) {
                    alert('kyc failed')
                    console.log(e);
                }
            }} type="button">set Address for kyc</button>
            <div>
                Tokens to buy:
                <input placeholder="0" ref={buyInput} id="buyInput" onClick = {(e)=>setBuyAmount(e.target.value)} />
                <button onClick={async () => {
                    try {
                        tokenSaleInstance.methods.buyTokens(accounts[0]).send({from: accounts[0], value: buyInput.current.value});
                    } catch (e) {
                        alert('kyc failed')
                        console.log(e);
                    }
                }} type="button">buy tokens</button>
            </div>
        </form>
      {/*<Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }*/}
    </div>
  );
}

export default Demo;
