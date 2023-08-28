<template>
  <layout-vertical :nav-menu-items="itemsMenu">

    <router-view />

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />

  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'
import navMenuItems from '@/navigation/vertical'
import navMenuItemsPromotor from '@/navigation/vertical/promotor'
import navMenuItemsLider from '@/navigation/vertical/lider'
import navMenuItemsCoordinador from '@/navigation/vertical/coordinador'

import {computed,toRefs} from 'vue'
import store from '@/store'

export default {
  components: {
    AppCustomizer,
    LayoutVertical,
  },

  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },

  setup(props){
    const {usuario} = toRefs(store.state.usuario)

    const itemsMenu = computed(() => {
      if(usuario.value.rol){

        let RolMenus = {
          promotor: navMenuItemsPromotor,
          lider: navMenuItemsLider,
          coordinador: navMenuItemsCoordinador
        };
        let k = Object.keys(RolMenus).find(val => {
          if(usuario.value.rol && usuario.value.rol.nombre){
            return val == usuario.value.rol.nombre.toLowerCase()
          }
          return false
         
        });

        if(k != undefined){
          return RolMenus[k]
        }

        return navMenuItems

         
      }else{
        return navMenuItems
      }
    })

    return {
      itemsMenu
    }
  }

}
</script>
