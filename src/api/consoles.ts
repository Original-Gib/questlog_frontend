import { api } from './client'
import type { Console } from '@/types/console'

export const consolesApi = {
  getAll: () => api.get<Console[]>('/consoles'),
  getById: (id: string) => api.get<Console>(`/consoles/${id}`),
}
