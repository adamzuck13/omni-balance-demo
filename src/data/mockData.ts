// Customer/Client companies (Stablecoin Sender Corp's customers)
export interface Customer {
  id: string;
  name: string;
  type: "fintech" | "exchange" | "corporate" | "neobank";
  accountCount: number;
  totalBalance: number;
}

export interface WalletBalance {
  id: string;
  customerId: string;
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

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "cust-001", name: "Acme Corporation", type: "corporate", accountCount: 6, totalBalance: 245000 },
  { id: "cust-002", name: "TechStart Inc", type: "corporate", accountCount: 3, totalBalance: 187000 },
  { id: "cust-003", name: "Global Payments Co", type: "fintech", accountCount: 6, totalBalance: 892000 },
  { id: "cust-004", name: "CryptoVentures LLC", type: "exchange", accountCount: 6, totalBalance: 1560000 },
  { id: "cust-005", name: "NextGen Finance", type: "neobank", accountCount: 6, totalBalance: 2345000 },
  { id: "cust-006", name: "Meridian Trading", type: "exchange", accountCount: 4, totalBalance: 678000 },
  { id: "cust-007", name: "Founders Fund SPV", type: "corporate", accountCount: 3, totalBalance: 450000 },
  { id: "cust-008", name: "Pacific Rim Exports", type: "corporate", accountCount: 4, totalBalance: 289000 },
];

