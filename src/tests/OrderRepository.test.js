import {getAllOrders, getOrder} from "./OrderRepository";
import axios from "axios";

describe('OrderRepository',  () => {
    describe('getAllOrders()', () => {
        it('fetches list of orders from HTTP', async () => {

            jest.spyOn(axios, 'get')
                .mockReturnValueOnce(Promise.resolve({data: []}))


            const orders = await getAllOrders()


            expect(orders).toEqual([])
        });

        it('reaches /orders', () => {
            const axiosGet = jest.spyOn(axios, 'get')
                .mockReturnValueOnce(Promise.resolve({data: []}))


            getAllOrders()


            expect(axiosGet).toHaveBeenCalled()
            expect(axiosGet).toHaveBeenCalledWith('http://localhost:8080/orders')
        })
    });

    describe('getOrder()', () => {
        it('fetches an order from getOrder()', async () => {
            jest.spyOn(axios, 'get')
                .mockReturnValueOnce(Promise.resolve({data: {}}))


            const order = await getOrder()


            expect(order).toEqual({})
        });

        it('reaches /orders/{id} using a dynamic path variable', () => {
            const axiosGetSpy = jest.spyOn(axios, 'get')
                .mockReturnValueOnce(Promise.resolve({ data: {}}))


            getOrder('999')


            expect(axiosGetSpy).toHaveBeenCalled()
            expect(axiosGetSpy).toHaveBeenCalledWith('http://localhost:8080/orders/999')
        });
    });
})
