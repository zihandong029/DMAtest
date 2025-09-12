'use client';

import { Crown, Sparkles, Eye, Star, Gift, Zap } from 'lucide-react';

export function SecretContent() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 欢迎横幅 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl mb-8 text-center">
        <Crown className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">🎉 欢迎，NFT 持有者！</h2>
        <p className="text-xl opacity-90">
          您已解锁专属内容，享受 DMA Studio 的特殊权益
        </p>
      </div>

      {/* 专属内容网格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* 专属艺术作品 */}
        <div className="card hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">隐藏艺术</h3>
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-lg mb-4">
              <div className="text-6xl mb-2">🎨</div>
              <p className="text-sm text-gray-600">《数字之梦》</p>
            </div>
            <p className="text-gray-600 text-sm">
              专为 NFT 持有者创作的独家数字艺术作品
            </p>
          </div>
        </div>

        {/* 专属故事 */}
        <div className="card hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">秘密传说</h3>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-lg mb-4 text-left">
              <p className="text-sm text-gray-700 italic">
                在区块链的深处，有一个古老的传说...</p>
              <p className="text-sm text-gray-700 italic mt-2">
                只有真正的持有者才能解锁完整的故事。
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              探索 DMA Studio 宇宙的神秘故事
            </p>
          </div>
        </div>

        {/* 专属权益 */}
        <div className="card hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">专属权益</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 bg-green-50 p-2 rounded">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm">优先访问新功能</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 p-2 rounded">
                <Crown className="w-4 h-4 text-green-600" />
                <span className="text-sm">VIP 社区权限</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 p-2 rounded">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm">空投奖励资格</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              持有 NFT 解锁的独家特权
            </p>
          </div>
        </div>
      </div>

      {/* DMA Studio 宇宙 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">🌌 DMA Studio 宇宙</h3>
          <p className="opacity-90">深入探索我们的创作世界</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🦄</span>
              Dirk Horn 传奇
            </h4>
            <p className="text-sm opacity-90 mb-4">
              Dirk Horn 是 DMA Studio 宇宙中的神秘角色，拥有穿越维度的能力。
              只有 NFT 持有者才能了解他的真实身份和使命。
            </p>
            <div className="text-xs bg-white bg-opacity-20 p-2 rounded">
              💡 持有者专属：解锁 Dirk Horn 完整故事线
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🖤</span>
              Noir Badge 意义
            </h4>
            <p className="text-sm opacity-90 mb-4">
              Noir Badge 代表着黑暗与光明的平衡，象征着创作者在混沌中寻找秩序的永恒追求。
            </p>
            <div className="text-xs bg-white bg-opacity-20 p-2 rounded">
              🎨 独家内容：Noir 设计哲学深度解析
            </div>
          </div>
        </div>
      </div>

      {/* 持有者感谢 */}
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          🙏 感谢您的支持
        </h3>
        <p className="text-gray-600">
          作为早期支持者，您不仅拥有了独特的数字资产，更成为了 DMA Studio 创作旅程的重要伙伴。
          我们会持续为持有者带来更多惊喜和价值。
        </p>
      </div>
    </div>
  );
}