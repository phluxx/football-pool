import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
import router from './router.js'

createApp(App).use(router).mount('#app')
