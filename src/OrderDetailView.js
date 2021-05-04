import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrder } from './tests/OrderRepository'

const OrderDetailView = () => {
    const [items, setItems] = useState([])

    const { orderId } = useParams()

    useEffect(() => {
        getOrder(orderId).then((response) => setItems(response.items))
    }, [])

    return (
        <div>
            <h1>Order Details</h1>
            <h2>Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items &&
                        items.map((it, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{it.product}</td>
                                    <td>{it.price}</td>
                                    <td>{it.quantity}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>

            <h3>Total Price</h3>
            <h4>Total Quantity</h4>
            <h2>Ordered by</h2>
            <h4>Phone</h4>
            <h4>Address</h4>
        </div>
    )
}

export default OrderDetailView
