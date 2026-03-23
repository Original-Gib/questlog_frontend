import type { Provider } from '@supabase/supabase-js'

export interface OAuthProvider {
  provider: Provider
  label: string
}

export const oauthProviders: OAuthProvider[] = [
  { provider: 'google', label: 'Google' },
  { provider: 'twitch', label: 'Twitch' },
  { provider: 'discord', label: 'Discord' },
]
