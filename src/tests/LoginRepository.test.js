import * as LoginRepository from '../LoginRepository'
import axios from 'axios'

describe('Login Repository', () => {
    it('reaches to backend with a body of email and password', () => {
        const getSpy = jest
            .spyOn(axios, 'post')
            .mockReturnValue(Promise.resolve({}))

        LoginRepository.login('user@email.com', 'password')

        expect(getSpy).toHaveBeenCalledWith('/login', {
            email: 'user@email.com',
            password: 'password',
        })
    })

    it('returns an object with access token and request token', async () => {
        const tokens = {
            accessToken: 'access token',
            refreshToken: 'refresh token',
        }

        jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve(tokens))

        const obtainedTokens = await LoginRepository.login(null, null)

        expect(obtainedTokens).toEqual(tokens)
    })
})
