import { useState } from 'react'
import { signup } from './LoginRepository'

const SignupView = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmailInput = (event) => {
        setEmail(event.target.value)
    }

    const onChangePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSignUp = () => {
        signup(email, password).then((response) => {
            props.history.push({ pathname: '/login' })
        })
    }

    return (
        <div>
            <label htmlFor='email_input'>Email</label>
            <input type='text' id='email_input' onChange={onChangeEmailInput} />
            <label htmlFor='password_input'>Password</label>
            <input
                type='password'
                id='password_input'
                onChange={onChangePasswordInput}
            />
            <button onClick={onSubmitSignUp}>Sign Up</button>
        </div>
    )
}

export default SignupView
