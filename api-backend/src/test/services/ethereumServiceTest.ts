import {ethers} from "ethers";
import ERC20ABI from "../../abis/ERC20Token.json";

/**
 * 1. Start anvil: $ anvil
 * 2. Set
 * 2. Deploy contract in anvil by doing: forge script script/deploy.s.sol:DeployMyTokenScript --rpc-url http://127.0.0.1:8545 --broadcast --skip-simulation
 * 3. Substitute contract address by the contract address created
 */
const testMint = async () => {
  const toAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'; // Anvil address #1
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // anvil #0
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);

  try {
    const contract = new ethers.Contract(contractAddress, ERC20ABI, wallet);
    const tx = await contract.mint(toAddress, 2);
    await tx.wait();
    console.log(`Minted tokens to ${toAddress}`);
    const tokenBalance = await contract.balanceOf(toAddress);
    console.log(`Token balance from toAddress: ` + tokenBalance);
  } catch (error) {
    console.log('Error miniting tokens: ', error);
  }
};

testMint();