// All wallet balances across all customers
export const MOCK_BALANCES: WalletBalance[] = [
  // Acme Corporation (cust-001) - ~$245,000
  {
    id: "bal-001",
    customerId: "cust-001",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 85000,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    color: "#2775CA",
  },
  {
    id: "bal-002",
    customerId: "cust-001",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 42500,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    color: "#26A17B",
  },
  {
    id: "bal-003",
    customerId: "cust-001",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Polygon",
    chainId: "polygon",
    balance: 55000,
    walletAddress: "0x8923Fa4C8E2c3BBf92A5D4a7B2C8F9e1D6A7B3C4",
    color: "#2775CA",
  },
  {
    id: "bal-004",
    customerId: "cust-001",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 35000,
    walletAddress: "0x1234567890AbCdEf1234567890AbCdEf12345678",
    color: "#2775CA",
  },
  {
    id: "bal-005",
    customerId: "cust-001",
    token: "Dai",
    tokenSymbol: "DAI",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 12500,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    color: "#F5AC37",
  },
  {
    id: "bal-006",
    customerId: "cust-001",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Solana",
    chainId: "solana",
    balance: 15000,
    walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    color: "#26A17B",
  },

  // TechStart Inc (cust-002) - ~$187,000
  {
    id: "bal-007",
    customerId: "cust-002",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 95000,
    walletAddress: "0xABC123def456ABC123def456ABC123def456ABC1",
    color: "#2775CA",
  },
  {
    id: "bal-008",
    customerId: "cust-002",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Base",
    chainId: "base",
    balance: 62000,
    walletAddress: "0xDEF789abc012DEF789abc012DEF789abc012DEF7",
    color: "#2775CA",
  },
  {
    id: "bal-009",
    customerId: "cust-002",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 30000,
    walletAddress: "0x456789ABCdef0123456789ABCdef0123456789AB",
    color: "#26A17B",
  },

  // Global Payments Co (cust-003) - ~$892,000
  {
    id: "bal-010",
    customerId: "cust-003",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 350000,
    walletAddress: "0xGLOBAL1234567890GLOBAL1234567890GLOBAL12",
    color: "#2775CA",
  },
  {
    id: "bal-011",
    customerId: "cust-003",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 185000,
    walletAddress: "0xGLOBAL1234567890GLOBAL1234567890GLOBAL12",
    color: "#26A17B",
  },
  {
    id: "bal-012",
    customerId: "cust-003",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Polygon",
    chainId: "polygon",
    balance: 125000,
    walletAddress: "0xPOLY9876543210POLY9876543210POLY987654",
    color: "#2775CA",
  },
  {
    id: "bal-013",
    customerId: "cust-003",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 92000,
    walletAddress: "0xARB11111111111ARB11111111111ARB1111111",
    color: "#2775CA",
  },
  {
    id: "bal-014",
    customerId: "cust-003",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Solana",
    chainId: "solana",
    balance: 78000,
    walletAddress: "GLOBALSolana123456789GLOBALSolana12345678",
    color: "#26A17B",
  },
  {
    id: "bal-015",
    customerId: "cust-003",
    token: "Dai",
    tokenSymbol: "DAI",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 62000,
    walletAddress: "0xGLOBAL1234567890GLOBAL1234567890GLOBAL12",
    color: "#F5AC37",
  },

  // CryptoVentures LLC (cust-004) - ~$1,560,000
  {
    id: "bal-016",
    customerId: "cust-004",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 520000,
    walletAddress: "0xCRYPTO123456CRYPTO123456CRYPTO123456CR",
    color: "#2775CA",
  },
  {
    id: "bal-017",
    customerId: "cust-004",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 380000,
    walletAddress: "0xCRYPTO123456CRYPTO123456CRYPTO123456CR",
    color: "#26A17B",
  },
  {
    id: "bal-018",
    customerId: "cust-004",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Solana",
    chainId: "solana",
    balance: 290000,
    walletAddress: "CRYPTOVentureSolana123CRYPTOVentureSolana",
    color: "#2775CA",
  },
  {
    id: "bal-019",
    customerId: "cust-004",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 185000,
    walletAddress: "0xCRYPTOARB789012CRYPTOARB789012CRYPTOAR",
    color: "#2775CA",
  },
  {
    id: "bal-020",
    customerId: "cust-004",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Polygon",
    chainId: "polygon",
    balance: 125000,
    walletAddress: "0xCRYPTOPOLY345678CRYPTOPOLY345678CRYPT",
    color: "#26A17B",
  },
  {
    id: "bal-021",
    customerId: "cust-004",
    token: "Dai",
    tokenSymbol: "DAI",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 60000,
    walletAddress: "0xCRYPTO123456CRYPTO123456CRYPTO123456CR",
    color: "#F5AC37",
  },

  // NextGen Finance (cust-005) - ~$2,345,000
  {
    id: "bal-022",
    customerId: "cust-005",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 780000,
    walletAddress: "0xNEXTGEN111111NEXTGEN111111NEXTGEN1111",
    color: "#2775CA",
  },
  {
    id: "bal-023",
    customerId: "cust-005",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 520000,
    walletAddress: "0xNEXTGEN111111NEXTGEN111111NEXTGEN1111",
    color: "#26A17B",
  },
  {
    id: "bal-024",
    customerId: "cust-005",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Base",
    chainId: "base",
    balance: 385000,
    walletAddress: "0xNEXTGENBASE222NEXTGENBASE222NEXTGENBA",
    color: "#2775CA",
  },
  {
    id: "bal-025",
    customerId: "cust-005",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Polygon",
    chainId: "polygon",
    balance: 290000,
    walletAddress: "0xNEXTGENPOLY333NEXTGENPOLY333NEXTGENPO",
    color: "#2775CA",
  },
  {
    id: "bal-026",
    customerId: "cust-005",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 215000,
    walletAddress: "0xNEXTGENARB4444NEXTGENARB4444NEXTGENAR",
    color: "#26A17B",
  },
  {
    id: "bal-027",
    customerId: "cust-005",
    token: "Dai",
    tokenSymbol: "DAI",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 155000,
    walletAddress: "0xNEXTGEN111111NEXTGEN111111NEXTGEN1111",
    color: "#F5AC37",
  },

  // Meridian Trading (cust-006) - ~$678,000
  {
    id: "bal-028",
    customerId: "cust-006",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 285000,
    walletAddress: "0xMERIDIAN123456MERIDIAN123456MERIDIAN1",
    color: "#2775CA",
  },
  {
    id: "bal-029",
    customerId: "cust-006",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Solana",
    chainId: "solana",
    balance: 198000,
    walletAddress: "MERIDIANSolana789012MERIDIANSolana78901",
    color: "#26A17B",
  },
  {
    id: "bal-030",
    customerId: "cust-006",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Arbitrum",
    chainId: "arbitrum",
    balance: 125000,
    walletAddress: "0xMERIDIANARB345MERIDIANARB345MERIDIAA",
    color: "#2775CA",
  },
  {
    id: "bal-031",
    customerId: "cust-006",
    token: "Dai",
    tokenSymbol: "DAI",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 70000,
    walletAddress: "0xMERIDIAN123456MERIDIAN123456MERIDIAN1",
    color: "#F5AC37",
  },

  // Founders Fund SPV (cust-007) - ~$450,000
  {
    id: "bal-032",
    customerId: "cust-007",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 320000,
    walletAddress: "0xFOUNDERS111111FOUNDERS111111FOUNDERS1",
    color: "#2775CA",
  },
  {
    id: "bal-033",
    customerId: "cust-007",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 85000,
    walletAddress: "0xFOUNDERS111111FOUNDERS111111FOUNDERS1",
    color: "#26A17B",
  },
  {
    id: "bal-034",
    customerId: "cust-007",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Base",
    chainId: "base",
    balance: 45000,
    walletAddress: "0xFOUNDERSBASE22FOUNDERSBASE22FOUNDERSB",
    color: "#2775CA",
  },

  // Pacific Rim Exports (cust-008) - ~$289,000
  {
    id: "bal-035",
    customerId: "cust-008",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 125000,
    walletAddress: "0xPACIFIC123456PACIFIC123456PACIFIC1234",
    color: "#2775CA",
  },
  {
    id: "bal-036",
    customerId: "cust-008",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Ethereum",
    chainId: "ethereum",
    balance: 68000,
    walletAddress: "0xPACIFIC123456PACIFIC123456PACIFIC1234",
    color: "#26A17B",
  },
  {
    id: "bal-037",
    customerId: "cust-008",
    token: "USD Coin",
    tokenSymbol: "USDC",
    chain: "Polygon",
    chainId: "polygon",
    balance: 52000,
    walletAddress: "0xPACIFICPOLY789PACIFICPOLY789PACIFICPO",
    color: "#2775CA",
  },
  {
    id: "bal-038",
    customerId: "cust-008",
    token: "Tether",
    tokenSymbol: "USDT",
    chain: "Solana",
    chainId: "solana",
    balance: 44000,
    walletAddress: "PACIFICSolana456789PACIFICSolana4567890",
    color: "#26A17B",
  },
];

