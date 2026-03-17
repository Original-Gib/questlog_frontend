import { api } from './client'
import type { WishlistEntry } from '@/types/library'

export const wishlistApi = {
  getAll: () => api.get<WishlistEntry[]>('/wishlist'),
  add: (gameId: string) => api.post<WishlistEntry>('/wishlist', { gameId }),
  remove: (id: string) => api.delete<void>(`/wishlist/${id}`),
}
