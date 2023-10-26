const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const safelyHeld = await deploy("SafelyHeld", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(safelyHeld.address, []);
  }
  console.log(`Contract deployed at : ${safelyHeld.address}`);
};
