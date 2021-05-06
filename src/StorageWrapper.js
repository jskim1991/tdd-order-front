export const saveUserToken = (tokens) => {
    const { accessToken, refreshToken } = tokens
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}
