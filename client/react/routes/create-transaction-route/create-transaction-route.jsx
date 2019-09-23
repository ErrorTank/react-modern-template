import React from "react";
import {cryptoApi} from "../../../api/common/crypto-api";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {PageTitle} from "../../common/page-title/page-title";
import {customHistory} from "../routes";
import {LoadingInline} from "../../common/loading-inline/loading-inline";


export class CreateTransactionRoute extends React.Component {
    constructor(props) {
        super(props);
        this.mutableTranData = {
            receiver: "",
            amount: 0,
            signature: ""
        };
        this.state = {
            // transPool: [],
            creating: false,
            signing: false,
            tranData: {
                sender: "kappa",
                ...this.mutableTranData
            }
        };

    };

    createTransaction = () => {
        let {tranData} = this.state;
        cryptoApi.createTransaction(tranData).then(({newTran}) => customHistory.push("/")).catch(err => console.log(err));
    };

    handleSign = () => {
        let {tranData} = this.state;
        this.setState({signing: true});
        cryptoApi.signTransaction(tranData).then(({signature}) => {
            this.setState({tranData: {...tranData, signature}, signing: false});
        })
    };

    render() {
        let { creating, tranData, signing} = this.state;

        let {sender, receiver, amount, signature} = tranData;
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
                                   readOnly={true}
                                   onChange={e => this.setState({tranData: {...tranData, sender: e.target.value}})}/>

                        </div>
                        <div className="form-section row">
                            <label className="col-4">Receiver</label>
                            <input type="text" value={receiver}
                                   className="col-8"
                                   readOnly={!!signature}
                                   onChange={e => this.setState({tranData: {...tranData, receiver: e.target.value}})}/>
                        </div>
                        <div className="form-section row">
                            <label className="col-4">Amount</label>
                            <input type="number" value={amount}
                                   className="col-8"
                                   readOnly={!!signature}
                                   onChange={e => this.setState({tranData: {...tranData, amount: e.target.value}})}/>
                        </div>
                        <div className="form-section row">
                            <label className="col-4">Signature</label>
                            {signature ? (
                                <div className="col-8">
                                    <p className="signature">{signature}</p>
                                    <button className="btn sign-btn btn-danger btn-block mt-3"
                                            onClick={() => this.setState({tranData: {...tranData,...this.mutableTranData}})}
                                    >Reset</button>
                                </div>

                            ) : (
                                <button className="btn btn-primary sign-btn col-8"
                                        disabled={!amount || !receiver || !sender}
                                        onClick={this.handleSign}
                                >

                                    {signing && (
                                        <LoadingInline/>
                                    )}

                                    Sign
                                </button>
                            )}

                        </div>
                        <div className="row">
                            <button className="submit-btn btn btn-block col"
                                    onClick={this.createTransaction}
                                    disabled={!sender || !receiver || !amount || !signature}
                            >
                                Create
                            </button>

                        </div>

                    </div>
                </div>
                </PageTitle>
            </MainLayout>
        );
    }
}