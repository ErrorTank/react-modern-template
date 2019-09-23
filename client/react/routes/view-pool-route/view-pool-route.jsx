import React from "react";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {PageTitle} from "../../common/page-title/page-title";
import {cryptoApi} from "../../../api/common/crypto-api";
import {KComponent} from "../../common/k-component";
import {transCart} from "../../../common/states/common";
import moment from "moment";

export class ViewPoolRoute extends KComponent {
    constructor(props) {
        super(props);
        this.state = {
            transPool: [],
            loading: true
        };
        this.onUnmount(transCart.onChange((nextState, oldState) => {
            this.forceUpdate();

        }));

        cryptoApi.getTransactions().then(({transPool}) =>{
            this.setState({transPool, loading: false})
        });

    };

    // componentDidMount() {
    //     transCart.setState([]);
    // }

    handleClickBtn = (trans, isAdded) => {
        let curState = transCart.getState();
        if(!isAdded){

            transCart.setState(curState.concat(trans));
            return;
        }
        transCart.setState(curState.filter(each => each.id !== trans.id));


    };


    render() {
        let {loading, transPool} = this.state;
        let cart = transCart.getState();

        return (
            <MainLayout>
                <PageTitle
                    title={"View pool"}
                >
                    <div className="view-chain-route">

                        {loading && (
                            <div className="loading-overflow">
                                Loading...
                            </div>
                        )}
                        <div className="trans-pool">
                            <p className="p-title">Transaction pool</p>
                            {transPool.length ?
                                transPool.map((each) => {
                                    let isAdded = cart.find(item => item.id === each.id);
                                    return (
                                        <div key={each.id} className="transaction">
                                            <div className="info-block">
                                                <span className="label">Trans hash</span>
                                                <span className="value">{each.id}</span>
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
                                            <div className="info-block">
                                                <span className="label">Signature</span>
                                                <span className="value">{each.signature}</span>
                                            </div>
                                            <div className="info-block">
                                                <span className="label">Created</span>
                                                <span className="value text-danger">{moment(each.timeStamp).format("HH:mm:ss MMM DD YYYY")}</span>
                                            </div>
                                            <div className="actions">
                                                <button className="btn btn-primary btn-lg"
                                                        onClick={() => this.handleClickBtn(each, isAdded)}>
                                                    {isAdded ? "Remove from Cart" : "Add to Cart"}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <p className="empty-pool">No transactions</p>}
                        </div>
                    </div>
                </PageTitle>
            </MainLayout>
        );
    }
}