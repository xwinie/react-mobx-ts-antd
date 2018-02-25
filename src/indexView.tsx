import { Provider } from "mobx-react";
import * as React from "react";
import IndexView from "./view"
import store from "./model/auth";

const Index = () => (
    <Provider auth={store}>
        <IndexView />
    </Provider>
);

export default Index;

