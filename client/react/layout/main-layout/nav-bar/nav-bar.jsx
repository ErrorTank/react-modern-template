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
            label: "View chain",
            url: "/"
        },
        {
            label: "Create transaction",
            url: "/create-transaction"
        },{
            label: "Create block",
            url: "/create-block"
        },
    ];

    render(){
        console.log(customHistory)
        return(
            <div className="nav-bar">
                <div className="container">
                    <div className="wrapper">
                        <div className="brand">
                            Blockchain
                        </div>
                        <div className="navs">
                            {this.navs.map((each) => {
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