import { and, eq } from "drizzle-orm"
import { db } from "~/server/database"
import { manuals } from "~/server/database/schema"
import { Manual } from "~/types/Manual"

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({
      status: 404,
      statusMessage: `Manual with id ${id} not found`
    })
  }

  const body = await readBody<Manual>(event)

  await db.update(manuals)
    .set({
      title: body.head.title,
      description: body.head.description,
      sections: JSON.stringify(body.sections)
    })
    .where(and(eq(manuals.id, id), eq(manuals.userId, user.id)))
})