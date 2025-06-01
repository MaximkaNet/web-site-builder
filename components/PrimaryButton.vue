<template>
  <button class="primary-button" @click="$emit('click')">
    <slot />
  </button>
</template>
<script setup lang="ts">
defineEmits(['click'])
</script>
<style lang="scss" scoped>
.primary-button {
  border-radius: 20px;
  background-color: $primary;
  border: none;
  padding: 10px 15px;

  transition: background-color .3s ease;
  cursor: pointer;

  color: white;
}

.primary-button:hover {
  background-color: $on-primary;
}
</style>