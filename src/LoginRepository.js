import axios from 'axios'
import { saveUserToken } from './StorageWrapper'

export const login = async (email, password) => {
    const { data } = await axios.post('/login', {
        email,
        password,
    })
    saveUserToken(data)
    return data
}

export const signup = (email, password) => {
    return axios.post('/signup', {
        email,
        password,
    })
}
