import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import MatchupPicker from './components/MatchupPicker.vue'
import AdminPage from './components/AdminPage.vue';
import CreateWeeklyGames from './components/CreateWeeklyGames.vue';
import UpdateScores from './components/UpdateScores.vue';
import UpdateWeeklyGames from './components/UpdateWeeklyGames.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/pick', component: MatchupPicker },
  { path: '/admin', name: 'AdminPage', component: AdminPage },
  { path: '/admin/create', name: 'CreateWeeklyGames', component: CreateWeeklyGames },
  { path: '/admin/updategames', name: 'UpdateWeeklyGames', component: UpdateWeeklyGames}
  { path: '/admin/updatescores', name: 'UpdateScores', component: UpdateScores },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
