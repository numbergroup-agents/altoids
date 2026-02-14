'use client';

import { useAccount, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

const erc20Abi = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
]);

export function useTokenGate() {
  const { address, isConnected } = useAccount();
  const tokenAddress = process.env.NEXT_PUBLIC_MINT_TOKEN_ADDRESS as `0x${string}`;

  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
        enabled: !!address && !!tokenAddress,
    }
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
        enabled: !!tokenAddress,
    }
  });

  const formattedBalance = balance && decimals ? Number(balance) / 10 ** decimals : 0;

  const tier = formattedBalance >= 10 ? 2 : formattedBalance >= 1 ? 1 : 0;

  return {
    isConnected,
    balance: formattedBalance,
    tier,
    isTokenConfigured: !!tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000',
  };
}
