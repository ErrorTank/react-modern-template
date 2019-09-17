import {offlineApi} from "../api";

const getTransactions = () => fetch("/api/transactions", {
    method: "get",

});

const createTransaction = (data) => {
    console.log(data);
    return fetch("/api/transaction", {
        method: "post",
        body: JSON.stringify(data)

    })
};

export const cryptoApi = {
    getTransactions,
    createTransaction
};