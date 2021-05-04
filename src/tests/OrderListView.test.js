import { fireEvent, screen } from '@testing-library/react'
import * as OrderRepository from './OrderRepository'
import userEvent from '@testing-library/user-event'
import { renderAppWithPath, stubPromiseResolve } from './TestingUtil'

describe('Order List View page', () => {
    describe('Without routing', () => {
        beforeEach(() => {
            const orders = [
                {
                    id: 'order1',
                    items: ['item1'],
                    price: 100,
                },
                {
                    id: 'order2',
                    items: ['item2'],
                    price: 200,
                },
            ]

            jest.spyOn(OrderRepository, 'getAllOrders').mockReturnValue(
                stubPromiseResolve(orders),
            )
        })

        it('renders a list of orders', () => {
            renderAppWithPath('/')

            expect(screen.getByText('order1')).toBeInTheDocument()
            expect(screen.getByText('order2')).toBeInTheDocument()
            expect(screen.getByText('100')).toBeInTheDocument()
            expect(screen.getByText('200')).toBeInTheDocument()
        })

        it('renders table name and columns', () => {
            renderAppWithPath('/')

            expect(screen.getByText('Order History')).toBeInTheDocument()
            expect(screen.getByText('Orders')).toBeInTheDocument()
            expect(screen.getByText('No')).toBeInTheDocument()
            expect(screen.getByText('Id')).toBeInTheDocument()
            expect(screen.getByText('Date')).toBeInTheDocument()
            expect(screen.getByText('Items')).toBeInTheDocument()
            expect(screen.getByText('Total Price')).toBeInTheDocument()
            expect(screen.getByText('Details')).toBeInTheDocument()
        })

        it('renders buttons to move to order detail', () => {
            renderAppWithPath('/')

            expect(screen.getAllByText('More').length).toBe(2)
        })

        it('renders order detail view when clicking a row', () => {
            jest.spyOn(OrderRepository, 'getAllOrders').mockReturnValue(
                stubPromiseResolve([
                    {
                        id: 'order1',
                        items: ['item1'],
                        price: 100,
                    },
                ]),
            )

            renderAppWithPath('/')

            fireEvent.click(screen.getByRole('button', { name: 'More' }))

            expect(screen.getByText('Order Details')).toBeInTheDocument()
        })

        it('shows a text input to search for a specific order', () => {
            renderAppWithPath('/')

            expect(screen.getByLabelText('Search items')).toBeInTheDocument()
        })

        it('shows matching orders when item name matches', () => {
            renderAppWithPath('/')

            userEvent.type(
                screen.getByPlaceholderText('Search order here'),
                'item1',
            )

            expect(screen.getByText('order1')).toBeInTheDocument()
            expect(screen.queryByText('order2')).not.toBeInTheDocument()
        })
    })

    describe('With routing', () => {
        beforeEach(() => {
            const orders = [
                {
                    id: 'order1',
                    items: ['item1'],
                    price: 100,
                },
                {
                    id: 'order2',
                    items: ['item2'],
                    price: 200,
                },
            ]

            jest.spyOn(OrderRepository, 'getAllOrders').mockReturnValue(
                stubPromiseResolve(orders),
            )
        })

        it('routes to OrderDetailView when clicking a row', () => {
            jest.spyOn(OrderRepository, 'getOrder').mockReturnValue(
                stubPromiseResolve({ items: [] }),
            )
            renderAppWithPath('/')

            fireEvent.click(screen.getByText('100'))

            expect(screen.getByText('Order Details')).toBeInTheDocument()
            expect(screen.getByText('Items')).toBeInTheDocument()
            expect(screen.getByText('Total Price')).toBeInTheDocument()
            expect(screen.getByText('Total Quantity')).toBeInTheDocument()
            expect(screen.getByText('Ordered by')).toBeInTheDocument()
        })

        it('routes to OrderDetailView when the button is clicked', () => {
            const getOrderSpy = jest
                .spyOn(OrderRepository, 'getOrder')
                .mockReturnValue(stubPromiseResolve({ items: [] }))
            renderAppWithPath('/')

            expect(screen.queryAllByText('More').length).toBe(2)
            fireEvent.click(screen.queryAllByText('More')[0])

            expect(getOrderSpy).toHaveBeenCalledWith('order1')
        })
    })
})
