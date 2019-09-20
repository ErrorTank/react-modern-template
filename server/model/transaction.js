import sha256 from "crypto-js/sha256";

const createTransaction = (data) => {
    let {sender, receiver, amount} = data;
    let timeStamp = Date.now();
    let hash = sha256(amount  + timeStamp).toString();

    return {
        getTransactionData: () => ({
            sender,
            receiver,
            amount,
            id: hash
        }),
        getHash: () => hash
    }
};

module.exports = createTransaction;