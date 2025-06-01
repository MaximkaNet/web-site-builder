<template>
  <form class="auth-form" method="post" autocomplete="on" @submit.prevent="submitForm($event)">
    <div class="form-name">Login</div>
    <div class="invalid-credentials" v-if="invalidCredentials">Invalid credentials</div>
    <div class="section">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" autofocus placeholder="example@domain.com" required>
    </div>
    <div class="section">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password" placeholder="password" required>
    </div>
    <button type="submit">Submit</button>
    <div class="redirect-info">No account? <NuxtLink to="/auth/signup">Registration</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'

definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')

const invalidCredentials = ref(false)

watch(email, (val) => {
  // Reset error message
  invalidCredentials.value = false;
})

const submitForm = async (event: any) => {
  const formData = new FormData(event.target, event.submitter)
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    // localStorage.setItem('token', response.token)
    await navigateTo('/dashboard')
  } catch (e) {
    if (e instanceof FetchError) {
      invalidCredentials.value = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/auth-form.scss";

.invalid-credentials {
  color: $error;
  text-align: center;
}
</style>