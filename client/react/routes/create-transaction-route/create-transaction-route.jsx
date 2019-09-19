import React from "react";
import {cryptoApi} from "../../../api/common/crypto-api";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {PageTitle} from "../../common/page-title/page-title";


export class CreateTransactionRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // transPool: [],
            creating: false,
            tranData: {
                sender: "",
                receiver: "",
                amount: 0
            }
        };
        // cryptoApi.getTransactions().then(transPool => this.setState({transPool, loadPool: false}));
    };

    createTransaction = () => {
        let {tranData} = this.state;
        cryptoApi.createTransaction(tranData).then(({newTran}) => this.setState({transPool: this.state.transPool.concat(newTran)}));
    };

    render() {
        let { creating, tranData} = this.state;
        let {sender, receiver, amount} = tranData;
        return (
            <MainLayout>
                <PageTitle
                    title={"Create transaction"}
                >
                <div className="create-transaction-route">
                    {creating && (
                        <div className="loading-overflow">
                            Creating...
                        </div>
                    )}
                    {/*<div className="trans-pool">*/}
                        {/*{transPool.length ?*/}
                            {/*transPool.map((each) => (*/}
                                {/*<div key={each.hash} className="transaction">*/}
                                    {/*<div className="info-block">*/}
                                        {/*<span className="label">Block hash</span>*/}
                                        {/*<span className="value">{each.hash}</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="info-block">*/}
                                        {/*<span className="label">Sender</span>*/}
                                        {/*<span className="value">{each.sender}</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="info-block">*/}
                                        {/*<span className="label">Receiver</span>*/}
                                        {/*<span className="value">{each.receiver}</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="info-block">*/}
                                        {/*<span className="label">Amount</span>*/}
                                        {/*<span className="value">{each.amount}</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*)) :*/}
                            {/*<p className="empty-pool">No transactions</p>}*/}
                    {/*</div>*/}
                    <div className={"create-form"}>
                        <div className="form-section row">
                            <label className="col-4">Sender</label>
                            <input type="text" value={sender}
                                   className="col-8"
                                   onChange={e => this.setState({tranData: {...tranData, sender: e.target.value}})}/>

                        </div>
                        <div className="form-section row">
                            <label className="col-4">Receiver</label>
                            <input type="text" value={receiver}
                                   className="col-8"
                                   onChange={e => this.setState({tranData: {...tranData, receiver: e.target.value}})}/>
                        </div>
                        <div className="form-section row">
                            <label className="col-4">Amount</label>
                            <input type="number" value={amount}
                                   className="col-8"
                                   onChange={e => this.setState({tranData: {...tranData, amount: e.target.value}})}/>
                        </div>
                        <div className="row">
                            <button className="submit-btn btn btn-block col" onClick={this.createTransaction}>Create</button>

                        </div>

                    </div>
                </div>
                </PageTitle>
            </MainLayout>
        );
    }
}