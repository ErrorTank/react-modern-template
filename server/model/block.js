const sha256 = require("crypto-js/sha256");
const {calculateMerkelRoot} = require("../common/crypto");

const createBlock = (data = {}) => {

    let {nonce = 0, transactions = [], lastHash = "", timeStamp = Date.now()} = data;

    let rootHash = transactions.length === 1 ? transactions[0].id : calculateMerkelRoot(transactions.map(each => each.id));

    let hash = sha256(nonce  + rootHash + timeStamp).toString();

    return {
        getBlockData: () => {
            return {
                hash,
                timeStamp,
                transactions,
                lastHash,
                rootHash,
                nonce
            }
        }

    }
};

module.exports = createBlock;