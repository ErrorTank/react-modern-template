const fs = require("fs");
const path = require("path");
const NodeRSA = require("node-rsa");


const createKeyPair = () => {
    const publicKey = fs.readFileSync(path.join(__dirname, "./key/public.pem")).toString();
    const privateKey = fs.readFileSync(path.join(__dirname, "./key/private.pem")).toString();
    const key = new NodeRSA();

    key.importKey(privateKey, "pkcs1-private");
    key.importKey(publicKey, "pkcs1-public");
    return {
        getKeyPair: () => key
    }
};

module.exports = createKeyPair();