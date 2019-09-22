import React from "react";
import {PageTitle} from "../../common/page-title/page-title";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {transCart} from "../../../common/states/common";
import {cryptoApi} from "../../../api/common/crypto-api";
import hexToBinary from "hex-to-binary"
import {customHistory} from "../routes";
import {calculateHash} from "../../../common/crypto";
import {LoadingInline} from "../../common/loading-inline/loading-inline";
import {wait} from "../../../common/utils";
import moment from "moment"

export class CreateBlockRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...this.getInitialState(),  difficulty: null};
        cryptoApi.getBlockchainInfo().then(({info}) => this.setState({difficulty: info.difficulty}))
    };

    getInitialState = () => {
      return {
          hash: "",
          nonce: 0,
          timeStamp: null,
          validHash: false,
          mining: false,
          adding: false
      }
    };

    handleMine = async () => {
        this.setState({mining: true});
        let {difficulty} = this.state;
        let cart = transCart.getState();
        let nonce = 0;
        let hash, timeStamp;
        do {
            nonce++;
            timeStamp = Date.now();
            hash = calculateHash({data: [...cart], nonce, difficulty});
            await wait(0);
            this.setState({hash, timeStamp, nonce});
        } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));
        this.setState({validHash: true, mining: false});
    };

    handleAddToChain = () => {
        let {hash, timeStamp, nonce} = this.state;
        this.setState({adding: true});
        let cart = transCart.getState();
        transCart.setState([]);
        cryptoApi.addBlock({hash, timeStamp, transactions: [...cart], nonce}).then(() => {
            this.setState({...this.getInitialState()})
        })
    };

    render() {
        let cart = transCart.getState();
        let {hash, nonce, difficulty, validHash, timeStamp, mining, adding} = this.state;
        return (
            <MainLayout>
                <PageTitle
                    title={"Create block"}
                >
                    <div className="create-block-route">
                        <p className="p-title">Create block</p>
                        <div className="container mt-5">
                            <div className="wrapper">
                                <div className="border-block trans">
                                    <div className="p-3">
                                        {cart.length ? cart.map(each => {
                                            return (
                                                <div className="cart-item" key={each.id}>
                                                    <div className="label">Hash:</div>
                                                    <div className="value">{each.id}</div>
                                                </div>
                                            )
                                        }) : (
                                            <>
                                                <p className="empty-notify">No transaction</p>
                                                <button className="submit-btn btn btn-block btn-primary"
                                                        onClick={() => customHistory.push("/")}>Add more
                                                </button>
                                            </>

                                        )}
                                    </div>


                                </div>
                                <div className="border-block">
                                    <div className="p-3">
                                        <div className={"create-form"}>
                                            <div className="form-section row">
                                                <p className="col-4 static-label">Blockchain difficulty</p>
                                                <p className="col-8 static-value">{difficulty || "Loading..."}</p>
                                            </div>
                                            <div className="form-section row">
                                                <p className="col-4 static-label">Nonce</p>
                                                <p className="col-8 static-value">{nonce}</p>
                                            </div>
                                            <div className="form-section row">
                                                <p className="col-4 static-label">Timestamp</p>
                                                <p className="col-8 static-value">{timeStamp ? (
                                                    <>
                                                        {timeStamp}
                                                    (<span className="text-danger"> {moment(new Date(timeStamp)).format("DD/MM/YYYY HH:mm:ss")}</span>)
                                                    </>
                                                ) : "Not mined yet"}</p>
                                            </div>
                                            <div className="form-section row">
                                                <p className="col-4 static-label">Hash</p>
                                                <p className="col-8 static-value">{hash || "Not mined yet"}</p>
                                            </div>
                                            <div className="row">
                                                {!validHash ? (
                                                    <button className="submit-btn btn btn-block btn-primary col"
                                                            disabled={!cart.length || mining}
                                                            onClick={this.handleMine}>Mine block{mining && (
                                                                <LoadingInline/>
                                                    )}
                                                    </button>
                                                ) : (
                                                    <button className="submit-btn btn btn-block btn-success col"
                                                            disabled={!cart.length}
                                                            onClick={this.handleAddToChain}>Block is mined! Add to
                                                        Blockchain{adding && (
                                                            <LoadingInline/>
                                                        )}
                                                    </button>
                                                )}


                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </PageTitle>
            </MainLayout>
        );
    }
}