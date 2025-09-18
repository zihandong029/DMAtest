'use client';

import { useState, useEffect } from 'react';
import { NFTItem } from '@/hooks/useLimitedNFTContract';
import { getIPFSUrl, getRarityColor } from '@/config/nftData';
import { ExternalLink, Image, Hash, Calendar, Eye, Star, Award } from 'lucide-react';

interface NFTCardProps {
  nft: NFTItem;
  contractAddress: string;
  chainName?: string;
  blockExplorerUrl?: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string;
  background_color?: string;
}

export function NFTCard({ nft, contractAddress, chainName, blockExplorerUrl }: NFTCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [metadataLoading, setMetadataLoading] = useState(false);

  // 获取 NFT 元数据
  useEffect(() => {
    async function fetchMetadata() {
      if (!nft.tokenURI) return;

      setMetadataLoading(true);
      try {
        const metadataUrl = getIPFSUrl(nft.tokenURI);
        console.log('获取NFT元数据:', { tokenId: nft.tokenId, url: metadataUrl });
        
        const response = await fetch(metadataUrl);
        
        if (!response.ok) {
          throw new Error(`获取元数据失败: ${response.status}`);
        }

        const data: NFTMetadata = await response.json();
        console.log('NFT元数据获取成功:', data);
        setMetadata(data);
      } catch (error) {
        console.error('获取 NFT 元数据失败:', error);
      } finally {
        setMetadataLoading(false);
      }
    }

    fetchMetadata();
  }, [nft.tokenURI]);

  // 获取显示图片的 URL
  const getDisplayImageUrl = () => {
    if (metadata?.image) {
      return getIPFSUrl(metadata.image);
    }
    
    if (nft.tokenURI) {
      return getIPFSUrl(nft.tokenURI);
    }
    
    return '';
  };

  // 获取稀有度信息
  const getRarityInfo = () => {
    const rarityAttr = metadata?.attributes?.find(
      attr => attr.trait_type.toLowerCase().includes('rarity')
    );
    return rarityAttr?.value as string || 'Common';
  };

  // 获取 NFT 的区块浏览器链接
  const getNFTExplorerUrl = () => {
    if (!blockExplorerUrl) return '#';
    return `${blockExplorerUrl}/token/${contractAddress}?a=${nft.tokenId}`;
  };

  const rarity = getRarityInfo();

  return (
    <div className="card hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* NFT 预览图 */}
      <div className="relative mb-4">
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative">
          {/* 稀有度光晕效果 */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(rarity)} opacity-10`}></div>
          
          {metadataLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            </div>
          ) : getDisplayImageUrl() && !imageError ? (
            <div className="relative w-full h-full">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">
                    <Image className="w-8 h-8" />
                  </div>
                </div>
              )}
              <img
                src={getDisplayImageUrl()}
                alt={metadata?.name || `NFT #${nft.tokenId}`}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setIsImageLoaded(false);
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-3">
                <Hash className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium">NFT #{nft.tokenId}</span>
            </div>
          )}
        </div>
        
        {/* Token ID 和稀有度标签 */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-mono">
            #{nft.tokenId}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(rarity)}`}>
            {rarity}
          </div>
        </div>
      </div>

      {/* NFT 信息 */}
      <div className="space-y-4">
        {/* 标题和描述 */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {metadata?.name || `DMA Studio NFT #${nft.tokenId}`}
          </h3>
          {metadata?.description && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {metadata.description}
            </p>
          )}
        </div>

        {/* 属性展示 */}
        {metadata?.attributes && metadata.attributes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Star className="w-4 h-4" />
              属性特征
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {metadata.attributes.slice(0, 4).map((attr, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-500">{attr.trait_type}</div>
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {attr.value}
                  </div>
                </div>
              ))}
            </div>
            {metadata.attributes.length > 4 && (
              <div className="text-center text-xs text-gray-500">
                +{metadata.attributes.length - 4} 更多属性
              </div>
            )}
          </div>
        )}

        {/* 技术信息 */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600 flex items-center gap-1">
              <Hash className="w-4 h-4" />
              Token ID:
            </span>
            <span className="font-mono font-medium">{nft.tokenId}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              网络:
            </span>
            <span className="font-medium">{chainName || '未知'}</span>
          </div>

          {nft.tokenURI && (
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-gray-600 flex items-center gap-1 mb-1">
                <Eye className="w-4 h-4" />
                元数据:
              </div>
              <code className="text-xs break-all bg-white p-1 rounded block">
                {nft.tokenURI.startsWith('ipfs://') 
                  ? `IPFS: ${nft.tokenURI.slice(7, 20)}...${nft.tokenURI.slice(-8)}`
                  : nft.tokenURI.length > 40 
                    ? `${nft.tokenURI.slice(0, 20)}...${nft.tokenURI.slice(-15)}`
                    : nft.tokenURI
                }
              </code>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2 pt-2">
          {blockExplorerUrl && (
            <a
              href={getNFTExplorerUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm py-2"
            >
              <ExternalLink className="w-4 h-4" />
              浏览器
            </a>
          )}
          
          {nft.tokenURI && (
            <a
              href={getIPFSUrl(nft.tokenURI)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2"
            >
              <Eye className="w-4 h-4" />
              元数据
            </a>
          )}
        </div>

        {/* 所有权指示 */}
        <div className="text-center pt-2 border-t border-gray-100">
          <div className="inline-flex items-center gap-2 text-green-600 text-xs font-medium bg-green-50 px-3 py-2 rounded-full">
            <Award className="w-3 h-3" />
            您拥有此 NFT
          </div>
        </div>
      </div>
    </div>
  );
}