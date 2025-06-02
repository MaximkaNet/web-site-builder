<template>
  <button class="icon-button" :class="`${type} ${fillMode}`" @click="$emit('click')">
    <slot />
  </button>
</template>
<script setup lang="ts">
type ButtonType = 'regular' | 'primary' | 'delete';
type FillMode = 'filled' | 'bordered'

interface Props {
  type?: ButtonType,
  fillMode?: FillMode,
}

withDefaults(defineProps<Props>(), {
  type: 'regular',
  fillMode: 'filled'
})
defineEmits(['click'])
</script>
<style lang="scss" scoped>
.icon-button {
  display: flex;
  align-items: center;
  gap: 5px;

  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  text-align: center;
  transition: background-color .3s ease;
  transition: border-color .3s ease;

  // background-color: #FAFAFA;
  // color: black;

  &.regular {
    &.filled {
      background-color: $surface;
      color: black;

      &:hover {
        background-color: $on-surface;
      }
    }

    &.bordered {
      background: none;

      border: 2px solid $surface;
      color: $surface;

      &:hover {
        border-color: $on-surface;
        color: black;
      }
    }
  }

  &.primary {
    &.filled {
      background-color: $primary;
      color: white;

      &:hover {
        background-color: $on-primary;
      }
    }

    &.bordered {
      background: none;

      border: 2px solid $primary;
      color: $primary;

      &:hover {
        border-color: $on-primary;
        color: $on-primary;
      }
    }
  }

  &.delete {
    &.filled {
      background-color: $error;
      color: white;

      &:hover {
        background-color: $on-error;
      }
    }

    &.bordered {
      background: none;

      border: 2px solid $error;
      color: $error;

      &:hover {
        border-color: $on-error;
        color: $on-error;
      }
    }
  }
}
</style>