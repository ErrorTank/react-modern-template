import React, {Fragment} from "react";
import classnames from "classnames";
import moment from "moment"
import {Tran} from "./Tran";

export class Block extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        let {each, isValid, extra, focus, errType} = this.props;

        return (
            <div
                className={classnames("block", {
                    invalid: isValid === false && (Array.isArray(extra.hash) ? extra.hash.includes(each.hash) : extra.hash === each.hash),
                    "relation-not-match": isValid === false && Array.isArray(extra.hash) && extra.hash[0] === each.hash
                })}>
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
                            {each.transactions.map(tran => <Tran key={tran.id} tran={tran}/>)}
                        </div>
                    </>
                )

                }
            </div>
        );
    }
}