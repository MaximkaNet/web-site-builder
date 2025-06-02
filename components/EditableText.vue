<template>
  <p contenteditable="plaintext-only" :class="{ empty: !inputText }" @blur="blur" @input="input"
    @keypress.enter="handleEnter">
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

const model = defineModel<string>()
const inputText = ref<string>(model.value || '')

const blur = (event: any) => { model.value = event.target.textContent.trim() }

const input = (event: any) => {
  inputText.value = event.target.textContent.trim()
}

const handleEnter = (event: any) => {
  if (!props.multiline) {
    event.target.blur()
    return
  }
}
</script>
<style lang="scss" scoped>
p.empty::before {
  content: attr(data-placeholder);
  color: #aaa;
  pointer-events: none;
}
</style>