require("dotenv").config();
var Web3 = require("web3");
var web3 = new Web3();
const fs = require("fs");
web3.setProvider(new web3.providers.HttpProvider(process.env.PROVIDER));
const ethers = require("ethers");
let count = 0;

function guess() {
  let mnemonic = ethers.Wallet.createRandom().mnemonic;
  let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic.phrase);

  let response = mnemonicWallet.address;

  web3.eth.getBalance(response, function (error, result) {
    if (error) {
      console.log("Error: " + error);
    }
    count++;
    console.log("res", count, response, result);
    if (result > 0) {
      fs.appendFileSync(
        __dirname + "/dollars.log",
        "Hex: " +
          mnemonicWallet.privateKey +
          " & Address: " +
          response +
          " & balance: " +
          result +
          "\n"
      );
    }
    guess();
  });
}

guess();
