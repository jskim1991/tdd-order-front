import { screen } from '@testing-library/react'
import { renderAppWithPath, stubPromiseResolve } from './TestingUtil'
import userEvent from '@testing-library/user-event'
import * as LoginRepository from '../LoginRepository'
import * as OrderRepository from '../OrderRepository'

describe('Login View', () => {
    beforeEach(() => {
        renderAppWithPath('/login')
    })

    it('renders input fields for password and email', () => {
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    it('renders submit button', () => {
        expect(
            screen.getByRole('button', { name: 'Login' }),
        ).toBeInTheDocument()
    })

    it('clicking Login button sends email and password', () => {
        const loginSpy = jest
            .spyOn(LoginRepository, 'login')
            .mockReturnValue(stubPromiseResolve({}))

        userEvent.type(screen.getByLabelText('Email'), 'user@email.com')
        userEvent.type(screen.getByLabelText('Password'), 'password')
        userEvent.click(screen.getByRole('button', { name: 'Login' }))

        expect(loginSpy).toHaveBeenCalledWith('user@email.com', 'password')
    })

    it('redirects to / upon successful login', () => {
        jest.spyOn(LoginRepository, 'login').mockReturnValue(
            stubPromiseResolve({}),
        )
        jest.spyOn(OrderRepository, 'getAllOrders').mockReturnValue(
            stubPromiseResolve([]),
        )

        userEvent.type(screen.getByLabelText('Email'), 'user@email.com')
        userEvent.type(screen.getByLabelText('Password'), 'password')
        userEvent.click(screen.getByRole('button', { name: 'Login' }))

        expect(screen.getByText('Order History')).toBeInTheDocument()
    })
})
