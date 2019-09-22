const createBlock = require("./block");

const createBlockchain = (data) => {
  let {name, difficulty} = data;
  let chain = [createBlock().getBlockData()];
  return {
    getBlockchainInfo: () => ({name, chain, difficulty})
  }
};

const Blockchain = createBlockchain({name: "Kappa", difficulty: 10});

module.exports = Blockchain;
