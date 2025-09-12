'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from './WalletButton';
import { ROUTES, DMA_BRANDING } from '@/config/constants';
import { Home, Palette, Shield, Package } from 'lucide-react';

const navItems = [
  {
    href: ROUTES.HOME,
    label: '首页',
    icon: Home,
  },
  {
    href: ROUTES.MINT,
    label: '铸造 NFT',
    icon: Palette,
  },
  {
    href: ROUTES.GATE,
    label: '专属内容',
    icon: Shield,
  },
  {
    href: ROUTES.INVENTORY,
    label: '我的收藏',
    icon: Package,
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">DMA</span>
            </div>
            <span className="hidden sm:inline">Studio</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Wallet Button */}
          <WalletButton />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}