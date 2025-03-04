const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DAOFactoryModule", (m) => {
  // Деплой SomniaDAOFactory
  const daoForge = m.contract("SomniaDAOFactory", [], {
    afterDeploy: async ({ ethers }, { daoForge }) => {
      console.log("Deployed SomniaDAOForge at:", daoForge.address);

      // Верификация контракта
      await hre.run("verify:verify", {
        address: daoForge.address,
        constructorArguments: [],
      });
    },
  });
});