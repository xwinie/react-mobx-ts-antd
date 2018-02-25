import {Provider} from "mobx-react";
import * as React from "react";
import Role from "./Role"
import store from "../../model/role";

const App = () => (
    <Provider role={store}>
        <Role/>
    </Provider>
);

export default App;

