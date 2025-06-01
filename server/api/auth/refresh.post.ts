import { AuthUser } from "~/types/AuthUser";

type RefreshResponse = {
  accessToken: string;
  user: AuthUser
}

export default defineEventHandler(async (event): Promise<RefreshResponse> => {
  const token = getCookie(event, 'refresh')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Refresh token missing' })
  }

  try {
    const payload = verifyToken(token)
    const accessToken = generateAccessToken({ id: payload.id, email: payload.email })

    return {
      accessToken,
      user: payload
    }
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired refresh token' })
  }
})