import axios from "axios";

export const getAllOrders = () => {
    return axios.get('http://localhost:8080/orders')
        .then(response => response.data);
}

export const getOrder = (orderId) => {
    return axios.get(`http://localhost:8080/orders/${orderId}`)
        .then(response => response.data)
}