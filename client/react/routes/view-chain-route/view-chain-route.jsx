import React from "react";
import ReactDOM from "react-dom"
import {PageTitle} from "../../common/page-title/page-title";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {cryptoApi} from "../../../api/common/crypto-api";
import moment from "moment"
import classnames from "classnames"
import {LoadingInline} from "../../common/loading-inline/loading-inline";

export class ViewChainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            loading: true,
            focus: null,
            validatingAll: false,
            isValid: null
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

    handleScrollIntoBlock = () => {
        let {extra, info} = this.state;
        let {hash} = extra;
        let {chain} = info;
        let actualHash = Array.isArray(hash) ? hash[0] : hash;
        console.log(actualHash)
        let hashIndex = chain.findIndex(block => block.hash === actualHash);
        console.log(hashIndex)
        let actualBlockElem = ReactDOM.findDOMNode(this.view).querySelector(`.block:nth-child(${hashIndex + 1})`);
        console.log(actualBlockElem)
        actualBlockElem.scrollIntoView({behavior: "smooth"});
    };

    generateChainErrInfo = () => {
        let {extra, errType} = this.state;
        let matcher = {
            "invalid-genesis": {
                errTitle: () => "Genesis block is invalid"
            },
            "invalid-block": {
                errTitle: (hash) => (
                    <>
                        Block
                        <p className="title-link"
                           onClick={this.handleScrollIntoBlock}
                        >{hash.substring(0, 20)}...</p>
                        is invalid
                    </>
                )
            },
            "invalid-relation": {
                errTitle: ([h1, h2]) => (
                    <>
                        Relation between two block
                        <p className="title-link" onClick={this.handleScrollIntoBlock}>{h1.substring(0, 20)}</p>
                        and
                        <p className="title-link" onClick={this.handleScrollIntoBlock}>{h2.substring(0, 20)}</p>
                        is not match
                    </>
                )
            }
        };
        return matcher[errType].errTitle(extra.hash);
    };

    render() {
        let {loading, info, focus, validatingAll, isValid, errType, extra} = this.state;
        console.log(isValid !== null && isValid !== undefined)
        return (
            <MainLayout>
                <PageTitle
                    title={"View chain"}
                >
                    <div className={classnames("view-chain-route", {valid: isValid === true})}>
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
                                {(isValid !== null && isValid !== undefined) && (
                                    <div className="chain-validation">
                                        {isValid ? (
                                            <p className="text-success">Blockchain is valid</p>
                                        ) : (
                                            <div className="text-danger">{this.generateChainErrInfo()}</div>
                                        )}
                                    </div>
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

                                <div className="chain-view" ref={view => this.view = view}>
                                    {info.chain.length ? (
                                        info.chain.map((each) => {
                                            return (
                                                <div key={each.hash}
                                                     className={classnames("block", {invalid: isValid === false && (Array.isArray(extra.hash) ? extra.hash.includes(each.hash) : extra.hash === each.hash), "relation-not-match": isValid === false && Array.isArray(extra.hash) && extra.hash[0] === each.hash})}>
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