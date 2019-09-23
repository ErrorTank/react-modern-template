const express = require('express');
const router = express.Router();
const Pool = require("../model/pool");
const Blockchain = require("../model/blockchain");
const createTransaction = require("../model/transaction");
const {getKeyPair} = require("../config/key");
const keyPair = getKeyPair();

module.exports = () => {
    router.post("/transaction", (req,res) => {
        let newTran = createTransaction({...req.body}).getTransactionData();
        Pool.addTrans(newTran);
        return res.status(200).json({newTran});
    });
    router.get("/transactions", (req,res) => {
        return res.status(200).json({transPool: Pool.getTrans()});
    });

    router.get("/blockchain/info", (req,res) => {
        return res.status(200).json({info: Blockchain.getBlockchainInfo()});
    });
    router.post("/blockchain/add-block", (req,res) => {
        let {transactions, hash, timeStamp, nonce} = req.body;
        Pool.removeTrans(transactions);
        Blockchain.addBlock({hash, timeStamp, transactions, nonce});
        return res.status(200).json({info: Blockchain.getBlockchainInfo()});
    });

    router.post("/sign-transaction", (req,res) => {
        let {sender, receiver, amount} = req.body;
        return res.status(200).json({signature: keyPair.sign(sender + " " + receiver + " " + " " + amount, "base64")})

    });
    return router;
};