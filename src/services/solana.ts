import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';

// Mock or Real Addresses (User can change these in .env later)
export const TREASURY_ADDRESS = "7xKXv2VqBTo6s5BqA263K7Q515K1v1v1v1v1v1v1"; // Placeholder
export const TOKEN_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC for demo or custom token

export const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

export const getTreasuryBalance = async (connection: Connection) => {
  try {
    const pubkey = new PublicKey(TREASURY_ADDRESS);
    const balance = await connection.getBalance(pubkey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (e) {
    console.error("Error fetching balance:", e);
    return 0;
  }
};

export const getTokenPrice = async () => {
  // In a real app, you'd fetch from Jupiter or DexScreener
  // For this demo, we'll simulate a price or fetch from a public API if possible
  try {
    const response = await axios.get(`https://api.jup.ag/price/v2?ids=${TOKEN_MINT}`);
    return response.data.data[TOKEN_MINT]?.price || "0.00";
  } catch (e) {
    return "0.00";
  }
};
