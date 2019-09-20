import React from "react";
import {PageTitle} from "../../common/page-title/page-title";
import {MainLayout} from "../../layout/main-layout/main-layout";
import {transCart} from "../../../common/states/common";

export class CreateBlockRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    };
    render(){
        let cart = transCart.getState();
        return(
            <MainLayout>
                <PageTitle
                    title={"Create block"}
                >
                    <div className="create-block-route">
                        <p className="p-title">Create block</p>
                        <div className="container mt-5">
                            <div className="wrapper">
                                <div className="border-block">
                                    {cart.length ? cart.map(each => {
                                            return (
                                                <div className="cart-item" key={each.id}>
                                                    <div className="label">Hash: </div>
                                                    <div className="value">{each.id}</div>
                                                </div>
                                            )
                                        }) : (
                                            <p className="p-3 empty-notify">No transaction</p>
                                    )}

                                </div>
                                <div className="border-block">
                                    <div className={"create-form"}>
                                        <div className="form-section row">
                                            <label className="col-4">Sender</label>
                                            <input type="text" value={sender}
                                                   className="col-8"
                                                   onChange={e => this.setState({tranData: {...tranData, sender: e.target.value}})}/>

                                        </div>
                                        <div className="form-section row">
                                            <label className="col-4">Receiver</label>
                                            <input type="text" value={receiver}
                                                   className="col-8"
                                                   onChange={e => this.setState({tranData: {...tranData, receiver: e.target.value}})}/>
                                        </div>
                                        <div className="form-section row">
                                            <label className="col-4">Amount</label>
                                            <input type="number" value={amount}
                                                   className="col-8"
                                                   onChange={e => this.setState({tranData: {...tranData, amount: e.target.value}})}/>
                                        </div>
                                        <div className="row">
                                            <button className="submit-btn btn btn-block col" onClick={this.createTransaction}>Create</button>

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