import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-ignition"
import dotenv from "dotenv"
dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: process.env.GANACHE_URL || "http://localhost:8545", // Ganache RPC URL
      accounts: [
        process.env.PRIVATE_KEY || "0x2c641de93598949359c7a5f2ba4ec13c9ffbd02d370d31c05b6456febf538473"
      ],
    },
  },
};

export default config