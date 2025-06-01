<template>
  <div>
    <div>Error: {{ error.statusCode }}</div>
    <div>Message: {{ error.statusMessage }}</div>
  </div>
</template>
<script setup lang="ts">

interface PropsAttributes {
  error: { statusCode: number; statusMessage?: string; }
}

defineProps<PropsAttributes>()

</script>