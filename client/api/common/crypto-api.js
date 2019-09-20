import {offlineApi} from "../api";

const getTransactions = () => offlineApi.get("/transactions");

const createTransaction = (data) => {
    console.log(data);
    return offlineApi.post("/transaction", data)
};

export const cryptoApi = {
    getTransactions,
    createTransaction
};