<template>
  <form class="auth-form" method="post" autocomplete="on" @submit.prevent="submitForm($event)">
    <div class="form-name">Registration</div>
    <div class="section">
      <label for="email">Email</label>
      <input type="email" :class="userExists ? 'error' : ''" name="email" id="email" v-model="email" autofocus
        placeholder="example@domain.com" required>
      <div class="error" v-if="userExists">User already exists</div>
    </div>
    <div class="section">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password" placeholder="password" required>
      <ul class="conditions">
        <li :class="item.passed ? 'accepted' : 'denied'" v-for="item in passwordConditions">{{ item.message }}</li>
      </ul>
    </div>
    <button type="submit">Submit</button>
    <div class="redirect-info">Already have an account? <NuxtLink to="/auth/login" class="primary-link">Log in
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Condition } from '~/utils/validator'
import type { ConditionResult } from '~/types/ConditionResult'
import { LengthCondition, UppercaseCondition, LowercaseCondition, NumberCondition, SpecialCharCondition } from '~/utils/validator'

import { FetchError } from 'ofetch';

definePageMeta({
  layout: 'auth'
})

const conditions: Condition[] = [
  new LengthCondition(),
  new UppercaseCondition(),
  new LowercaseCondition(),
  new NumberCondition(),
  new SpecialCharCondition()
]

function checkConditions(value: string) {
  return conditions.map(cond => {
    return {
      message: cond.message,
      passed: cond.test(value)
    }
  })
}

const userExists = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const passwordConditions = ref<ConditionResult[]>(checkConditions(''))

watch(email, (val) => {
  // Reset error block
  userExists.value = false
})

watch(password, (value) => {
  passwordConditions.value = checkConditions(value)
})

const submitForm = async (event: any) => {
  const formData = new FormData(event.target, event.submitter)
  const email = formData.get('email') || ''
  const password = formData.get('password') || ''

  if (!isValidEmail(email.toString()) || !isValidPassword(password.toString())) return;

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email, password }
    })
    await useRouter().replace('/dashboard')
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.statusCode == 409) {
        userExists.value = true;
      } else {
        console.error(e.statusMessage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/auth-form.scss";

input.error {
  border: 1px solid $error;
}

.error {
  color: $error;
  padding-left: 25px;
}

.conditions {
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding-top: 5px;
  padding-left: 25px;
  // margin: 0;

  li {
    font-size: small;
  }

  .accepted {
    color: $success;
  }

  .denied {
    color: $error;
  }
}
</style>