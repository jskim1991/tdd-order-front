import {getAllOrders} from "./tests/OrderRepository";
import {useEffect, useState} from "react";

const OrderListView = () => {

    const [orders, setOrders] = useState([])
    const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        getAllOrders().then(setOrders)
    }, [])


    const toggleShowDetail = (orderId) => {
        setShowDetail(true);
        setSelectedId(orderId);
    }

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
                    Array.isArray(orders) ?
                        orders.map((o) => {
                            return (
                                <tr key={o.id} onClick={() => toggleShowDetail(o.id)}>
                                    <td>{o.id}</td>
                                    <td>{o.price}</td>
                                </tr>
                            )
                        }) : null
                }
                </tbody>
            </table>

            {
                showDetail ?
                (<div>
                    <p>Order Detail: {selectedId}</p>
                </div>)
                : null
            }

        </div>
    )
}

export default OrderListView;