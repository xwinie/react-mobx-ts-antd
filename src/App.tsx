import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import createBrowserHistory from "history/createBrowserHistory";
import {Route, Router} from "react-router-dom";

import auth from "./model/auth";
import Index from "./view/index";
// import Main from "./view/main/main";
// import Login from "./view/login/login";


const browserHistory = createBrowserHistory();

const stores = {
    // Key can be whatever you want
    // ...other stores
    auth: auth
};



ReactDOM.render(
    <Provider {...stores}>
        <Router history={browserHistory}>
            <Route path="/" component={Index}/>
            {/*<Switch>*/}
            {/*<Route exact path="/" component={Login}/>*/}
            {/*<Provider {}>*/}
            {/*<Route path="/home" component={Main}/>*/}
            {/*</Provider>*/}
            {/*</Switch>*/}
        </Router>
    </Provider>,
    document.getElementById('app') as HTMLElement
);