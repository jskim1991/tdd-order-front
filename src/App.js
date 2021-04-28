import OrderListView from './OrderListView'
import OrderDetailView from './OrderDetailView'

function App() {
    return (
        <div className='App'>
            <OrderListView />

            {/* <BrowserRouter> */}
            {/* <Switch> */}
            {/* <Route path='/' exact component={OrderListView} /> */}
            {/* <Route path='/:id' component={OrderDetailView} /> */}
            {/* </Switch> */}
            {/* </BrowserRouter> */}
        </div>
    )
}

export default App
