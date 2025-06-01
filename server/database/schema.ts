import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
})

export const manuals = sqliteTable('manuals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  sections: text('sections').default("[]").notNull(),
  userId: integer('user_id').references(() => users.id),
})