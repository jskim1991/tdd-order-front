import { useRef } from 'react'
import { login } from './LoginRepository'

const LoginView = (props) => {
    const emailInputRef = useRef()
    const passwordRef = useRef()

    const onSubmitLoginForm = () => {
        const email = emailInputRef.current.value
        const password = passwordRef.current.value
        login(email, password).then((response) => {
            props.history.push({ pathname: '/' })
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <label htmlFor='email_input'>Email</label>
            <input ref={emailInputRef} type='text' id='email_input' />
            <label htmlFor='password_input'>Password</label>
            <input ref={passwordRef} type='password' id='password_input' />
            <button onClick={onSubmitLoginForm}>Login</button>
        </div>
    )
}

export default LoginView
