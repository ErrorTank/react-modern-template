const fs = require("fs")
const path = require("path");

const createPool = () => {
    let tempArr = fs.readFileSync(path.resolve(__dirname, "../draft/pool.txt"), 'utf8');
    let transactions = tempArr ? JSON.parse(tempArr) : [];
    return {
        addTrans: trans => {

            transactions.push(trans);
            let existed = fs.readFileSync(path.resolve(__dirname, "../draft/pool.txt"), 'utf8');

            let temp = existed ? JSON.parse(existed) : [];

            temp.push(trans);

            fs.writeFileSync(path.resolve(__dirname, "../draft/pool.txt"), JSON.stringify(temp));
        },
        getTrans: () => transactions,

    }
};

const Pool = createPool();

module.exports = Pool;