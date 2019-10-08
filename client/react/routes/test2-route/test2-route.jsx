import React from "react";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {PageTitle} from "../../common/page-title/page-title";
import {LoadingInline} from "../../common/loading-inline/loading-inline";
import {cryptoApi} from "../../../api/common/crypto-api";
import {customHistory} from "../routes";

export class Test2Route extends React.Component{
    constructor(props){
        super(props);
        this.mutableTranData = {
            noteNumber: "",
            createdDate: "",
            org: "",
            signature: "",
            category: "",
            outdateDate: ""
        };
        this.state = {
            // transPool: [],
            creating: false,
            signing: false,
            tranData: {
                ...this.mutableTranData
            }
        };
    };


    createTransaction = () => {
        let {tranData} = this.state;
        let sendData = {
            ...tranData,
            createdDate: new Date(tranData.createdDate).getTime(),
            outdateDate: new Date(tranData.outdateDate).getTime()
        }
        cryptoApi.createTransaction(sendData).then(({newTran}) => customHistory.push("/")).catch(err => console.log(err));
    };

    handleSign = () => {
        let {tranData} = this.state;

        this.setState({signing: true});
        let sendData = {
            ...tranData,
            createdDate: new Date(tranData.createdDate).getTime(),
            outdateDate: new Date(tranData.outdateDate).getTime()
        }
        cryptoApi.signTransaction(sendData).then(({signature}) => {
            this.setState({tranData: {...tranData, signature}, signing: false});
        })
    };

    render(){
        let { creating, tranData, signing, } = this.state;

        let {noteNumber, createdDate, org, category, outdateDate, signature} = tranData;

        let temp = !noteNumber || !createdDate || !org || !category || !outdateDate;
        return(
            <MainLayout
                test={true}
            >
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
                                <label className="col-4">So giay chung nhan</label>
                                <input type="text" value={noteNumber}
                                       className="col-8"
                                       onChange={e => this.setState({tranData: {...tranData, noteNumber: e.target.value}})}/>

                            </div>
                            <div className="form-section row">
                                <label className="col-4">Ngay cap</label>
                                <input type="date" value={createdDate}
                                       className="col-8"
                                       onChange={e => this.setState({tranData: {...tranData, createdDate: e.target.value}})}/>
                            </div>
                            <div className="form-section row">
                                <label className="col-4">To chuc cap</label>
                                <input type="text" value={org}
                                       className="col-8"
                                       onChange={e => this.setState({tranData: {...tranData, org: e.target.value}})}/>
                            </div>
                            <div className="form-section row">
                                <label className="col-4">Loai san pham</label>

                                <input type="text" value={category}
                                       className="col-8"
                                       onChange={e => this.setState({tranData: {...tranData, category: e.target.value}})}/>
                            </div>
                            <div className="form-section row">
                                <label className="col-4">Ngay het han</label>
                                <input type="date" value={outdateDate}
                                       className="col-8"
                                       onChange={e => this.setState({tranData: {...tranData, outdateDate: e.target.value}})}/>
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
                                            disabled={temp}
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
                                        disabled={temp || !signature}
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