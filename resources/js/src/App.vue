<template>
<<<<<<< HEAD
  <div id="app" class="h-100" :class="[skinClasses]">
      <component :is="layout">
        <router-view />
      </component>
    <scroll-to-top v-if="enableScrollToTop" />
=======
  
  <div id="app" :class="{ 'h-100' : route.meta.layout !=  'travel', ...skinClasses }" style="min-height:100%" >

      <component :is="layout">
        <router-view />
      </component>
    
      <scroll-to-top v-if="enableScrollToTop" />
  
>>>>>>> vite
  </div>
</template>

<script>

import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'

import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { watch,onMounted,toRefs,onActivated,computed } from '@vue/composition-api'
<<<<<<< HEAD
import useAppConfig from '@core/app-config/useAppConfig'
import { useWindowSize, useCssVar, useNetwork } from '@vueuse/core'
import store from '@/store'
import {Notification} from 'element-ui'
import { useRoute } from 'vue2-helpers/vue-router';
=======

import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar, useNetwork } from '@vueuse/core'

import store from '@/store'

import {Notification} from 'element-ui'

import { useRoute } from 'vue2-helpers/vue-router';

>>>>>>> vite
export default {

  components: {
    LayoutHorizontal: () => import('@/layouts/horizontal/LayoutHorizontal.vue'),
    LayoutVertical: () => import('@/layouts/vertical/LayoutVertical.vue'),
    LayoutFull: () => import('@/layouts/full/LayoutFull.vue'),
    LayoutTravel: () => import('@/layouts/travel/LayoutTravel.vue'),
<<<<<<< HEAD
=======
    LayoutNegocio: () => import('@/layouts/negocio/LayoutNegocio.vue'),
>>>>>>> vite
    ScrollToTop,
  },

  beforeCreate() {
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus

    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')

<<<<<<< HEAD
   

=======
>>>>>>> vite
  },
 

  setup(props) {

    const route = useRoute();
    const contentLayoutType = computed(() => store.state.appConfig.layout.type)

    const layout = computed(() => {
      
      if (route.meta.layout === 'full') return 'layout-full'
      if (route.meta.layout === 'travel') return 'layout-travel'
<<<<<<< HEAD
=======
      if (route.meta.layout === 'negocio') return 'layout-negocio'
>>>>>>> vite

      return `layout-${contentLayoutType.value}`

    })
<<<<<<< HEAD
=======

>>>>>>> vite
    const { skin, skinClasses } = useAppConfig()
    const { enableScrollToTop } = $themeConfig.layout
    const { isOnline } = useNetwork();

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    
    watch(windowWidth, (val) => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })
<<<<<<< HEAD
    onMounted(() => {

      if(localStorage.getItem('token')){      
        store.commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
      }

    })
    watch(isOnline,(val) => {

        if(!val){
          
=======


    if (localStorage.getItem('token')) {
      store.commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
    }

    // Cargar Sistema
    store.dispatch('sistema/fetch')

  
    watch(isOnline,(val) => {

        if(!val){
>>>>>>> vite
          Notification.info({
            title:'Sin Internet',
            message:"La conexíón ha caido, informalo a tú operadora",
            position:'bottom-right'
          })

        }
<<<<<<< HEAD
=======

>>>>>>> vite
    })
    
    return {
      skinClasses,
      enableScrollToTop,
      layout,
<<<<<<< HEAD
      contentLayoutType
=======
      contentLayoutType,
      route
>>>>>>> vite
    }
  },


}
</script>
