'use client';

import { useLimitedNFTContract } from '@/hooks/useLimitedNFTContract';
import { useAccount } from 'wagmi';
import { Palette, Package, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NFTStatus() {
  const { isConnected, chain } = useAccount();
  const { 
    balance, 
    totalSupply, 
    contractAddress, 
    isContractConfigured,
    chainName 
  } = useLimitedNFTContract();
  
  const [mounted, setMounted] = useState(false);

  // 解决 Hydration 问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="card text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-700">NFT 状态</h3>
        <p className="text-gray-500">连接钱包以查看 NFT 状态</p>
      </div>
    );
  }

  if (!isContractConfigured) {
    return (
      <div className="card text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="font-semibold text-red-800 mb-2">合约未配置</h3>
        <p className="text-red-600 text-sm">
          当前网络 ({chainName || chain?.name}) 的 NFT 合约地址未配置
        </p>
        <div className="mt-3 text-xs text-red-500 bg-red-50 p-2 rounded">
          请检查环境变量配置或切换到支持的网络
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-500" />
        NFT 合约状态
      </h3>
      
      <div className="space-y-4">
        {/* 合约信息 */}
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600 mb-1">合约地址</div>
          <code className="text-xs font-mono break-all text-gray-800 bg-white p-2 rounded block">
            {contractAddress}
          </code>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{balance}</div>
            <div className="text-sm text-blue-800 font-medium">我拥有的</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">{totalSupply}</div>
            <div className="text-sm text-purple-800 font-medium">总铸造量</div>
          </div>
        </div>

        {/* 网络信息 */}
        <div className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100">
          <Users className="w-4 h-4 text-green-600" />
          <span>部署在 <strong>{chainName || chain?.name}</strong> 网络</span>
          {chain?.testnet && (
            <span className="text-yellow-600 text-xs bg-yellow-100 px-2 py-1 rounded-full ml-2">
              测试网
            </span>
          )}
        </div>

        {/* 合约状态指示 */}
        <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700">
            合约已连接并正常工作
          </span>
        </div>

        {/* 测试网提醒 */}
        {chain?.testnet && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-yellow-800 text-sm font-medium mb-1">测试网络提醒</div>
            <p className="text-yellow-700 text-xs">
              OpenSea 已停止支持测试网，NFT 可能无法在 OpenSea 上显示。您可以通过区块浏览器或自建界面查看 NFT。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}