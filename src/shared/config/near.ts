import { Contract, WalletConnection, connect, keyStores } from "near-api-js";
import { NearConfig } from "shared/types";

export const getConfig = async (): Promise<NearConfig> => {
  const connectionConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  // connect to NEAR
  const nearConnection = await connect(connectionConfig);

  // create wallet connection
  const walletConnection = new WalletConnection(nearConnection, "");

  const account = walletConnection.account();

  const contract = new Contract(
    account, // the account object that is connecting
    "bebra.huterok228.testnet", // name of contract you're connecting to
    {
      viewMethods: ["get_hello"], // view methods do not change state but usually return a value
      changeMethods: ["multisend"], // change methods modify state
    }
  );

  return {
    nearConnection,
    walletConnection,
    contract,
    account,
  };
};
