import {getAllOrders} from "./tests/OrderRepository";
import {useEffect, useState} from "react";

const OrderListView = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrders().then(setOrders);
    }, [])

    return (
        <div>
            <table>
                <caption>Orders</caption>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orders.map((o) => {
                        return (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.price}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default OrderListView;