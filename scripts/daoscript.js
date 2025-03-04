const { ethers } = require("hardhat");

async function main() {
  const factory = await ethers.getContractAt("SomniaDAOFactory", "0xA3e80401EEa7DF700CC57deaA2704F332ECE6FD1"); // Укажи адрес фабрики

  const owners = [
    "0x49939aeD5D127C2d9a056CA1aB9aDe9F79fa8E81", // Твой кошелёк
    "0x1BC48BA18118fC65DCa5Bbc4B60b19d4570d486D", // Валидный адрес
    "0x9219d3Fa809b0CC3Cbf994eb3db9C4Ab346D90A9", // Валидный адрес
  ];

  for (let i = 0; i < 1; i++) {
    try {

      await factory.createDAO(owners, "2", "48");
      console.log(`DAO ${i + 1} created`);
    } catch (error) {
      console.error(`Error creating DAO ${i + 1}:`, error);
      if (error.message.includes("insufficient funds")) {
        console.error("Not enough STT for gas or fee. Request more from faucet.");
        break;
      }
    }
  }
}

main().catch(console.error);