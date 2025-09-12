'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNFTContract, NFTItem } from '@/hooks/useNFTContract';
import { NFTCard } from './NFTCard';
import { Package, Loader, RefreshCw, Filter, Grid, List, WifiOff } from 'lucide-react';

type ViewMode = 'grid' | 'list';
type SortOption = 'tokenId' | 'newest' | 'oldest';

export function NFTInventory() {
  const { address, isConnected, chain } = useAccount();
  const { 
    balance, 
    isContractConfigured, 
    contractAddress,
    getUserNFTs 
  } = useNFTContract();

  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // UI 状态
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('tokenId');

  // 解决 Hydration 问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 手动加载 NFT 数据函数
  const loadNFTsManually = async () => {
    if (!isConnected || !address || !isContractConfigured) {
      setNfts([]);
      return;
    }

    const userBalance = balance || 0;
    if (userBalance === 0) {
      setNfts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userNFTs = await getUserNFTs();
      setNfts(userNFTs);
    } catch (err) {
      console.error('加载 NFT 失败:', err);
      setError('加载 NFT 数据失败，请稍后重试');
      setNfts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化加载 NFT 数据
  useEffect(() => {
    if (!mounted) return;

    // 如果条件不满足，清空 NFT 列表
    if (!isConnected || !address || !isContractConfigured) {
      setNfts([]);
      return;
    }

    const userBalance = balance || 0;
    if (userBalance === 0) {
      setNfts([]);
      return;
    }

    // 条件满足时加载数据
    loadNFTsManually();
  }, [mounted, isConnected, address, balance, isContractConfigured]);

  // 排序 NFT
  const sortedNFTs = [...nfts].sort((a, b) => {
    switch (sortBy) {
      case 'tokenId':
        return Number(a.tokenId) - Number(b.tokenId);
      case 'newest':
        return Number(b.tokenId) - Number(a.tokenId); // 假设较大的 tokenId 是较新的
      case 'oldest':
        return Number(a.tokenId) - Number(b.tokenId);
      default:
        return 0;
    }
  });

  // 刷新 NFT 数据
  const refreshNFTs = async () => {
    await loadNFTsManually();
  };

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 h-96 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 未连接钱包
  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">连接钱包查看收藏</h2>
          <p className="text-gray-500">
            请连接您的钱包以查看拥有的 NFT 收藏
          </p>
        </div>
      </div>
    );
  }

  // 合约未配置
  if (!isContractConfigured) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-800">服务暂时不可用</h2>
          <p className="text-red-600">
            NFT 合约未正确配置，无法加载收藏数据
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* 顶部控制栏 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* 统计信息 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            我的 NFT 收藏
          </h2>
          <p className="text-gray-600">
            共拥有 <span className="font-semibold text-blue-600">{balance || 0}</span> 个 NFT
            {nfts.length > 0 && (
              <span className="ml-2 text-sm">
                (已加载 {nfts.length} 个)
              </span>
            )}
          </p>
        </div>

        {/* 工具栏 */}
        <div className="flex items-center gap-3">
          {/* 排序选择器 */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tokenId">按 Token ID</option>
              <option value="newest">最新优先</option>
              <option value="oldest">最旧优先</option>
            </select>
          </div>

          {/* 视图模式切换 */}
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="网格视图"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="列表视图"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* 刷新按钮 */}
          <button
            onClick={refreshNFTs}
            disabled={isLoading}
            className="btn-secondary flex items-center gap-2 px-3 py-2 disabled:opacity-50"
            title="刷新数据"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            刷新
          </button>
        </div>
      </div>

      {/* 错误状态 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-800">
            <Package className="w-5 h-5" />
            <span className="font-medium">加载失败</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button
            onClick={refreshNFTs}
            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            重新加载
          </button>
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-blue-800 mb-2">加载中...</h3>
          <p className="text-blue-600 text-sm">正在从区块链获取您的 NFT 数据</p>
        </div>
      )}

      {/* 空状态 */}
      {!isLoading && nfts.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            还没有 NFT 收藏
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            您的钱包中暂时没有 DMA Studio NFT。前往铸造页面创建您的第一个 NFT！
          </p>
          <a
            href="/mint"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3"
          >
            <Package className="w-5 h-5" />
            立即铸造 NFT
          </a>
        </div>
      )}

      {/* NFT 列表 */}
      {!isLoading && sortedNFTs.length > 0 && (
        <div className={
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {sortedNFTs.map((nft) => (
            <NFTCard
              key={nft.tokenId}
              nft={nft}
              contractAddress={contractAddress || ''}
              chainName={chain?.name}
              blockExplorerUrl={chain?.blockExplorers?.default?.url}
            />
          ))}
        </div>
      )}

      {/* 底部统计 */}
      {!isLoading && sortedNFTs.length > 0 && (
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-gray-800 mb-2">收藏统计</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-blue-600">{nfts.length}</div>
                <div className="text-gray-600">NFT 总数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{chain?.name || '未知'}</div>
                <div className="text-gray-600">区块链网络</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">持有权确认</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}