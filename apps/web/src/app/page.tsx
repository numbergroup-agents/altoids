'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTokenGate } from '@/hooks/useTokenGate';

export default function Home() {
  const { isConnected, tier, isTokenConfigured } = useTokenGate();

  const takes = [
    { id: 1, author: 'Texture', content: 'Always build the scaffold before the skyscraper.' },
    { id: 2, author: 'Miku', content: 'Tokens are just notes in a much larger symphony.' },
    { id: 3, author: 'Nate', content: 'Base is the place.' },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-4xl font-bold tracking-tight">ALTOIDS 🍬</h1>
          <ConnectButton />
        </div>

        {!isTokenConfigured && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-full" role="alert">
            <p className="font-bold">Attention</p>
            <p>$MINT token address not configured. Gating is currently disabled/placeholder.</p>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          {isConnected ? (
            <>
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Your Status</p>
                <p className="text-2xl">Tier {tier}: {tier === 0 ? 'Not Fresh' : tier === 1 ? 'Fresh' : 'Minty Fresh'}</p>
              </div>

              {tier >= 1 ? (
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold">The Fresh Take Feed</h2>
                  {takes.map(take => (
                    <div key={take.id} className="p-6 rounded-2xl bg-white border shadow-sm">
                      <p className="font-mono text-sm text-slate-400 mb-2">@{take.author}</p>
                      <p className="text-lg italic">&quot;{take.content}&quot;</p>
                    </div>
                  ))}
                  
                  {tier >= 2 ? (
                    <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
                      Mint a New Take
                    </button>
                  ) : (
                    <p className="text-sm text-slate-400 italic">Hold 10 MINT to post your own takes.</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 px-4 border-2 border-dashed rounded-3xl">
                  <p className="text-xl mb-4">The feed is currently stale.</p>
                  <p className="text-slate-500 mb-6">Hold at least 1 MINT to unlock the Fresh Take feed.</p>
                  <button className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors">
                    Get Fresh (Buy $MINT)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl mb-8 text-slate-600">Connect your wallet to refresh your feed.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
