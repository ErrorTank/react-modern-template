import React from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom"
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
import {CreateTransactionRoute} from "./create-transaction-route/create-transaction-route";
import {MainLayout} from "../layout/main-layout/main-layout";
import {ViewPoolRoute} from "./view-pool-route/view-pool-route";
import {CreateBlockRoute} from "./create-block-route/create-block-route";

export class MainRoute extends React.Component{
    constructor(props){
        super(props);



    };



    render(){


        return(
            <div id="main-route">

                    <Router
                        history={customHistory}
                    >
                        <Switch>
                            <Route exact path={"/"} component={ViewPoolRoute}/>
                            <Route exact path={"/create-transaction"} component={CreateTransactionRoute}/>
                            <Route exact path={"/create-block"} component={CreateBlockRoute}/>
                        </Switch>
                    </Router>

            </div>
        );
    }
}