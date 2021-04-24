import OrderListView from "./OrderListView";
import {Route, Switch} from "react-router";
import OrderDetailView from "./OrderDetailView";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={OrderListView}/>
                    <Route path='/:id' component={OrderDetailView}/>
                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;
