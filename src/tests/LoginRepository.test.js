import * as LoginRepository from '../LoginRepository'
import axios from 'axios'
import { signup } from '../LoginRepository'
import * as StorageWrapper from '../StorageWrapper'

describe('Login Repository', () => {
    describe('For Login', () => {
        beforeEach(() => {
            const tokens = {
                accessToken: 'access token',
                refreshToken: 'refresh token',
            }
            jest.spyOn(axios, 'post').mockReturnValue(
                Promise.resolve({ data: tokens }),
            )
            jest.spyOn(StorageWrapper, 'saveUserToken').mockReturnValue({})
        })

        it('reaches to /login endpoint with a body of email and password', () => {
            const getSpy = jest.spyOn(axios, 'post')

            LoginRepository.login('user@email.com', 'password')

            expect(getSpy).toHaveBeenCalledWith('/login', {
                email: 'user@email.com',
                password: 'password',
            })
        })

        it('returns an object with access token and request token', async () => {
            const obtainedTokens = await LoginRepository.login(null, null)

            expect(obtainedTokens).toEqual({
                accessToken: 'access token',
                refreshToken: 'refresh token',
            })
        })

        it('stores token on successful login', async () => {
            const storagePutSpy = jest.spyOn(StorageWrapper, 'saveUserToken')

            await LoginRepository.login(null, null)

            expect(storagePutSpy).toHaveBeenCalledWith({
                accessToken: 'access token',
                refreshToken: 'refresh token',
            })
        })
    })

    describe('For Sign Up', () => {
        it('reaches to /signup endpoint with a body of email and password', () => {
            const axiosGetSpy = jest
                .spyOn(axios, 'post')
                .mockReturnValue(Promise.resolve({}))

            signup('user@email.com', 'password')

            expect(axiosGetSpy).toHaveBeenCalledWith('/signup', {
                email: 'user@email.com',
                password: 'password',
            })
        })

        it('returns userId on successful creation', async () => {
            jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve('123'))

            const createdUserId = await signup()

            expect(createdUserId).toBe('123')
        })

        it('spec name', () => {})
    })
})
