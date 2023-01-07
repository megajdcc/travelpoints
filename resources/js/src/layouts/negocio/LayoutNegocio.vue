<template>

   <layout-negocio :nav-menu-items="navMenuItems">
      <router-view />
      <app-customizer v-if="showCustomizer" slot="customizer" />
   </layout-negocio>

</template>

<script>
import LayoutNegocio from '@core/layouts/layout-negocio/LayoutNegocio.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'
import navMenuItems from '@/navigation/negocio'


import store from '@/store'
import router from '@/router'

import {onMounted,toRefs,onBeforeMount} from '@vue/composition-api'

export default {
   
   components: {
      AppCustomizer,
      LayoutNegocio,
   },
   data() {
      return {
         showCustomizer: $themeConfig.layout.customizer,
         navMenuItems,
      }
   },


   setup(props){

      
      store.dispatch('negocio/cargarNegocio').then((negocio) => {

            if (!negocio.id) {
               router.push({ name: 'inicio' })
            }

      }).catch(e => {
         router.push({ name: 'inicio' })
      })

      
   }

}
</script>
