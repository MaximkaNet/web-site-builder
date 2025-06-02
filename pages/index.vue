<template>
  <div class="content">
    <div class="motto">
      <p>Create an instruction in a couple of clicks</p>
    </div>
    <div class="content-auth-buttons">
      <PrimaryButton @click="navigateTo('/auth/signup')">Sign up</PrimaryButton>
      <IconButton @click="navigateTo('/auth/login')" type="primary" fill-mode="bordered">
        <span>Log in</span>
      </IconButton>
    </div>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: 'home'
})

</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;

  .content-auth-buttons {
    grid-row: 4;

    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
      pointer-events: auto;
    }

    @media screen and (min-width: 500px) {
      display: none;
    }
  }

  .motto {
    grid-row-start: 1;
    grid-row-end: 4;

    display: flex;
    align-items: center;

    p {
      max-width: 800px;
      font-family: Inter;
      font-weight: bold;
      font-size: 3.5em;
    }
  }
}
</style>