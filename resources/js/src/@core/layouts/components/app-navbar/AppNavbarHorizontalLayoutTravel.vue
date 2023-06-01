<template>
   <div class="navbar-container d-flex content align-items-center">

      <!-- Nav Menu Toggler -->
      <ul class="nav navbar-nav d-xl-none">
         <li class="nav-item">
            <b-link class="nav-link d-none" @click="toggleVerticalMenuActive">
               <feather-icon icon="MenuIcon" size="21" />
            </b-link>
         </li>
      </ul>

      <!-- Right Col -->
      <b-navbar-nav class="nav align-items-center ml-auto">
         <locale class="d-none d-md-flex" />

         <carrito-compra v-if="is_loggin && carrito.length" />

         <!-- <b-nav-item :to="{name:'about'}" v-b-tooltip.hover.bottom title="¿Qué es TravelPoints?"
            class="d-none d-md-flex">
            <feather-icon size="21" icon="InfoIcon" />
         </b-nav-item> -->

         <b-nav-item :to="{name:'tienda.travel'}" v-b-tooltip.hover.bottom title="Tienda de Regalos" class="d-none d-md-flex">
            <feather-icon size="21" icon="ShoppingBagIcon" />
         </b-nav-item>

         <b-nav-item :to="{name:'contacto'}" v-b-tooltip.hover.bottom title="Contáctanos" class="d-none d-md-flex">
            <feather-icon size="21" icon="SendIcon" />
         </b-nav-item>

         <dark-Toggler class="d-none d-lg-block" />

         <notification-dropdown v-if="is_loggin" />
         <academia v-if="is_loggin && usuario.rol.academia.length" />
         <user-dropdown />
      </b-navbar-nav>
   </div>
</template>

<script>
import {
   BLink, BNavbarNav, BNavItem,
   VBTooltip
} from 'bootstrap-vue'
import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
import NotificationDropdown from '@/components/notifications.vue'
import UserDropdown from './components/UserDropdown.vue'
import useAuth from '@core/utils/useAuth'

import {toRefs,onMounted,watch} from 'vue'
import store from '@/store'

export default {
   components: {
      BLink,
      // Navbar Components
      BNavbarNav,
      Locale,
      DarkToggler,
      NotificationDropdown,
      UserDropdown,
      BNavItem,
      carritoCompra:() => import('components/carritoCompra.vue'),
    Academia: () => import('components/Academia.vue')

   },
   directives:{
      'b-tooltip':VBTooltip
   },

   props: {
      toggleVerticalMenuActive: {
         type: Function,
         default: () => { },
      },
   },


   setup(){
      const {carrito} = toRefs(store.state.carrito)
      const {usuario} = toRefs(store.state.usuario)

      const {
         is_loggin
      } = useAuth()

      const cargarForm = () => {
           if (is_loggin.value) {
            store.dispatch('carrito/getCarrito', usuario.value.id)
         }
      }

      onMounted(() => cargarForm())
      
      watch([usuario],() =>  cargarForm())

    

      return {
         carrito,
         is_loggin,
         usuario
      }
   }


}
</script>
