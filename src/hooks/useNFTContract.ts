'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { DMA_CONTRACT_ABI } from '@/contracts/DMAStudioTestCollection';
import { getNFTContractAddress } from '@/contracts/contractAddresses';
import { useState } from 'react';

export interface NFTItem {
  tokenId: string;      // NFT 的唯一标识符
  tokenURI: string;     // NFT 的元数据 URI
  index: number;        // 在用户收藏中的索引位置
}

export function useNFTContract() {
  const { address, chain } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // 获取当前链的合约地址
  const contractAddress = chain ? getNFTContractAddress(chain.id) : null;

  // 写入合约的 hook
  const { writeContractAsync } = useWriteContract();
  
  // 获取 public client 用于读取合约
  const publicClient = usePublicClient();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  // 读取用户拥有的 NFT 数量
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DMA_CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contractAddress,
    },
  });

  // 读取总供应量
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DMA_CONTRACT_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: !!contractAddress,
    },
  });

  // 读取合约名称
  const { data: contractName } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DMA_CONTRACT_ABI,
    functionName: 'name',
    query: {
      enabled: !!contractAddress,
    },
  });

  // 读取合约符号
  const { data: contractSymbol } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DMA_CONTRACT_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!contractAddress,
    },
  });

  // 铸造 NFT 函数
  // const mintNFT = async (toAddress?: string, tokenURI: string = '') => {
  //   if (!contractAddress || !chain) {
  //     throw new Error('合约未配置或网络未连接');
  //   }

  //   if (!address) {
  //     throw new Error('请先连接钱包');
  //   }

  //   const targetAddress = toAddress || address;
    
  //   setIsLoading(true);
  //   setError(null);
  //   setTxHash(null);

  //   try {
  //     // 生成简单的 tokenURI（如果没有提供）
  //     const finalTokenURI = tokenURI || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
  //     console.log('开始铸造 NFT:', {
  //       to: targetAddress,
  //       tokenURI: finalTokenURI,
  //       contract: contractAddress,
  //     });

  //     const hash = await writeContractAsync({
  //       address: contractAddress as `0x${string}`,
  //       abi: DMA_CONTRACT_ABI,
  //       functionName: 'safeMint',
  //       args: [targetAddress as `0x${string}`, finalTokenURI],
  //     });

  //     setTxHash(hash);
  //     console.log('交易已提交:', hash);

  //     return { hash, tokenURI: finalTokenURI };
  //   } catch (err: unknown) {
  //     console.error('铸造失败:', err);
      
  //     let errorMessage = '铸造失败';
      
  //     if (err && typeof err === 'object' && 'message' in err) {
  //       const errorObj = err as { message: string };
  //       if (errorObj.message?.includes('User rejected')) {
  //         errorMessage = '用户取消了交易';
  //       } else if (errorObj.message?.includes('insufficient funds')) {
  //         errorMessage = '余额不足，请确保有足够的 ETH 支付 gas 费';
  //       } else if (errorObj.message?.includes('OwnableUnauthorizedAccount')) {
  //         errorMessage = '没有铸造权限，只有合约所有者可以铸造';
  //       } else if (errorObj.message) {
  //         errorMessage = errorObj.message;
  //       }
  //     }
      
  //     setError(errorMessage);
  //     throw new Error(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // 获取用户的 NFT 列表
  const getUserNFTs = async () => {
    if (!address || !contractAddress || !balance || !publicClient) return [];

    console.log('获取用户 NFT 列表:', { address, balance: balance.toString() });

    const nfts = [];
    const balanceNumber = Number(balance);

    for (let i = 0; i < balanceNumber; i++) {
      try {
        // 获取用户的第 i 个 NFT 的 tokenId
        const tokenId = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: DMA_CONTRACT_ABI,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, BigInt(i)],
        });

        // 获取 NFT 的 tokenURI
        const tokenURI = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: DMA_CONTRACT_ABI,
          functionName: 'tokenURI',
          args: [tokenId],
        });

        nfts.push({
          tokenId: tokenId.toString(),
          tokenURI: tokenURI as string,
          index: i,
        });
      } catch (error) {
        console.error(`获取 NFT ${i} 失败:`, error);
      }
    }

    return nfts;
  };

  // 检查地址是否拥有 NFT（移除 useCallback）
  const hasNFT = async (checkAddress?: string): Promise<boolean> => {
    const targetAddress = checkAddress || address;
    if (!targetAddress || !contractAddress) return false;

    try {
      const userBalance = await publicClient?.readContract({
        address: contractAddress as `0x${string}`,
        abi: DMA_CONTRACT_ABI,
        functionName: 'balanceOf',
        args: [targetAddress as `0x${string}`],
      });

      return Number(userBalance || 0) > 0;
    } catch (error) {
      console.error('检查 NFT 持有失败:', error);
      return false;
    }
  };

  // 刷新数据
  const refetchData = () => {
    refetchBalance();
    refetchTotalSupply();
  };

  return {
    // 数据
    contractAddress,
    contractName: contractName as string,
    contractSymbol: contractSymbol as string,
    balance: balance ? Number(balance) : 0,
    totalSupply: totalSupply ? Number(totalSupply) : 0,
    
    // 交易状态
    isLoading,
    isConfirming,
    isConfirmed,
    txHash,
    error,
    
    // 函数
    // mintNFT,
    getUserNFTs,
    hasNFT,
    refetchData,
    clearError: () => setError(null),
    
    // 合约信息
    isContractConfigured: !!contractAddress,
    chainName: chain?.name,
    chain,
  };
}