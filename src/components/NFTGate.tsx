'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useNFTGating } from '@/hooks/useNFTGating';
import { SecretContent } from './SecretContent';
import { AccessDenied } from './AccessDenied';
import { Loader, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export function NFTGate() {
  const { isConnected } = useAccount();
  const {
    hasAccess,
    isChecking,
    mounted,
    nftCount,
    isContractConfigured,
    refreshGating,
  } = useNFTGating();

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // 未连接钱包
  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">连接钱包以访问专属内容</h2>
          <p className="text-gray-500 mb-6">
            请先连接您的钱包，我们将检查您是否持有访问权限
          </p>
        </div>
      </div>
    );
  }

  // 合约未配置
  if (!isContractConfigured) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-800">服务暂时不可用</h2>
          <p className="text-red-600 mb-6">
            NFT 合约未正确配置，请稍后再试
          </p>
        </div>
      </div>
    );
  }

  // 正在检查访问权限
  if (isChecking) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">验证访问权限中...</h2>
          <p className="text-blue-600 mb-6">
            正在检查您的 NFT 持有情况，请稍候
          </p>
          
          {/* 检查进度指示 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-blue-700">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">连接区块链网络中...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 有访问权限 - 显示秘密内容
  if (hasAccess && nftCount > 0) {
    return (
      <div>
        {/* 持有者状态栏 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <span className="text-green-800 font-medium">
                    ✅ 访问权限已验证
                  </span>
                  <p className="text-green-600 text-sm">
                    您持有 {nftCount} 个 DMA Studio NFT
                  </p>
                </div>
              </div>
              
              <button
                onClick={refreshGating}
                className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                title="刷新验证状态"
              >
                <RefreshCw className="w-4 h-4" />
                刷新
              </button>
            </div>

            {/* 简化的 NFT 信息显示 */}
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-green-700 text-xs">
                ✅ 验证通过 - 您持有 {nftCount} 个 NFT，拥有完整访问权限
              </p>
            </div>
          </div>
        </div>

        {/* 秘密内容 */}
        <SecretContent />
      </div>
    );
  }

  // 无访问权限 - 显示拒绝访问页面
  return <AccessDenied />;
}