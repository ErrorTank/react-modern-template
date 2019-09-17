const express = require('express');
const router = express.Router();
const Pool = require("../model/pool");
const createTransaction = require("../model/transaction");

module.exports = () => {
    router.get("/transactions", (req,res) => {
        return res.status(200).json({transPool: Pool.getTrans()});
    });
    router.post("/transaction", (req,res) => {
        console.log(req.body)
        let newTran = createTransaction({...req.body}).getTransactionData();
        Pool.addTrans(newTran);
        return res.status(200).json({newTran});
    });
    return router;
};