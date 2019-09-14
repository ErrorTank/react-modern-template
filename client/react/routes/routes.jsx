import React from "react";
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const keyPair = key.generateKeyPair();
import validator from "validator"
import SHA256 from "crypto-js/sha256"


export class MainRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rootVal: "",
            encrypted: "",
            newEncrypted: "",
            decode: ""
        };
    };

    handleEncrypt = () => {
        let {rootVal} = this.state;
        let encrypted = keyPair.encrypt(rootVal, "base64");
        this.setState({encrypted, newEncrypted: encrypted})

    };

    handleDecrypt = () => {
        let {newEncrypted} = this.state;
        let text= keyPair.decrypt(newEncrypted, "utf8");
        this.setState({decode: text});
    };

    render(){
        let {rootVal, encrypted, newEncrypted, decode} = this.state;

        return(
            <div id="main-route">
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="rootVal" style={{color: "white", width: "200px"}}>Encrypt</label>
                    <input name="rootVal" type="text" value={rootVal} onChange={e => this.setState({rootVal: e.target.value})}/>
                    <button onClick={this.handleEncrypt}>Encrypt</button>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Encrypt Value</label>
                    <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{encrypted}</div>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="decodeVal" style={{color: "white", width: "200px"}}>Decrypt</label>
                    <input name="decodeVal" type="text" value={newEncrypted} onChange={e => this.setState({newEncrypted: e.target.value})}/>
                    <button onClick={this.handleDecrypt}>Decrypt</button>
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Decrypt Value</label>
                    <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{decode}</div>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="hashVal" style={{color: "white", width: "200px"}}>Hashing</label>
                    <input name="hashVal" type="text" value={newEncrypted} onChange={e => this.setState({newEncrypted: e.target.value})}/>
                    <button onClick={this.handleDecrypt}>Hash</button>
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Decrypt Value</label>
                    <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{decode}</div>
                </div>
            </div>
        );
    }
}