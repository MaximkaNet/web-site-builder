<template>
  <div class="builder-layout">
    <Topbar page-title="Builder">
      <div style="display: flex; gap: 10px; align-items: center;">
        <div class="network-status">{{ networkStatus }}</div>
        <IconButton @click="handlePreview" :disabled="offline" type="primary" fill-mode="bordered">
          <!-- Icon -->
          <span>Preview</span>
        </IconButton>
        <IconButton @click="handleDelete" :disabled="offline" type="delete" fill-mode="bordered">
          <!-- Icon -->
          <span>Delete</span>
        </IconButton>
      </div>
    </Topbar>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">

const store = useBuilderStore()

const handleDelete = async (e: any) => {
  await store.delete()
  await navigateTo('/dashboard')
}

const handlePreview = async (e: any) => {
  if (!store.manual) return
  await navigateTo(`/preview/${store.manual.head.id}`)
}

const networkStatus = ref()
const offline = ref(false)

window.addEventListener('online', () => {
  networkStatus.value = 'Changes saving'
  offline.value = false
})

window.addEventListener('offline', () => {
  networkStatus.value = 'Offline'
  offline.value = true
})

</script>