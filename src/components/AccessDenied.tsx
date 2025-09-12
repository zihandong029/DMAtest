'use client';

import Link from 'next/link';
import { Shield, Lock, Sparkles, ArrowRight, Eye, Crown } from 'lucide-react';
import { ROUTES } from '@/config/constants';

export function AccessDenied() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* 主要提示卡片 */}
      <div className="card text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          🔒 专属内容区域
        </h2>
        
        <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          此区域仅对 DMA Studio NFT 持有者开放。
          铸造您的专属 NFT，解锁隐藏的艺术作品和秘密故事！
        </p>

        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={ROUTES.MINT}>
            <button className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
              <Sparkles className="w-5 h-5" />
              立即铸造 NFT
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          
          <Link href={ROUTES.INVENTORY}>
            <button className="btn-secondary flex items-center gap-2 px-6 py-3">
              检查我的收藏
            </button>
          </Link>
        </div>
      </div>

      {/* 预览内容 */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ✨ 持有者专享内容预览
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* 隐藏艺术预览 */}
          <div className="relative">
            <div className="card bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
              <div className="text-center">
                <Eye className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2 text-pink-800">隐藏艺术</h4>
                <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-3 relative overflow-hidden">
                  <div className="blur-sm">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-xs">《数字之梦》</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-200 to-transparent"></div>
                </div>
                <p className="text-sm text-pink-700">
                  专属数字艺术作品
                </p>
              </div>
            </div>
          </div>

          {/* 秘密故事预览 */}
          <div className="relative">
            <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2 text-blue-800">秘密传说</h4>
                <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-3 relative overflow-hidden">
                  <div className="blur-sm text-xs text-left">
                    <p className="italic">在区块链的深处...</p>
                    <p className="italic mt-1">古老的传说等待...</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-200 to-transparent"></div>
                </div>
                <p className="text-sm text-blue-700">
                  DMA Studio 宇宙故事
                </p>
              </div>
            </div>
          </div>

          {/* 专属权益预览 */}
          <div className="relative">
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="text-center">
                <Crown className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2 text-green-800">专属权益</h4>
                <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-3 relative overflow-hidden">
                  <div className="blur-sm space-y-1">
                    <div className="text-xs bg-green-100 p-1 rounded">VIP 访问</div>
                    <div className="text-xs bg-green-100 p-1 rounded">优先权限</div>
                    <div className="text-xs bg-green-100 p-1 rounded">空投奖励</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-200 to-transparent"></div>
                </div>
                <p className="text-sm text-green-700">
                  持有者独享特权
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 铸造指引 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200">
        <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
          🚀 如何获得访问权限
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
            <h4 className="font-medium mb-1">连接钱包</h4>
            <p className="text-gray-600">确保钱包连接到 Sepolia 测试网</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
            <h4 className="font-medium mb-1">铸造 NFT</h4>
            <p className="text-gray-600">前往铸造页面，免费铸造您的 NFT</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
            <h4 className="font-medium mb-1">解锁内容</h4>
            <p className="text-gray-600">返回此页面，自动解锁专属内容</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-4">
            💡 铸造完全免费，仅需少量 gas 费用
          </p>
          <Link href={ROUTES.MINT}>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              开始铸造 ✨
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}