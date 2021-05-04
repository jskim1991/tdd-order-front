import { fireEvent, screen } from '@testing-library/react'
import { renderAppWithPath } from './TestingUtil'

describe('Login View', () => {
    it('renders input fields for password and email', () => {
        renderAppWithPath('/login')

        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })
})
