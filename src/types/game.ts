export interface Game {
  id: number
  name: string
  cover_url: string
  platforms: string[]
  first_release_date: number
  rating?: number
  hypes?: number
}
