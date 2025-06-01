import { and, eq } from "drizzle-orm"
import { db } from "~/server/database"
import { manuals, users } from "~/server/database/schema"
import { requireAuth } from "~/server/utils/auth"
import { Manual } from "~/types/Manual"

export default defineEventHandler(async (event): Promise<Manual> => {
  const user = await requireAuth(event)

  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({
      status: 404,
      statusMessage: `Manual with id ${id} not found`
    })
  }

  const man = await db.query.manuals.findFirst({
    where: and(eq(manuals.id, id), eq(manuals.userId, user.id))
  })

  if (!man) {
    throw createError({
      status: 404,
      statusMessage: `Manual with id ${id} not found`
    })
  }

  return {
    head: {
      id: man.id,
      title: man.title,
      description: man.description
    },
    sections: JSON.parse(man.sections)
  };
})