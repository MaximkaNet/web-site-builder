import type { Manual } from "~/types/Manual"
import type { ManualSection } from "~/types/ManualSection"

export const useBuilderStore = defineStore('builder', {
  state: () => {
    return {
      saving: false,
      manual: null as Manual | null
    }
  },
  actions: {
    fetch: async function (id: number) {
      const { getToken } = useAccessToken()

      try {
        this.manual = await $fetch(`/api/manuals/${id}`, {
          method: 'GET', credentials: 'include',
          headers: {
            authorization: `Bearer ${getToken()}`
          }
        })
      } catch (e) {
        console.error(e)
      }
    },

    save: async function () {
      if (this.saving || !this.manual) return

      const { getToken } = useAccessToken()

      try {
        this.saving = true
        await $fetch(`/api/manuals/${this.manual.head.id}`, {
          method: 'post', credentials: 'include',
          headers: {
            authorization: `Bearer ${getToken()}`
          },
          body: this.manual
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.saving = false
      }
    },

    delete: async function () {
      if (!this.manual) return

      const { getToken } = useAccessToken()

      try {
        await $fetch(`/api/manuals/${this.manual.head.id}`, {
          method: 'delete', credentials: 'include',
          headers: {
            authorization: `Bearer ${getToken()}`
          },
        })
      } catch (err) {
        console.error(err)
      }

    },

    moveSection: function (index: number, pos: number) {
      if (!this.manual) return

      const len = this.manual.sections.length
      const _pos = Math.min(len - 1, Math.max(0, pos))

      const item = this.manual.sections[index]
      this.manual.sections.splice(index, 1) // Remove
      this.manual.sections.splice(_pos, 0, item) // Insert
    },

    removeSection: function (index: number) {
      if (!this.manual) return
      this.manual.sections.splice(index, 1)
    },

    addSection: function () {
      if (!this.manual) return

      const section: ManualSection = {
        title: '',
        description: '',
        media: {
          name: null
        }
      }

      this.manual.sections.push(section)
    },

    removeMedia: async function (section: number) {
      if (!this.manual) return

      const mediaName = this.manual.sections[section].media.name

      if (!mediaName) return

      const { getToken } = useAccessToken()

      try {
        await $fetch(`/api/uploads/media`, {
          method: 'delete', credentials: 'include',
          headers: {
            authorization: `Bearer ${getToken()}`
          },
          query: { name: mediaName }
        })
        this.manual.sections[section].media.name = null
      } catch (err) {
        console.error(err)
      }
    },

    uploadMedia: async function (file: File, section: number, complete: () => void) {
      if (!this.manual) return

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif"
      ]

      if (!file.type || !allowedTypes.includes(file.type)) {
        return complete();
      }

      const formData = new FormData()
      formData.append('file', file)

      const { getToken } = useAccessToken()

      try {
        const uploaded = await $fetch(`/api/uploads/media`, {
          method: 'post', credentials: 'include',
          headers: {
            authorization: `Bearer ${getToken()}`
          },
          body: formData
        })
        if (uploaded) {
          this.manual.sections[section].media = {
            name: uploaded.filename
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        complete() // Call upload callback from media receiver component
      }
    },
  }
})