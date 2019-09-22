const express = require('express');
const router = express.Router();
const Pool = require("../model/pool");
const Blockchain = require("../model/blockchain");
const createTransaction = require("../model/transaction");

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
    return router;
};