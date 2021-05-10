import { saveUserToken } from '../StorageWrapper'

describe('Storage Wrapper', () => {
    it('saves to localStorage', () => {
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

        saveUserToken({
            accessToken: 'access token',
            refreshToken: 'refresh token',
        })

        expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'access token')
        expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'refresh token')
        expect(localStorage.getItem('accessToken')).toEqual('access token')
    })
})
