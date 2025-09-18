'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useLimitedNFTContract } from './useLimitedNFTContract';

export function useNFTGating() {
  const { address, isConnected } = useAccount();
  const { balance, isContractConfigured } = useLimitedNFTContract();

  const [isChecking, setIsChecking] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 解决 Hydration 问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 简化的访问检查 - 只基于 balance
  useEffect(() => {
    if (!mounted || !isConnected || !address || !isContractConfigured) {
      setHasAccess(false);
      return;
    }

    setIsChecking(true);
    
    // 简单检查：如果 balance > 0 就有访问权限
    const userBalance = balance || 0;
    const hasNFT = userBalance > 0;
    
    setHasAccess(hasNFT);
    setIsChecking(false);
    
  }, [mounted, isConnected, address, balance, isContractConfigured]);

  // 刷新函数
  const refreshGating = () => {
    // 触发重新检查，通过更新依赖项
    setIsChecking(true);
    setTimeout(() => {
      const userBalance = balance || 0;
      setHasAccess(userBalance > 0);
      setIsChecking(false);
    }, 1000);
  };

  return {
    // 状态
    hasAccess,
    isChecking,
    mounted,
    
    // 数据
    nftCount: balance ? Number(balance) : 0,
    isConnected,
    isContractConfigured,
    
    // 函数
    refreshGating,
  };
}