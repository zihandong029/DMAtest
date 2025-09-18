export interface PresetNFT {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  metadataUrl: string;
  rarity: string;
  element: string;
  maxSupply: number;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export const PRESET_NFTS: PresetNFT[] = [
  {
    id: 1,
    name: "DMA Studio Genesis #1",
    description: "DMA Studio 创世系列第一号作品，融合了 Dirk Horn 的力量与创新精神。这是数字艺术史上的里程碑时刻。",
    imageUrl: "ipfs://QmQcLJSRtjq8yU5RoeHezCLdvYcgbJ1Wz22Yb1vmcsKUim",
    metadataUrl: "ipfs://QmfKDMyMNzzUTmWm5CNwqDXCWKgwrUkbqfc3ZsrNvJHKDW",
    rarity: "Legendary",
    element: "Dirk Horn",
    maxSupply: 3,
    attributes: [
      { trait_type: "Collection", value: "Genesis" },
      { trait_type: "Element", value: "Dirk Horn" },
      { trait_type: "Rarity", value: "Legendary" },
      { trait_type: "Power Level", value: 100 }
    ]
  },
  {
    id: 2,
    name: "DMA Studio Genesis #2",
    description: "DMA Studio 创世系列第二号作品，体现了 Noir Badge 的极简哲学。每一个像素都承载着创作者的匠心独运。",
    imageUrl: "ipfs://QmSbdtfZUSd52PMjxJcfrDpohShBYPPPAdrFhHikFTFSr6",
    metadataUrl: "ipfs://Qmczp3FG3h5F8H7rPrDenPigeTHrkEnrCUbSDnLTfUFDSn",
    rarity: "Epic",
    element: "Noir Badge", 
    maxSupply: 3,
    attributes: [
      { trait_type: "Collection", value: "Genesis" },
      { trait_type: "Element", value: "Noir Badge" },
      { trait_type: "Rarity", value: "Epic" },
      { trait_type: "Aesthetic", value: "Minimalist" }
    ]
  },
  {
    id: 3,
    name: "DMA Studio Genesis #3",
    description: "DMA Studio 创世系列第三号作品，代表着艺术视觉的突破与创新。",
    imageUrl: "ipfs://QmZ6HjJacA3sL2MMA1wL5yA9qGLQiGLEABHxFnKGTDvYxq",
    metadataUrl: "ipfs://QmPQEQ7PVTDpqaBLWKZGArprQ63T9fyDRS4zguU5TiyEDd",
    rarity: "Rare",
    element: "Artistic Vision",
    maxSupply: 3,
    attributes: [
      { trait_type: "Collection", value: "Genesis" },
      { trait_type: "Element", value: "Artistic Vision" },
      { trait_type: "Rarity", value: "Rare" },
      { trait_type: "Vision Level", value: 85 }
    ]
  },
  {
    id: 4,
    name: "DMA Studio Genesis #4",
    description: "DMA Studio 创世系列第四号作品，独家数字杰作的完美呈现。",
    imageUrl: "ipfs://QmVzVWf5YVDWBZ7skMp5LQEMafgEJtzRZHMXxnnMWdVSDR",
    metadataUrl: "ipfs://QmQoZEqreUwUJVtGmxPncLz1KLM5gsBxah2NCtTmHSNQFr",
    rarity: "Rare",
    element: "Digital Masterpiece",
    maxSupply: 3,
    attributes: [
      { trait_type: "Collection", value: "Genesis" },
      { trait_type: "Element", value: "Digital Masterpiece" },
      { trait_type: "Rarity", value: "Rare" },
      { trait_type: "Craftsmanship", value: 90 }
    ]
  }
];

// 增强的 IPFS 网关转换函数，处理重复前缀问题
export function getIPFSUrl(ipfsUrl: string): string {
  if (!ipfsUrl) return '';
  
  console.log('原始 IPFS URL:', ipfsUrl);
  
  // 如果已经是 HTTP/HTTPS URL，直接返回
  if (ipfsUrl.startsWith('http://') || ipfsUrl.startsWith('https://')) {
    return ipfsUrl;
  }
  
  let cleanUrl = ipfsUrl;
  
  // 处理重复的 ipfs:// 前缀问题
  if (ipfsUrl.includes('ipfs://ipfs://')) {
    console.warn('检测到重复的 ipfs:// 前缀，正在修复...');
    // 移除所有 ipfs:// 前缀，然后重新添加一个
    cleanUrl = ipfsUrl.replace(/ipfs:\/\//g, '');
  } else if (ipfsUrl.startsWith('ipfs://')) {
    // 正常的 ipfs:// 前缀，移除它
    cleanUrl = ipfsUrl.replace('ipfs://', '');
  }
  
  // 如果清理后的URL为空，返回空字符串
  if (!cleanUrl) return '';
  
  // 构建最终的 IPFS 网关 URL
  const finalUrl = `https://ipfs.io/ipfs/${cleanUrl}`;
  console.log('转换后的 IPFS URL:', finalUrl);
  
  return finalUrl;
}

// 根据稀有度获取颜色
export function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return 'from-yellow-400 to-orange-500';
    case 'epic':
      return 'from-purple-500 to-pink-500';
    case 'rare':
      return 'from-blue-500 to-cyan-500';
    case 'common':
      return 'from-gray-400 to-gray-500';
    default:
      return 'from-gray-400 to-gray-500';
  }
}