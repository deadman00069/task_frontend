import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignupPage.vue'
import LoginPage from '../views/LoginPage.vue'
import LayoutPage from '@/views/LayoutPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import TasksPage from '@/views/TasksPage.vue'
import ProjectsPage from '@/views/ProjectsPage.vue'
import { useAuthStore } from '@/stores/auth'
import { appStrings } from '@/consts/strings'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: appStrings.routes.path.login,
      name: appStrings.routes.name.login,
      component: LoginPage
    },
    {
      path: appStrings.routes.path.signup,
      name: appStrings.routes.name.signup,
      component: SignUpPage
    },
    {
      path: appStrings.routes.path.layout,
      name: appStrings.routes.name.layout,
      component: LayoutPage,
      children: [
        {
          path: appStrings.routes.path.dashboard,
          name: appStrings.routes.name.dashboard,
          component: DashboardPage
        },
        {
          path: appStrings.routes.path.tasks,
          name: appStrings.routes.name.tasks,
          component: TasksPage
        },
        {
          path: appStrings.routes.path.projects,
          name: appStrings.routes.name.projects,
          component: ProjectsPage
        }
      ]
    }
  ]
})

// router.beforeResolve((to, from, next) => {
//   /// If we are going to other protected path

//   if (!useAuthStore().isAuth && to.name !== appStrings.routes.name.login) {
//     next({ name: appStrings.routes.name.login })
//   } else if (useAuthStore().isAuth && to.name === appStrings.routes.name.login) {
//     next({ name: appStrings.routes.name.layout })
//   } else {
//     next()
//   }

//   /// if user islogged in and visiting login route
// })

router.beforeResolve((to, from, next) => {
  const authStore = useAuthStore()
  const isAuth = authStore.isAuth

  if (isAuth && to.name === appStrings.routes.name.login) {
    next({ path: `${appStrings.routes.path.layout}/${appStrings.routes.path.dashboard}` })
  }
  // Allow navigation if no redirects are needed
  else {
    next()
  }
})

export default router
