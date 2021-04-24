import {getAllOrders} from "./tests/OrderRepository";
import {useEffect, useState} from "react";

const OrderListView = (props) => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrders().then(setOrders)
    }, [])


    const toggleShowDetail = (orderId) => {
        props.history.push({pathname: '/' + orderId})
    }

    return (
        <div>
            <h1>Order History</h1>
            <table>
                <caption>Orders</caption>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                {
                    Array.isArray(orders) ?
                        orders.map((o, idx) => {
                            return (
                                <tr key={o.id} onClick={() => toggleShowDetail(o.id)}>
                                    <td>{idx}</td>
                                    <td>{o.id}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{o.price}</td>
                                    <td>
                                        <button id={'order-detail-button-' + o.id}
                                                onClick={() => toggleShowDetail(o.id)}
                                        >More</button>
                                    </td>
                                </tr>
                            )
                        }) : null
                }
                </tbody>
            </table>
        </div>
    )
}

export default OrderListView;