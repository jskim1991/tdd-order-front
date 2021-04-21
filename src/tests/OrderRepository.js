import axios from "axios";

export const getAllOrders = () => {
    return axios.get('http://localhost:8080/orders')
}