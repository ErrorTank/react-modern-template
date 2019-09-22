import elliptic from "elliptic";
const ec = new elliptic.ec("secp256k1");
import SHA256 from "crypto-js/sha256"

export function generatePair() {
    const keypair = ec.genKeyPair();
    window.keypair = keypair;
    return {
        publicKey: keypair.getPublic("hex"),
        privateKey: keypair.getPrivate("hex")
    };
}

export const calculateHash = ({data, nonce, difficulty}) => {
    let timeStamp = Date.now();
    return SHA256(data.map(each => each.id).concat([nonce, timeStamp, difficulty]).join(" ")).toString();
};

export function sign(message, privateKey) {
    try {
        const keypair = ec.keyFromPrivate(privateKey, "hex");
        return keypair.sign(message).toDER("hex");
    } catch (error) {
        return "invalid signature";
    }
}

export function verifySignature(message, signature, publicKey) {
    try {
        const keypair = ec.keyFromPublic(publicKey, "hex");
        return ec.verify(message, signature, keypair);
    } catch (error) {
        return false;
    }
}

const {privateKey, publicKey} = generatePair();

export {
    privateKey, publicKey
}