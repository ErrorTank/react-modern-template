import sha256 from "crypto-js/sha256";

const createBlock = (data = {}) => {

    let {nonce = 0, transactions = [], lastHash = "", timeStamp = Date.now()} = data;
    let hashPair = (hash1, hash2) => {
        return sha256(hash1 + hash2).toString();
    };
    let splitArray = arr => {
        let arrClone = [...arr];
        if (arrClone.length % 2 !== 0) {
            arrClone.push(arrClone[arrClone.length - 1]);

        }
        let returned = [];
        for (let i = 0; i < arrClone.length - 1; i += 2) {
            returned.push([arrClone[i], arrClone[i + 1]]);
        }
        return returned;
    };

    let calculateMerkelRoot = (trans) => {
        if (trans.length === 0) {
            return null;
        }
        if(trans.length === 1){
            return trans[0];
        }
        return calculateMerkelRoot(splitArray(trans.map(each => each)).map(([h1, h2]) => hashPair(h1, h2)));
    };
    let rootHash = transactions.length === 1 ? transactions[0].id : calculateMerkelRoot(transactions.map(each => each.id));

    let hash = sha256(nonce + lastHash + rootHash).toString();

    return {
        getBlockData: () => {
            return {
                hash,
                timeStamp,
                transactions,
                lastHash,
                rootHash
            }
        }

    }
};

module.exports = createBlock;