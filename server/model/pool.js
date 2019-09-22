const fs = require("fs")
const path = require("path");

const createPool = () => {
    let tempArr = fs.readFileSync(path.resolve(__dirname, "../draft/pool.txt"), 'utf8');
    let transactions = tempArr ? JSON.parse(tempArr) : [];
    return {
        addTrans: trans => {

            transactions.push(trans);


            fs.writeFileSync(path.resolve(__dirname, "../draft/pool.txt"), JSON.stringify(transactions));
        },
        getTrans: () => transactions,
        removeTrans: list => {
            transactions = transactions.filter(each => !list.find(item => item.id === each.id));
            fs.writeFileSync(path.resolve(__dirname, "../draft/pool.txt"), JSON.stringify(transactions));
        }

    }
};

const Pool = createPool();

module.exports = Pool;