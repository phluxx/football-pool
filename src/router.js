import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import MatchupPicker from './components/MatchupPicker.vue'
import AdminPage from './components/AdminPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/pick', component: MatchupPicker },
  { path: '/admin', name: 'AdminPage', component: AdminPage, },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;

