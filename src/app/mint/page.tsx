import { MintNFT } from '@/components/MintNFT';

export default function MintPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          🎨 Mint NFT
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your exclusive test NFT - on Sepolia testnet
        </p>
      </div>

      {/* Mint Component */}
      <MintNFT />

      {/* Bottom Information */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">💡 About NFT Minting</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">🆓 Completely Free</h4>
              <p>Minting on test network is completely free, only minimal gas fees apply</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔒 Safe and Secure</h4>
              <p>Using verified OpenZeppelin standard contracts to ensure security</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">⚡ Instant Confirmation</h4>
              <p>Transactions are usually completed within seconds, own your NFT immediately</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎯 Exclusive Benefits</h4>
              <p>Holders of the NFT can unlock exclusive content and special features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}