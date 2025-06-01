<template>
  <div class="topbar">
    <div class="page-title">{{ pageTitle }}</div>
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  pageTitle: string;
}
defineProps<Props>()
</script>
<style lang="scss">
.topbar {
  width: 100%;
  padding: 15px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: Calibri;

  .page-title {
    font-size: x-large;
  }
}
</style>