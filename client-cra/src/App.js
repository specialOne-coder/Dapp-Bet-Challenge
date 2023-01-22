import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import '../src/styles/App.css'
import { Navigation, Footer } from '../src/components/index'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
  
} from '@web3modal/ethereum'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  polygonMumbai
} from 'wagmi/chains'
import { Web3Modal } from '@web3modal/react'

// if (!process.env.PROJECT_ID) {
//   throw new Error('You need to provide PROJECT_ID env variable')
// }

export const projectId = "67a7534c23a607b73d823c05af89594a" // process.env.PROJECT_ID
// 2. Configure wagmi client
export const chains = [polygonMumbai]
export const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'web3Modal',
    chains,
  }),
  provider,
})

export const ethereumClient = new EthereumClient(wagmiClient, chains) // accounts et tout


function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <div className="min-h-screen">
            <div className="gradient-bg-welcome min-h-screen">
              <Navigation/>
            </div>
            <Footer />
          </div>
        </WagmiConfig>
      ) : null}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App
