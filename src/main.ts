import { createApp } from 'vue'
import './assets/main.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = useAuthStore()
auth.initialize()

app.mount('#app')
