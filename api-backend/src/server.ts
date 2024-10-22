import app from "./app";
import { connectDB } from "./config/db";
import { startWalletMonitoring } from "./config/moneroRpc";

const PORT = process.env.PORT || 3000;

connectDB();

startWalletMonitoring();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
