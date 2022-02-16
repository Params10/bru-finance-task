const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

    const [owner] = await hre.ethers.getSigners();

    const contractFactory = await hre.ethers.getContractFactory("NFTS");


    const contract = await contractFactory.deploy(baseTokenURI);


    await contract.deployed();


    console.log("Contract deployed to:", contract.address);


    txn = await contract.mintNFTs(10, { value: utils.parseEther('0.03') });
    await txn.wait()

    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
