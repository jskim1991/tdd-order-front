import {getAllOrders} from "./OrderRepository";
import axios from "axios";

describe('OrderRepository',  () => {
    it('fetches orders from HTTP', async () => {

        jest.spyOn(axios, 'get')
            .mockReturnValueOnce(Promise.resolve({data: ['order1', 'order2']}))


        const orders = await getAllOrders()


        expect(orders).toEqual(['order1', 'order2'])
    });

    it('reaches the correct backend server', () => {
        const axiosGet = jest.spyOn(axios, 'get')
            .mockReturnValueOnce(Promise.resolve({data: []}))


        getAllOrders()


        expect(axiosGet).toHaveBeenCalled()
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:8080/orders')
    })
})
