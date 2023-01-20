 import amm_abi from './abis/amm.abi.json';
import token_abi from './abis/token.abi.json';
import bet_abi from './abis/bet.abi.json';
import wmatic_abi from './abis/wmatic.abi.json';



export const chainlist = [
  {
    id: 1,
    chainid: '0x1',
    chain_name: 'Mumbai',
    rpc:
      'https://matic-mumbai.chainstacklabs.com',
      explorer:'https://mumbai.polygonscan.com',
    AmmAbi: amm_abi.abi,
    TokenAbi: token_abi.abi,
    BetAbi: bet_abi.abi,
    BetAddress: '0x24Dc6D635f94E50dc5E88225fD0B5feee7CbDF5A',
    TokenAddress: '0x6E072Ae62ed777875971F5016967E138F2F71F70',
    AMMAddress: '0xaF370876A13e2bE83784bb9a202513611c29f12c',
  },
  {
    id: 2,
    chainid: '0x137',
    chain_name: 'Goerli',
    rpc: 'https://poly-rpc.gateway.pokt.network',
    abi: 'import your abi here',
    address: '0X0000000000000000000000000000000000000000',
  },
]

export const SwapTokens = [
  {
    name: 'Bet',
    address: '0x6E072Ae62ed777875971F5016967E138F2F71F70',
    symbol: 'Bet',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
  },
  {
    name: 'WMATIC',
    address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
]

export const MY_TOKEN_LIST = [
  {
    name: 'WMATIC',
    address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    symbol: 'WMATIC',
    TokenAbi: wmatic_abi,
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  {
    name: 'Bet',
    address: '0x6E072Ae62ed777875971F5016967E138F2F71F70',
    symbol: 'Bet',
    TokenAbi: token_abi.abi,
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
  },
]
