export default defineNuxtRouteMiddleware(async (to) => {
  const id = Number(to.params.id)

  if (isNaN(id)) {
    return abortNavigation('Id must be a number')
  }

  const store = useBuilderStore()

  await store.fetch(id)
})