import { db } from "~/server/database"
import { manuals } from "~/server/database/schema"
import { CreateManual } from "~/types/CreateManual"
import { Manual } from "~/types/Manual"

export default defineEventHandler(async (event): Promise<Manual> => {
  const user = await requireAuth(event)

  const body = await readBody<CreateManual>(event)

  const [newManual] = await db.insert(manuals)
    .values({
      title: body.title,
      description: body.description,
      sections: JSON.stringify(body.sections),
      userId: user.id
    })
    .returning()

  return {
    head: {
      id: newManual.id,
      title: newManual.title,
      description: newManual.description
    },
    sections: JSON.parse(newManual.sections)
  }
})