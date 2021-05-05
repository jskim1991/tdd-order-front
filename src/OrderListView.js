import { getAllOrders } from './OrderRepository'
import { useEffect, useState } from 'react'

const OrderListView = (props) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrders().then(setOrders)
    }, [])

    const moveToShowDetail = (orderId) => {
        props.history.push({ pathname: '/orders/' + orderId })
    }

    const onChangeSearchText = (event) => {
        if (event.target.value.trim().length > 0 && orders.length > 0) {
            const filteredOrders = orders.filter((order) => {
                let matched = false
                for (let item of order.items) {
                    if (
                        item
                            .toLowerCase()
                            .indexOf(event.target.value.toLowerCase()) !== -1
                    ) {
                        matched = true
                        break
                    }
                }
                return matched
            })
            setOrders(filteredOrders)
        }
    }

    return (
        <div>
            <label htmlFor='search_input'>Search items</label>
            <input
                type='text'
                id='search_input'
                placeholder='Search order here'
                onChange={(event) => onChangeSearchText(event)}
            />
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
                    {orders &&
                        orders.map((order, idx) => {
                            return (
                                <tr
                                    key={order.id}
                                    onClick={() => moveToShowDetail(order.id)}
                                >
                                    <td>{idx}</td>
                                    <td>{order.id}</td>
                                    <td></td>
                                    <td>{order.items}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        <button
                                            type='button'
                                            id={
                                                'order-detail-button-' +
                                                order.id
                                            }
                                            onClick={() =>
                                                moveToShowDetail(order.id)
                                            }
                                        >
                                            More
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default OrderListView
