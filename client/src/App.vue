<template>
  <div v-if="store.isLoading">
    <h1>Загрузка...</h1>
  </div>
  <div v-else>
    <h1>{{ store.isAuth ? `${store.user.email} - авторизован` : "Не авторизован" }}</h1>
    <h2>{{ store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Аккаунт не подтвержден по почте' }}</h2>
    <form @submit.prevent>
      <input v-model="email" placeholder="Почта" />
      <input v-model="password" placeholder="Пароль" />
      <button @click="login">Войти</button>
      <button @click="registration">Регестрироваться</button>
      <button v-if="store.isAuth" @click="store.logout()">Выйти</button>
    </form>
    <button @click="getUsers">Получить пользователей</button>
    <div v-for="user in users" :key="user.email">
      {{ user.email }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { IUser } from './models/IUser'

import { useStore } from './stores/store'
import UserService from './services/UserService';
const store = useStore()

onMounted(() => {
  if (localStorage.getItem('token')) {
    store.checkAuth()
  }
})

const email = ref<string>('')
const password = ref<string>('')

const users = ref<IUser[]>()

const login = (): void => {
  console.log('Войти')
  store.login(email.value, password.value)
}

const registration = (): void => {
  console.log('Регестрироваться')
  store.registration(email.value, password.value)
}

const getUsers = async (): Promise<void> => {
  try {
    const response = await UserService.fetchUsers()
    users.value = response.data
  } catch (e) {
    console.log(e)
  }
}

</script>