const createPool = () => {
 let transactions = [];
 return {
     addTrans: trans => transactions.push(trans),
     getTrans: () => transactions,

 }
};

const Pool = createPool();

module.exports = Pool;