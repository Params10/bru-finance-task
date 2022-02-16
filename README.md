# bru-finance-task

This is a demo NFT app to depict the normal transaction of a structure and minting NFTS from frontend button for signing the transaction.

To run this app follow the steps below.

## Run locally

1. Clone the repo

```sh
git clone https://github.com/Params10/bru-finance-task
```

2.For frontend run the command to install dependancy.

```sh
cd bru-finance-task-frontend // to enter the directory
npm install
```
3. For backend enter the directory and install dependencies for the same.

```sh
cd bru-finance-task-contractside // to enter the directory
npm install
```

4. Start the local test node 

```sh
npx hardhat node
```

5. To deploy the code on rinkeby/mumbai testnet for polygon


```sh
npx hardhat run scripts/deploy.js --network rinkeby/mumbai
```

6. Copy the contract address and put in the frontend for contractAddress variable

7. Start the App

```sh
npm start
```

