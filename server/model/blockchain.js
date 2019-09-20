const createTransaction = require("./transaction");

const createBlockchain = (data) => {
  let {name} = data;
  let blocks = [createTransaction()];
};