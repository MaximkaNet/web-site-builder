import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthUser } from '~/types/AuthUser';
import { db } from '../database';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';

const SECRET_KEY = 'lalalalalalal'

export async function requireAuth(event: any) {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  try {
    const payload = verifyToken(token)

    // Check if the user registered
    const [user] = await db.select().from(users).where(eq(users.id, payload.id))

    if (!user) { throw 'User not found' }

    return payload
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }
}

export function generateAccessToken(payload: AuthUser) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h',
  });
}

export function generateRefreshToken(payload: AuthUser) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' })
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, SECRET_KEY) as AuthUser;
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(raw: string, hashed: string) {
  return await bcrypt.compare(raw, hashed);
}