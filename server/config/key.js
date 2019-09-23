const fs = require("fs");
const path = require("path");
const NodeRSA = require("node-rsa");


const createKeyPair = () => {
    const publicKey = fs.readFileSync(path.join(__dirname, "./key/public.pem"));
    const privateKey = fs.readFileSync(path.join(__dirname, "./key/private.pem"));
    const key = new NodeRSA();
    key.importKey(publicKey, "public");
    key.importKey(privateKey, "private");
    const keyPair = key.generateKeyPair();
    return {
        getKeyPair: () => keyPair
    }
};

module.exports = createKeyPair();