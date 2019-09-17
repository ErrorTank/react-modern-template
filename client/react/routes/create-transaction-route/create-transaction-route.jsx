import React from "react";
import {cryptoApi} from "../../../api/common/crypto-api";


export class CreateTransactionRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            transPool: [],
            loadPool: true,
            tranData: {
                sender: "",
                receiver: "",
                amount: 0
            }
        };
        cryptoApi.getTransactions().then(transPool => this.setState({transPool, loadPool: false}));
    };

    createTransaction = () => {
        let {tranData} = this.state;
        cryptoApi.createTransaction(tranData).then(({newTran}) => this.setState({transPool: this.state.transPool.concat(newTran)}));
    };

    render(){
        let {transPool, loadPool, tranData} = this.state;
        let {sender, receiver, amount} = tranData;
        return(
            <div className="create-transaction-route">
                {loadPool && (
                    <div className="loading-overflow">
                        Loading...
                    </div>
                )}
                <div className="trans-pool">
                    {transPool.length ?
                        transPool.map((each) => (
                            <div key={each.hash} className="transaction">
                                <div className="info-block">
                                    <span className="label">Block hash</span>
                                    <span className="value">{each.hash}</span>
                                </div>
                                <div className="info-block">
                                    <span className="label">Sender</span>
                                    <span className="value">{each.sender}</span>
                                </div>
                                <div className="info-block">
                                    <span className="label">Receiver</span>
                                    <span className="value">{each.receiver}</span>
                                </div>
                                <div className="info-block">
                                    <span className="label">Amount</span>
                                    <span className="value">{each.amount}</span>
                                </div>
                            </div>
                        )) :
                    <p className="empty-pool">No transactions</p>}
                </div>
                <div className={"create-form"}>
                    <div className="form-section">
                        <label>Sender</label>
                        <input type="text" value={sender} onChange={e => this.setState({tranData: {...tranData, sender: e.target.value}})}/>

                    </div>
                    <div className="form-section">
                        <label>Receiver</label>
                        <input type="text" value={receiver} onChange={e => this.setState({tranData: {...tranData, receiver: e.target.value}})}/>
                    </div>
                    <div className="form-section">
                        <label>Amount</label>
                        <input type="number" value={amount} onChange={e => this.setState({tranData: {...tranData, amount: e.target.value}})}/>
                    </div>
                    <button className="submit-btn" onClick={this.createTransaction}>Create</button>
                </div>
            </div>
        );
    }
}