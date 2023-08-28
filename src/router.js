import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import MatchupPicker from './components/MatchupPicker.vue'
import AdminPage from './components/AdminPage.vue'
import CreateWeeklyGames from './components/CreateWeeklyGames.vue'
import UpdateScores from './components/UpdateScores.vue'
import UpdateWeeklyGames from './components/UpdateWeeklyGames.vue'
import ViewMyPicks from './components/ViewMyPicks.vue'
import ViewAllPicks from './components/ViewAllPicks.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/pick', component: MatchupPicker },
  { path: '/viewmypicks', component: ViewMyPicks },
  { path: '/viewallpicks', component: ViewAllPicks },
  { path: '/admin', name: 'AdminPage', component: AdminPage },
  { path: '/admin/create', name: 'CreateWeeklyGames', component: CreateWeeklyGames },
  { path: '/admin/updategames', name: 'UpdateWeeklyGames', component: UpdateWeeklyGames},
  { path: '/admin/updatescores', name: 'UpdateScores', component: UpdateScores },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
