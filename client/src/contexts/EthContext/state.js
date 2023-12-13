const actions = {
  init: "INIT",
  update: "UPDATE"
};

const initialState = {
  // artifact: null,
  tokenInstance: null,
  tokenSaleInstance: null,
  kycInstance: null,
  web3: null,
  accounts: null,
  networkID: null,
  loaded: null
  // contract: null
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.update:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
