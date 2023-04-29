import { NearConfig, Transaction } from "shared/types";
import { parseTransactions } from "../parseTransactions";
import { utils } from "near-api-js";
import BN from "bn.js";

export const multisend = async (transactions: string, config: NearConfig) => {
  let [parsedTransactions, total] = parseTransactions(transactions) as [
    Transaction[],
    BN
  ];
  console.log(total);

  // @ts-ignore
  let res = await config.contract.multisend(
    {
      transactions: parsedTransactions, // argument name and value - pass empty object if no args required
      accountId: config.walletConnection.getAccountId(),
    },
    "300000000000000", // attached GAS (optional)
    total // attached deposit in yoctoNEAR (optional)
  );
  console.log(res);
};
