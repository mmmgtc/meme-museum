import { ethers } from "ethers";
/* eslint-disable import/prefer-default-export */
export type State = {
  loading: boolean;
  account: null | string;
  ens: null | string;
  provider: null | any;
  staticProvider: ethers.providers.Web3Provider;
  self: null | any;
  headers: Record<string, any>;
  connectWeb3?: any;
  logout?: any;
};

export const Web3Reducer = (state: State, action: Record<string, any>) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      };
    case "SET_ENS":
      return {
        ...state,
        ens: action.payload,
      };
    case "SET_PROVIDER":
      return {
        ...state,
        provider: action.payload,
      };
    case "SET_HEADERS":
      return {
        ...state,
        headers: action.payload,
      };
    default:
      return state;
  }
};
