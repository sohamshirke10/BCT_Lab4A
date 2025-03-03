import express from "express";
import { exec, execSync } from "child_process";
import { Contract, Wallet, JsonRpcProvider } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();
let contractAddress = "";
let contract = null;
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x2c641de93598949359c7a5f2ba4ec13c9ffbd02d370d31c05b6456febf538473";

// Setup provider and signer
const GANACHE_URL = process.env.GANACHE_URL || "http://localhost:8545";
const provider = new JsonRpcProvider(GANACHE_URL); // Change if needed
const signer = new Wallet(PRIVATE_KEY, provider);

router.get("/compile", (req, res) => {
    
    exec("npx hardhat compile", (error, stdout, stderr) => {
        if (error) return res.status(500).json({ success: false, message: error.message });
        res.status(200).json({ success: true, message: stdout });
    });
});

router.get("/deploy", (req, res) => {
    execSync("rm -rf ignition/deployments/chain-1337");
    exec("yes | npx hardhat ignition deploy ignition/modules/deploy.js --network ganache", (error, stdout, stderr) => {        
        if (error) return res.status(500).json({ success: false, message: error.message });

        try {
            const addressPath = "ignition/deployments/chain-1337/deployed_addresses.json";
            const deploymentData = JSON.parse(fs.readFileSync(addressPath, "utf8"));
            contractAddress = deploymentData["DeploymentModule#Message"];

            const abiPath = "artifacts/contracts/Message.sol/Message.json";
            const abiData = JSON.parse(fs.readFileSync(abiPath, "utf8"));
            contract = new Contract(contractAddress, abiData.abi, signer);

            res.status(200).json({ success: true, message: contractAddress });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });
});

router.get("/get-message", async (req, res) => {
    if (!contract) return res.status(500).json({ success: false, message: "Contract not initialized" });

    try {
        const message = await contract.getMessage();
        res.status(200).json({ success: true, message });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post("/set-message", async (req, res) => {
    if (!contract) return res.status(500).json({ success: false, message: "Contract not initialized" });

    try {
        const { newMessage } = req.body;
        const tx = await contract.setMessage(newMessage);
        await tx.wait();
        res.status(200).json({ success: true, message: "Message updated" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
