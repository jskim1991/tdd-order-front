import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from "../App";
import * as OrderRepository from './OrderRepository'

describe('OrderListView page', () => {
  it('shows a list of orders with id', async () => {
    jest.spyOn(OrderRepository, 'getAllOrders')
        .mockReturnValueOnce(
            Promise.resolve([
                {
                    id: 'order1',
                },
                {
                    id: 'order2',
                }
        ]))


    render(<App />)


    await waitFor(() => {
      expect(screen.getByText('order1')).toBeInTheDocument()
      expect(screen.getByText('order2')).toBeInTheDocument()
    })
  });

    it('shows a button to add order', () => {
        jest.spyOn(OrderRepository, 'getAllOrders')
            .mockReturnValueOnce(Promise.resolve([]))


        render(<App />)


        expect(screen.getByText('Add order')).toBeInTheDocument()
    });

    it('click Add order button and "ADDED" text', function () {
        jest.spyOn(OrderRepository, 'getAllOrders')
            .mockReturnValueOnce(Promise.resolve([]))
        render(<App />)
        const addOrderButton = screen.getByText('Add order');


        fireEvent.click(addOrderButton);


        expect(screen.getByText('ADDED')).toBeInTheDocument()
    });
});
