import { render, screen, waitFor } from '@testing-library/react'
import OrderDetailView from '../OrderDetailView'
import * as OrderRepository from './OrderRepository'

describe('Order Detail View page', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('shows required fields', async () => {
        jest.spyOn(OrderRepository, 'getOrder').mockReturnValueOnce(
            Promise.resolve([])
        )

        // render(<OrderDetailView match={{ params: { id: '1' } }} />)
        render(<OrderDetailView id='123' />)

        await waitFor(() => {
            expect(screen.getByText('Order Details')).toBeInTheDocument()
            expect(screen.getByText('Items')).toBeInTheDocument()
            expect(screen.getByText('Total Price')).toBeInTheDocument()
            expect(screen.getByText('Total Quantity')).toBeInTheDocument()
            expect(screen.getByText('Ordered by')).toBeInTheDocument()
            expect(screen.getByText('Phone')).toBeInTheDocument()
            expect(screen.getByText('Address')).toBeInTheDocument()
        })
    })

    it('renders a table of items', async () => {
        jest.spyOn(OrderRepository, 'getOrder').mockReturnValueOnce(
            Promise.resolve({
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
            })
        )

        // render(<OrderDetailView match={{ params: { id: '1' } }} />)
        render(<OrderDetailView id='123' />)

        await waitFor(() => {
            expect(screen.getByText('Item Name')).toBeInTheDocument()
            expect(screen.getByText('Unit Price')).toBeInTheDocument()
            expect(screen.getByText('Quantity')).toBeInTheDocument()

            expect(screen.getByText('item1')).toBeInTheDocument()
            expect(screen.getByText('item2')).toBeInTheDocument()
            expect(screen.queryAllByText('100').length).toBe(2)
            expect(screen.queryAllByText('1').length).toBe(2)
        })
    })
})
