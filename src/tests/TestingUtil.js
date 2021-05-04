import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

export const renderAppWithPath = (path) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>,
    )

export const stubPromiseResolve = (successData) => {
    return {
        then: (callbackFunction) => {
            callbackFunction(successData)
        },
    }
}
