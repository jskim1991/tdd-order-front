import {getAllOrders} from "./OrderRepository";
import axios from "axios";

describe('OrderRepository', () => {
    it('fetches orders from HTTP', () => {

        jest.spyOn(axios, 'get')
            .mockReturnValueOnce(['order1', 'order2'])


        const orders = getAllOrders()


        expect(orders).toEqual(['order1', 'order2'])
    });

    it('reaches the correct backend server', () => {
        const axiosGet = jest.spyOn(axios, 'get')


        getAllOrders()


        expect(axiosGet).toHaveBeenCalled()
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:8080/orders')
    })
})
