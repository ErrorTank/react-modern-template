import React from "react";
import {MainLayout} from "../../layout/main-layout/main-layout";
import validator from "validator"
import SHA256 from "crypto-js/sha256"
import {wait} from "../../../common/utils";
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

export class Test1Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            sign: "",
            hash: "",
            validate: 2,
            testSignature: ""
        };
        this.getKeypair();

    };

    getKeypair = async () => {
        await wait(0);
        this.keyPair = key.generateKeyPair();

    }

    handleSign = () => {
        let {msg} = this.state;
        let sign = this.keyPair.sign(msg, "base64");
        this.setState({sign,})
    };

    handleHash = () => {
        let {msg} = this.state;
        let hash = SHA256(msg).toString();
        this.setState({hash})
    };

    handleVerify = () => {
        let {testSignature, msg} = this.state;
        this.setState({validate: this.keyPair.verify(msg, testSignature, "utf8", "base64") ? 1 : 0})
    }

    render() {
        let {msg, sign, hash, testSignature, validate} = this.state;
        return (
            <MainLayout
                test={true}
            >
                <div className="test-1-route container">
                    <div style={{marginBottom: "15px"}}>
                        <label htmlFor="rootVal" style={{color: "#1a1a1a", width: "200px", verticalAlign: "top"}}>Message</label>
                        <input name="rootVal" type="text" value={msg}
                               onChange={e => this.setState({msg: e.target.value.trim()})}/>
                        <button onClick={this.handleHash}>Hash</button>
                        <button onClick={this.handleSign}>Sign</button>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label htmlFor="sign-value" style={{color: "#1a1a1a", width: "200px", verticalAlign: "top"}}>Signature</label>
                        <textarea name="sign-value"
                                  value={sign}
                                  readOnly={true}

                        >

                       </textarea>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label htmlFor="hash-value" style={{color: "#1a1a1a", width: "200px", verticalAlign: "top"}}>Hash value</label>
                        <textarea name="hash-value"
                                  value={hash}
                                  readOnly={true}

                        >

                       </textarea>
                    </div>
                    <div style={{marginBottom: "15px"}}>

                        <label htmlFor="testSign" style={{color: "#1a1a1a", width: "200px", verticalAlign: "top"}}>Test signature</label>
                        <textarea name="testSign" value={testSignature}
                               onChange={e => this.setState({testSignature: e.target.value.trim()})}/>
                        <button onClick={this.handleVerify} style={{verticalAlign: "top"}}>Verify</button>
                        {validate !== 2 && (
                            <span style={{color: "#1a1a1a"}}>{validate === 1 ? "Valid" : "Invalid"}</span>
                        )}
                    </div>
                </div>
            </MainLayout>
        );
    }
}