import { AccountInfo } from '@/components/AccountInfo';
import { NetworkStatus } from '@/components/NetworkStatus';
import { NFTStatus } from '@/components/NFTStatus';
import { APP_CONFIG, ROUTES } from '@/config/constants';
import Link from 'next/link';
import { Palette, Shield, Package, ArrowRight } from 'lucide-react';

const features = [
  {
    href: ROUTES.MINT,
    title: 'mint NFT',
    description: '创建你的专属测试 NFT',
    icon: Palette,
    color: 'from-purple-500 to-purple-600',
  },
  // {
  //   href: ROUTES.GATE,
  //   title: '专属内容',
  //   description: '解锁隐藏的艺术作品',
  //   icon: Shield,
  //   color: 'from-blue-500 to-blue-600',
  // },
  {
    href: ROUTES.INVENTORY,
    title: 'my NFTs',
    description: '查看拥有的所有 NFT',
    icon: Package,
    color: 'from-green-500 to-green-600',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gradient mb-6">
          🎨 {APP_CONFIG.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {APP_CONFIG.description} - 在测试网络上体验 Web3 创作的魅力
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <AccountInfo />
        <NetworkStatus />
        <NFTStatus />
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">🚀 开始体验</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <div className="card hover:scale-105 transition-transform duration-300 cursor-pointer group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                    开始使用 <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Status Footer */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">✨ 基础配置完成</h2>
        <p className="text-lg opacity-90 mb-2">
          测试网络已连接，导航已配置，准备开始构建 DApp 功能
        </p>
        <p className="text-sm opacity-75">
          下一步：实现 NFT mint, gate, 和 inventory 功能
        </p>
      </div>
    </div>
  );
}