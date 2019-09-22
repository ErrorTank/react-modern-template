import {offlineApi} from "../api";



export const cryptoApi = {
    getTransactions: (data) => offlineApi.get("/transactions"),
    createTransaction: (data) => {
        console.log(data);
        return offlineApi.post("/transaction", data)
    },
    getBlockchainInfo: () => {
        return offlineApi.get("/blockchain/info")
    }
};