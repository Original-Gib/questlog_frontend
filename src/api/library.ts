import { api } from './client'
import type { LibraryEntry, LibraryStatus } from '@/types/library'

export interface CreateLibraryEntryPayload {
  gameId: string
  consoleId: string
  status: LibraryStatus
}

export interface UpdateLibraryEntryPayload {
  status?: LibraryStatus
  startedAt?: string | null
  completedAt?: string | null
  hoursPlayed?: number | null
}

export const libraryApi = {
  getAll: () => api.get<LibraryEntry[]>('/library'),
  create: (payload: CreateLibraryEntryPayload) => api.post<LibraryEntry>('/library', payload),
  update: (id: string, payload: UpdateLibraryEntryPayload) =>
    api.put<LibraryEntry>(`/library/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/library/${id}`),
}
