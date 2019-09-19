import React from "react";
import validator from "validator"
import SHA256 from "crypto-js/sha256"
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

export class OldRoute extends React.Component{
    constructor(props){
        super(props);
        this.initData = {
            rootVal: "",
            encrypted: "",
            newEncrypted: "",
            decrypt: "",
            hash: "",
            newHash: "",
            decryptErr: false,
            validHash: 0,
            sign: "",
            newSign: "",
            validSign: 0,
            checkValue: "",
        };
        this.state={
            ...this.initData
        };
        this.getKeyPair();
    };

    getKeyPair = () => {
        this.keyPair = key.generateKeyPair();
    };


    handleAction = (val, fn) => {
        if(!val){
            return;
        }
        return fn()
    };

    handleEncrypt = () => {
        let {rootVal} = this.state;
        let encrypted = this.keyPair.encrypt(rootVal, "base64");
        this.setState({encrypted, newEncrypted: encrypted, decryptErr: false})

    };

    handleDecrypt = () => {
        let {newEncrypted} = this.state;
        let text = "";
        try{
            text = this.keyPair.decrypt(newEncrypted, "utf8");

        }catch(err){
            this.setState({decryptErr: true})
            return;
        }
        this.setState({decrypt: text, decryptErr: false});

    };

    handleValidateHash = () => {
        let {newHash} = this.state;
        if(!newHash) return;
        this.setState({validHash: validator.isHash(newHash, "sha256") ? 2 : 1})
    };

    handleHash = () => {
        let {rootVal} = this.state;
        let hash = SHA256(rootVal).toString();
        this.setState({hash, newHash: hash, validHash: 0})
    };

    handleSign = () => {
        let {rootVal} = this.state;
        let sign = this.keyPair.sign(rootVal, "base64");
        this.setState({sign, newSign: sign, validSign: 0, checkValue: rootVal})
    };

    handleValidateSign = () => {
        let {newSign, checkValue} = this.state;
        if(!newSign) return;
        this.setState({validSign: this.keyPair.verify(checkValue, newSign, "utf8", "base64") ? 2 : 1})
    };

    render(){
        let {rootVal, encrypted, newEncrypted, decrypt, decryptErr, hash, newHash, validHash, sign, newSign, validSign, checkValue} = this.state;
        return(
            <div>
                <div style={{marginBottom: "20px"}}>
                    <button onClick={() => this.setState({...this.initData})}>Reset</button>
                    <button style={{marginLeft: "50px"}} onClick={() => {
                        this.getKeyPair()}}>Generate new key pair</button>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="rootVal" style={{color: "white", width: "200px"}}>Encrypt</label>
                    <input name="rootVal" type="text" value={rootVal} onChange={e => this.setState({rootVal: e.target.value.trim(), hash: "", encrypted: "", sign: ""})}/>
                    <button onClick={() => this.handleAction(rootVal, this.handleEncrypt)}>Encrypt</button>
                    <button onClick={() => this.handleAction(rootVal, this.handleHash)}>Hash</button>
                    <button onClick={() => this.handleAction(rootVal, this.handleSign)}>Sign</button>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Encrypt Value</label>
                    <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{encrypted}</div>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Hash Value</label>
                    <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{hash}</div>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Sign Value</label>
                    <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{sign}</div>
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="decryptVal" style={{color: "white", width: "200px",verticalAlign: "top" }}>Decrypt</label>
                    <textarea name="decryptVal" value={newEncrypted} onChange={e => this.setState({newEncrypted: e.target.value.trim()})}/>
                    <button onClick={this.handleDecrypt} style={{verticalAlign: "top"}}>Decrypt</button>
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label  style={{color: "white", width: "200px", verticalAlign: "top"}}>Decrypt Value</label>
                    {decryptErr ? <span style={{color: "red"}}>Cannot decrypt</span> :  <div style={{color: 'white', display: "inline-block", fontSize: "20px", wordWrap: "break-word", maxWidth: "500px"}}>{decrypt}</div>}

                </div>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="hashVal" style={{color: "white", width: "200px", verticalAlign: "top"}}>ValidateHash</label>
                    <textarea name="hashVal" value={newHash} onChange={e => this.setState({newHash: e.target.value.trim(), validHash: 0})}/>
                    <button onClick={this.handleValidateHash} style={{verticalAlign: "top"}}>Check</button>
                    {validHash === 2 && <span style={{color: "#28a745", verticalAlign: "top"}}>True<i className="fas fa-check-circle"></i></span> }
                    {validHash === 1 && <span style={{color: "#dc3545", verticalAlign: "top"}}>False<i className="fas fa-times-circle"></i></span> }
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="msg" style={{color: "white", width: "200px", verticalAlign: "top"}}>Message</label>
                    <input name="msg" style={{verticalAlign: "top"}} type="text" value={checkValue} onChange={e => this.setState({checkValue: e.target.value.trim()})}/>
                    <label htmlFor="signVal" style={{color: "white", width: "200px", verticalAlign: "top"}}>ValidateSign</label>
                    <textarea name="signVal" value={newSign} onChange={e => this.setState({newSign: e.target.value.trim(), validSign: 0})}/>
                    <button onClick={this.handleValidateSign} style={{verticalAlign: "top"}}>Check</button>
                    {validSign === 2 && <span style={{color: "#28a745", verticalAlign: "top"}}>True<i className="fas fa-check-circle"></i></span> }
                    {validSign === 1 && <span style={{color: "#dc3545", verticalAlign: "top"}}>False<i className="fas fa-times-circle"></i></span> }
                </div>
            </div>
        );
    }
}