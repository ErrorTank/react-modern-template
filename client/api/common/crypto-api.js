import {offlineApi} from "../api";



export const cryptoApi = {
    getTransactions: (data) => offlineApi.get("/transactions"),
    createTransaction: (data) => {
        console.log(data);
        return offlineApi.post("/transaction", data)
    },
    getBlockchainInfo: () => {
        return offlineApi.get("/blockchain/info")
    },
    addBlock: (data) => offlineApi.post("/blockchain/add-block", data),
    signTransaction: (data) => offlineApi.post("/sign-transaction", data),
    verifySignature: data => offlineApi.post("/verify-transaction", data),
    verifyChain: data => offlineApi.post("/verify-blockchain", data)
};