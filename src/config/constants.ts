// 应用配置
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'DMA Studio Test DApp',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'DMA Studio experiments on testnets',
  version: '1.0.0',
} as const;

// API 配置
export const API_CONFIG = {
  infuraApiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
} as const;

// 合约地址
export const CONTRACTS = {
  NFT: {
    SEPOLIA: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_SEPOLIA,
    AMOY: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_AMOY,
  },
} as const;

// DMA Studio 品牌配置
export const DMA_BRANDING = {
  colors: {
    primary: '#000000',      // Noir black
    secondary: '#ff6b35',    // Dirk horn orange
    accent: '#1a1a1a',      // Dark gray
    background: '#f8f9fa',   // Light background
  },
  assets: {
    dirkHorn: '/icons/dirk-horn.svg',
    noirBadge: '/icons/noir-badge.svg',
    logo: '/images/dma-logo.png',
  },
} as const;

// 路由配置
export const ROUTES = {
  HOME: '/',
  MINT: '/mint',
  GATE: '/gate', 
  INVENTORY: '/inventory',
} as const;

// NFT 相关配置
export const NFT_CONFIG = {
  collectionName: 'DMA Studio Test Collection',
  symbol: 'DMATEST',
  maxSupply: 10000,
  mintPrice: '0', // 免费 mint（测试网）
} as const;