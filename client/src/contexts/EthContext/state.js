const actions = {
  init: "INIT",
  update: "UPDATE"
};

const initialState = {
  tokenInstance: null,
  tokenSaleInstance: null,
  kycInstance: null,
  web3: null,
  accounts: null,
  networkID: null,
  loaded: false,
  pending: false
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
