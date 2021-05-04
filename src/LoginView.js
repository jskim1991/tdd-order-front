import { useState } from 'react'
import { login } from './LoginRepository'

const LoginView = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmailInput = (event) => {
        setEmail(event.target.value)
    }

    const onChangePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitLoginForm = (event) => {
        event.preventDefault()

        login(email, password)
    }

    return (
        <form onSubmit={onSubmitLoginForm}>
            <label htmlFor='email_input'>Email</label>
            <input type='text' id='email_input' onChange={onChangeEmailInput} />
            <label htmlFor='password_input'>Password</label>
            <input
                type='password'
                id='password_input'
                onChange={onChangePasswordInput}
            />
            <button>Login</button>
        </form>
    )
}

export default LoginView
