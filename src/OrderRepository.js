import axios from 'axios'

export const getAllOrders = () => {
    return axios.get('/orders').then((response) => response.data)
}

export const getOrder = (orderId) => {
    return axios.get(`/orders/${orderId}`).then((response) => response.data)
}
