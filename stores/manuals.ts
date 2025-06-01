import type { Manual } from "~/types/Manual"
import type { ManualInfo } from "~/types/ManualInfo"

export const useManualsStore = defineStore('manualsStore', {
  state: () => {
    return {
      manuals: [] as ManualInfo[],
      manual: {} as Manual,
    }
  },
  actions: {
    fetchManualsInfo: function () {
      this.manuals = [
        {
          id: 1,
          title: 'The name of the instruction. And second sentence',
          description: 'The description of the manual',
          meta: {
            sections: 1
          }
        },
      ]
    },
    fetchSingle: (id: number) => {

    },
    update: (man: Manual) => {

    },
    delete: (id: number) => {

    },
    create: async function () {
      this.manual = {
        head: {
          id: 1,
          title: '',
          description: ''
        },
        sections: []
      }
    }
  }
})