import { getAllOrders, getOrder } from '../OrderRepository'
import axios from 'axios'

describe('OrderRepository', () => {
    describe('getAllOrders()', () => {
        it('returns list of orders', async () => {
            jest.spyOn(axios, 'get').mockReturnValueOnce(
                Promise.resolve({ data: [] }),
            )

            const orders = await getAllOrders()

            expect(orders).toEqual([])
        })

        it('gets access token from storage', () => {
            jest.spyOn(axios, 'get').mockReturnValueOnce(
                Promise.resolve({ data: [] }),
            )
            const getItemSpy = jest
                .spyOn(Storage.prototype, 'getItem')
                .mockReturnValue('access token')

            getAllOrders()

            expect(getItemSpy).toHaveBeenCalledWith('accessToken')
        })

        it('reaches to the end point /orders', () => {
            const axiosGet = jest
                .spyOn(axios, 'get')
                .mockReturnValueOnce(Promise.resolve({ data: [] }))
            jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
                'access token',
            )

            getAllOrders()

            expect(axiosGet).toHaveBeenCalled()
            expect(axiosGet).toHaveBeenCalledWith('/orders', {
                headers: {
                    Authorization: 'Bearer access token',
                },
            })
        })
    })

    describe('getOrder()', () => {
        it('returns order', async () => {
            jest.spyOn(axios, 'get').mockReturnValueOnce(
                Promise.resolve({ data: {} }),
            )

            const order = await getOrder()

            expect(order).toEqual({})
        })

        it('gets access token from storage', () => {
            jest.spyOn(axios, 'get').mockReturnValueOnce(
                Promise.resolve({ data: {} }),
            )
            const getItemSpy = jest
                .spyOn(Storage.prototype, 'getItem')
                .mockReturnValue({})

            getOrder('999')

            expect(getItemSpy).toHaveBeenCalledWith('accessToken')
        })

        it('reaches /orders/{id} using a dynamic path variable', () => {
            const axiosGetSpy = jest
                .spyOn(axios, 'get')
                .mockReturnValueOnce(Promise.resolve({ data: {} }))
            jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
                'access token',
            )
            getOrder('999')

            expect(axiosGetSpy).toHaveBeenCalledWith('/orders/999', {
                headers: {
                    Authorization: 'Bearer access token',
                },
            })
        })
    })
})
