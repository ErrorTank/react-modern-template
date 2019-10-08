import React from "react";
import ReactDOM from "react-dom"
import {PageTitle} from "../../common/page-title/page-title";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {cryptoApi} from "../../../api/common/crypto-api";
import moment from "moment"
import classnames from "classnames"
import {LoadingInline} from "../../common/loading-inline/loading-inline";
import {Block} from "./Block";

export class Test4Route extends React.Component {
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
            <MainLayout
                test={true}
            >
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
                                                <Block
                                                    key={each.hash}
                                                    each={each}
                                                    isValid={isValid}
                                                    extra={extra}
                                                    focus={focus}
                                                    errType={errType}
                                                />
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