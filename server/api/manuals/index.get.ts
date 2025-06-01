import { eq } from "drizzle-orm"
import { db } from "~/server/database"
import { manuals } from "~/server/database/schema"
import { ManualInfo } from "~/types/ManualInfo"

export default defineEventHandler(async (event): Promise<ManualInfo[]> => {
  const user = await requireAuth(event)

  const mans = await db.query.manuals.findMany({
    where: eq(manuals.userId, user.id)
  })

  return mans.map(man => ({
    id: man.id,
    title: man.title,
    description: man.description,
    meta: {
      sections: JSON.parse(man.sections).length
    }
  }))
})