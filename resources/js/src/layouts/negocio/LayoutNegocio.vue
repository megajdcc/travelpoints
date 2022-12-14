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
}
</script>
