import { NearConfig } from "shared/types";

export const logout = (config: NearConfig) => {
  config.walletConnection.signOut();
  //извините за костыль
  window.location.replace(window.location.origin + window.location.pathname);
};
