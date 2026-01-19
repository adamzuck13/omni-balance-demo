"use client";

import { useState } from "react";
import {
  MOCK_BALANCES,
  CHAINS,
  TOKENS,
  getTotalBalance,
  getChainColor,
  getTokenColor,
} from "@/data/mockData";

interface SendFormData {
  amount: string;
  destinationToken: string;
  destinationChain: string;
  recipientAddress: string;
}

interface FundSource {
  token: string;
  chain: string;
  amount: number;
  needsConversion: boolean;
  convertTo?: string;
}

type SendStep = "form" | "preview" | "success";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const calculateFundSources = (
  amount: number,
  destinationToken: string
): FundSource[] => {
  const sources: FundSource[] = [];
  let remainingAmount = amount;

  // Sort balances by amount (largest first) to simulate optimal fulfillment
  const sortedBalances = [...MOCK_BALANCES].sort(
    (a, b) => b.balance - a.balance
  );

  for (const wallet of sortedBalances) {
    if (remainingAmount <= 0) break;

    const amountFromWallet = Math.min(wallet.balance, remainingAmount);
    if (amountFromWallet > 0) {
      sources.push({
        token: wallet.tokenSymbol,
        chain: wallet.chain,
        amount: amountFromWallet,
        needsConversion: wallet.tokenSymbol !== destinationToken,
        convertTo:
          wallet.tokenSymbol !== destinationToken
            ? destinationToken
            : undefined,
      });
      remainingAmount -= amountFromWallet;
    }
  }

  return sources;
};

export default function OmniSend() {
  const [step, setStep] = useState<SendStep>("form");
  const [formData, setFormData] = useState<SendFormData>({
    amount: "",
    destinationToken: "USDC",
    destinationChain: "ethereum",
    recipientAddress: "",
  });
  const [fundSources, setFundSources] = useState<FundSource[]>([]);

  const totalBalance = getTotalBalance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) return;

    const sources = calculateFundSources(amount, formData.destinationToken);
    setFundSources(sources);
    setStep("preview");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  const handleReset = () => {
    setStep("form");
    setFormData({
      amount: "",
      destinationToken: "USDC",
      destinationChain: "ethereum",
      recipientAddress: "",
    });
    setFundSources([]);
  };

  const amount = parseFloat(formData.amount) || 0;
  const isValidAmount = amount > 0 && amount <= totalBalance;

  if (step === "success") {
    return (
      <div className="w-full">
        <div className="rounded-2xl bg-zinc-800/50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Transaction Submitted!
          </h2>
          <p className="mb-6 text-zinc-400">
            Your omni-send of {formatCurrency(amount)} is being processed.
          </p>
          <div className="mb-6 rounded-xl bg-zinc-900 p-4 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Amount</span>
              <span className="text-white">{formatCurrency(amount)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Destination</span>
              <span className="text-white">
                {formData.destinationToken} on{" "}
                {CHAINS.find((c) => c.id === formData.destinationChain)?.name}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Recipient</span>
              <span className="font-mono text-white">
                {formData.recipientAddress.slice(0, 10)}...
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Estimated Time</span>
              <span className="text-white">~2-5 minutes</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-full rounded-xl bg-zinc-700 py-3 font-semibold text-white transition-colors hover:bg-zinc-600"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  if (step === "preview") {
    const totalSourced = fundSources.reduce((sum, s) => sum + s.amount, 0);
    const conversionsNeeded = fundSources.filter((s) => s.needsConversion);

    return (
      <div className="w-full">
        <div className="rounded-2xl bg-zinc-800/50 p-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            Transaction Preview
          </h2>

          {/* Summary */}
          <div className="mb-6 rounded-xl bg-zinc-900 p-4">
            <div className="flex justify-between">
              <span className="text-zinc-500">Sending</span>
              <span className="text-xl font-bold text-white">
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">As</span>
              <span
                className="font-semibold"
                style={{ color: getTokenColor(formData.destinationToken) }}
              >
                {formData.destinationToken}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">On</span>
              <span
                className="font-semibold"
                style={{ color: getChainColor(formData.destinationChain) }}
              >
                {CHAINS.find((c) => c.id === formData.destinationChain)?.name}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">To</span>
              <span className="font-mono text-white">
                {formData.recipientAddress.slice(0, 14)}...
              </span>
            </div>
          </div>

          {/* Fund Sources */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Fulfillment Plan
            </h3>
            <div className="space-y-2">
              {fundSources.map((source, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-zinc-900 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: getTokenColor(source.token) }}
                    >
                      {source.token.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {formatCurrency(source.amount)} {source.token}
                      </p>
                      <p className="text-xs text-zinc-500">from {source.chain}</p>
                    </div>
                  </div>
                  {source.needsConversion && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-zinc-500">→</span>
                      <span
                        className="rounded-full px-2 py-0.5 font-medium"
                        style={{
                          backgroundColor: `${getTokenColor(source.convertTo!)}20`,
                          color: getTokenColor(source.convertTo!),
                        }}
                      >
                        {source.convertTo}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conversions Notice */}
          {conversionsNeeded.length > 0 && (
            <div className="mb-6 rounded-xl bg-amber-500/10 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-500">
                    {conversionsNeeded.length} conversion
                    {conversionsNeeded.length > 1 ? "s" : ""} required
                  </p>
                  <p className="mt-1 text-xs text-amber-500/70">
                    Some funds will be automatically converted to{" "}
                    {formData.destinationToken}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Final Amount */}
          <div className="mb-6 rounded-xl bg-green-500/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-500">
                Amount arriving at destination
              </span>
              <span className="text-lg font-bold text-green-500">
                {formatCurrency(totalSourced)} {formData.destinationToken}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep("form")}
              className="flex-1 rounded-xl border border-zinc-700 py-3 font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500"
            >
              Confirm Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-zinc-800/50 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Omni Send</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Amount Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-zinc-500">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                max={totalBalance}
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="0.00"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-4 pl-10 pr-4 text-xl font-semibold text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Available: {formatCurrency(totalBalance)}
            </p>
          </div>

          {/* Destination Token */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Destination Token
            </label>
            <select
              value={formData.destinationToken}
              onChange={(e) =>
                setFormData({ ...formData, destinationToken: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {TOKENS.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol} - {token.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Chain */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Destination Chain
            </label>
            <select
              value={formData.destinationChain}
              onChange={(e) =>
                setFormData({ ...formData, destinationChain: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {CHAINS.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Recipient Address
            </label>
            <input
              type="text"
              value={formData.recipientAddress}
              onChange={(e) =>
                setFormData({ ...formData, recipientAddress: e.target.value })
              }
              placeholder="0x..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 px-4 font-mono text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValidAmount || !formData.recipientAddress}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-purple-600"
          >
            Preview Send
          </button>
        </form>
      </div>
    </div>
  );
}
