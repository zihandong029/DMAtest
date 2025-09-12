import { Chain } from 'wagmi/chains';

// Polygon Amoy 测试网配置
export const polygonAmoy: Chain = {
  id: 80002,
  name: 'Polygon Amoy',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://amoy.polygonscan.com',
    },
  },
  testnet: true,
};

// 导出所有支持的测试网
export const supportedChains = {
  sepolia: {
    id: 11155111,
    name: 'Sepolia',
    isDefault: true,
  },
  amoy: {
    id: 80002,
    name: 'Polygon Amoy',
    isDefault: false,
  },
} as const;