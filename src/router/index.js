import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import SigninView from '../views/SigninView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(getAuth(), user => {
        if(user) {
          console.log(user)
          next()
        } else {
          next("/signin")
        }
      });
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  },
  {
    path: "/signin",
    name: "signin",
    component: SigninView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
