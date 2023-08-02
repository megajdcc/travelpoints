<template>
  <div id="app" :class="{ 'h-100': route.meta.layout != 'travel', ...skinClasses }" style="min-height:100%">

    <component :is="layout">
      <router-view />
    </component>

    <scroll-to-top v-if="enableScrollToTop" />
    <mi-agenda v-model="showMiAgenda" v-if="is_loggin"/>
    <sidebar-about-profile v-model="showAboutProfile" v-if="is_loggin" :userAbout="userAbout"/>
    <form-agenda v-model="showAgenda" :tipo="tipoAgenda" v-if="is_loggin" :sobre="sobre"/>
    <agenda-fixed  />
    <sidebar-retiro v-if="is_loggin" v-model="showSidebarRetiro" />
  

  </div>
</template>

<script>

import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'

import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { watch, onMounted, toRefs, onActivated, computed,provide,ref } from 'vue'

import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar, useNetwork } from '@vueuse/core'

import store from '@/store'

import { Notification } from 'element-ui'

import { useRoute } from 'vue2-helpers/vue-router';
import useAuth from '@core/utils/useAuth'

export default {

  components: {
    LayoutHorizontal: () => import('@/layouts/horizontal/LayoutHorizontal.vue'),
    LayoutVertical: () => import('@/layouts/vertical/LayoutVertical.vue'),
    LayoutFull: () => import('@/layouts/full/LayoutFull.vue'),
    LayoutTravel: () => import('@/layouts/travel/LayoutTravel.vue'),
    LayoutNegocio: () => import('@/layouts/negocio/LayoutNegocio.vue'),
    ScrollToTop,
    AgendaFixed:() => import('components/AgendaFixed.vue'),
    MiAgenda:() => import('components/MiAgenda.vue'),
    FormAgenda:() => import('components/FormAgenda.vue'),
    SidebarAboutProfile:() => import('components/SidebarAboutProfile.vue'),
    SidebarRetiro:() => import('components/SidebarRetiro.vue')
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

  },


  setup(props) {

    const route = useRoute();
    const contentLayoutType = computed(() => store.state.appConfig.layout.type)
    const usuario = computed(() => store.state.usuario.usuario);
    const showMiAgenda = ref(false)
    const showAgenda  =ref(false)
    const showAboutProfile  = ref(false)
    const showSidebarRetiro= ref(false)
    const tipoAgenda = ref(1)
    const sobre = ref('')
    const userAbout = ref({})

    provide('showMiAgenda', showMiAgenda)
    provide('showAgenda', showAgenda)
    provide('tipoAgenda', tipoAgenda)
    provide('sobre', sobre)
    provide('showAboutProfile', showAboutProfile)
    provide('userAbout', userAbout)
    provide('showSidebarRetiro', showSidebarRetiro)



    const layout = computed(() => {

      if (route.meta.layout === 'full') return 'layout-full'
      if (route.meta.layout === 'travel') return 'layout-travel'
      if (route.meta.layout === 'negocio') return 'layout-negocio'

      return `layout-${contentLayoutType.value}`

    })


    const {
      is_loggin
    } = useAuth();

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


    if (localStorage.getItem('token')) {
      if(localStorage.getItem('userData') != undefined){
       store.commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
      }else{
        if (!usuario.value.id) {
          store.dispatch('usuario/cargarUsuario')
        }
      }
    }

    // Cargar Sistema
    store.dispatch('sistema/fetch')


    watch(isOnline, (val) => {

      if (!val) {
        Notification.info({
          title: 'Sin Internet',
          message: "La conexíón ha caido, informalo a tú operadora",
          position: 'bottom-right'
        })

      }

    })

    return {
      skinClasses,
      enableScrollToTop,
      layout,
      contentLayoutType,
      route,
      is_loggin,
      showMiAgenda,
      tipoAgenda,
      showAgenda,
      sobre,
      showAboutProfile,
      userAbout,
      showSidebarRetiro
    }
  },


}
</script>