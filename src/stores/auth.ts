import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Provider, Session, Subscription, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const initialized = ref(false)
  let subscription: Subscription | null = null

  const isAuthenticated = computed(() => session.value !== null)
  const user = computed<User | null>(() => session.value?.user ?? null)

  async function initialize() {
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    initialized.value = true

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
    })
    subscription = listener.subscription
  }

  function dispose() {
    subscription?.unsubscribe()
  }

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function register(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  async function loginWithOAuth(provider: Provider) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
    if (error) throw error
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return { session, user, initialized, isAuthenticated, initialize, dispose, login, register, loginWithOAuth, logout }
})
