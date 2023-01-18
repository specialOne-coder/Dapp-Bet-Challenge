import React, { useState, createContext, useEffect } from 'react'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum'

import { Web3Modal } from '@web3modal/react'

import { configureChains, createClient, WagmiConfig } from 'wagmi'

import { polygonMumbai, goerli } from 'wagmi/chains'

// Web3Modal Ethereum Client

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const chains = [polygonMumbai, goerli]

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: '67a7534c23a607b73d823c05af89594a' }), // mettre dans un .env
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: 'Bet', chains }),
    provider,
  })

  const ethereumClient = new EthereumClient(wagmiClient, chains)

  const [loading, setLoading] = useState(false)
  const [currentAccount, setCurrentAccount] = useState()
  const [networkId, setNetworkId] = useState()
  const [networkRpc, setNetworkRpc] = useState()
  const [networkProvider, setNetworkProvider] = useState()

  // const ourProvider = async () => {
  //     const provider = await Wallet.provider();
  //     setNetworkProvider(provider);
  // }
  // // connect to wallet
  // const connectWallet = async () => {
  //     await ourProvider();
  //     const account = await Wallet.connect();
  //     console.log("le compte =>", account);
  //     setCurrentAccount(account[0]);
  // }

  // // disconnect from wallet
  // const disconnectWallet = async () => {
  //     await Wallet.disconnect();
  //     setCurrentAccount();
  // }

  // // verify network
  // const verifyNetwork = async (networkId, networkName, networkRpc) => {
  //     console.log('In context, networkId is =>', networkId);
  //     const verify = Wallet.verifyNetwork(networkId, networkName, networkRpc);
  //     setNetworkId(verify)
  //     setNetworkRpc(networkRpc);
  // }

  // every time page is loaded, connect to wallet
  // useEffect(() => {
  //     if (Wallet.web3Modal.cachedProvider) {
  //         connectWallet();
  //     }
  // }, []);

  // every time provider is changed, follow the change
  // useEffect(() => {
  //     if (networkProvider?.on) {
  //         const handleAccountsChanged = (accounts) => { // accounts changed
  //             console.log("accountsChanged", accounts);
  //             if (accounts) setCurrentAccount(accounts[0]);
  //         };

  //         const handleChainChanged = async (_hexChainId) => { // chain changed event
  //             console.log("chainChanged", _hexChainId);
  //             console.log('account when chain change', currentAccount);
  //             Alert.fire({
  //                 icon: "info",
  //                 title: "Network change",
  //                 confirmButtonText: "Ok",
  //                 text: "Make sure you are on the right network before mint",
  //                 width: 'auto'
  //             })
  //         };

  //         const handleDisconnect = () => { // disconnect event
  //             disconnectWallet();
  //         }

  //         networkProvider.on("accountsChanged", handleAccountsChanged);
  //         networkProvider.on("chainChanged", handleChainChanged);
  //         networkProvider.on("disconnect", handleDisconnect);

  //         return () => {
  //             if (networkProvider.removeListener) {
  //                 networkProvider.removeListener("accountsChanged", handleAccountsChanged);
  //                 networkProvider.removeListener("chainChanged", handleChainChanged);
  //                 networkProvider.removeListener("disconnect", handleDisconnect);
  //             }
  //         };
  //     }
  // }, [networkProvider]);
  return (
    <AppContext.Provider
      value={{ ethereumClient, wagmiClient }}
    >
      {children}
    </AppContext.Provider>
  )
}
