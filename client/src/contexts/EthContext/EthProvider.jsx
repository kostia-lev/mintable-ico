import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
    const updateState = (data) => {
        dispatch({
            type: actions.update,
            data
        });
    };

  const init = useCallback(
    async () => {
        dispatch({
            type: actions.init,
            data: { loaded: false, updateState }
        });
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const myTokenArtifact = require("../../contracts/MyMintableToken.json");
        const myTokenSaleArtifact = require("../../contracts/MyMintableTokenSale.json");
        const myKycArtifact = require("../../contracts/KycContract.json");

        const contractFactory = (artifact) => {
            const {abi} = artifact;
            let address;
                address = artifact.networks[networkID]?.address;
                return new web3.eth.Contract(abi, address);

        }
        try {
            const tokenInstance = contractFactory(myTokenArtifact);
            const tokenSaleInstance = contractFactory(myTokenSaleArtifact);
            const kycInstance = contractFactory(myKycArtifact);
            const userTokens =  await tokenInstance.methods.balanceOf(accounts[0]).call();
            const totalSupply =  await tokenInstance.methods.totalSupply().call();
            const isOwner =  await kycInstance.methods.owner().call() === accounts[0] ;
            const kycCompleted =  await kycInstance.methods.kycCompleted(accounts[0]).call();

            dispatch({
                type: actions.init,
                data: { tokenInstance, tokenSaleInstance, kycInstance,
                     userTokens, kycCompleted, totalSupply, isOwner }
            });
        } catch (err) {
            console.error(err);

        }

        dispatch({
            type: actions.init,
            data: { web3, accounts, networkID,
                loaded: true, pending: false, updateState }
        });
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        init();
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);
  const updateUserTokens = async () => {
      const totalSupply =  await state.tokenInstance.methods.totalSupply().call();
      const userTokens = await state.tokenInstance.methods.balanceOf(state.accounts[0]).call();
      dispatch({
          type: actions.update,
          data: { userTokens, totalSupply }
      });
  }

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init();
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);

  useEffect(() => {
    if (state.tokenInstance) {
        state.tokenInstance.events.Transfer({to: state.accounts[0]}).on("data", updateUserTokens)
    }
  }, [state]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
