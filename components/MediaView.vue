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
<style lang="scss" scoped>
.image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  img {
    max-width: 40%;
  }
}
</style>