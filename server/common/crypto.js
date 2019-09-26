const sha256 = require("crypto-js/sha256");

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
    if (trans.length === 1) {
        return trans[0];
    }
    return calculateMerkelRoot(splitArray(trans.map(each => each)).map(([h1, h2]) => hashPair(h1, h2)));
};


const verifySignature = (keyPair, transaction) => {
    let {sender, receiver, amount, signature} = transaction;
    return keyPair.verify(sender + " " + receiver + " " + amount, signature, "utf8", "base64")
};

const isGenesisBlock = ({nonce, transactions, lastHash, rootHash, hash, timeStamp}) => {
    return nonce === 0 && transactions.length === 0 && lastHash === "" && sha256(nonce + rootHash + timeStamp).toString() === hash
};

const isValidBlock = ({hash, nonce, lastHash, rootHash, transactions, timeStamp}) => {
    let isValid = sha256(nonce  + rootHash + timeStamp).toString() === hash && calculateMerkelRoot(transactions.map(each => each.id)) === rootHash;
    return {
        isValid,
        extra: hash
    };
};

const verifyBlockchain = (blockchain) => {
    let {chain} = blockchain;
    if (!isGenesisBlock(chain[0])) {
        return {
            isValid: false,
            errType: "invalid-genesis",
            extra: {
                hash: chain[0].hash
            }
        };
    }
    for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const previousBlock = chain[i - 1];
        let checkBlock = isValidBlock(block);
        if (!checkBlock.isValid)
            return {
                isValid: false,
                errType: "invalid-block",
                extra: {
                    hash: checkBlock.extra
                }
            };
        if (block.lastHash !== previousBlock.hash)
            return {
                isValid: false,
                errType: "invalid-relation",
                extra: {
                    hash: [previousBlock.hash, block.hash]
                }
            };

    }
    return {
        isValid: true
    };

};

module.exports = {
    verifySignature,
    verifyBlockchain,
    hashPair,
    splitArray,
    calculateMerkelRoot
};
