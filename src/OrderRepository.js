import axios from 'axios'

export const getAllOrders = () => {
    const token = localStorage.getItem('accessToken')
    const headers = { Authorization: 'Bearer ' + token }
    return axios.get('/orders', { headers }).then((response) => response.data)
}

export const getOrder = (orderId) => {
    const token = localStorage.getItem('accessToken')
    const headers = { Authorization: 'Bearer ' + token }
    return axios
        .get(`/orders/${orderId}`, { headers })
        .then((response) => response.data)
}
