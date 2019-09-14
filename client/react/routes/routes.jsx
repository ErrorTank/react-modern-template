import React from "react";
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const keyPair = key.generateKeyPair();
console.log(keyPair)


export class MainRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rootVal: "",
            hash: "",
            newHash: "",
            decode: ""
        };
    };

    handleHash = () => {
        let {rootVal} = this.state;
        let hash = keyPair.encrypt(rootVal, "base64");
        this.setState({hash, newHash: hash})

    };

    handleDecrypt = () => {
        let {newHash} = this.state;
        let text= keyPair.decrypt(newHash, "utf8")
        this.setState({decode: text});
    };

    render(){
        let {rootVal, hash, newHash, decode} = this.state;

        return(
            <div id="main-route">
                <label htmlFor="rootVal" style={{color: "red", marginRight: "50px"}}>Encrypt</label>
                <input name="rootVal" type="text" value={rootVal} onChange={e => this.setState({rootVal: e.target.value})}/>
                <button onClick={this.handleHash}>Encrypt</button>
                <div style={{color: 'black', fontSize: "20px", whiteSpace: "pre-wrap", maxWidth: "300px"}}>{hash}</div>
                <label htmlFor="decodeVal" style={{color: "red", marginRight: "50px"}}>Decrypt</label>
                <input name="decodeVal" type="text" value={newHash} onChange={e => this.setState({newHash: e.target.value})}/>
                <button onClick={this.handleDecrypt}>Decrypt</button>
                <div style={{color: 'black', fontSize: "20px", whiteSpace: "pre-wrap", maxWidth: "300px"}}>{decode}</div>
            </div>
        );
    }
}