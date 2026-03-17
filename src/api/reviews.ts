import { api } from './client'
import type { Review } from '@/types/library'

export interface CreateReviewPayload {
  gameId: string
  rating: number
  body: string
}

export const reviewsApi = {
  getForGame: (gameId: string) => api.get<Review[]>(`/games/${gameId}/reviews`),
  create: (payload: CreateReviewPayload) => api.post<Review>('/reviews', payload),
  update: (id: string, payload: Partial<Pick<CreateReviewPayload, 'rating' | 'body'>>) =>
    api.put<Review>(`/reviews/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/reviews/${id}`),
}
