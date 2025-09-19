import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import IntroPage from '../pages/IntroPage.vue'
import Game from '../pages/Game.vue'
import App from '../App.vue'
import Game2 from '../pages/Game2.vue'
// import หน้าเพจ


// ประกาศ type ของ routes
const routes: RouteRecordRaw[] = [
  {
    path: '/game',
    name: 'game',
    component: Game,
  },
  {
    path: '/intro',
    name: 'intro',
    component: IntroPage,
  },
  {
    path: '/',
    name: 'app',
    component: App,
  },
  {
    path: '/game2',
    name: 'game2',
    component: Game2,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
