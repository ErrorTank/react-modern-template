import {offlineApi} from "../api";

const getTransactions = () => offlineApi.get("/api/transactions");

const createTransaction = (data) => {
    console.log(data);
    return offlineApi.post("/api/transaction", data)
};

export const cryptoApi = {
    getTransactions,
    createTransaction
};