import React from "react";
import {Navbar} from "./nav-bar/nav-bar";

export class MainLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){

        return(
            <div className="main-layout">
                <div className="main-header">
                    <Navbar/>
                </div>
                <div className="main-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}