import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import MatchupPicker from './components/MatchupPicker.vue'
import AdminMatchupEditor from './components/AdminMatchupEditor.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/pick', component: MatchupPicker },
  { path: '/admin/matchups', component: AdminMatchupEditor },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;

