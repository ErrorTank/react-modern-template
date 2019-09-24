const verifySignature = (keyPair, transaction) => {
    let {sender, receiver, amount, signature} = transaction;
    return keyPair.verify(sender + " " + receiver + " " + amount, signature, "utf8" ,"base64")
};

module.exports = {
    verifySignature
};
