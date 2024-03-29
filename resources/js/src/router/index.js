import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import calidad from './routes/calidad'
import paginas from './routes/paginas';
import negocio from './routes/negocio';

Vue.use(VueRouter)
import store from '@/store'
const rutas = [
    ...paginas,
    ...dashboard,
    ...pages,
    ...negocio,
    ...calidad,
      {
        path:'/:page',
        component:() => import('views/paginas/pages.vue'),
        name:'pages.public',
        props:true,
        beforeEnter:(to,from,next) => {
          let param = to.params;
          store.dispatch('pagina/capturarPagina',param.page).then(({result}) => {
            if(result){
              next()
            }else{
              next({name:'error-404'})
            }
          })
        },
        meta:{
          resource: 'Auth',
          layout: 'travel',
        }
    },
    {
      path: '*',
      redirect: 'error-404',
    }]
const router = new VueRouter({
  
  mode: 'history',
  // base: import.meta.env.BASE_URL,
  base:'/',
  scrollBehavior : (to,from,savePosition)  => {
   

    if(savePosition){
      return savePosition
    }else{
      if(to.hash){
        return {
          selector:to.hash
        }
      }

      return { x: 0, y: 0 }
    }
    
  },

  routes:rutas,
})

router.beforeEach((to, from, next) => {
  
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