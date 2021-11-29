import WalletConnectProvider from "@walletconnect/web3-provider";
// import Authereum from "authereum";
import { ethers } from "ethers";
import React, { createContext, useReducer, useCallback } from "react";
import Web3Modal from "web3modal";

import { State, Web3Reducer } from "./Web3Reducer";

const { NEXT_PUBLIC_INFURA_ID } = process.env;
const staticProvider = new ethers.providers.StaticJsonRpcProvider(
  `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`
);
const initialState = {
  loading: false,
  account: null,
  provider: null,
  staticProvider,
} as State;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      bridge: "https://polygon.bridge.walletconnect.org",
      infuraId: NEXT_PUBLIC_INFURA_ID,
      rpc: {
        1: `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
        42: `https://kovan.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`,
        80001: `https://polygon-mumbai.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`,
        100: "https://dai.poa.network", // xDai
      },
    },
  },
  // authereum: {
  //   package: Authereum,
  // },
};
export const Web3Context = createContext(initialState);

export const Web3Provider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const setAccount = (account: null | string) => {
    dispatch({
      type: "SET_ACCOUNT",
      payload: account,
    });
  };

  const setENS = (ens: null | string) => {
    dispatch({
      type: "SET_ENS",
      payload: ens,
    });
  };
  const setProvider = (provider: null | any) => {
    dispatch({
      type: "SET_PROVIDER",
      payload: provider,
    });
  };

  const logout = async () => {
    setAccount(null);
    setProvider(null);
    localStorage.setItem("defaultWallet", "");
  };

  const connectWeb3 = useCallback(async () => {
    const web3Modal = new Web3Modal({
      providerOptions,
      cacheProvider: false,
    });
    const provider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    setProvider(ethersProvider);
    const signer = ethersProvider.getSigner();
    const account = await signer.getAddress();
    try {
      const ens = await ethersProvider.lookupAddress(account);
      console.log({ ens });
      setENS(ens);
    } catch (error) {
      console.log({ error });
      setENS(null);
    }
    setAccount(account);
    const signature = await ethersProvider.send("personal_sign", [
      "meme party",
      account,
    ]);
    const authResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/signup/`,
      {
        method: "POST",
        body: JSON.stringify({ signed: signature, address: account }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const authToken = await authResponse.json();
    localStorage.setItem("Authorization", authToken.token);

    provider.on("chainChanged", () => {
      // window.location.reload();
    });

    provider.on("accountsChanged", () => {
      // window.location.reload();
    });
  }, []);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connectWeb3,
        logout,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
