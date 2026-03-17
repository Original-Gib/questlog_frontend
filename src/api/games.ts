import { api } from './client'
import type { Game } from '@/types/game'

export const gamesApi = {
  search: (query: string) => api.get<Game[]>(`/games?q=${encodeURIComponent(query)}`),
  getById: (id: string) => api.get<Game>(`/games/${id}`),
}
