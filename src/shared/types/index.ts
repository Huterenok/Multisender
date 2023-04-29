import BN from "bn.js";
import { Near, WalletConnection, Account, Contract } from "near-api-js";

export interface Transaction {
  address: string;
  amount: string;
}

export interface NearConfig {
  nearConnection: Near;
  walletConnection: WalletConnection;
  account: Account;
  contract: Contract;
}
