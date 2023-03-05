import $api from '../http'
import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '@/models/response/AuthResponse'
import type { IUser } from '@/models/IUser'

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}
