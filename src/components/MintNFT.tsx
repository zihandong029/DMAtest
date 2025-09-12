'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useNFTContract } from '@/hooks/useNFTContract';
import { Palette, Loader, CheckCircle, XCircle, ExternalLink, Sparkles } from 'lucide-react';

export function MintNFT() {
  const { address, isConnected, chain } = useAccount();
  const {
    mintNFT,
    isLoading,
    isConfirming,
    isConfirmed,
    txHash,
    error,
    clearError,
    isContractConfigured,
    contractName,
    totalSupply,
    refetchData,
  } = useNFTContract();

  const [mintedTokenURI, setMintedTokenURI] = useState<string>('');
  const [customTokenURI, setCustomTokenURI] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // 解决 Hydration 问题
    useEffect(() => {
      setMounted(true);
    }, []);
    
  const handleMint = async () => {
    console.log("address:", address);
    // console.log("customTokenURI:", customTokenURI);
    if (!address) return;

    try {
      clearError();
      const result = await mintNFT(address, customTokenURI);
      
      if (result) {
        setMintedTokenURI(result.tokenURI);
        // 等待几秒后刷新数据
        setTimeout(() => {
          refetchData();
        }, 3000);
      }
    } catch (err) {
      console.error('铸造错误:', err);
    }
  };

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="h-20 bg-gray-200 rounded mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // 获取交易浏览器链接
  const getTxUrl = () => {
    if (!txHash || !chain?.blockExplorers?.default?.url) return '#';
    return `${chain.blockExplorers.default.url}/tx/${txHash}`;
  };

  // 未连接钱包
  if (!isConnected) {
    return (
      <div className="card text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Palette className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">连接钱包开始铸造</h2>
        <p className="text-gray-500 mb-6">
          请先连接您的钱包以开始铸造 NFT
        </p>
      </div>
    );
  }

  // 合约未配置
  if (!isContractConfigured) {
    return (
      <div className="card text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-red-800">合约未配置</h2>
        <p className="text-red-600 mb-6">
          当前网络的 NFT 合约地址未配置，请检查环境变量设置
        </p>
      </div>
    );
  }

  // 铸造成功状态
  if (isConfirmed && mintedTokenURI) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-green-800">
            🎉 铸造成功！
          </h2>
          
          <p className="text-gray-600 mb-6">
            您的 NFT 已成功铸造到区块链上
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-green-700 mb-2">Token URI:</div>
            <code className="text-xs bg-white p-2 rounded block break-all">
              {mintedTokenURI}
            </code>
          </div>

          {txHash && (
            <div className="flex justify-center gap-3 mb-6">
              <a
                href={getTxUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink size={16} />
                查看交易
              </a>
            </div>
          )}

          <button
            onClick={() => {
              setMintedTokenURI('');
              setCustomTokenURI('');
              clearError();
            }}
            className="btn-secondary"
          >
            继续铸造
          </button>
        </div>
      </div>
    );
  }

  // 主要铸造界面
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* 头部信息 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">铸造 NFT</h2>
          <p className="text-gray-600">
            铸造您专属的 {contractName} NFT
          </p>
        </div>

        {/* 合约信息 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">合约名称:</span>
              <div className="font-medium">{contractName}</div>
            </div>
            <div>
              <span className="text-gray-500">已铸造数量:</span>
              <div className="font-medium">{totalSupply} NFTs</div>
            </div>
          </div>
        </div>

        {/* 自定义 Token URI (可选) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Token URI (可选)
          </label>
          <input
            type="text"
            value={customTokenURI}
            onChange={(e) => setCustomTokenURI(e.target.value)}
            placeholder="留空将自动生成唯一标识符"
            className="input-field"
          />
          <p className="text-xs text-gray-500 mt-1">
            Token URI 用于存储 NFT 的元数据信息
          </p>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-800 font-medium">铸造失败</span>
            </div>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* 交易进行中 */}
        {(isLoading || isConfirming) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Loader className="w-5 h-5 text-blue-500 animate-spin" />
              <div>
                <div className="text-blue-800 font-medium">
                  {isLoading ? '准备交易中...' : '等待区块确认...'}
                </div>
                {txHash && (
                  <div className="text-blue-600 text-sm">
                    交易哈希: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </div>
                )}
              </div>
            </div>
            
            {txHash && (
              <div className="mt-3">
                <a
                  href={getTxUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  在浏览器中查看
                </a>
              </div>
            )}
          </div>
        )}

        {/* 铸造按钮 */}
        <button
          onClick={handleMint}
          disabled={isLoading || isConfirming}
          className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              签署交易中...
            </div>
          ) : isConfirming ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              确认中...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              免费铸造 NFT
            </div>
          )}
        </button>

        {/* 提示信息 */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>💡 这是测试网络，铸造免费但需要支付少量 gas 费</p>
          <p>确保钱包中有足够的测试 ETH 支付交易费用</p>
        </div>
      </div>
    </div>
  );
}