import { Provider } from "mobx-react";
import * as React from "react";
import Client from "./Client"
import store from "../../model/client";

const App = () => (
    <Provider client={store}>
        <Client />
    </Provider>
);

export default App;

