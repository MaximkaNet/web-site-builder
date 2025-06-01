export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const { name } = getQuery(event)

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is require'
    })
  }

  const storage = useStorage('uploads')

  await storage.removeItem(name.toString())
})