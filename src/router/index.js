import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../components/pages/LoginView.vue'
import DashboardLayout from '../components/pages/layouts/Dashboard.vue';
// import Dashboard from '../components/pages/Dashboard.vue';
import Productions from '../components/pages/Productions.vue';
import Coauthor from '../components/pages/Coauthor.vue'
import TeachersView from '../components/pages/Teachers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "dashboard",
        name: "Home",
        component: TeachersView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/teachers",
        name: "teachers",
        component: TeachersView,
        meta: {
          requiresAuth: true
        }
      },

      {
        path: "/productions",
        name: "Produções",
        component: Productions,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/coauthor",
        name: "Coautores",
        component: Coauthor,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
