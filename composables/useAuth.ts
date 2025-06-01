export const useAuth = () => {
  const { setToken, removeToken } = useAccessToken()
  const authUser = useAuthUser()

  const login = async (email: string, password: string) => {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'post',
      body: { email, password },
      credentials: 'include'
    })

    if (error.value) throw error.value

    if (!data.value) throw createError({
      status: 401,
      message: 'Data is empty'
    })

    setToken(data.value.accessToken)
    authUser.value = data.value.user
  }

  const logout = async () => {
    await useFetch('/api/auth/logout', {
      method: 'post'
    })
    removeToken()
    authUser.value = null
  }

  return { login, logout }
}