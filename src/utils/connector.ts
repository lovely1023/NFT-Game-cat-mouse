/* eslint-disable import/prefer-default-export */
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { NETWORK_CHAIN_IDS, ALCHEMY_ID, ALCHEMY_ENDPOINT } from './constants';

export const injected = new InjectedConnector({
  supportedChainIds: [NETWORK_CHAIN_IDS.rinkeby, NETWORK_CHAIN_IDS.mainnet],
});

export const walletconnect = new WalletConnectConnector({
  infuraId: ALCHEMY_ID,
  supportedChainIds: [NETWORK_CHAIN_IDS.rinkeby, NETWORK_CHAIN_IDS.mainnet],
  rpc: { 1: ALCHEMY_ENDPOINT },
  qrcode: true,
});

export const walletlink = new WalletLinkConnector({
  url: ALCHEMY_ENDPOINT,
  appName: 'catmouse02',
  supportedChainIds: [NETWORK_CHAIN_IDS.rinkeby, NETWORK_CHAIN_IDS.mainnet],
});
