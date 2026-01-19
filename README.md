# Omni Balance Demo

A demo UI showcasing a unified stablecoin management interface. This mockup demonstrates the concept of "Omni Balance" and "Omni Send" - viewing and sending stablecoins across multiple chains as if they were a single unified balance.

**Note: This is a UI demo with hardcoded mock data. No real blockchain connections are made.**

## Features

### Omni Balance View
- Displays a unified total balance across all stablecoins on all chains
- Shows breakdown by token and chain:
  - USDC on Ethereum
  - USDT on Ethereum
  - USDC on Polygon
  - USDC on Arbitrum
  - DAI on Ethereum
  - USDT on Solana
- Clean, modern dark mode interface

### Omni Send
- Enter any amount to send (up to your total balance)
- Choose destination token (USDC, USDT, DAI, FRAX)
- Choose destination chain (Ethereum, Polygon, Arbitrum, Solana, Base, Optimism)
- Enter recipient address
- **Preview screen shows:**
  - Which wallets/chains funds will be pulled from
  - Token conversions that would be needed
  - Final amount arriving at destination
- Success confirmation screen

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## Project Structure

```
src/
├── app/
│   ├── page.tsx        # Main page with tab navigation
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/
│   ├── OmniBalance.tsx # Balance view component
│   └── OmniSend.tsx    # Send form with preview/confirmation
└── data/
    └── mockData.ts     # Mock wallet balances and chain data
```

## What This Demo Shows

This demo illustrates the UX concept where:

1. **Users see one balance** - Instead of checking multiple wallets across chains, users see their total stablecoin holdings as a single dollar amount

2. **Intelligent fund routing** - When sending, the system automatically determines which wallets to pull from and handles any necessary token conversions

3. **Transparency** - Before confirming, users see exactly how their send will be fulfilled (which sources, which conversions)

This approach simplifies the multi-chain stablecoin experience by abstracting away the complexity while maintaining full transparency.
