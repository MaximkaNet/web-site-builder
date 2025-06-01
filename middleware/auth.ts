export default defineNuxtRouteMiddleware(async (to) => {
  const { getToken, setToken } = useAccessToken()
  const authUser = useAuthUser()
  // Try refreshing token
  const { data, error } = await useFetch('/api/auth/refresh', {
    method: 'post',
    credentials: 'include'
  })

  if (error.value || !data.value) {
    return navigateTo('/auth/login')
  }

  setToken(data.value.accessToken)
  authUser.value = data.value.user
})