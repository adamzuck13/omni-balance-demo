"use client";

import { useState } from "react";
import {
  CHAINS,
  TOKENS,
  getTotalBalance,
  getBalancesForCustomer,
  getChainColor,
  getTokenColor,
} from "@/data/mockData";

interface OmniSendProps {
  customerId: string;
  customerName: string;
}

interface SendFormData {
  amount: string;
  destinationToken: string;
  destinationChain: string;
  recipientAddress: string;
  memo: string;
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
  destinationToken: string,
  customerId: string
): FundSource[] => {
  const sources: FundSource[] = [];
  let remainingAmount = amount;

  const customerBalances = getBalancesForCustomer(customerId);
  const sortedBalances = [...customerBalances].sort(
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

export default function OmniSend({ customerId, customerName }: OmniSendProps) {
  const [step, setStep] = useState<SendStep>("form");
  const [formData, setFormData] = useState<SendFormData>({
    amount: "",
    destinationToken: "USDC",
    destinationChain: "ethereum",
    recipientAddress: "",
    memo: "",
  });
  const [fundSources, setFundSources] = useState<FundSource[]>([]);

  const totalBalance = getTotalBalance(customerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) return;

    const sources = calculateFundSources(amount, formData.destinationToken, customerId);
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
      memo: "",
    });
    setFundSources([]);
  };

  const amount = parseFloat(formData.amount) || 0;
  const isValidAmount = amount > 0 && amount <= totalBalance;

  if (step === "success") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Send Funds</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Sending on behalf of <span className="font-medium text-white">{customerName}</span>
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg
                className="h-6 w-6 text-green-500"
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
            <h2 className="text-xl font-semibold text-white">
              Transfer Initiated
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Your transfer of {formatCurrency(amount)} has been submitted for
              processing.
            </p>

            <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Sending Account</span>
                  <span className="font-medium text-white">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Amount</span>
                  <span className="font-medium text-white">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination</span>
                  <span className="font-medium text-white">
                    {formData.destinationToken} on{" "}
                    {CHAINS.find((c) => c.id === formData.destinationChain)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Recipient</span>
                  <span className="font-mono text-white">
                    {formData.recipientAddress.slice(0, 12)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Reference</span>
                  <span className="font-mono text-white">TXN-2024-0847</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              New Transfer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "preview") {
    const totalSourced = fundSources.reduce((sum, s) => sum + s.amount, 0);
    const conversionsNeeded = fundSources.filter((s) => s.needsConversion);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Send Funds</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Review and confirm transfer for <span className="font-medium text-white">{customerName}</span>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Transfer Summary */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-sm font-semibold text-white">
              Transfer Summary
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-sm text-zinc-500">Amount</span>
                <span className="text-2xl font-semibold text-white">
                  {formatCurrency(amount)}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination Asset</span>
                  <span
                    className="font-medium"
                    style={{ color: getTokenColor(formData.destinationToken) }}
                  >
                    {formData.destinationToken}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination Network</span>
                  <span
                    className="font-medium"
                    style={{ color: getChainColor(formData.destinationChain) }}
                  >
                    {CHAINS.find((c) => c.id === formData.destinationChain)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Recipient</span>
                  <span className="font-mono text-white">
                    {formData.recipientAddress.slice(0, 16)}...
                  </span>
                </div>
                {formData.memo && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Memo</span>
                    <span className="text-white">{formData.memo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Funding Plan */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-sm font-semibold text-white">Funding Plan</h2>
            <p className="mt-1 text-xs text-zinc-500">
              How this transfer will be fulfilled
            </p>

            <div className="mt-4 space-y-2">
              {fundSources.map((source, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: getTokenColor(source.token) }}
                    >
                      {source.token.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {formatCurrency(source.amount)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {source.token} on {source.chain}
                      </p>
                    </div>
                  </div>
                  {source.needsConversion && (
                    <span
                      className="rounded-md px-2 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${getTokenColor(source.convertTo!)}15`,
                        color: getTokenColor(source.convertTo!),
                      }}
                    >
                      → {source.convertTo}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {conversionsNeeded.length > 0 && (
              <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
                <p className="text-xs text-amber-500">
                  {conversionsNeeded.length} asset conversion
                  {conversionsNeeded.length > 1 ? "s" : ""} will be performed
                  automatically
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between rounded-lg bg-green-500/5 border border-green-500/20 p-3">
              <span className="text-xs text-green-500">Amount to arrive</span>
              <span className="text-sm font-semibold text-green-500">
                {formatCurrency(totalSourced)} {formData.destinationToken}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setStep("form")}
            className="flex-1 rounded-lg border border-zinc-700 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-lg bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Send Funds</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Sending on behalf of <span className="font-medium text-white">{customerName}</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <div className="space-y-5">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-zinc-400">
                  Amount
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-500">
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
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-lg font-medium text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  />
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  Available: {formatCurrency(totalBalance)}
                </p>
              </div>

              {/* Destination Token & Chain */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-400">
                    Destination Asset
                  </label>
                  <select
                    value={formData.destinationToken}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destinationToken: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 py-3 px-4 text-white focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  >
                    {TOKENS.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400">
                    Destination Network
                  </label>
                  <select
                    value={formData.destinationChain}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destinationChain: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 py-3 px-4 text-white focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  >
                    {CHAINS.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-zinc-400">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={formData.recipientAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipientAddress: e.target.value,
                    })
                  }
                  placeholder="0x..."
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 py-3 px-4 font-mono text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              {/* Memo */}
              <div>
                <label className="block text-sm font-medium text-zinc-400">
                  Memo{" "}
                  <span className="font-normal text-zinc-600">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.memo}
                  onChange={(e) =>
                    setFormData({ ...formData, memo: e.target.value })
                  }
                  placeholder="Payment for invoice #1234"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 py-3 px-4 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValidAmount || !formData.recipientAddress}
                className="w-full rounded-lg bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
              >
                Review Transfer
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-sm font-semibold text-white">How it works</h3>
            <ul className="mt-3 space-y-2 text-xs text-zinc-500">
              <li className="flex gap-2">
                <span className="text-zinc-400">1.</span>
                Enter the amount and destination
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400">2.</span>
                We automatically select optimal funding sources
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400">3.</span>
                Review the funding plan and confirm
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400">4.</span>
                Funds arrive at the destination
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-sm font-semibold text-white">
              {customerName}&apos;s Balance
            </h3>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatCurrency(totalBalance)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Available across all networks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
