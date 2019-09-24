import React from "react";
import {PageTitle} from "../../common/page-title/page-title";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {cryptoApi} from "../../../api/common/crypto-api";
import moment from "moment"
import classnames from "classnames"
import {LoadingInline} from "../../common/loading-inline/loading-inline";
import {offlineApi} from "../../../api/api";

export class ViewChainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            loading: true,
            focus: null,
            validatingAll: false
        };
        cryptoApi.getBlockchainInfo().then(({info}) => {
            this.setState({info, loading: false})
        });
    };

    verifyAll = () => {
        this.setState({validatingAll: true})
        cryptoApi.verifyChain().then((data) => {
            this.setState({
                validatingAll: false,
                ...data
            })
        });
    };

    render() {
        let {loading, info, focus, validatingAll, isValid, errType, extra} = this.state;
        console.log(isValid)
        return (
            <MainLayout>
                <PageTitle
                    title={"View chain"}
                >
                    <div className="view-chain-route">
                        <p className="p-title">Blockchain info</p>
                        {(info && info.chain.length) && (
                            <div className="mt-3 mb-5 text-center">
                                <button className="btn btn-info btn-lg btn-validate-all"
                                        disabled={validatingAll}
                                        onClick={this.verifyAll}
                                >
                                    Verify Chain
                                    {validatingAll && (
                                        <LoadingInline/>
                                    )}
                                </button>
                                {(isValid !== null && isValid !== undefined) && isValid ? (
                                    <p className="text-success">Blockchain is valid</p>
                                ) : (
                                    <p className="text-danger">Blockchain is invalid</p>
                                )}
                            </div>
                        )

                        }
                        {loading && (
                            <div className="loading-overflow">
                                Loading...
                            </div>
                        )}
                        {info && (
                            <div className="main-section">
                                <div className="main-info">
                                    <div className="row">
                                        <p className="col-4 label">Blockchain name</p>
                                        <p className="col-8 value">{info.name}</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-4 label">Blockchain Difficulty</p>
                                        <p className="col-8 value">{info.difficulty}</p>
                                    </div>
                                </div>

                                <div className="chain-view">
                                    {info.chain.length ? (
                                        info.chain.map((each) => {
                                            return (
                                                <div key={each.hash} className="block">
                                                    {!each.transactions.length && (
                                                        <div className="special-block">Genesis Block</div>
                                                    )}
                                                    <div className="info-block">
                                                        <span className="label">Block hash</span>
                                                        <span
                                                            className={classnames("value", {active: each.hash === focus})}
                                                            onMouseEnter={() => this.setState({focus: each.hash})}
                                                            onMouseLeave={() => this.setState({focus: null})}
                                                        >{each.hash}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Last hash</span>
                                                        <span
                                                            className={classnames("value", {active: each.lastHash === focus})}
                                                            onMouseEnter={() => this.setState({focus: each.lastHash})}
                                                            onMouseLeave={() => this.setState({focus: null})}
                                                        >{each.lastHash}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Merkel root hash</span>
                                                        <span className="value">{each.rootHash}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Nonce</span>
                                                        <span className="value">{each.nonce}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Timestamp</span>
                                                        <span
                                                            className="value text-danger">{moment(each.timeStamp).format("HH:mm:ss MMM DD YYYY")}</span>
                                                    </div>
                                                    {!!each.transactions.length && (
                                                        <>
                                                            <p className="trans-title">Transactions
                                                                ({each.transactions.length} found)</p>
                                                            <div className="trans">
                                                                {each.transactions.map(tran => (
                                                                    <div className="info-block" key={tran.id}>
                                                                        <span className="label">Transaction hash</span>
                                                                        <span className="value">{tran.id}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )

                                                    }
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p className="empty-chain">No block</p>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </PageTitle>
            </MainLayout>
        );
    }
}