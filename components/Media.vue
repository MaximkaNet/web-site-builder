<template>
  <MediaView v-if="model?.name" :name="model.name" @remove="remove" />
  <MediaLoader v-else-if="uploading" />
  <MediaReceiver v-else :index="index" @file-received="upload" />
</template>

<script setup lang="ts">
import type { SectionMedia } from '~/types/SectionMedia';

const uploading = ref(false)

interface Props {
  index: number;
}

const props = defineProps<Props>()
const model = defineModel<SectionMedia>()

const emits = defineEmits<{
  (e: 'remove', section: number): void,
  (e: 'upload', file: File, section: number, callback: () => void): void,
}>()

const remove = (e: any) => {
  if (!model.value) return
  emits('remove', props.index)
}

const upload = (file: File) => {
  uploading.value = true
  emits('upload', file, props.index, () => { uploading.value = false })
}

</script>