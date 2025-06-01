import { eq } from "drizzle-orm";
import { db } from "~/server/database";
import { users } from "~/server/database/schema";
import { hashPassword, generateAccessToken } from "~/server/utils/auth";

interface RegisterAttributes {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterAttributes>(event);

  const { email, password } = body;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  if (existing) throw createError({ statusCode: 409, statusMessage: 'User exists' });

  const [user] = await db.insert(users)
    .values({
      email: email,
      password: await hashPassword(password)
    })
    .returning({ id: users.id, email: users.email })

  const token = generateAccessToken(user);
  return { token };
});