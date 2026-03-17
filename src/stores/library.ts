import { ref } from 'vue'
import { defineStore } from 'pinia'
import { libraryApi } from '@/api/library'
import type { LibraryEntry } from '@/types/library'

export const useLibraryStore = defineStore('library', () => {
  const entries = ref<LibraryEntry[]>([])
  const loading = ref(false)

  async function fetchLibrary() {
    loading.value = true
    try {
      entries.value = await libraryApi.getAll()
    } finally {
      loading.value = false
    }
  }

  return { entries, loading, fetchLibrary }
})
