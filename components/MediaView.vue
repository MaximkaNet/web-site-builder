<template>
  <div class="image-container">
    <img :src="`/uploads/${name}`" alt="">
    <IconButton fill-mode="bordered" type="delete" @click="$emit('remove', $event)">
      <span>Remove</span>
    </IconButton>
  </div>
</template>
<script setup lang="ts">
interface Props {
  name: string
}
defineProps<Props>()
</script>