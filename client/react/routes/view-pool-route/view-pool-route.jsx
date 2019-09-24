import React from "react";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {PageTitle} from "../../common/page-title/page-title";
import {cryptoApi} from "../../../api/common/crypto-api";
import {KComponent} from "../../common/k-component";
import {transCart} from "../../../common/states/common";
import moment from "moment";
import classnames from "classnames";
import {LoadingInline} from "../../common/loading-inline/loading-inline";

export class ViewPoolRoute extends KComponent {
    constructor(props) {
        super(props);
        this.state = {
            transPool: [],
            loading: true,
            validateMap: {},
            validating: {},
            validatingAll: false
        };
        this.onUnmount(transCart.onChange((nextState, oldState) => {
            this.forceUpdate();

        }));

        cryptoApi.getTransactions().then(({transPool}) => {
            this.setState({transPool, loading: false})
        });

    };

    componentDidMount() {
        transCart.setState([]);
    }

    handleClickBtn = (trans, isAdded) => {
        let curState = transCart.getState();
        if (!isAdded) {

            transCart.setState(curState.concat(trans));
            return;
        }
        transCart.setState(curState.filter(each => each.id !== trans.id));
    };

    validateTransaction = (transaction) => {

        let {validateMap} = this.state;
        if (validateMap.hasOwnProperty(transaction.id))
            return validateMap[transaction.id];

        return 2;
    };

    handleVerifySignature = (transaction) => new Promise((resolve => {
        let {validating} = this.state;
        validating[transaction.id] = true;
        this.setState({validating});
        cryptoApi.verifySignature(transaction).then(({isValid}) => {
            let {validateMap, validating} = this.state;
            validateMap[transaction.id] = isValid ? 1 : 0;
            delete validating[transaction.id];
            console.log(validateMap)
            console.log(validating)
            this.setState({validating, validateMap});
            resolve();
        })
    }));

    verifyAll = () => {
        let {transPool} = this.state;
        let sequence = [];
        this.setState({validatingAll: true});
        for(let transaction of transPool){
            sequence.push(this.handleVerifySignature(transaction))
        }
        Promise.all(sequence).then(() => this.setState({validatingAll: false}))
    };

    render() {
        let {loading, transPool, validating, validatingAll} = this.state;
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
                            {transPool.length && (
                                <div className="mt-3 mb-5 text-center">
                                    <button className="btn btn-info btn-lg btn-validate-all"
                                            disabled={validatingAll}
                                            onClick={this.verifyAll}
                                    >
                                        Verify All
                                        {validatingAll && (
                                            <LoadingInline/>
                                        )}
                                    </button>
                                </div>
                            )

                            }

                            {transPool.length ?
                                transPool.map((each) => {
                                    let isAdded = cart.find(item => item.id === each.id);
                                    let isValid = this.validateTransaction(each);
                                    let isValidating = validating.hasOwnProperty(each.id);
                                    return (
                                        <div key={each.id} className={classnames("transaction",  {
                                            "invalid": isValid === 0,
                                            "valid": isValid === 1,
                                        })}>

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
                                                <span
                                                    className="value text-danger">{moment(each.timeStamp).format("HH:mm:ss MMM DD YYYY")}</span>
                                            </div>
                                            <div className="actions">
                                                {isValid === 1 && (
                                                    <button className="btn btn-primary btn-lg mr-3"
                                                            onClick={() => this.handleClickBtn(each, isAdded)}>
                                                        {isAdded ? "Remove from Cart" : "Add to Cart"}
                                                    </button>
                                                )}

                                                <button className={classnames("btn verify-btn btn-lg", {
                                                    "btn-danger": isValid === 0,
                                                    "btn-success": isValid === 1,
                                                    "btn-info": isValid === 2
                                                })}
                                                        onClick={() => this.handleVerifySignature(each)}
                                                        disabled={isValid === 1 || isValid === 0}
                                                >
                                                    {isValid === 1 && "Valid!"}
                                                    {isValid === 0 && "Invalid!"}
                                                    {isValid === 2 && "Verify signature"}
                                                    {isValidating && (
                                                        <LoadingInline/>
                                                    )}

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