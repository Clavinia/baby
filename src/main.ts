import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppRoot from './AppRoot.vue'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/primeros-alimentos',
      name: 'primeros-alimentos',
      component: App,
    },
    {
      path: '/first-food',
      name: 'first-food',
      component: App,
    },
    {
      path: '/',
      redirect: '/primeros-alimentos',
    },
  ],
})

const app = createApp(AppRoot)

app.use(router)
app.mount('#app')
