import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/models/IUser'
import AuthService from '@/services/AuthService'

export const useStore = defineStore('store', () => {
  let user = {} as IUser
  let isAuth = false as Boolean

  const setAuth = (bool: Boolean): void => {
    isAuth = bool
  }

  const setUser = (user: IUser): void => {
    user = user
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

  return { user, isAuth, setAuth, setUser, login, registration, logout }
})
