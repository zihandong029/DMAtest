import { MintNFT } from '@/components/MintNFT';

export default function MintPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          🎨 铸造专属 NFT
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          在测试网络上免费创建您的第一个 NFT，体验 Web3 创作的魅力
        </p>
      </div>

      {/* 铸造组件 */}
      <MintNFT />

      {/* 底部信息 */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">💡 关于 NFT 铸造</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">🆓 完全免费</h4>
              <p>在测试网络上铸造完全免费，只需支付很少的 gas 费用</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔒 安全可靠</h4>
              <p>使用经过验证的 OpenZeppelin 标准合约，确保安全性</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">⚡ 即时确认</h4>
              <p>交易通常在几秒内完成，立即拥有您的 NFT</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎯 专属权益</h4>
              <p>持有 NFT 后可解锁专属内容和特殊功能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}