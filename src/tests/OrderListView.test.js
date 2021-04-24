import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from "../App";
import * as OrderRepository from './OrderRepository'
import {MemoryRouter} from "react-router";

describe('Order List View page', () => {
    beforeEach(() => {
        jest.spyOn(OrderRepository, 'getAllOrders')
            .mockReturnValueOnce(
                Promise.resolve([
                    {
                        id: 'order1',
                        price: 100
                    },
                    {
                        id: 'order2',
                        price: 200
                    }
                ]))
    });

    it('renders a list of orders', async () => {
        render(<App/>)


        await waitFor(() => {
            expect(screen.getByText('order1')).toBeInTheDocument()
            expect(screen.getByText('order2')).toBeInTheDocument()
            expect(screen.getByText('100')).toBeInTheDocument()
            expect(screen.getByText('200')).toBeInTheDocument()
        })
    });

    it('renders table name and columns', async () => {
        render(<App/>)


        await waitFor(() => {
            expect(screen.getByText('Order History')).toBeInTheDocument()
            expect(screen.getByText('Orders')).toBeInTheDocument()
            expect(screen.getByText('No')).toBeInTheDocument()
            expect(screen.getByText('Id')).toBeInTheDocument()
            expect(screen.getByText('Date')).toBeInTheDocument()
            expect(screen.getByText('Items')).toBeInTheDocument()
            expect(screen.getByText('Total Price')).toBeInTheDocument()
            expect(screen.getByText('Details')).toBeInTheDocument()
        })
    });

    it('shows an button for order detail', async () => {
        render(<App />)


        await waitFor(() => expect(screen.queryAllByText('More').length).toBe(2))
    });

    it('routes to OrderDetailView when clicking a row', async () => {
        jest.spyOn(OrderRepository, 'getOrder')
            .mockReturnValue(Promise.resolve({items: []}))

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )


        await waitFor(() => screen.getByText('100'))
        fireEvent.click(screen.getByText('100'))


        await waitFor(() => {
            expect(screen.getByText('Order Details')).toBeInTheDocument()
        })
    });

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
});
