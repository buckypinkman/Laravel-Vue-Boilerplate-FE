import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Home',
    component: () => import('@/components/layout/TheContainer'),
    meta: {
      auth: true
    },
    children: [
      { path: 'home', name: 'home', component: () => import('@/views/Home') },

      { path: 'user', name: 'user', component: () => import('@/views/User/Index') },
      { path: 'user/create', name: 'user-create', component: () => import('@/views/User/Form') },
      { path: 'user/:id', name: 'user-show', component: () => import('@/views/User/Show') },
      { path: 'user/:id/edit', name: 'user-edit', component: () => import('@/views/User/Form') },

      { path: 'profile', name: 'profile', component: () => import('@/views/Profile') },


    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    // return desired position
    window.scrollTo(0,0)
  }
})

export default router
