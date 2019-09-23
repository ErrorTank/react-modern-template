import sha256 from "crypto-js/sha256";

const createTransaction = (data) => {
    let {sender, receiver, amount, signature} = data;
    let timeStamp = Date.now();
    let hash = sha256(amount  + timeStamp).toString();

    return {
        getTransactionData: () => ({
            sender,
            receiver,
            amount,
            signature,
            id: hash
        }),
        getHash: () => hash
    }
};

module.exports = createTransaction;