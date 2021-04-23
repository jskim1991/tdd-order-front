import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from "../App";
import * as OrderRepository from './OrderRepository'

describe('OrderListView page', () => {
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
    render(<App />)


    await waitFor(() => {
        expect(screen.getByText('order1')).toBeInTheDocument()
        expect(screen.getByText('order2')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
    })
  });

    it('renders table name and columns', async () => {
        render(<App />)


        await waitFor(() => {
            expect(screen.getByText('Orders')).toBeInTheDocument()
            expect(screen.getByText('Id')).toBeInTheDocument()
            expect(screen.getByText('Price')).toBeInTheDocument()
        })
    });

    it('should show "Order Detail" text with selected order id', async () => {

        render(<App />)
        await waitFor(() => screen.getByText('100'))


        fireEvent.click(screen.getByText('100'))


        await waitFor(() => {
            expect(screen.getByText(/Order Detail/)).toHaveTextContent('order1');
        })
    })
});
