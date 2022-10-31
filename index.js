require("dotenv").config();
var Web3 = require("web3");
var web3 = new Web3();
const fs = require("fs");
web3.setProvider(new web3.providers.HttpProvider(process.env.PROVIDER));
var hgen = require("hexadecimal-gen");
const privateKeyToAddress = require("ethereum-private-key-to-address");
let count = 0;

function guess() {
  var randomHex = hgen(256);
  let response = privateKeyToAddress(randomHex);
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
          randomHex +
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
