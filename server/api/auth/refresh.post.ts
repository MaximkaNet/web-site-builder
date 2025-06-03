import { eq } from "drizzle-orm";
import { db } from "~/server/database";
import { users } from "~/server/database/schema";
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

    // Check if the user registered
    const [user] = await db.select().from(users).where(eq(users.id, payload.id))

    if (!user) { throw 'User not found' }

    const accessToken = generateAccessToken({ id: payload.id, email: payload.email })

    return {
      accessToken,
      user: payload
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }
})