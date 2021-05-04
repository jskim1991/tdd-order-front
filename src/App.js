import OrderListView from './OrderListView'
import OrderDetailView from './OrderDetailView'
import { Route, Switch } from 'react-router-dom'

function App() {
    return (
        <div className='App'>
            <Switch>
                <Route path='/' exact component={OrderListView} />
                <Route path='/orders/:orderId' component={OrderDetailView} />
            </Switch>
        </div>
    )
}

export default App
