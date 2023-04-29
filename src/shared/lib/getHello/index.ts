import { transactions } from "near-api-js";
import { NearConfig } from "shared/types";

export const getHello = async (config: NearConfig) => {
  //@ts-ignore
  const res = await config.contract.get_hello();
  console.log(res);
};
