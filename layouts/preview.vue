<template>
  <div class="preview-layout">
    <Topbar page-title="Preview">
      <div style="display: flex; gap: 10px; align-items: center;">
        <IconButton @click="handleBuild" type="primary" fill-mode="bordered">
          <!-- Icon -->
          <span>Build</span>
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

const handleBuild = async (event: any) => {
  if (!store.manual) return
  await navigateTo(`/builder/${store.manual.head.id}`)
}
</script>