import { and, eq } from "drizzle-orm"
import { db } from "~/server/database"
import { manuals } from "~/server/database/schema"
import { ManualSection } from "~/types/ManualSection"

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Id must be a number'
    })
  }

  const man = await db.query.manuals.findFirst({
    where: and(eq(manuals.id, id), eq(manuals.userId, user.id))
  })

  if (!man) {
    return
  }

  const sections: ManualSection[] = JSON.parse(man.sections)

  const storage = useStorage('uploads')

  // Clear uploaded and attached images
  sections.forEach(({ media }) => {
    if (media && media.name) {
      storage.removeItem(media.name)
    }
  });

  await db.delete(manuals).where(and(eq(manuals.id, id), eq(manuals.userId, user.id)))
})