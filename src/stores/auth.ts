import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Provider, Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => session.value !== null)
  const user = computed<User | null>(() => session.value?.user ?? null)

  async function initialize() {
    if (initialized.value) return

    const { data } = await supabase.auth.getSession()
    session.value = data.session
    initialized.value = true

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
    })
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

  return { session, user, initialized, isAuthenticated, initialize, login, register, loginWithOAuth, logout }
})
