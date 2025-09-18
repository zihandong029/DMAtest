"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useLimitedNFTContract, NFTItem } from "@/hooks/useLimitedNFTContract";
import { NFTCard } from "./NFTCard";
import {
  Package,
  Loader,
  RefreshCw,
  Filter,
  Grid,
  List,
  WifiOff,
} from "lucide-react";

type ViewMode = "grid" | "list";
type SortOption = "tokenId" | "newest" | "oldest";

export function NFTInventory() {
  const { address, isConnected, chain } = useAccount();
  const {
    balance,
    isContractConfigured,
    contractAddress,
    getUserNFTs,
    refetchData,
  } = useLimitedNFTContract();

  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // UI状态
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("tokenId");

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
      console.log("开始加载用户NFTs，余额:", userBalance);
      const userNFTs = await getUserNFTs();
      console.log("成功加载NFTs:", userNFTs);
      setNfts(userNFTs);
    } catch (err) {
      console.error("加载 NFT 失败:", err);
      setError("加载 NFT 数据失败，请稍后重试");
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
      case "tokenId":
        return Number(a.tokenId) - Number(b.tokenId);
      case "newest":
        return Number(b.tokenId) - Number(a.tokenId); // 假设较大的 tokenId 是较新的
      case "oldest":
        return Number(a.tokenId) - Number(b.tokenId);
      default:
        return 0;
    }
  });

  // 刷新 NFT 数据
  const refreshNFTs = async () => {
    // 先刷新合约数据
    refetchData();
    // 然后重新加载NFT列表
    await loadNFTsManually();
  };

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Connect Wallet to View Collection
          </h2>
          <p className="text-gray-500">
            Please connect your wallet to view your owned NFT collection
          </p>
        </div>
      </div>
    );
  }

  // Contract not configured
  if (!isContractConfigured) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            Service Temporarily Unavailable
          </h2>
          <p className="text-red-600">
            The NFT contract is not properly configured, unable to load
            collection data
          </p>
          <p className="text-sm text-red-500 mt-2">
            Current Network: {chain?.name || "Unknown"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Statistics Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            My NFT Collection
          </h2>
          <p className="text-gray-600">
            You own a total of{" "}
            <span className="font-semibold text-blue-600">{balance || 0}</span>{" "}
            NFTs
            {nfts.length > 0 && (
              <span className="ml-2 text-sm">(Loaded {nfts.length})</span>
            )}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Network: {chain?.name || "Unknown"} | Contract:{" "}
            {contractAddress
              ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`
              : "Not Configured"}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tokenId">By Token ID</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refreshNFTs}
            disabled={isLoading}
            className="btn-secondary flex items-center gap-2 px-3 py-2 disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-800">
            <Package className="w-5 h-5" />
            <span className="font-medium">Failed to Load</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button
            onClick={refreshNFTs}
            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Reload
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-blue-800 mb-2">Loading...</h3>
          <p className="text-blue-600 text-sm">
            Fetching your NFT data from the blockchain
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && nfts.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No NFTs in Your Collection Yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your wallet currently has no DMA Studio NFTs. Head to the mint page
            to create your first NFT!
          </p>
          <a
            href="/mint"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3"
          >
            <Package className="w-5 h-5" />
            Mint NFT Now
          </a>
        </div>
      )}

      {/* NFT List */}
      {!isLoading && sortedNFTs.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {sortedNFTs.map((nft) => (
            <NFTCard
              key={nft.tokenId}
              nft={nft}
              contractAddress={contractAddress || ""}
              chainName={chain?.name}
              blockExplorerUrl={chain?.blockExplorers?.default?.url}
            />
          ))}
        </div>
      )}

      {/* Bottom Statistics */}
      {!isLoading && sortedNFTs.length > 0 && (
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-gray-800 mb-2">
              Collection Statistics
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {nfts.length}
                </div>
                <div className="text-gray-600">Total NFTs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {chain?.name || "Unknown"}
                </div>
                <div className="text-gray-600">Blockchain Network</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Ownership Confirmed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testnet Reminder */}
      {chain?.testnet && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Package className="w-5 h-5" />
            <span className="font-medium">Test Network Reminder</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            You are currently on a test network. Since OpenSea has discontinued
            testnet support, NFTs may not be viewable on OpenSea. You can check
            NFT details via the block explorer.
          </p>
        </div>
      )}
    </div>
  );
}
