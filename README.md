# Somnia DAO Factory

This repository contains the implementation of the `SomniaDAOFactory` and `SomniaConsensusDAO` smart contracts, designed to create and manage decentralized autonomous organizations (DAOs) on the Somnia Network. These contracts leverage Somnia’s high-performance Layer 1 blockchain features, such as 400,000+ transactions per second (TPS), sub-second finalization, and gas fees of less than $0.01, making them ideal for metaverses, gaming, and social platforms.

## Overview

### Purpose
The **Somnia DAO Factory** enables developers and communities to create scalable, cost-effective, and secure DAOs on the Somnia Network. It addresses the need for decentralized governance in high-throughput applications, such as metaverses and decentralized games, where low costs and fast transaction processing are critical. The `SomniaConsensusDAO` provides a flexible multi-signature DAO with threshold-based consensus, allowing owners to propose, vote on, and execute transactions with a configurable number of confirmations and a grace period.

### Key Features
- **Scalability**: Utilizes Somnia’s 400k TPS and sub-second finalization for thousands of DAO operations.
- **Low Cost**: Gas fees are less than $0.01 per transaction, making DAO creation and management affordable.
- **Flexible Governance**: Supports customizable ownership, confirmation thresholds, and delayed transactions.
- **EVM Compatibility**: Fully compatible with Ethereum Virtual Machine (EVM) tools and standards.

## Contracts

### 1. SomniaDAOFactory
The `SomniaDAOFactory` is a factory contract that deploys instances of `SomniaConsensusDAO` for users. It charges a fixed fee (0.0001 STT) to create a new DAO, ensuring accessibility while funding the ecosystem.

#### Functions
- **`createDAO(address[] memory _owners, uint _confirmationsRequired, uint8 _graceperiod)` (external, payable)**:
  - Creates a new `SomniaConsensusDAO` instance with the specified owners, confirmation threshold, and grace period.
  - Requires payment of `CREATION_FEE` (0.0001 STT) to deploy.
  - Emits `DAOCreated` event with the creator’s address, DAO address, and timestamp.
  - Stores the DAO address in a mapping for the creator (`userDAOs`).

- **`withdrawEther(address payable _to)` (external)**:
  - Allows the factory owner to withdraw accumulated Ether/STT to a specified address.
  - Restricted to the `factoryOwner`.

#### Usage
- Use this contract to instantiate DAOs for decentralized governance of projects, communities, or organizations on Somnia.
- Owners can be any valid Ethereum-compatible address (e.g., wallets, contracts) with STT for gas fees.

### 2. SomniaConsensusDAO
The `SomniaConsensusDAO` implements a multi-signature DAO with threshold-based consensus, enabling secure and flexible governance. It supports proposing transactions, voting with a minimum number of confirmations, and executing delayed transactions after a grace period.

#### Functions
- **`constructor(address[] memory _owners, uint grace_period_to_hours, uint8 _confirmationsRequired)`**:
  - Initializes the DAO with a list of owners, a grace period in hours, and a required number of confirmations.
  - Ensures the number of owners is at least the required confirmations and no duplicate owners exist.

- **`addExecProposal(string calldata _func, address _to, bytes calldata _data)` (external, onlyOwner)**:
  - Allows an owner to propose a transaction to a target address with a function signature and data.
  - Generates a unique transaction ID (`txId`) and adds it to the queue.
  - Emits `queueTx` event with transaction details.

- **`confirm(bytes32 _txId)` (external, onlyOwner)**:
  - Enables an owner to confirm a queued transaction, incrementing the confirmation count.
  - Executes the transaction if the required number of confirmations is reached.

- **`cancelConfirmation(bytes32 _txId)` (external, onlyOwner)**:
  - Allows an owner to cancel their confirmation for a queued transaction, reducing the confirmation count.
  - Discards the transaction if no confirmations remain.

- **`discardExecProposal(bytes32 _txId)` (private)**:
  - Removes a queued transaction and resets all confirmations.
  - Emits `discard` event.

- **`execute(bytes32 txId)` (private)**:
  - Executes a queued transaction if it has enough confirmations and is within the grace period.
  - Calls the target address with the provided function signature and data.
  - Emits `executTx` event.

- **`addOwner(address newOwner)` (public, onlyConsensus)**:
  - Adds a new owner to the DAO, callable only by the DAO itself (for governance).

- **`delOwner(uint indexOwner)` (public, onlyConsensus)**:
  - Removes an owner at the specified index, ensuring the minimum number of owners is maintained.
  - Callable only by the DAO itself.

- **`assignRequiredConf(uint8 _confReq)` (public, onlyConsensus)**:
  - Updates the required number of confirmations, ensuring it’s at least 2 and not more than the number of owners.
  - Emits `assignRequired` event.

- **`seeOwners()` (external, view)**:
  - Returns the list of current DAO owners as an array.

- **`seeMinCofReq()` (public, view)**:
  - Returns the current minimum number of confirmations required.

#### Usage
- **Owners**: Any Ethereum-compatible address (e.g., EOA wallets, contracts) can be an owner. Owners propose and vote on transactions, requiring a threshold of confirmations (`_confirmationsRequired`) to execute.
- **Delayed Transactions with Multi-Signature**: Propose transactions with a function signature and data, vote with multiple owners, and execute after a grace period (`grace_period_to_hours`). This ensures secure, decentralized decision-making.
- **Applications**: Use for governing decentralized organizations, managing funds, or coordinating actions in metaverses and games on Somnia.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- Hardhat, Ethers.js, and Hardhat Ignition installed (see `package.json`).
- MetaMask or another wallet configured for Somnia Testnet (Shannon, Chain ID 50311).
- Testnet STT tokens from the Somnia Faucet (`faucet.somnia.network`).

### Installation
1. Clone this repository:
```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd DAOFactory
```
2. Install dependencies:
```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd DAOFactory
```
3. Configure hardhat.config.js with your Somnia Testnet RPC URL, Chain ID (50311), and private key in .env:
```bash
    PRIVATE_KEY = your_private_key"
```
### Deployment
1. Compile the contracts:
```bash
    npx hardhat compile
```
2. Deploy SomniaDAOFactory to Somnia Testnet:
```bash
    npx hardhat ignition deploy ./ignition/modules/DAOFactoryModule.js --network somnia-testnet
```
