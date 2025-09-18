import { NFTInventory } from "@/components/NFTInventory";

export default function InventoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          📦 My NFT Collection
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          View and manage all your DMA Studio NFTs — each one is a unique
          digital asset
        </p>
      </div>

      {/* Collection Component */}
      <NFTInventory />

      {/* Bottom Information */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            💎 About Your NFT Collection
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-semibold mb-2 text-gray-800">
                True Ownership
              </h4>
              <p className="text-sm text-gray-600">
                Each NFT is recorded on the blockchain, ensuring your digital
                ownership is tamper-proof
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-semibold mb-2 text-gray-800">Unique Value</h4>
              <p className="text-sm text-gray-600">
                Every NFT has a unique Token ID and metadata — one of a kind in
                the world
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold mb-2 text-gray-800">
                Practical Features
              </h4>
              <p className="text-sm text-gray-600">
                NFTs are not just collectibles — they also unlock exclusive
                content and special benefits
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">🌍</div>
              <h4 className="font-semibold mb-2 text-gray-800">
                Globally Accessible
              </h4>
              <p className="text-sm text-gray-600">
                View and manage your NFTs on any supported wallet and
                marketplace platform worldwide
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Note:</strong> These NFTs are stored on a test network
              and for demonstration purposes only. In a production environment,
              your NFTs will have real value and transfer capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
