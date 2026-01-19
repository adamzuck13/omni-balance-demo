"use client";

import { useState, useRef, useEffect } from "react";
import OmniBalance from "@/components/OmniBalance";
import OmniSend from "@/components/OmniSend";
import TransactionHistory from "@/components/TransactionHistory";
import { MOCK_CUSTOMERS, Customer } from "@/data/mockData";

type Tab = "overview" | "transactions" | "send";
type SearchType = "account" | "wallet" | "transaction";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchType, setSearchType] = useState<SearchType>("account");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchPlaceholders: Record<SearchType, string> = {
    account: "Select a customer account...",
    wallet: "Search by wallet address (0x...)...",
    transaction: "Search by transaction ID or reference...",
  };

  // Filter customers based on search query
  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search type change
  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    setSearchQuery("");
    if (type === "account") {
      setIsAccountDropdownOpen(true);
    } else {
      setIsAccountDropdownOpen(false);
    }
  };

  // Handle customer selection
  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(customer.name);
    setIsAccountDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top Admin Bar */}
      <div className="border-b border-zinc-800/50 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="font-medium text-zinc-400">Admin Dashboard</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">Environment: Demo</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">
                Powered by{" "}
                <span className="font-medium text-blue-400">TBMC</span>{" "}
                Clearinghouse
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500">Last sync: 2 mins ago</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="text-green-500">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-zinc-800/50 bg-[#0f0f0f]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  Stablecoin Sender Corp
                </h1>
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Treasury Management Portal
                </p>
              </div>
            </div>

            {/* Admin User */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Sarah Chen</p>
                <p className="text-xs text-zinc-500">Treasury Admin</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center ring-2 ring-emerald-600/30">
                <span className="text-xs font-semibold text-white">SC</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="border-b border-zinc-800/50 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Search Type Selector */}
            <div className="flex rounded-lg border border-zinc-700 bg-zinc-800/50 p-1">
              {(["account", "wallet", "transaction"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleSearchTypeChange(type)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    searchType === type
                      ? "bg-zinc-700 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Input with Dropdown */}
            <div className="relative flex-1" ref={searchInputRef}>
              <svg
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (searchType === "account") {
                    setIsAccountDropdownOpen(true);
                  }
                }}
                onFocus={() => {
                  if (searchType === "account") {
                    setIsAccountDropdownOpen(true);
                  }
                }}
                placeholder={searchPlaceholders[searchType]}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              {/* Account Dropdown */}
              {searchType === "account" && isAccountDropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
                  <div className="border-b border-zinc-800 p-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Select Customer Account
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <button
                          key={customer.id}
                          onClick={() => handleCustomerSelect(customer)}
                          className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                            selectedCustomer?.id === customer.id
                              ? "bg-emerald-500/10"
                              : "hover:bg-zinc-800"
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                            <span className="text-xs font-semibold text-white">
                              {customer.name
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                              {customer.name}
                            </p>
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
                              <span>{customer.accountCount} accounts</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">
                              ${customer.totalBalance.toLocaleString()}
                            </p>
                            <p className="text-xs text-zinc-500">balance</p>
                          </div>
                          {selectedCustomer?.id === customer.id && (
                            <svg
                              className="h-5 w-5 text-emerald-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-zinc-500">
                        No customers found matching &quot;{searchQuery}&quot;
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Selection Button */}
            {selectedCustomer && (
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setSearchQuery("");
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-zinc-800/50 bg-[#0f0f0f]">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "border-emerald-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "transactions"
                  ? "border-emerald-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("send")}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "send"
                  ? "border-emerald-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Send Funds
            </button>
          </nav>
        </div>
      </div>

      {/* Context Bar - Shows selected customer */}
      {selectedCustomer && (
        <div className="bg-emerald-500/5 border-b border-emerald-500/20">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <span className="text-xs font-semibold text-emerald-400">
                    {selectedCustomer.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Viewing: {selectedCustomer.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {selectedCustomer.accountCount} accounts •{" "}
                    <span
                      className={`capitalize ${
                        selectedCustomer.type === "fintech"
                          ? "text-purple-400"
                          : selectedCustomer.type === "exchange"
                          ? "text-amber-400"
                          : selectedCustomer.type === "neobank"
                          ? "text-cyan-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {selectedCustomer.type}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Total Balance</p>
                <p className="text-lg font-semibold text-white">
                  ${selectedCustomer.totalBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Customer Selected State */}
      {!selectedCustomer && (
        <div className="bg-zinc-900/30 border-b border-zinc-800/50">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <p className="text-sm text-zinc-500">
              Select a customer account from the search above to view their
              dashboard
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {activeTab === "overview" && <OmniBalance customerId={selectedCustomer?.id || null} />}
        {activeTab === "transactions" && <TransactionHistory customerId={selectedCustomer?.id || null} />}
        {activeTab === "send" && selectedCustomer && <OmniSend customerId={selectedCustomer.id} customerName={selectedCustomer.name} />}
        {activeTab === "send" && !selectedCustomer && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
              <svg
                className="h-8 w-8 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-white">
              Select a Customer
            </h2>
            <p className="mt-2 max-w-sm text-center text-sm text-zinc-500">
              Use the search bar above to select a customer account. You can
              search by name or browse the dropdown list.
            </p>
            <button
              onClick={() => {
                setSearchType("account");
                setIsAccountDropdownOpen(true);
                searchInputRef.current?.focus();
              }}
              className="mt-6 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Browse Customers
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xs text-zinc-600">
                Stablecoin Sender Corp — Treasury Management
              </p>
              <span className="text-zinc-700">•</span>
              <p className="text-xs text-zinc-500">
                Powered by{" "}
                <span className="font-medium text-blue-400">TBMC</span>{" "}
                Clearinghouse
              </p>
            </div>
            <p className="text-xs text-zinc-600">v1.0.0 • Demo Environment</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
