const TronWeb = require("tronweb");
const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const fullNode = "https://api.trongrid.io";
const solidityNode = "https://api.trongrid.io";
const eventServer = "https://api.trongrid.io";
const privateKey =
  "b71a7daf402c4332ce6baf4036bea059005c47da076aff12ad63313f17fc45a3"; // Enter Private key of your account

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

tronWeb.setAddress("TTDKQAFBuRg52wC6dtrnnMti7HTNjqCo1v"); //Enter Address of your account

let contractAddress = "TMQmsbzQWoPKyruC1fF9Mj9SH2aM3UQhvB"; //Enter Your Smart Contract Address
let abi = [{ "constant": true, "inputs": [], "name": "checkcontractbalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "userInfo", "outputs": [{ "name": "upline", "type": "address" }, { "name": "deposit_time", "type": "uint40" }, { "name": "deposit_amount", "type": "uint256" }, { "name": "UserID", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_upline", "type": "address" }, { "name": "packageId", "type": "uint256" }], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addres", "type": "address" }], "name": "userexists", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "address" }], "name": "pool_users_refs_deposits_sum", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_upline", "type": "address" }], "name": "_chakUpline", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "userAddress", "type": "address[]" }, { "name": "_amount", "type": "uint256[]" }], "name": "multiple_transfer_ROI", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "last_id", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }, { "name": "_addr", "type": "address" }], "name": "transferROI", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "users", "outputs": [{ "name": "Id", "type": "uint256" }, { "name": "upline", "type": "address" }, { "name": "referrals", "type": "uint256" }, { "name": "deposit_amount", "type": "uint256" }, { "name": "deposit_time", "type": "uint40" }, { "name": "total_deposits", "type": "uint256" }, { "name": "total_payouts", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "levels", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "ref_bonuses", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_Address", "type": "address" }], "name": "getuserId", "outputs": [{ "name": "userid", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "total_deposited", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "total_users", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_chakowner", "outputs": [{ "name": "_owneraddress", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_owner", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "addr", "type": "address" }, { "indexed": true, "name": "upline", "type": "address" }], "name": "Upline", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "addr", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "NewDeposit", "type": "event" }]


let instance = tronWeb.contract(abi, contractAddress);




app.post("/transferROI", async function (req, res) {
  let address = req.body.address;
  let amount = req.body.amount;
  try {
    await instance
      .transferROI(amount, address)
      .send()
      .then((output) => {
        res.send({ success: true, result: output });
      });
  } catch (error) {
    console.log(error);
    res.send({ success: false, result: "transaction Error" });
  }
});

app.get("/getSum", async function (request, response) {
  try {
    let x = request.params.x;
    console.log()
    // let y = request.body.y;
    // let x = 2;
    let y = 3;
    let z = x + y;
    response.send({ success: true, data: z })
  } catch (error) {
    console.log(error);
    res.send({ success: false, result: "transaction Error" });
  }
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Server started at 4000...");
});
//  Asif  complaint branch
//  System Director