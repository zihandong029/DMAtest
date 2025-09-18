"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useLimitedNFTContract } from "@/hooks/useLimitedNFTContract";
import {
  PRESET_NFTS,
  PresetNFT,
  getIPFSUrl,
  getRarityColor,
} from "@/config/nftData";
import { DMA_BRANDING } from "@/config/constants";
import Image from "next/image";
import {
  Palette,
  Loader,
  CheckCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  Star,
  Crown,
  AlertCircle,
  Package,
} from "lucide-react";

export function MintNFT() {
  const { address, isConnected, chain } = useAccount();
  const {
    mintNFT,
    isLoading,
    isConfirming,
    isConfirmed,
    txHash,
    error,
    clearError,
    isContractConfigured,
    contractName,
    totalSupply,
    allNFTSupplyInfo,
    getUserRemainingMints,
    refetchData,
  } = useLimitedNFTContract();

  const [selectedNFT, setSelectedNFT] = useState<PresetNFT | null>(
    PRESET_NFTS[0]
  );
  const [mintedNFTId, setMintedNFTId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [userMintInfo, setUserMintInfo] = useState<{ [key: number]: number }>(
    {}
  );

  // Resolve Hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user minting information
  useEffect(() => {
    async function fetchUserMintInfo() {
      if (!mounted || !address || !isContractConfigured) return;

      const mintInfo: { [key: number]: number } = {};
      for (const nft of PRESET_NFTS) {
        try {
          const remaining = await getUserRemainingMints(nft.id);
          mintInfo[nft.id] = remaining;
        } catch (error) {
          console.error(`Failed to fetch mint info for NFT ${nft.id}:`, error);
          mintInfo[nft.id] = 0;
        }
      }
      setUserMintInfo(mintInfo);
    }

    fetchUserMintInfo();
  }, [
    mounted,
    address,
    isContractConfigured,
    getUserRemainingMints,
    isConfirmed,
  ]);

  const handleMint = async () => {
    if (!address || !selectedNFT) return;

    try {
      clearError();
      const result = await mintNFT(selectedNFT.id);

      if (result) {
        setMintedNFTId(result.nftId);
        // Refresh data after a few seconds
        setTimeout(() => {
          refetchData();
        }, 3000);
      }
    } catch (err) {
      console.error("Minting error:", err);
    }
  };

  // Show loading state before component mounts
  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-80 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get transaction explorer link
  const getTxUrl = () => {
    if (!txHash || !chain?.blockExplorers?.default?.url) return "#";
    return `${chain.blockExplorers.default.url}/tx/${txHash}`;
  };

  // Wallet not connected
  if (!isConnected) {
    return (
      <div className="card text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Palette className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Connect Wallet to Mint
        </h2>
        <p className="text-gray-500 mb-6">
          Please connect your wallet first to start minting limited-edition NFTs
        </p>
      </div>
    );
  }

  // Contract not configured
  if (!isContractConfigured) {
    return (
      <div className="card text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-red-800">
          Contract Not Configured
        </h2>
        <p className="text-red-600 mb-6">
          The NFT contract address for the current network is not configured.
          Please check your environment variable settings.
        </p>
      </div>
    );
  }

  // Mint successful state
  if (isConfirmed && mintedNFTId) {
    const mintedNFT = PRESET_NFTS.find((nft) => nft.id === mintedNFTId);

    return (
      <div className="max-w-3xl mx-auto">
        <div className="card text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold mb-4 text-green-800">
            🎉 Mint Successful!
          </h2>

          <p className="text-gray-600 mb-8">
            Congratulations! You have successfully minted{" "}
            <strong>{mintedNFT?.name}</strong>
          </p>

          {mintedNFT && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border">
                <img
                  src={getIPFSUrl(mintedNFT.imageUrl)}
                  alt={mintedNFT.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{mintedNFT.name}</h3>
                <p className="text-sm text-gray-600">{mintedNFT.description}</p>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getRarityColor(
                    mintedNFT.rarity
                  )} mt-3`}
                >
                  {mintedNFT.rarity}
                </div>
              </div>
            </div>
          )}

          {txHash && (
            <div className="flex justify-center gap-3 mb-6">
              <a
                href={getTxUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink size={16} />
                View Transaction
              </a>
            </div>
          )}

          <button
            onClick={() => {
              setMintedNFTId(null);
              clearError();
            }}
            className="btn-secondary"
          >
            Continue Minting
          </button>
        </div>
      </div>
    );
  }

  // Main minting interface
  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        {/* Header information */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-6">
            {/* <Image
              src={DMA_BRANDING.assets.dirkHorn}
              alt="Dirk Horn"
              width={40}
              height={40}
              className="dirk-horn-glow"
            /> */}
            <h2 className="text-3xl font-bold text-gradient">
              Limited-Edition NFT Mint
            </h2>
            {/* <Image
              src={DMA_BRANDING.assets.noirBadge}
              alt="Noir Badge"
              width={40}
              height={40}
              className="noir-badge-effect"
            /> */}
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto mb-4">
            Select your favorite NFT from DMA Studio Genesis Collection. Each
            design is limited to 3 copies, with 1 copy per person.
          </p>

          {/* Overall statistics */}
          <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
            <div className="text-sm text-gray-600">Contract Statistics</div>
            <div className="text-2xl font-bold text-gray-800">
              {totalSupply} / 12
            </div>
            <div className="text-xs text-gray-500">Minted / Total Supply</div>
          </div>
        </div>

        {/* NFT grid selection */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {PRESET_NFTS.map((nft) => {
            const supplyInfo = allNFTSupplyInfo.find(
              (info) => info.nftId === nft.id
            );
            const userRemaining = userMintInfo[nft.id] || 0;
            const isSelected = selectedNFT?.id === nft.id;
            const isSoldOut = supplyInfo?.remainingSupply === 0;
            const userAlreadyMinted = userRemaining === 0;
            const isAvailable =
              !isSoldOut && !userAlreadyMinted && supplyInfo?.isActive;

            return (
              <div
                key={nft.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "ring-4 ring-black ring-opacity-50"
                    : "hover:scale-105"
                } ${!isAvailable ? "opacity-60" : ""}`}
                onClick={() => isAvailable && setSelectedNFT(nft)}
              >
                <div className={`card ${isSelected ? "bg-gray-50" : ""}`}>
                  {/* Rarity glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(
                      nft.rarity
                    )} opacity-10 rounded-2xl`}
                  ></div>

                  <div className="relative">
                    <img
                      src={getIPFSUrl(nft.imageUrl)}
                      alt={nft.name}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />

                    {/* Status label */}
                    <div className="absolute top-2 right-2">
                      {isSoldOut ? (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Sold Out
                        </div>
                      ) : userAlreadyMinted ? (
                        <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Owned
                        </div>
                      ) : (
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(
                            nft.rarity
                          )}`}
                        >
                          {nft.rarity}
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg font-bold mb-2">{nft.name}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {nft.description}
                    </p>

                    {/* Supply information */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Remaining:</span>
                        <span className="font-medium">
                          {supplyInfo?.remainingSupply || 0} / {nft.maxSupply}
                        </span>
                      </div>

                      {userRemaining > 0 ? (
                        <div className="text-green-600 font-medium">
                          ✓ You can mint this NFT
                        </div>
                      ) : (
                        <div className="text-blue-600 font-medium">
                          ✓ You already own this NFT
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <div className="mt-3 text-center">
                        <div className="inline-flex items-center gap-1 text-black font-medium text-sm">
                          <Crown className="w-4 h-4" />
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minting area */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="max-w-2xl mx-auto">
            {/* Selected NFT preview */}
            {selectedNFT && (
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Ready to Mint:{" "}
                  <span className="text-gradient">{selectedNFT.name}</span>
                </h3>
                <div className="text-sm text-gray-600 mb-4">
                  {selectedNFT.description}
                </div>

                {/* Detailed status of selected NFT */}
                {(() => {
                  const supplyInfo = allNFTSupplyInfo.find(
                    (info) => info.nftId === selectedNFT.id
                  );
                  const userRemaining = userMintInfo[selectedNFT.id] || 0;
                  const isSoldOut = supplyInfo?.remainingSupply === 0;
                  const userAlreadyMinted = userRemaining === 0;

                  return (
                    <div className="bg-white rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {supplyInfo?.remainingSupply || 0}
                          </div>
                          <div className="text-gray-500">Remaining Supply</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {supplyInfo?.currentSupply || 0}
                          </div>
                          <div className="text-gray-500">Already Minted</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {userRemaining}
                          </div>
                          <div className="text-gray-500">Your Remaining</div>
                        </div>
                      </div>

                      {isSoldOut && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-800">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">
                              This NFT is sold out
                            </span>
                          </div>
                        </div>
                      )}

                      {userAlreadyMinted && !isSoldOut && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 text-blue-800">
                            <Package className="w-4 h-4" />
                            <span className="font-medium">
                              You already own this NFT (1 per person limit)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-800 font-medium">
                    Minting Failed
                  </span>
                </div>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            )}

            {/* Transaction in progress */}
            {(isLoading || isConfirming) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                  <div>
                    <div className="text-blue-800 font-medium">
                      {isLoading
                        ? "Preparing Transaction..."
                        : "Waiting for Block Confirmation..."}
                    </div>
                    {txHash && (
                      <div className="text-blue-600 text-sm">
                        Transaction Hash: {txHash.slice(0, 10)}...
                        {txHash.slice(-8)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mint Button */}
            {(() => {
              const supplyInfo = allNFTSupplyInfo.find(
                (info) => info.nftId === selectedNFT?.id
              );
              const userRemaining = selectedNFT
                ? userMintInfo[selectedNFT.id] || 0
                : 0;
              const isSoldOut = supplyInfo?.remainingSupply === 0;
              const userAlreadyMinted = userRemaining === 0;
              const canMint =
                selectedNFT &&
                !isSoldOut &&
                !userAlreadyMinted &&
                !isLoading &&
                !isConfirming;

              return (
                <button
                  onClick={handleMint}
                  disabled={!canMint}
                  className="w-full btn-dma-primary py-4 text-lg font-semibold border bg-gradient-to-r from-black to-gray-800 text-white  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      Signing Transaction...
                    </div>
                  ) : isConfirming ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      Confirming...
                    </div>
                  ) : !selectedNFT ? (
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Please Select an NFT
                    </div>
                  ) : isSoldOut ? (
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      This NFT is Sold Out
                    </div>
                  ) : userAlreadyMinted ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      You Already Own This NFT
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 ">
                      <Crown className="w-5 h-5" />
                      Click to Mint {selectedNFT.name}
                    </div>
                  )}
                </button>
              );
            })()}

            {/* Tips Information */}
            <div className="text-center text-sm text-gray-500 space-y-1 mt-6">
              <p>🎨 Limited-edition NFT artworks stored on real IPFS</p>
              <p>⭐ Each design is limited to 3 copies, max 1 per person</p>
              <p>⛽ Only small gas fees required (test network)</p>
              <p>🔒 Each NFT has unique metadata and attributes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
