'use client';

import { useState } from 'react';
import { NFTItem } from '@/hooks/useNFTContract';
import { ExternalLink, Image, Hash, Calendar, Eye } from 'lucide-react';

interface NFTCardProps {
  nft: NFTItem;
  contractAddress: string;
  chainName?: string;
  blockExplorerUrl?: string;
}

export function NFTCard({ nft, contractAddress, chainName, blockExplorerUrl }: NFTCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // 处理 Token URI
  const getDisplayURI = () => {
    if (!nft.tokenURI) return '无元数据';
    
    // 如果是 IPFS 链接，转换为 HTTP 网关
    if (nft.tokenURI.startsWith('ipfs://')) {
      return nft.tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    // 如果是 HTTP 链接，直接显示
    if (nft.tokenURI.startsWith('http')) {
      return nft.tokenURI;
    }
    
    // 否则显示原始 URI
    return nft.tokenURI;
  };

  // 获取 NFT 的区块浏览器链接
  const getNFTExplorerUrl = () => {
    if (!blockExplorerUrl) return '#';
    return `${blockExplorerUrl}/token/${contractAddress}?a=${nft.tokenId}`;
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* NFT 预览图 */}
      <div className="relative mb-4">
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
          {!imageError && nft.tokenURI ? (
            <div className="relative w-full h-full">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">
                    <Image className="w-8 h-8" />
                  </div>
                </div>
              )}
              <img
                src={getDisplayURI()}
                alt={`NFT #${nft.tokenId}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
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
        
        {/* Token ID 标签 */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-mono">
          #{nft.tokenId}
        </div>
      </div>

      {/* NFT 信息 */}
      <div className="space-y-3">
        {/* 标题 */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">
            DMA Studio NFT #{nft.tokenId}
          </h3>
          <p className="text-sm text-gray-500">
            DMA Studio Test Collection
          </p>
        </div>

        {/* 详细信息 */}
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
                Token URI:
              </div>
              <code className="text-xs break-all bg-white p-1 rounded block">
                {nft.tokenURI.length > 50 
                  ? `${nft.tokenURI.slice(0, 25)}...${nft.tokenURI.slice(-15)}` 
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
              区块浏览器
            </a>
          )}
          
          {nft.tokenURI && (
            <a
              href={getDisplayURI()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2"
            >
              <Eye className="w-4 h-4" />
              查看元数据
            </a>
          )}
        </div>

        {/* 所有权指示 */}
        <div className="text-center pt-2 border-t border-gray-100">
          <div className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            您拥有此 NFT
          </div>
        </div>
      </div>
    </div>
  );
}