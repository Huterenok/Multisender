import BN from "bn.js";

export const convertToYocto = (num: number) => {
  return new BN(Math.round(num * 100000000)).mul(new BN("10000000000000000"));
};
