<template>
  <div class="error">
    <div class="img-container">
      <img :src="ErrorIcon" alt="Error icon">
    </div>
    <div class="code">{{ error.statusCode }}</div>
    <div class="message">{{ errorMessage }}</div>
    <NuxtLink class="go-to-home" to="/">Go to home page</NuxtLink>
  </div>
</template>
<script setup lang="ts">
import ErrorIcon from '~/assets/error.svg?url'

interface PropsAttributes {
  error: { statusCode: number; statusMessage?: string; }
}

const props = defineProps<PropsAttributes>()
const errorMessage = computed(() => fromStatusCode(props.error.statusCode))

</script>
<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  font-family: Inter;

  .img-container {
    display: flex;
    justify-content: center;

    img {
      max-width: 100px;
    }
  }

  .code {
    font-size: 3em;
  }

  .message {
    font-size: 2em;
  }

  .go-to-home {
    color: $primary;
  }
}
</style>