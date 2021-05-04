import { render, screen, waitFor } from '@testing-library/react'
import * as OrderRepository from '../OrderRepository'
import { stubPromiseResolve, renderAppWithPath } from './TestingUtil'

describe('Order Detail View page', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('shows required fields', () => {
        jest.spyOn(OrderRepository, 'getOrder').mockReturnValueOnce(
            stubPromiseResolve([]),
        )

        renderAppWithPath('/orders/123')

        expect(screen.getByText('Order Details')).toBeInTheDocument()
        expect(screen.getByText('Items')).toBeInTheDocument()
        expect(screen.getByText('Total Price')).toBeInTheDocument()
        expect(screen.getByText('Total Quantity')).toBeInTheDocument()
        expect(screen.getByText('Ordered by')).toBeInTheDocument()
        expect(screen.getByText('Phone')).toBeInTheDocument()
        expect(screen.getByText('Address')).toBeInTheDocument()
    })

    it('renders a table of items', () => {
        jest.spyOn(OrderRepository, 'getOrder').mockReturnValueOnce(
            stubPromiseResolve({
                items: [
                    {
                        product: 'item1',
                        price: 100,
                        quantity: 1,
                    },
                    {
                        product: 'item2',
                        price: 100,
                        quantity: 1,
                    },
                ],
            }),
        )

        renderAppWithPath('/orders/123')

        expect(screen.getByText('Item Name')).toBeInTheDocument()
        expect(screen.getByText('Unit Price')).toBeInTheDocument()
        expect(screen.getByText('Quantity')).toBeInTheDocument()

        expect(screen.getByText('item1')).toBeInTheDocument()
        expect(screen.getByText('item2')).toBeInTheDocument()
        expect(screen.queryAllByText('100').length).toBe(2)
        expect(screen.queryAllByText('1').length).toBe(2)
    })
})
