export const useAccessToken = () => {
  return {
    setToken: (token: string) => { localStorage.setItem('accessToken', token) },
    removeToken: () => { localStorage.removeItem('accessToken') },
    getToken: (): string | null => { return localStorage.getItem('accessToken') }
  }
}