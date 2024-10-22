import { loadWallet, monitorWallet } from "../services/moneroService";

export const startWalletMonitoring = async () => {
  try {
    const wallet = await loadWallet();
    console.log("Wallet loaded successfully");

    console.log("Syncing wallet...");
    await wallet.sync();
    await wallet.startSyncing(5000);
    console.log("Wallet synced");

    await monitorWallet(wallet);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
