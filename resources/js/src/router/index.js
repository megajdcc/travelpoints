import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import calidad from './routes/calidad'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base:'/',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },

    ...dashboard,
    ...pages,
    ...calidad,
    
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  
  const isLoggedIn = (localStorage.getItem('token'))  ? true : false;

  if (!canNavigate(to) && !isLoggedIn ) {
    return next({name:'login'})
  } else if(!canNavigate(to) && isLoggedIn){
    return next({ name: 'misc-not-authorized' })
  } else if (to.meta.redirectIfLoggedIn === true && isLoggedIn){
    return next({ name: 'home' })
  }else {
    next();
  }

})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')

  if(appLoading) {
    appLoading.style.display = 'none'
   
  }

})

export default router
