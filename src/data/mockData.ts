export interface WalletBalance {
  id: string;
  token: string;
  tokenSymbol: string;
  chain: string;
  chainId: string;
  balance: number;
  walletAddress: string;
  color: string;
}

export interface Chain {
  id: string;
  name: string;
  color: string;
}

export interface Token {
  symbol: string;
  name: string;
  color: string;
}

export const CHAINS: Chain[] = [
  { id: "ethereum", name: "Ethereum", color: "#627EEA" },
  { id: "polygon", name: "Polygon", color: "#8247E5" },
  { id: "arbitrum", name: "Arbitrum", color: "#28A0F0" },
  { id: "solana", name: "Solana", color: "#14F195" },
  { id: "base", name: "Base", color: "#0052FF" },
  { id: "optimism", name: "Optimism", color: "#FF0420" },
];

export const TOKENS: Token[] = [
  { symbol: "USDC", name: "USD Coin", color: "#2775CA" },
  { symbol: "USDT", name: "Tether", color: "#26A17B" },
  { symbol: "DAI", name: "Dai", color: "#F5AC37" },
  { symbol: "FRAX", name: "Frax", color: "#000000" },
];

export const MOCK_BALANCES: WalletBalance[] = [
  {
    id: "1",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 1500.0,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    color: "#2775CA",
  },
  {
    id: "2",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 827.5,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    color: "#26A17B",
  },
  {
    id: "3",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Polygon",
    chainId: "polygon",
    balance: 1000.0,
    walletAddress: "0x8923Fa4C8E2c3BBf92A5D4a7B2C8F9e1D6A7B3C4",
    color: "#2775CA",
  },
  {
    id: "4",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 500.0,
    walletAddress: "0x1234567890AbCdEf1234567890AbCdEf12345678",
    color: "#2775CA",
  },
  {
    id: "5",
    token: "Dai",
    tokenSymbol: "DAI",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 500.0,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    color: "#F5AC37",
  },
  {
    id: "6",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Solana",
    chainId: "solana",
    balance: 500.0,
    walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    color: "#26A17B",
  },
];

export const getTotalBalance = (): number => {
  return MOCK_BALANCES.reduce((sum, wallet) => sum + wallet.balance, 0);
};

export const getChainColor = (chainId: string): string => {
  const chain = CHAINS.find((c) => c.id === chainId);
  return chain?.color || "#666666";
};

export const getTokenColor = (symbol: string): string => {
  const token = TOKENS.find((t) => t.symbol === symbol);
  return token?.color || "#666666";
};
