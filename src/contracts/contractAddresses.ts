import { sepolia } from 'wagmi/chains';
import { polygonAmoy } from '@/config/chains';

export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    NFT: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_SEPOLIA || '',
  },
  [polygonAmoy.id]: {
    NFT: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_AMOY || '',
  },
} as const;

// 辅助函数：根据链 ID 获取合约地址
export function getNFTContractAddress(chainId: number): string {
  const address = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.NFT;
  if (!address) {
    throw new Error(`NFT contract address not configured for chain ID: ${chainId}`);
  }
  return address;
}

// 合约元数据
export const CONTRACT_METADATA = {
  name: 'DMA Studio Test Collection',
  symbol: 'DMATEST',
  description: 'DMA Studio 测试 NFT 合集',
  maxSupply: 10000,
} as const;