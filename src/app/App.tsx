import React, { useState, useEffect, FC, ChangeEvent } from "react";

import styles from "./styles/App.module.css";
import "./styles/index.css";

import { getConfig } from "../shared/config/near";
import { NearConfig } from "shared/types";
import { connectWallet } from "../shared/lib/connectWallet";
import { parseTransactions } from "../shared/lib/parseTransactions";
import { multisend } from "../shared/lib/sendCrypto";
import { logout } from "../shared/lib/logout";

const App = () => {
  const [receivers, setReceivers] = useState<string>("");
  const [config, setConfig] = useState<NearConfig>();

  const changeReceivers = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReceivers(e.currentTarget.value);
  };

  useEffect(() => {
    getConfig().then((config) => setConfig(config));
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>MULTISENDER</h1>
        {config?.walletConnection.isSignedIn() ? (
          <div className={styles.logout}>
            <button className={styles.button} onClick={() => logout(config)}>
              Logout
            </button>
          </div>
        ) : null}
      </header>
      <div className={styles.content}>
        {config?.walletConnection.isSignedIn() ? (
          <>
            <p className={styles.subtitle}>
              Enter transactions like "bebra.testnet 1" in a column
            </p>
            <textarea
              className={styles.textarea}
              value={receivers}
              onInput={changeReceivers}
            />
            <button
              className={styles.button}
              onClick={() => multisend(receivers, config)}
            >
              Send
            </button>
          </>
        ) : (
          <>
            <div className={styles.greeting}>
              <p className={styles.subtitle_nc}>
                Multisender sends tokens to hundreds of NEAR addresses out in 1
                single transaction.
              </p>
              <p className={styles.subtitle_nc}>
                To make use of the NEAR blockchain, you need to sign in. The
                button below will sign you in using NEAR Wallet.
              </p>
            </div>
            <button
              className={styles.button}
              onClick={() => connectWallet(config!)}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
