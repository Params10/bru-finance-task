
  
import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/NFTS.json';
import { ethers } from 'ethers';



var contractAddress = "0x66d74Dd6605263e1a8F1Fb8064B20a6fC9e07130";
const contractAddressPolygon = "0xF51aC98B471b142877D9538A3EEF45BB1F9b6857";
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [ownertokens, setTokens] = useState([]);
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if((await provider.getNetwork()).chainId == 80001){
          contractAddress = contractAddressPolygon;
        }
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        
        console.log(provider.getNetwork());

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

        console.log("Mining... please wait");
        await nftTxn.wait();

        

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  const getownerTokens = async () => {
    try {
      
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        if((await provider.getNetwork()).chainId == 80001){
          contractAddress = contractAddressPolygon;
        }
        const nftContract = new ethers.Contract(contractAddress, abi,provider);

        
        let tokens = await nftContract.tokensOfOwner(accounts[0]);
        setTokens(tokens);
        console.log(tokens);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>App</h1>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
      <button onClick={getownerTokens}>
        Get tokens
      </button>

    </div>
  )
}

export default App;
