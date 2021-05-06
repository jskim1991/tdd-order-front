import { saveUserToken } from '../StorageWrapper'

describe('Storage Wrapper', () => {
    it('saves to localStorage', () => {
        const setItemSpy = jest
            .spyOn(Storage.prototype, 'setItem')
            .mockImplementation(() => {})

        saveUserToken({
            accessToken: 'access token',
            refreshToken: 'refresh token',
        })

        expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'access token')
        expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'refresh token')
    })
})
