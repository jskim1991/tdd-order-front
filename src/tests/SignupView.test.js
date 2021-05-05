import { renderAppWithPath, stubPromiseResolve } from './TestingUtil'
import { screen } from '@testing-library/react'
import * as LoginRepository from '../LoginRepository'
import userEvent from '@testing-library/user-event'

describe('For Sign Up', () => {
    beforeEach(() => {
        renderAppWithPath('/signup')
    })

    it('renders input fields for password and email', () => {
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    it('renders sign up button', () => {
        expect(
            screen.getByRole('button', { name: 'Sign Up' }),
        ).toBeInTheDocument()
    })

    it('clicking Sign Up button sends request to backend', () => {
        const signupSpy = jest
            .spyOn(LoginRepository, 'signup')
            .mockReturnValue(stubPromiseResolve({}))

        userEvent.type(screen.getByLabelText('Email'), 'user@email.com')
        userEvent.type(screen.getByLabelText('Password'), 'password')
        userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

        expect(signupSpy).toHaveBeenCalledWith('user@email.com', 'password')
    })

    it('redirects to /login after successful sign up', () => {
        jest.spyOn(LoginRepository, 'signup').mockReturnValue(
            stubPromiseResolve({}),
        )

        userEvent.type(screen.getByLabelText('Email'), 'user@email.com')
        userEvent.type(screen.getByLabelText('Password'), 'password')
        userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

        expect(screen.getByText('Password')).toBeInTheDocument()
    })
})
