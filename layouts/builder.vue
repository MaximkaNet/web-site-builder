<template>
  <div class="builder-layout">
    <Topbar page-title="Builder">
      <div style="display: flex; gap: 10px; align-items: center;">
        <div class="network-status">{{ networkStatus }}</div>
        <!-- <IconButton @click="" fill-mode="bordered"> -->
        <!-- Icon -->
        <!-- <span>Export</span> -->
        <!-- </IconButton> -->
        <IconButton @click="handleDelete" type="delete" fill-mode="bordered">
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

const networkStatus = ref()

window.addEventListener('online', () => {
  networkStatus.value = 'Online'
})

window.addEventListener('offline', () => {
  networkStatus.value = 'Offline'
})

</script>