export type LibraryStatus = 'not_started' | 'in_progress' | 'completed' | 'abandoned'

export interface LibraryEntry {
  id: string
  userId: string
  gameId: string
  consoleId: string
  status: LibraryStatus
  startedAt: string | null
  completedAt: string | null
  hoursPlayed: number | null
}

export interface WishlistEntry {
  id: string
  userId: string
  gameId: string
  addedAt: string
}

export interface Review {
  id: string
  userId: string
  gameId: string
  rating: number
  body: string
  createdAt: string
}
