"use client";

import { useState } from "react";
import {
  getBalancesForCustomer,
  getTotalBalance,
  getChainColor,
  MOCK_CUSTOMERS,
  MOCK_BALANCES,
} from "@/data/mockData";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface OmniBalanceProps {
  customerId: string | null;
}

export default function OmniBalance({ customerId }: OmniBalanceProps) {
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);

  const balances = getBalancesForCustomer(customerId);
  const totalBalance = getTotalBalance(customerId);
  const uniqueChains = new Set(balances.map((b) => b.chain)).size;

  // Calculate token breakdowns
  const usdcTotal = balances
    .filter((b) => b.tokenSymbol === "USDC")
    .reduce((sum, b) => sum + b.balance, 0);
  const usdtTotal = balances
    .filter((b) => b.tokenSymbol === "USDT")
    .reduce((sum, b) => sum + b.balance, 0);
  const otherTotal = balances
    .filter((b) => b.tokenSymbol !== "USDC" && b.tokenSymbol !== "USDT")
    .reduce((sum, b) => sum + b.balance, 0);

  // For aggregate view, show customer breakdown
  const isAggregateView = !customerId;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          {isAggregateView ? "Platform Overview" : "Account Overview"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {isAggregateView
            ? "Aggregated balance across all customer accounts"
            : "View account treasury balance"}
        </p>
      </div>

      {/* Balance Card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              {isAggregateView ? "Total Platform Balance" : "Total Balance"}
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {formatCurrency(totalBalance)}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {isAggregateView
                ? `Across ${MOCK_CUSTOMERS.length} customers and ${MOCK_BALANCES.length} accounts`
                : `Across ${balances.length} accounts on ${uniqueChains} networks`}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
              Export
            </button>
            {!isAggregateView && (
              <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
                Add Funds
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-500">USDC Holdings</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {formatCurrency(usdcTotal)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-500">USDT Holdings</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {formatCurrency(usdtTotal)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-500">Other Stablecoins</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {formatCurrency(otherTotal)}
          </p>
        </div>
      </div>

      {/* Customer Breakdown (Aggregate View Only) */}
      {isAggregateView && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="border-b border-zinc-800 p-5">
            <h2 className="text-sm font-semibold text-white">
              Customer Breakdown
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Balance by customer account
            </p>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {MOCK_CUSTOMERS.map((customer) => {
              const customerBalance = getTotalBalance(customer.id);
              const customerBalances = getBalancesForCustomer(customer.id);
              return (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-zinc-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                      <span className="text-xs font-semibold text-white">
                        {customer.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{customer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span
                          className={`rounded px-1.5 py-0.5 capitalize ${
                            customer.type === "fintech"
                              ? "bg-purple-500/10 text-purple-400"
                              : customer.type === "exchange"
                              ? "bg-amber-500/10 text-amber-400"
                              : customer.type === "neobank"
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "bg-zinc-500/10 text-zinc-400"
                          }`}
                        >
                          {customer.type}
                        </span>
                        <span>•</span>
                        <span>{customerBalances.length} accounts</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(customerBalance)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Account Breakdown - Collapsible (Customer-specific view) */}
      {!isAggregateView && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <button
            onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-zinc-800/30"
          >
            <div>
              <h2 className="text-sm font-semibold text-white">
                Account Breakdown
              </h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                {balances.length} accounts across {uniqueChains} networks
              </p>
            </div>
            <svg
              className={`h-5 w-5 text-zinc-500 transition-transform ${
                isBreakdownExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isBreakdownExpanded && (
            <div className="border-t border-zinc-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    <th className="px-5 py-3">Asset</th>
                    <th className="px-5 py-3">Network</th>
                    <th className="px-5 py-3">Account</th>
                    <th className="px-5 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {balances.map((wallet) => (
                    <tr
                      key={wallet.id}
                      className="transition-colors hover:bg-zinc-800/30"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: wallet.color }}
                          >
                            {wallet.tokenSymbol.slice(0, 2)}
                          </div>
                          <span className="font-medium text-white">
                            {wallet.tokenSymbol}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: `${getChainColor(wallet.chainId)}15`,
                            color: getChainColor(wallet.chainId),
                          }}
                        >
                          {wallet.chain}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm text-zinc-400">
                          {truncateAddress(wallet.walletAddress)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-medium text-white">
                          {formatCurrency(wallet.balance)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
