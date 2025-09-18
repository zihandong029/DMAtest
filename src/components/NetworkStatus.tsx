'use client';

import { useAccount } from 'wagmi';
import { API_CONFIG } from '@/config/constants';
import { CheckCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NetworkStatus() {
  const { isConnected, chain } = useAccount();
  const [mounted, setMounted] = useState(false);
  const hasInfuraKey = !!API_CONFIG.infuraApiKey;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🌐 网络状态
      </h3>
      
      <div className="space-y-4">
        {/* RPC 提供商状态 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {hasInfuraKey ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-orange-500" />}
            <span className="font-medium">Infura RPC</span>
          </div>
          <span className={hasInfuraKey ? 'status-connected' : 'status-disconnected'}>
            {hasInfuraKey ? '已配置' : '使用备用RPC'}
          </span>
        </div>

        {/* 测试网络状态 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-medium">Ethereum Sepolia</span>
            <span className="status-connected">✅ supported</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="font-medium">Polygon Amoy</span>
            <span className="status-disconnected">not supported</span>
          </div>
        </div>

        {/* 当前连接状态 */}
        <div className={`p-3 rounded-lg ${isConnected ? 'bg-green-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-800 font-medium">
                  已连接到 {chain?.name || '未知网络'}
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">等待钱包连接</span>
              </>
            )}
          </div>
        </div>

        {/* 配置提醒 */}
        {!hasInfuraKey && (
          <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded border border-orange-200">
            💡 <strong>建议:</strong> 配置 Infura API Key 以获得更稳定的连接和更高的请求限制
          </div>
        )}
      </div>
    </div>
  );
}