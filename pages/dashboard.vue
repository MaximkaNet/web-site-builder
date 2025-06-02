<template>
  <div class="manuals" v-if="manuals.length > 0">
    <article class="manual" v-for="man in manuals" @click="navigateTo(`/builder/${man.id}`)">
      <h1 class="manual-title">{{ man.title }}</h1>
      <p class="manual-description" v-if="man.description">{{ man.description }}</p>
      <div class="manual-meta">
        <div class="section">
          <!-- Img -->
          <span>{{ man.meta.sections }} section(s)</span>
        </div>
      </div>
    </article>
  </div>
  <div class="manuals-placeholder" v-else>
    <span><span class="link" @click="handleCreate()">Create</span> the first manual</span>
  </div>
</template>

<script setup lang="ts">
import type { Manual } from '~/types/Manual';
import type { ManualInfo } from '~/types/ManualInfo';

useHead({
  title: 'Dashboard'
})

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { getToken } = useAccessToken()
const manuals = ref<ManualInfo[]>([])

await useFetch('/api/manuals', {
  method: 'get',
  headers: { authorization: `Bearer ${getToken()}` },
  onResponse({ request, response, options }) {
    manuals.value = response._data
  }
})

const handleCreate = async () => {
  try {
    const res = await $fetch<Manual>('/api/manuals', {
      method: 'POST', credentials: 'include',
      headers: { authorization: `Bearer ${getToken()}` },
      body: {
        title: '',
        description: '',
        sections: []
      }
    })
    await navigateTo(`/builder/${res.head.id}`)
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: #56B0F9;
  text-decoration: underline;
  cursor: pointer;
}

.manuals {
  padding: 0px 15px;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
}

.manuals-placeholder {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: large;
}

.manual {
  min-width: 0;
  font-family: Calibri;
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: #F4F4F4;
  padding: 20px 30px;
  border-radius: 20px;

  .manual-title {
    font-size: 1em;
  }

  .manual-description {
    max-height: 1lh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .875em;
    color: #5B5B5B;
  }

  .manual-meta {
    display: flex;
    flex-wrap: wrap;

    .section {
      display: flex;
      gap: 5px;

      font-size: .7em;
    }
  }
}
</style>