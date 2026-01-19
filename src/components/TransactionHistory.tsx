"use client";

import { useState } from "react";
import {
  Transaction,
  getChainColor,
  getTokenColor,
  getTransactionsForCustomer,
} from "@/data/mockData";

interface TransactionHistoryProps {
  customerId: string | null;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

function TransactionDetailModal({
  transaction,
  onClose,
}: TransactionDetailModalProps) {
  const isOutgoing = transaction.type === "send";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Transaction Details
            </h2>
            <p className="mt-1 text-sm text-zinc-500">{transaction.reference}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Transaction Summary */}
          <div className="mb-6 flex items-center justify-between rounded-xl bg-zinc-800/50 p-4">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  isOutgoing ? "bg-red-500/10" : "bg-green-500/10"
                }`}
              >
                <svg
                  className={`h-6 w-6 ${
                    isOutgoing ? "text-red-500" : "text-green-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isOutgoing
                        ? "M7 11l5-5m0 0l5 5m-5-5v12"
                        : "M17 13l-5 5m0 0l-5-5m5 5V6"
                    }
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">
                  {isOutgoing ? "-" : "+"}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-zinc-500">
                  {formatDate(transaction.timestamp)} at{" "}
                  {formatTime(transaction.timestamp)}
                </p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                transaction.status === "completed"
                  ? "bg-green-500/10 text-green-500"
                  : transaction.status === "pending"
                  ? "bg-amber-500/10 text-amber-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
            </span>
          </div>

          {/* Flow Visualization - Only for outgoing transactions with sources */}
          {isOutgoing && transaction.sources.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-semibold text-zinc-400">
                Fund Flow
              </h3>
              <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-center justify-between">
                  {/* Source Wallets */}
                  <div className="flex flex-col gap-3">
                    {transaction.sources.map((source, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                      >
                        {/* Wallet Icon */}
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: `${getChainColor(source.chainId)}20`,
                          }}
                        >
                          <svg
                            className="h-5 w-5"
                            style={{ color: getChainColor(source.chainId) }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-semibold"
                              style={{ color: getTokenColor(source.token) }}
                            >
                              {formatCurrency(source.amount)} {source.token}
                            </span>
                            {source.convertedTo && (
                              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
                                → {source.convertedTo}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span
                              className="rounded px-1.5 py-0.5"
                              style={{
                                backgroundColor: `${getChainColor(source.chainId)}15`,
                                color: getChainColor(source.chainId),
                              }}
                            >
                              {source.chain}
                            </span>
                            <span className="font-mono">
                              {truncateAddress(source.walletAddress)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Left Arrows - Sources to TBMC */}
                  <div className="relative flex-shrink-0 w-16">
                    <svg
                      className="h-full w-full"
                      style={{ minHeight: `${Math.max(transaction.sources.length * 60, 80)}px` }}
                      viewBox="0 0 60 100"
                      preserveAspectRatio="none"
                    >
                      {transaction.sources.map((_, idx) => {
                        const totalSources = transaction.sources.length;
                        const startY =
                          totalSources === 1
                            ? 50
                            : 20 + (idx * 60) / (totalSources - 1 || 1);
                        return (
                          <g key={idx}>
                            <path
                              d={`M 0 ${startY} Q 30 ${startY}, 60 50`}
                              fill="none"
                              stroke="url(#flowGradientLeft)"
                              strokeWidth="2"
                              strokeDasharray="6 3"
                              className="animate-dash"
                            />
                          </g>
                        );
                      })}
                      <defs>
                        <linearGradient
                          id="flowGradientLeft"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* TBMC Clearinghouse - Center */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-blue-500/30 bg-gradient-to-b from-blue-950/50 to-zinc-900 p-4 shadow-lg shadow-blue-500/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 ring-2 ring-blue-500/30">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 text-sm font-bold text-blue-400">TBMC</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                      Clearinghouse
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      <span className="text-[10px] text-green-500">Processing</span>
                    </div>
                  </div>

                  {/* Right Arrow - TBMC to Destination */}
                  <div className="relative flex-shrink-0 w-16">
                    <svg
                      className="h-full w-full"
                      style={{ minHeight: `${Math.max(transaction.sources.length * 60, 80)}px` }}
                      viewBox="0 0 60 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 50 L 50 50"
                        fill="none"
                        stroke="url(#flowGradientRight)"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                        className="animate-dash"
                      />
                      <polygon
                        points="45,45 55,50 45,55"
                        fill="#3b82f6"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient
                          id="flowGradientRight"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Destination */}
                  <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${getChainColor(transaction.destinationChainId)}20`,
                      }}
                    >
                      <svg
                        className="h-7 w-7"
                        style={{
                          color: getChainColor(transaction.destinationChainId),
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p
                        className="text-lg font-semibold"
                        style={{
                          color: getTokenColor(transaction.destinationToken),
                        }}
                      >
                        {formatCurrency(transaction.amount)}{" "}
                        {transaction.destinationToken}
                      </p>
                      <span
                        className="mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${getChainColor(transaction.destinationChainId)}15`,
                          color: getChainColor(transaction.destinationChainId),
                        }}
                      >
                        {transaction.destinationChain}
                      </span>
                      <p className="mt-1 font-mono text-xs text-zinc-500">
                        {truncateAddress(transaction.recipientAddress)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {isOutgoing ? "Recipient" : "Sender"}
              </p>
              <p className="mt-1 font-mono text-sm text-white">
                {isOutgoing
                  ? transaction.recipientAddress
                  : transaction.senderAddress}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Destination
              </p>
              <p className="mt-1 text-sm text-white">
                {transaction.destinationToken} on {transaction.destinationChain}
              </p>
            </div>
            {transaction.memo && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4 sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Memo
                </p>
                <p className="mt-1 text-sm text-white">{transaction.memo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-zinc-700 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function TransactionHistory({ customerId }: TransactionHistoryProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [filter, setFilter] = useState<"all" | "send" | "receive">("all");

  const transactions = getTransactionsForCustomer(customerId);
  const isAggregateView = !customerId;

  const filteredTransactions = transactions.filter((txn) => {
    if (filter === "all") return true;
    return txn.type === filter;
  }).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const totalSent = transactions.filter((t) => t.type === "send").reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const totalReceived = transactions.filter(
    (t) => t.type === "receive"
  ).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          {isAggregateView ? "All Transactions" : "Account Transactions"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {isAggregateView
            ? "View all incoming and outgoing transfers across all accounts"
            : "View incoming and outgoing transfers for this account"}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-500">Total Sent</p>
          <p className="mt-1 text-xl font-semibold text-red-400">
            -{formatCurrency(totalSent)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-500">Total Received</p>
          <p className="mt-1 text-xl font-semibold text-green-400">
            +{formatCurrency(totalReceived)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-500">Net Flow</p>
          <p
            className={`mt-1 text-xl font-semibold ${
              totalReceived - totalSent >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {totalReceived - totalSent >= 0 ? "+" : ""}
            {formatCurrency(totalReceived - totalSent)}
          </p>
        </div>
      </div>

      {/* Filter & Transaction List */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        {/* Filter Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div className="flex gap-2">
            {(["all", "send", "receive"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {f === "all" ? "All" : f === "send" ? "Sent" : "Received"}
              </button>
            ))}
          </div>
          <p className="text-sm text-zinc-500">
            {filteredTransactions.length} transaction
            {filteredTransactions.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-zinc-800/50">
          {filteredTransactions.map((txn) => (
            <button
              key={txn.id}
              onClick={() => setSelectedTransaction(txn)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-zinc-800/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    txn.type === "send" ? "bg-red-500/10" : "bg-green-500/10"
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${
                      txn.type === "send" ? "text-red-500" : "text-green-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        txn.type === "send"
                          ? "M7 11l5-5m0 0l5 5m-5-5v12"
                          : "M17 13l-5 5m0 0l-5-5m5 5V6"
                      }
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {txn.memo || txn.reference}
                    </span>
                    {txn.status === "pending" && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500">
                    <span>{formatDate(txn.timestamp)}</span>
                    <span>•</span>
                    <span
                      className="rounded px-1.5 py-0.5"
                      style={{
                        backgroundColor: `${getChainColor(txn.destinationChainId)}15`,
                        color: getChainColor(txn.destinationChainId),
                      }}
                    >
                      {txn.destinationChain}
                    </span>
                    {txn.type === "send" && txn.sources.length > 1 && (
                      <>
                        <span>•</span>
                        <span className="text-zinc-400">
                          {txn.sources.length} sources
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-lg font-semibold ${
                    txn.type === "send" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {txn.type === "send" ? "-" : "+"}
                  {formatCurrency(txn.amount)}
                </span>
                <svg
                  className="h-5 w-5 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
