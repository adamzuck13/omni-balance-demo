"use client";

import { useState } from "react";
import OmniBalance from "@/components/OmniBalance";
import OmniSend from "@/components/OmniSend";

type Tab = "balance" | "send";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("balance");

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Omni Wallet</h1>
              <p className="text-xs text-zinc-500">
                Unified stablecoin management
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-zinc-800">
        <div className="mx-auto max-w-2xl px-4">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab("balance")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "balance"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Balance
            </button>
            <button
              onClick={() => setActiveTab("send")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "send"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Send
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {activeTab === "balance" ? <OmniBalance /> : <OmniSend />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-center text-xs text-zinc-600">
            Demo UI - No real blockchain connections
          </p>
        </div>
      </footer>
    </div>
  );
}
