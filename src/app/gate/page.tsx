import { NFTGate } from '@/components/NFTGate';

export default function GatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          🛡️ 专属内容区域
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          探索只有 NFT 持有者才能访问的隐藏世界，发现 DMA Studio 宇宙的秘密
        </p>
      </div>

      {/* 门控组件 */}
      <NFTGate />

      {/* 底部信息 */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            🌟 什么是 NFT Gating？
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-semibold mb-2">代币门控</h4>
              <p className="text-sm text-gray-600">
                基于区块链技术的访问控制，只有特定 NFT 持有者才能访问专属内容
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold mb-2">实时验证</h4>
              <p className="text-sm text-gray-600">
                系统会实时检查您的钱包，自动识别 NFT 持有状态并授予相应权限
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-semibold mb-2">独家价值</h4>
              <p className="text-sm text-gray-600">
                为 NFT 赋予实用价值，让数字收藏品不仅仅是艺术品，更是通往特殊体验的钥匙
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              💡 这是 Web3 应用的典型用例：将 NFT 所有权与实际功能结合，
              创造出真正有价值的数字资产生态系统
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}