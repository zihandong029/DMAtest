'use client';

import { useAccount, useBalance } from 'wagmi';
import { Copy, ExternalLink, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AccountInfo() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address: address,
  });
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 解决 Hydration 问题
  useEffect(() => {
    setMounted(true);
  }, []);
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 格式化地址显示
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="card text-center">
        <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-700">钱包未连接</h3>
        <p className="text-gray-500">请先连接你的钱包开始使用</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Wallet className="w-5 h-5 text-blue-500" />
        账户信息
      </h3>
      
      <div className="space-y-6">
        {/* 钱包地址 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            钱包地址
          </label>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
            <code className="flex-1 text-sm font-mono text-gray-800">
              {address ? formatAddress(address) : '未知地址'}
            </code>
            <button
              onClick={copyAddress}
              className={`p-2 rounded-md transition-all duration-200 ${
                copied 
                  ? 'text-green-600 bg-green-100' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`}
              title={copied ? "已复制!" : "复制完整地址"}
            >
              <Copy size={16} />
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 animate-fade-in">
              ✅ 完整地址已复制到剪贴板
            </p>
          )}
        </div>

        {/* 账户余额 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            账户余额
          </label>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            {balanceLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="loading-pulse">⟳</div>
                <span>加载中...</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {balance ? Number(balance.formatted).toFixed(4) : '0.0000'}
                </span>
                <span className="text-lg font-medium text-gray-600 bg-white px-2 py-1 rounded">
                  {balance?.symbol || 'ETH'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 网络信息 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            连接网络
          </label>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-2">
              {chain?.name ? (
                <span className="status-connected">
                  🌐 {chain.name}
                </span>
              ) : (
                <span className="status-disconnected">
                  ❓ 未知网络
                </span>
              )}
            </div>
            {chain?.blockExplorers?.default && address && (
              <a
                href={`${chain.blockExplorers.default.url}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors hover:underline"
                title="在区块浏览器中查看详情"
              >
                浏览器查看 <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* 连接状态指示 */}
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <span className="text-green-800 font-medium">钱包已成功连接</span>
              <p className="text-green-600 text-sm mt-1">
                链ID: {chain?.id || '未知'} | 可以进行交易操作
              </p>
            </div>
          </div>
        </div>

        {/* 完整地址显示（可折叠） */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
            显示完整地址 ▼
          </summary>
          <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono break-all text-gray-700">
            {address}
          </div>
        </details>
      </div>
    </div>
  );
}