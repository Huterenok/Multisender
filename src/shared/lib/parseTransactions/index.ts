import { Transaction } from "shared/types/index";
import { utils } from "near-api-js";
import { convertToYocto } from "../convertToYocto";
import BN from "bn.js";

export const parseTransactions = (
  data: string
): [Transaction[], BN] | undefined => {
  const parsedTransactions: Transaction[] = [];
  const transactions = data.split(/\n/);
  let total = 0;

  for (let elem of transactions) {
    const pattern = RegExp(/[A-Za-z0-9]+?\.?[A-Za-z0-9]+\.testnet/, "gi");
    const parsed = elem.split(" ");

    if (parsed.length < 2) {
      alert("You entered the data incorrectly!!!");
      return;
    }

    const address = parsed[0].trim();
    if (!pattern.test(address)) {
      alert("You entered the wrong address!!!");
      return;
    }

    let attached_deposit = parseFloat(
      parsed[1].trim().replace(",", ".").replace(" ", "")
    );
    const amount = convertToYocto(attached_deposit).toString(10);

    const transaction: Transaction = {
      address,
      amount,
    };

    total += attached_deposit;

    parsedTransactions.push(transaction);
  }

  console.log(parsedTransactions, total);

  return [parsedTransactions, convertToYocto(total)];
};
