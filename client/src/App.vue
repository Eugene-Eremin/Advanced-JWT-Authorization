<template>
  <div>
    <form @submit.prevent>
      <div>{{ mes }}</div>
      <input v-model="email" placeholder="Почта" />
      <input v-model="password" placeholder="Пароль" />
      <button @click="go">{{ mes }}</button>
      <a @click="change('Регестрироваться')">Регестрироваться</a>
      <a @click="change('Войти')">Войти</a>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useStore } from './stores/store'

const store = useStore()

const mes = ref<string>('Войти')

const email = ref<string>('')
const password = ref<string>('')

const change = (str: string): void => {
  mes.value = str
}

const go = (): void => {
  if (mes.value == 'Войти') {
    console.log('Войти')
    store.login(email.value, password.value)
  } else {
    console.log('Регестрироваться')
    store.registration(email.value, password.value)

  }
  console.log(email.value, password.value)
}
</script>