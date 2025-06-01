export default defineEventHandler((event) => {
  setCookie(event, 'refresh', '', {
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date(0)
  })

  setCookie(event, 'accessToken', '', {
    httpOnly: false,
    sameSite: 'strict',
    expires: new Date(0)
  })

  return { message: 'Logged out successfully' }
})