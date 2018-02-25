import {Provider} from "mobx-react";
import * as React from "react";
import User from "./User"
import store from "../../model/user";

const App = () => (
    <Provider user={store}>
        <User/>
    </Provider>
);

export default App;

