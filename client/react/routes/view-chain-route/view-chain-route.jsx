import React from "react";
import {PageTitle} from "../../common/page-title/page-title";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {cryptoApi} from "../../../api/common/crypto-api";
import moment from "moment"

export class ViewChainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            loading: true
        };
        cryptoApi.getBlockchainInfo().then(({info}) => {
            this.setState({info, loading: false})
        });
    };

    render() {
        let {loading, info} = this.state;
        return (
            <MainLayout>
                <PageTitle
                    title={"View chain"}
                >
                    <div className="view-chain-route">
                        <p className="p-title">Blockchain info</p>
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
                                                        <span className="value">{each.hash}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Last hash</span>
                                                        <span className="value">{each.lastHash}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Merkel root hash</span>
                                                        <span className="value">{each.rootHash}</span>
                                                    </div>
                                                    <div className="info-block">
                                                        <span className="label">Timestamp</span>
                                                        <span
                                                            className="value">{moment(each.timeStamp).format("DD/MM/YYYY HH:mm:ss")}</span>
                                                    </div>
                                                    {!!each.transactions.length && (
                                                        <>
                                                            <p className="trans-title">Transactions ({each.transactions.length} found)</p>
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