import React from "react";
import {cryptoApi} from "../../../api/common/crypto-api";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {PageTitle} from "../../common/page-title/page-title";
import {customHistory} from "../routes";


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

    };

    createTransaction = () => {
        let {tranData} = this.state;
        cryptoApi.createTransaction(tranData).then(({newTran}) => customHistory.push("/")).catch(err => console.log(err));
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
                    <p className="p-title">Create transaction</p>
                    {creating && (
                        <div className="loading-overflow">
                            Creating...
                        </div>
                    )}

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