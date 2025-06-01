<template>
  <label :for="`media-${index}`" class="drop-media-handler" @dragover.prevent @dragenter.prevent
    @drop.prevent="handleDrop">
    <span>Click to select file or drop the file</span>
    <input type="file" :id="`media-${index}`" style="display: none;" @change="handleFileChange">
  </label>
</template>

<script setup lang="ts">

interface Props {
  index: number;
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'fileReceived', file: File): void,
}>()

const handleDrop = (event: any) => {
  const files: File[] = event.dataTransfer.files
  if (!files || files.length === 0) return
  emits('fileReceived', files[0])
}

const handleFileChange = (event: any) => {
  const files: File[] = event.target.files
  if (!files || files.length === 0) return
  emits('fileReceived', files[0])
}

</script>

<style lang="scss" scoped>
.drop-media-handler {
  padding: 20px;
  border: 1px dashed black;
  border-radius: 20px;
}
</style>