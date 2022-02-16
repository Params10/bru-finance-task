require("@nomiclabs/hardhat-waffle");




// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/cnRkORZTt0FGI4EySO7P0fAsZe5IUlsa",
      accounts: ["2e7fc5c516b710764ebcb590cfdb4886d91c732a23fea3fbe246cfc82b30a482"]
    },
    mumbai: {
      url:"https://rpc-mumbai.maticvigil.com",
      accounts: ["2e7fc5c516b710764ebcb590cfdb4886d91c732a23fea3fbe246cfc82b30a482"],
    }
  },
};