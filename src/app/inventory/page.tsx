import { NFTInventory } from '@/components/NFTInventory';

export default function InventoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          📦 我的 NFT 收藏
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          查看和管理您拥有的所有 DMA Studio NFT，每个 NFT 都是独一无二的数字资产
        </p>
      </div>

      {/* 收藏组件 */}
      <NFTInventory />

      {/* 底部信息 */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            💎 关于您的 NFT 收藏
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-semibold mb-2 text-gray-800">真正所有权</h4>
              <p className="text-sm text-gray-600">
                每个 NFT 都在区块链上记录，确保您的数字所有权不可篡改
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-semibold mb-2 text-gray-800">独特价值</h4>
              <p className="text-sm text-gray-600">
                每个 NFT 都有独特的 Token ID 和元数据，世界上绝无仅有
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold mb-2 text-gray-800">实用功能</h4>
              <p className="text-sm text-gray-600">
                NFT 不仅是收藏品，还能解锁专属内容和特殊权益
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🌍</div>
              <h4 className="font-semibold mb-2 text-gray-800">全球可见</h4>
              <p className="text-sm text-gray-600">
                在任何支持的钱包和市场平台都能查看和管理您的 NFT
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>提示:</strong> 这些 NFT 存储在测试网络上，仅用于演示目的。
              在生产环境中，您的 NFT 将具有真正的价值和转让能力。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}