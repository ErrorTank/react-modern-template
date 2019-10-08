import React from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom"
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
import {CreateTransactionRoute} from "./create-transaction-route/create-transaction-route";
import {ViewPoolRoute} from "./view-pool-route/view-pool-route";
import {CreateBlockRoute} from "./create-block-route/create-block-route";
import {Test4Route} from "./view-chain-route/view-chain-route";
import {Test1Route} from "./test1-route/test1-route";
import {Test2Route} from "./test2-route/test2-route";
import {Test3Route} from "./test3-route/test3-route";


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
                            <Route exact path={"/test1"} component={Test1Route}/>
                            <Route exact path={"/test2"} component={Test2Route}/>
                            <Route exact path={"/test3"} component={Test3Route}/>
                            <Route exact path={"/test4"} component={Test4Route}/>
                            <Route exact path={"/create-transaction"} component={CreateTransactionRoute}/>
                            <Route exact path={"/create-block"} component={CreateBlockRoute}/>
                            {/*<Route exact path={"/view-chain"} component={ViewChainRoute}/>*/}
                        </Switch>
                    </Router>

            </div>
        );
    }
}