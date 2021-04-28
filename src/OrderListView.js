import { getAllOrders } from './tests/OrderRepository'
import { useEffect, useState } from 'react'
import OrderDetailView from './OrderDetailView'

const OrderListView = (props) => {
    const [orders, setOrders] = useState([])
    const [showDetail, setShowDetail] = useState(false)
    const [searchText, setSearchText] = useState(null)

    useEffect(() => {
        getAllOrders().then(setOrders)
    }, [])

    const toggleShowDetail = (orderId) => {
        // props.history.push({pathname: '/' + orderId})
    }

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value)
    }

    const filteredOrders = searchText
        ? orders.filter((order) => {
              let matched = false
              for (let item of order.items) {
                  if (
                      item.toLowerCase().indexOf(searchText.toLowerCase()) !==
                      -1
                  ) {
                      matched = true
                      break
                  }
              }
              return matched
          })
        : orders

    return (
        <div>
            <form>
                <input
                    placeholder='Search order here'
                    onChange={(event) => onChangeSearchText(event)}
                ></input>
            </form>
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
                    {Array.isArray(filteredOrders)
                        ? filteredOrders.map((o, idx) => {
                              return (
                                  <tr
                                      key={o.id}
                                      onClick={() => setShowDetail(true)}
                                  >
                                      <td>{idx}</td>
                                      <td>{o.id}</td>
                                      <td></td>
                                      <td></td>
                                      <td>{o.price}</td>
                                      <td>
                                          <button
                                              //   type='button'
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
