import Vue from 'vue'
import VueRouter from 'vue-router'


// Containers
const TheContainer = () => import('@/components/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Home = () => import('@/views/Home')
const About = () => import('@/views/About')

// Auth
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: configRoutes()
})

function configRoutes() {
  return [{
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        requireAuth: true
      },
      children: [{
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [{
              path: 'colors',
              name: 'Colors',
              component: Home,
              meta: {
                requireAuth: true
              },
            },
            {
              path: 'typography',
              name: 'Typography',
              component: About,
              meta: {
                requireAuth: true
              },
            }
          ]
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}

router.beforeEach((to, from, next) => {
  // const publicPages = ['/login', '/register'];
  //const authRequired = !publicPages.includes(to.path);
  if (to.matched.some(route => route.meta.requireAuth)) {
    const loggedIn = localStorage.getItem('user');
    if (!loggedIn) {
      return next('/login')
    }
  }
  next()
})


export default router