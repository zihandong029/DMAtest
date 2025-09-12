import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/components/providers/Web3Provider';
import { Navigation } from '@/components/Navigation';
import { APP_CONFIG } from '@/config/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Web3Provider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>
              {children}
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}