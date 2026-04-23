import { api } from './client'
import type { Game } from '@/types/game'

export const gamesApi = {
  search: (query: string) => api.get<Game[]>(`/games?q=${encodeURIComponent(query)}`),
  getById: (id: number) => api.get<Game>(`/games/${id}`),
  getPopular: () => api.get<{ games: Game[] }>('/api/v1/games/popular'),
  getUpcoming: () => api.get<{ games: Game[] }>('/api/v1/games/upcoming'),
}
