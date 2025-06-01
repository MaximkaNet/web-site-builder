import { eq } from "drizzle-orm";
import { db } from "~/server/database";
import { users } from "~/server/database/schema";
import { comparePassword, generateAccessToken, generateRefreshToken } from "~/server/utils/auth";
import { AuthUser } from "~/types/AuthUser";

type LoginResponse = {
  accessToken: string;
  user: AuthUser
}

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  if (!user) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });

  const valid = await comparePassword(password, user.password);
  if (!valid) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });

  const accessToken = generateAccessToken({ id: user.id, email: user.email })
  const refreshToken = generateRefreshToken({ id: user.id, email: user.email })

  setCookie(event, 'refresh', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return { accessToken, user: { id: user.id, email: user.email } };
})