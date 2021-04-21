import {getAllOrders} from "./tests/OrderRepository";
import {useEffect, useState} from "react";

const OrderListView = () => {

    const [orders, setOrders] = useState([])
    const [showText, setShowText] = useState(false)

    useEffect(() => {
        getAllOrders().then(setOrders);
    }, [])

    return (
        <>
            {
                orders.map((o,idx) =>
                    <div key={idx}>{o.id}</div>)
            }
            <button onClick={() => setShowText(true)}>Add order</button>
            {
                showText ? <div>ADDED</div> : null
            }
        </>
    )
}

export default OrderListView;