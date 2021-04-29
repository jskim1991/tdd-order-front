import { getAllOrders } from './tests/OrderRepository'
import { useEffect, useState } from 'react'
import OrderDetailView from './OrderDetailView'

const OrderListView = (props) => {
    const [orders, setOrders] = useState([])
    const [showDetail, setShowDetail] = useState(false)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllOrders().then(setOrders)
    }, [])

    const toggleShowDetail = (orderId) => {
        // props.history.push({pathname: '/' + orderId})
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
            <input
                placeholder='Search order here'
                onChange={(event) => onChangeSearchText(event)}
                // value={searchText}
            ></input>
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
                    {Array.isArray(orders)
                        ? orders.map((o, idx) => {
                              return (
                                  <tr
                                      key={o.id}
                                      onClick={() => setShowDetail(true)}
                                  >
                                      <td>{idx}</td>
                                      <td>{o.id}</td>
                                      <td></td>
                                      <td>{o.items}</td>
                                      <td>{o.price}</td>
                                      <td>
                                          <button
                                              type='button'
                                              id={'order-detail-button-' + o.id}
                                              onClick={() =>
                                                  setShowDetail(true)
                                              }
                                          >
                                              More
                                          </button>
                                      </td>
                                  </tr>
                              )
                          })
                        : null}
                </tbody>
            </table>
            {showDetail ? <OrderDetailView /> : null}
        </div>
    )
}

export default OrderListView
