import { ref } from 'vue'
import { defineStore } from 'pinia'
import { wishlistApi } from '@/api/wishlist'
import type { WishlistEntry } from '@/types/library'

export const useWishlistStore = defineStore('wishlist', () => {
  const entries = ref<WishlistEntry[]>([])
  const loading = ref(false)

  async function fetchWishlist() {
    loading.value = true
    try {
      entries.value = await wishlistApi.getAll()
    } finally {
      loading.value = false
    }
  }

  return { entries, loading, fetchWishlist }
})
