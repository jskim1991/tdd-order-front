import axios from 'axios'

export const login = (email, password) => {
    return axios.post('http://localhost:8080/login', {
        email: email,
        password: password,
    })
}
