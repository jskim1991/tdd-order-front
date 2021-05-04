import React from 'react'
import ReactDOM from 'react-dom'
import OrderListViewTest from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <OrderListViewTest />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
)
