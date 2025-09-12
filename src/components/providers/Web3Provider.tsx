'use client';

import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit';
import { polygonAmoy } from '@/config/chains';
import { APP_CONFIG, API_CONFIG } from '@/config/constants';

import '@rainbow-me/rainbowkit/styles.css';

interface Web3ProviderProps {
  children: ReactNode;
}

// 检查环境变量
const infuraApiKey = API_CONFIG.infuraApiKey;
const projectId = API_CONFIG.walletConnectProjectId || 'default-project-id';

// 配置 Infura RPC 传输
const transports = {
  [sepolia.id]: infuraApiKey 
    ? http(`https://sepolia.infura.io/v3/${infuraApiKey}`)
    : http('https://1rpc.io/sepolia'),
  [polygonAmoy.id]: infuraApiKey 
    ? http(`https://polygon-amoy.infura.io/v3/${infuraApiKey}`)
    : http('https://rpc-amoy.polygon.technology'),
};

// 配置 Wagmi
const config = getDefaultConfig({
  appName: APP_CONFIG.name,
  projectId: projectId,
  chains: [sepolia, polygonAmoy],
  transports,
});

// 创建 React Query 客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
    },
  },
});

// RainbowKit 自定义主题
const customTheme = lightTheme({
  accentColor: '#000000',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
});

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customTheme}
          showRecentTransactions={true}
          appInfo={{
            appName: APP_CONFIG.name,
            learnMoreUrl: 'https://dma.studio',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}