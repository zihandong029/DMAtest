'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { DMA_CONTRACT_ABI } from '@/contracts/DMAStudioTestCollection'; // 需要更新为新合约的ABI
import { getNFTContractAddress } from '@/contracts/contractAddresses';
import { PRESET_NFTS } from '@/config/nftData';
import { useState } from 'react';

export interface NFTItem {
  tokenId: string;
  tokenURI: string;
  index: number;
}

export interface NFTSupplyInfo {
  nftId: number;
  currentSupply: number;
  maxSupply: number;
  remainingSupply: number;
  isActive: boolean;
}

export interface UserMintInfo {
  nftId: number;
  mintedCount: number;
  remainingMints: number;
}

export function useLimitedNFTContract() {
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
    hash: txHash as `0x${string}` | undefined,
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

  // 读取所有 NFT 状态
  const { data: allNFTStatus, refetch: refetchNFTStatus } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DMA_CONTRACT_ABI,
    functionName: 'getAllNFTStatus',
    query: {
      enabled: !!contractAddress,
    },
  });

  // 铸造指定的 NFT
  const mintNFT = async (nftId: number) => {
    if (!contractAddress || !chain || !address) {
      throw new Error('合约未配置或网络未连接');
    }

    setIsLoading(true);
    setError(null);
    setTxHash(null);

    try {
      console.log('开始铸造 NFT:', {
        nftId,
        contract: contractAddress,
        user: address
      });

      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: DMA_CONTRACT_ABI,
        functionName: 'publicMint',
        args: [BigInt(nftId)],
      });

      setTxHash(hash);
      console.log('交易已提交:', hash);

      return { hash, nftId };
    } catch (err: unknown) {
      console.error('铸造失败:', err);
      
      let errorMessage = '铸造失败';
      
      if (err && typeof err === 'object' && 'message' in err) {
        const errorObj = err as { message: string };
        if (errorObj.message?.includes('User rejected')) {
          errorMessage = '用户取消了交易';
        } else if (errorObj.message?.includes('insufficient funds')) {
          errorMessage = '余额不足，请确保有足够的 ETH 支付 gas 费';
        } else if (errorObj.message?.includes('Max supply reached')) {
          errorMessage = '该 NFT 已售罄';
        } else if (errorObj.message?.includes('User mint limit reached')) {
          errorMessage = '您已铸造过此 NFT，每人限铸一个';
        } else if (errorObj.message?.includes('Invalid NFT ID')) {
          errorMessage = 'NFT ID 无效';
        } else if (errorObj.message?.includes('NFT is not active')) {
          errorMessage = '该 NFT 暂时不可铸造';
        } else if (errorObj.message) {
          errorMessage = errorObj.message;
        }
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取特定 NFT 的剩余供应量
  const getNFTRemainingSupply = async (nftId: number): Promise<number> => {
    if (!publicClient || !contractAddress) return 0;

    try {
      const remaining = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DMA_CONTRACT_ABI,
        functionName: 'getRemainingSupply',
        args: [BigInt(nftId)],
      });

      return Number(remaining);
    } catch (error) {
      console.error(`获取 NFT ${nftId} 剩余供应量失败:`, error);
      return 0;
    }
  };

  // 获取用户对特定 NFT 的剩余铸造机会
  const getUserRemainingMints = async (nftId: number): Promise<number> => {
    if (!publicClient || !contractAddress || !address) return 0;

    try {
      const remaining = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DMA_CONTRACT_ABI,
        functionName: 'getUserRemainingMints',
        args: [address as `0x${string}`, BigInt(nftId)],
      });

      return Number(remaining);
    } catch (error) {
      console.error(`获取用户对 NFT ${nftId} 的剩余铸造机会失败:`, error);
      return 0;
    }
  };

  // 检查 NFT 是否可用
  const isNFTAvailable = async (nftId: number): Promise<boolean> => {
    if (!publicClient || !contractAddress) return false;

    try {
      const available = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DMA_CONTRACT_ABI,
        functionName: 'isNFTAvailable',
        args: [BigInt(nftId)],
      });

      return Boolean(available);
    } catch (error) {
      console.error(`检查 NFT ${nftId} 可用性失败:`, error);
      return false;
    }
  };

  // 获取所有 NFT 的供应信息
  const getAllNFTSupplyInfo = (): NFTSupplyInfo[] => {
    if (!allNFTStatus) return [];

    const [supplies, maxSupplies, activeStatus] = allNFTStatus as [bigint[], bigint[], boolean[]];

    return PRESET_NFTS.map((nft, index) => ({
      nftId: nft.id,
      currentSupply: Number(supplies[index] || 0),
      maxSupply: Number(maxSupplies[index] || 0),
      remainingSupply: Number(maxSupplies[index] || 0) - Number(supplies[index] || 0),
      isActive: activeStatus[index] || false,
    }));
  };

  // 获取用户的 NFT 列表（保持原有接口兼容性）
  const getUserNFTs = async (): Promise<NFTItem[]> => {
    if (!address || !contractAddress || !balance || !publicClient) return [];

    console.log('获取用户 NFT 列表:', { address, balance: balance.toString() });

    const nfts: NFTItem[] = [];
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

  // 刷新数据
  const refetchData = () => {
    refetchBalance();
    refetchTotalSupply();
    refetchNFTStatus();
  };

  return {
    // 数据
    contractAddress,
    contractName: contractName as string,
    balance: balance ? Number(balance) : 0,
    totalSupply: totalSupply ? Number(totalSupply) : 0,
    
    // NFT 供应信息
    allNFTSupplyInfo: getAllNFTSupplyInfo(),
    
    // 交易状态
    isLoading,
    isConfirming,
    isConfirmed,
    txHash,
    error,
    
    // 函数
    mintNFT,
    getNFTRemainingSupply,
    getUserRemainingMints,
    isNFTAvailable,
    getUserNFTs,
    refetchData,
    clearError: () => setError(null),
    
    // 合约信息
    isContractConfigured: !!contractAddress,
    chainName: chain?.name,
    chain,
  };
}