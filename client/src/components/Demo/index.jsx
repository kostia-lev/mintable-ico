import { useRef, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Demo() {
  const { state: {accounts, kycInstance, tokenSaleInstance, loaded, userTokens, kycCompleted, isOwner, totalSupply,
    networkID, updateState, pending, symbol, tokenAddress, decimals} } = useEth();
  const  kycInput  = useRef(null);
  const  [tokensInput, setTokensInput]  = useState(100);
  const sepoliaNetoworkId = 11155111;

  const addTokenToMetamask = async () => {
    try {
      // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress, // The address of the token.
            symbol: symbol, // A ticker symbol or shorthand, up to 5 characters.
            decimals: decimals, // The number of decimals in the token.
            image: "https://vahrushev.info/wp-content/uploads/2016/07/cropped-20140507_204840-e1468861419467-192x192.jpg", // A string URL of the token logo.
          },
        },
      });

      if (wasAdded) {
        console.log('token added');
      } else {
        console.log('token was not added');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="demo">
        {!loaded ? '...' : networkID === sepoliaNetoworkId ? <>
            <h2>Welcome to the {symbol} token ICO of Vahrushev Konstantin</h2>
            <p><button disabled={!loaded || pending } onClick={addTokenToMetamask} type="button">add {symbol} to metamask</button></p>
            <p>is owner: {isOwner ? 'yes' : 'no'}</p>
            <p>kyc completed: {kycCompleted ? 'yes' : 'no'}</p>
            <p style={{fontWeight: 'bold'}}>current user have: {userTokens} {symbol} </p>
            <p>total supply is: {totalSupply} {symbol} </p>
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
