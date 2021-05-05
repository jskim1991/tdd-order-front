import OrderListView from './OrderListView'
import OrderDetailView from './OrderDetailView'
import LoginView from './LoginView'
import { Route, Switch } from 'react-router-dom'
import SignupView from './SignupView'

function App() {
    return (
        <div className='App'>
            <Switch>
                <Route path='/' exact component={OrderListView} />
                <Route path='/orders/:orderId' component={OrderDetailView} />
                <Route path='/login' component={LoginView} />
                <Route path='/signup' component={SignupView} />
            </Switch>
        </div>
    )
}

export default App
