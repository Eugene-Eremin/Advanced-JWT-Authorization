<template>
  <div>
    <h1>{{ store.isAuth ? `${store.user.email} - авторизован` : "Не авторизован" }}</h1>
    <form @submit.prevent>
      <input v-model="email" placeholder="Почта" />
      <input v-model="password" placeholder="Пароль" />
      <button @click="login">Войти</button>
      <button @click="registration">Регестрироваться</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useStore } from './stores/store'
const store = useStore()

onMounted(() => {
  if (localStorage.getItem('token')) {
    store.checkAuth()
  }
})

const email = ref<string>('')
const password = ref<string>('')

const login = (): void => {
  console.log('Войти')
  store.login(email.value, password.value)
}

const registration = (): void => {
  console.log('Регестрироваться')
  store.registration(email.value, password.value)
}

</script>