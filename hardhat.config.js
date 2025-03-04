require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    shannon: {
      url: "https://testnet.somnia.network", 
      accounts: [process.env.PRIVATE_KEY], 
    },
  },
  etherscan: {
    
    apiKey: {
      shannon: [process.env.API_KEY],
    customChains: [
      {
        network: "shannon",
        chainId: 50312, 
        urls: {
          apiURL: "https://shannon-explorer.somnia/api", 
          browserURL: "https://shannon-explorer.somnia.network/", 
        },
      },
    ],
  },
};