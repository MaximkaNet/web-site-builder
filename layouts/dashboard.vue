<template>
  <div class="dashboard-layout">
    <Topbar page-title="Dashboard">
      <div style="display: flex; gap: 10px;">
        <PrimaryButton @click="createNewManual()">
          New manual
        </PrimaryButton>
        <IconButton @click="signout()">
          <!-- Icon -->
          <span>Sign out</span>
        </IconButton>
      </div>
    </Topbar>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Manual } from '~/types/Manual'

const signout = async () => {
  const { removeToken } = useAccessToken()
  try {
    const res = await $fetch('/api/auth/logout', { method: 'post', credentials: 'include' })
    removeToken()
    await navigateTo('/')
    console.log("Sign out")
  } catch (e) {
    console.error(e)
  }
}

const createNewManual = async () => {
  const { getToken } = useAccessToken()
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

<style lang="scss">
.dashboard-layout {
  font-family: Calibri;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>