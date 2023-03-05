import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

import type { IUser } from '@/models/IUser'
import type { AuthResponse } from '@/models/response/AuthResponse'

import AuthService from '@/services/AuthService'

import { API_URL } from '@/http'

import axios from 'axios'

export const useStore = defineStore('store', () => {
  const user = ref<IUser>({} as IUser)
  const isAuth = ref<boolean>(false)

  const isLoading = ref<boolean>(false)

  const setAuth = (bool: boolean): void => {
    isAuth.value = bool
  }

  const setUser = (thisUser: IUser): void => {
    user.value = thisUser
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const logout = async () => {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      setAuth(false)
      setUser({} as IUser)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const checkAuth = async () => {
    setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      })
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const setLoading = (bool: boolean) => {
    isLoading.value = bool
  }

  return {
    user,
    isAuth,
    setAuth,
    setUser,
    login,
    registration,
    logout,
    checkAuth,
    isLoading,
    setLoading
  }
})
