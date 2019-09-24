const fs = require("fs");
const path = require("path");
const createBlock = require("./block");

const createBlockchain = (data) => {
  let {name, difficulty} = data;
  let tempArr = fs.readFileSync(path.resolve(__dirname, "../draft/chain.txt"), 'utf8');

  let chain = tempArr ? JSON.parse(tempArr) : [createBlock().getBlockData()];
  return {
    getBlockchainInfo: () => ({name, chain, difficulty}),
    addBlock: ({transactions, timeStamp, nonce}) => {
      let currentBlock = chain[chain.length - 1];
      let newBlock = createBlock({
        transactions, timeStamp, nonce, lastHash: currentBlock.hash
      });
      chain.push(newBlock.getBlockData());
      fs.writeFileSync(path.resolve(__dirname, "../draft/chain.txt"), JSON.stringify(chain));
    }
  }
};

const Blockchain = createBlockchain({name: "Kappa", difficulty: 10});

module.exports = Blockchain;
