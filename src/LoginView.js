import { useState } from 'react'
import { login, signup } from './LoginRepository'

const LoginView = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmailInput = (event) => {
        setEmail(event.target.value)
    }

    const onChangePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitLoginForm = () => {
        login(email, password).then((response) => {
            props.history.push({ pathname: '/' })
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <label htmlFor='email_input'>Email</label>
            <input type='text' id='email_input' onChange={onChangeEmailInput} />
            <label htmlFor='password_input'>Password</label>
            <input
                type='password'
                id='password_input'
                onChange={onChangePasswordInput}
            />
            <button onClick={onSubmitLoginForm}>Login</button>
        </div>
    )
}

export default LoginView
