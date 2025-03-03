import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DeploymentModule", (m, msg) => {
    const message = m.contract("Message", [msg || "YO Wassup"]);
    return { message };
});