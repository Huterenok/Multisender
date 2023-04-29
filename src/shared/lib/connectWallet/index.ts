import { NearConfig } from "shared/types";

export const connectWallet = (config: NearConfig) => {
  config.walletConnection.requestSignIn({
    contractId: "bebra.huterok.testnet",
    methodNames: ["get_hello", "multisend"],
  });
};
