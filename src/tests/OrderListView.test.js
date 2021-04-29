import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import App from '../App'
import * as OrderRepository from './OrderRepository'
import { MemoryRouter } from 'react-router'
import userEvent from '@testing-library/user-event'

describe('Order List View page', () => {
    beforeEach(() => {
        jest.spyOn(OrderRepository, 'getAllOrders').mockReturnValue(
            Promise.resolve([
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
            ])
        )
    })

    it('renders a list of orders', async () => {
        render(<App />)

        expect(await screen.findByText('order1')).toBeInTheDocument()
        expect(screen.getByText('order2')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
    })

    it('renders table name and columns', async () => {
        render(<App />)

        expect(await screen.findByText('Order History')).toBeInTheDocument()

        expect(screen.getByText('Orders')).toBeInTheDocument()

        expect(screen.getByText('No')).toBeInTheDocument()
        expect(screen.getByText('Id')).toBeInTheDocument()
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByText('Items')).toBeInTheDocument()
        expect(screen.getByText('Total Price')).toBeInTheDocument()
        expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('shows an button for order detail', async () => {
        render(<App />)

        expect((await screen.findAllByText('More')).length).toBe(2)
    })

    it('shows order detail view when clicking a row', async () => {
        jest.spyOn(OrderRepository, 'getAllOrders').mockReturnValue(
            Promise.resolve([
                {
                    id: 'order1',
                    items: ['item1'],
                    price: 100,
                },
            ])
        )

        render(<App />)

        expect(
            await screen.findByRole('button', { name: 'More' })
        ).toBeInTheDocument()
        fireEvent.click(screen.getByText('More'))

        expect(screen.getByText('Order Details')).toBeInTheDocument()
    })

    it('shows a text input to search for a specific order', async () => {
        render(<App />)

        expect(
            await screen.findByPlaceholderText('Search order here')
        ).toBeInTheDocument()
    })

    it('shows matching orders when item name matches', async () => {
        await act(async () => {
            render(<App />)
        })

        userEvent.type(
            screen.getByPlaceholderText('Search order here'),
            'item1'
        )

        expect(screen.getByText('order1')).toBeInTheDocument()
        expect(screen.queryByText('order2')).not.toBeInTheDocument()
    })

    // it('routes to OrderDetailView when clicking a row', async () => {
    //     jest.spyOn(OrderRepository, 'getOrder')
    //         .mockReturnValue(Promise.resolve({items: []}))

    //     render(
    //         <MemoryRouter>
    //             <App />
    //         </MemoryRouter>
    //     )

    //     await waitFor(() => screen.getByText('100'))
    //     fireEvent.click(screen.getByText('100'))

    //     await waitFor(() => {
    //         expect(screen.getByText('Order Details')).toBeInTheDocument()
    //     })
    // });

    // it('routes to OrderDetailView when the button is clicked', async () => {
    //     jest.spyOn(OrderRepository, 'getOrder')
    //         .mockReturnValue(Promise.resolve({items: []}))
    //     render(
    //         <MemoryRouter initialEntries={['']}>
    //             <App />
    //         </MemoryRouter>
    //     )
    //
    //     await waitFor(() =>
    //         expect(screen.queryAllByText('More').length).toBe(2))
    //     fireEvent.click(screen.queryAllByText('More')[0])
    //
    //
    //     await waitFor(() => {
    //         expect(screen.getByText('Order Details')).toBeInTheDocument()
    //     })
    // });
})
