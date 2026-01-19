"use client";

import { MOCK_BALANCES, getTotalBalance, getChainColor } from "@/data/mockData";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function OmniBalance() {
  const totalBalance = getTotalBalance();

  return (
    <div className="w-full">
      {/* Total Balance Card */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 shadow-xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-zinc-400">
          Omni Balance
        </p>
        <h1 className="text-5xl font-bold text-white">
          {formatCurrency(totalBalance)}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Across {MOCK_BALANCES.length} positions on {new Set(MOCK_BALANCES.map(b => b.chain)).size} chains
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <h2 className="mb-4 text-lg font-semibold text-zinc-300">
          Balance Breakdown
        </h2>
        {MOCK_BALANCES.map((wallet) => (
          <div
            key={wallet.id}
            className="flex items-center justify-between rounded-xl bg-zinc-800/50 p-4 transition-all hover:bg-zinc-800"
          >
            <div className="flex items-center gap-4">
              {/* Token Icon */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: wallet.color }}
              >
                {wallet.tokenSymbol.slice(0, 2)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {wallet.tokenSymbol}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${getChainColor(wallet.chainId)}20`,
                      color: getChainColor(wallet.chainId),
                    }}
                  >
                    {wallet.chain}
                  </span>
                </div>
                <p className="text-sm text-zinc-500">
                  {truncateAddress(wallet.walletAddress)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-white">
                {formatCurrency(wallet.balance)}
              </p>
              <p className="text-sm text-zinc-500">
                {wallet.balance.toLocaleString()} {wallet.tokenSymbol}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
