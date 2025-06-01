<template>
  <h1 v-if="!isEditing" @click="isEditing = true">{{ model }}</h1>
  <input v-else type="text" v-model="model" @blur="isEditing = false" />
</template>
<script setup lang="ts">
const model = defineModel<string>()
const isEditing = ref(false)
</script>
<style lang="scss" scoped></style>