// Helper functions
export const getBalancesForCustomer = (customerId: string | null): WalletBalance[] => {
  if (!customerId) return MOCK_BALANCES;
  return MOCK_BALANCES.filter((b) => b.customerId === customerId);
};

export const getTotalBalance = (customerId: string | null = null): number => {
  const balances = getBalancesForCustomer(customerId);
  return balances.reduce((sum, wallet) => sum + wallet.balance, 0);
};

export const getCustomerAccountCount = (customerId: string): number => {
  return MOCK_BALANCES.filter((b) => b.customerId === customerId).length;
};

export const getChainColor = (chainId: string): string => {
  const chain = CHAINS.find((c) => c.id === chainId);
  return chain?.color || "#666666";
};

export const getTokenColor = (symbol: string): string => {
  const token = TOKENS.find((t) => t.symbol === symbol);
  return token?.color || "#666666";
};

// Transaction types
export interface TransactionSource {
  walletAddress: string;
  token: string;
  chain: string;
  chainId: string;
  amount: number;
  convertedTo?: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: "send" | "receive";
  status: "completed" | "pending" | "failed";
  amount: number;
  destinationToken: string;
  destinationChain: string;
  destinationChainId: string;
  recipientAddress: string;
  senderAddress?: string;
  memo?: string;
  timestamp: string;
  reference: string;
  sources: TransactionSource[];
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-001",
    customerId: "cust-001",
    type: "send",
    status: "completed",
    amount: 25000,
    destinationToken: "USDC",
    destinationChain: "Ethereum",
    destinationChainId: "ethereum",
    recipientAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    memo: "Vendor payment - Invoice #4521",
    timestamp: "2024-01-18T14:32:00Z",
    reference: "TXN-2024-0851",
    sources: [
      {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
        token: "USDC",
        chain: "Ethereum",
        chainId: "ethereum",
        amount: 15000,
      },
      {
        walletAddress: "0x8923Fa4C8E2c3BBf92A5D4a7B2C8F9e1D6A7B3C4",
        token: "USDC",
        chain: "Polygon",
        chainId: "polygon",
        amount: 10000,
      },
    ],
  },
  {
    id: "txn-002",
    customerId: "cust-001",
    type: "receive",
    status: "completed",
    amount: 50000,
    destinationToken: "USDC",
    destinationChain: "Ethereum",
    destinationChainId: "ethereum",
    recipientAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
    senderAddress: "0x1234567890AbCdEf1234567890AbCdEf12345678",
    memo: "Client payment - Project Alpha",
    timestamp: "2024-01-17T09:15:00Z",
    reference: "TXN-2024-0850",
    sources: [],
  },
  {
    id: "txn-003",
    customerId: "cust-001",
    type: "send",
    status: "completed",
    amount: 7500,
    destinationToken: "USDT",
    destinationChain: "Arbitrum",
    destinationChainId: "arbitrum",
    recipientAddress: "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
    memo: "Contractor payment - January",
    timestamp: "2024-01-16T16:45:00Z",
    reference: "TXN-2024-0849",
    sources: [
      {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
        token: "USDT",
        chain: "Ethereum",
        chainId: "ethereum",
        amount: 5000,
        convertedTo: "USDT",
      },
      {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
        token: "DAI",
        chain: "Ethereum",
        chainId: "ethereum",
        amount: 2500,
        convertedTo: "USDT",
      },
    ],
  },
  {
    id: "txn-004",
    customerId: "cust-003",
    type: "send",
    status: "completed",
    amount: 120000,
    destinationToken: "USDC",
    destinationChain: "Base",
    destinationChainId: "base",
    recipientAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
    memo: "Partner settlement - Q4",
    timestamp: "2024-01-15T11:20:00Z",
    reference: "TXN-2024-0848",
    sources: [
      {
        walletAddress: "0xGLOBAL1234567890GLOBAL1234567890GLOBAL12",
        token: "USDC",
        chain: "Ethereum",
        chainId: "ethereum",
        amount: 80000,
      },
      {
        walletAddress: "0xPOLY9876543210POLY9876543210POLY987654",
        token: "USDC",
        chain: "Polygon",
        chainId: "polygon",
        amount: 40000,
      },
    ],
  },
  {
    id: "txn-005",
    customerId: "cust-004",
    type: "receive",
    status: "completed",
    amount: 320000,
    destinationToken: "USDT",
    destinationChain: "Ethereum",
    destinationChainId: "ethereum",
    recipientAddress: "0xCRYPTO123456CRYPTO123456CRYPTO123456CR",
    senderAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    memo: "Trading revenue - Week 3",
    timestamp: "2024-01-14T08:00:00Z",
    reference: "TXN-2024-0847",
    sources: [],
  },
  {
    id: "txn-006",
    customerId: "cust-001",
    type: "send",
    status: "pending",
    amount: 4500,
    destinationToken: "USDC",
    destinationChain: "Solana",
    destinationChainId: "solana",
    recipientAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    memo: "Marketing expenses",
    timestamp: "2024-01-19T10:30:00Z",
    reference: "TXN-2024-0852",
    sources: [
      {
        walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        token: "USDT",
        chain: "Solana",
        chainId: "solana",
        amount: 4500,
        convertedTo: "USDC",
      },
    ],
  },
  {
    id: "txn-007",
    customerId: "cust-001",
    type: "send",
    status: "completed",
    amount: 85000,
    destinationToken: "USDC",
    destinationChain: "Ethereum",
    destinationChainId: "ethereum",
    recipientAddress: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    memo: "Office lease - Q1 2024",
    timestamp: "2024-01-12T14:00:00Z",
    reference: "TXN-2024-0845",
    sources: [
      {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
        token: "USDC",
        chain: "Ethereum",
        chainId: "ethereum",
        amount: 30000,
      },
      {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8bB2E",
        token: "USDT",
        chain: "Ethereum",
        chainId: "ethereum",
        amount: 20000,
        convertedTo: "USDC",
      },
      {
        walletAddress: "0x8923Fa4C8E2c3BBf92A5D4a7B2C8F9e1D6A7B3C4",
        token: "USDC",
        chain: "Polygon",
        chainId: "polygon",
        amount: 20000,
      },
      {
        walletAddress: "0x1234567890AbCdEf1234567890AbCdEf12345678",
        token: "USDC",
        chain: "Arbitrum",
        chainId: "arbitrum",
        amount: 15000,
      },
    ],
  },
  {
    id: "txn-008",
    customerId: "cust-005",
    type: "receive",
    status: "completed",
    amount: 1500000,
    destinationToken: "USDC",
    destinationChain: "Ethereum",
    destinationChainId: "ethereum",
    recipientAddress: "0xNEXTGEN111111NEXTGEN111111NEXTGEN1111",
    senderAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    memo: "Series A funding deposit",
    timestamp: "2024-01-10T10:00:00Z",
    reference: "TXN-2024-0843",
    sources: [],
  },
];

export const getTransactionsForCustomer = (customerId: string | null): Transaction[] => {
  if (!customerId) return MOCK_TRANSACTIONS;
  return MOCK_TRANSACTIONS.filter((t) => t.customerId === customerId);
};
