<template>
  <p contenteditable="plaintext-only" @blur="blur" @keypress.enter="handleEnter">
    {{ model }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  multiline?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  multiline: false,
  disabled: false
})

const model = defineModel()

const blur = (event: any) => { model.value = event.target.textContent }

const handleEnter = (event: any) => {
  if (!props.multiline) {
    event.target.blur()
    return
  }
}
</script>