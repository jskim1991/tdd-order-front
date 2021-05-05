import axios from 'axios'

export const login = (email, password) => {
    return axios.post('/login', {
        email,
        password,
    })
}

export const signup = (email, password) => {
    return axios.post('/signup', {
        email,
        password,
    })
}
