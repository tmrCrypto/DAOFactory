require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    'somnia-testnet': {
      url: "https://somnia-poc.w3us.site/api/eth-rpc", 
      accounts: [process.env.PRIVATE_KEY], 
    },
  },

  etherscan: {
    
    apiKey: {
      'somnia-testnet': [process.env.API_KEY],
    },

    customChains: [
      {
        network: "somnia-testnet",
        chainId: 50311, 
        urls: {
          apiURL: "https://somnia-poc.w3us.site/api", 
          browserURL: "https://somnia-poc.w3us.site", 
        },
      },
    ],
  }
};