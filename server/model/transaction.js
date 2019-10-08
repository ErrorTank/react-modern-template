import sha256 from "crypto-js/sha256";

const createTransaction = (data) => {
    let {noteNumber, createdDate, org, category, outdateDate, signature} = data;
    let timeStamp = Date.now();
    let hash = sha256(noteNumber  + timeStamp + createdDate + org + category + outdateDate).toString();

    return {
        getTransactionData: () => ({
            noteNumber, createdDate, org, category, outdateDate,
            timeStamp,
            signature,
            id: hash
        }),
        getHash: () => hash
    }
};

module.exports = createTransaction;