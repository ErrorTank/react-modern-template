import React from "react";
import classnames from "classnames"
import {customHistory} from "../../../routes/routes";

export class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };

    navs = [
        {
            label: "View pool",
            url: "/"
        },
        {
            label: "Create transaction",
            url: "/create-transaction"
        },{
            label: "Create block",
            url: "/create-block"
        },
        {
            label: "View chain",
            url: "/view-chain"
        },
    ];

    navs2 = [
        {
            label: "View pool",
            url: "/"
        },
        {
            label: "Test1",
            url: "/test1"
        },
        {
            label: "Test2",
            url: "/test2"
        },{
            label: "Test3",
            url: "/test3"
        },
        {
            label: "Test4",
            url: "/test4"
        },
    ];


    render(){
        let navs = this.props.test ? this.navs2 : this.navs;
        return(
            <div className="nav-bar">
                <div className="container">
                    <div className="wrapper">
                        <div className="brand">
                            Blockchain
                        </div>
                        <div className="navs">
                            {navs.map((each) => {
                                return (
                                    <div className={classnames("each-nav", {active: each.url === customHistory.location.pathname})}
                                         onClick={() => customHistory.push(each.url)}
                                         key={each.url}
                                    >
                                        {each.label}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}