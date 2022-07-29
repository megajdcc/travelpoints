<template>
   <b-container fluid class="px-0">
      <b-row>

         <b-col cols="12" md="3">
            <b-card>
               <b-nav vertical card-header class="menu-socio">
                  <b-nav-item :to="{ name: 'miperfil' }" active-class="active">

                     <b-container fluid>
                        <b-row class="px-0">
                           <b-col cols="2" class="px-0">
                              <b-avatar :src="usuario.avatar" />
                           </b-col>
                           <b-col cols="10" class="px-0">
                              {{ `${usuario.nombre} ${usuario.apellido}` }}
                           </b-col>
                        </b-row>
                     </b-container>

                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.negocio.list' }" active-class="active">
                     <span class="fas fa-briefcase"></span>
                     Negocio
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.reservaciones' }" active-class="active">
                     <span class="fas fa-credit-card"></span>

                     Reservaciones
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.consumos' }" active-class="active">
                     <span class="fas fa-concierge-bell"></span>
                     Consumos
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.certificados' }" active-class="active">
                     <span class="fas fa-gifts"></span>
                     Certificados
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.compras' }" active-class="active">
                     <span class="fas fa-weight-hanging"></span>
                     Compras
                  </b-nav-item>



               </b-nav>
            </b-card>

            <b-card v-if="route.meta.name == 'negocio'">
               <b-nav vertical card-header class="menu-socio">

                  <b-nav-item :to="{ name: 'socio.negocio.list' }" exact active-class="active">
                     <span class="fas fa-concierge-bell"></span>
                     Mis Negocios
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.negocio.afiliar' }" exact active-class="active">
                     <span class="fas fa-plus-circle"></span>
                     Afiliar mi negocio
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.negocio.siguiendo' }" exact active-class="active">
                     <span class="fas fa-bookmark"></span>
                     Siguiendo
                  </b-nav-item>


                  <b-nav-item :to="{ name: 'socio.negocio.recomendados' }" exact active-class="active">
                     <span class="fas fa-heart"></span>
                     Recomendados
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.negocio.solicitudes' }" exact active-class="active">
                     <span class="fas fa-file"></span>
                     Solicitudes enviadas
                  </b-nav-item>
               </b-nav>
            </b-card>

            <b-card v-if="route.meta.name == 'perfil'">
               <b-nav vertical card-header class="menu-socio">

                  <b-nav-item :to="{ name: 'miperfil' }" exact active-class="active">
                     <span class="fas fa-user"></span>
                     Perfil de socio
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'misreferidos' }" exact active-class="active">
                     <span class="fas fa-user-plus"></span>
                     Mis Referidos
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'perfil.editar' }" exact active-class="active">
                     <span class="fas fa-user-edit"></span>
                     Editar Información
                  </b-nav-item>


                  <b-nav-item :to="{ name: 'perfil.password' }" exact active-class="active">
                     <span class="fas fa-key"></span>
                     Cambiar Contraseña
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'perfil.desactivar' }" exact active-class="active">
                     <span class="fas fa-window-close"></span>
                     Desactivar Cuenta
                  </b-nav-item>
               </b-nav>
            </b-card>

         </b-col>

         <b-col cols="12" md="9">
            <router-view></router-view>
         </b-col>

      </b-row>
   </b-container>
</template>

<script>
import {
   BContainer,
   BRow,
   BCol,
   BCard,
   BCardBody,
   BButton,
   BNav,
   BNavItem,
   BAvatar

} from 'bootstrap-vue'
import store from '@/store'
import { computed, toRefs,watch,onMounted } from '@vue/composition-api'

import { useRoute, } from 'vue2-helpers/vue-router'
export default {
   components: {
      BContainer,
      BRow,
      BCol,
      BCard,
      BCardBody,
      BButton,
      BNav,
      BNavItem,
      BAvatar

   },

   setup() {
      const route = useRoute();

      const { usuario } = toRefs(store.state.usuario)

      return {
         usuario,
         route
      }
   },
}
</script>

<style lang="scss" scoped>

@import '../../../src/assets/scss/variables/variables';

   .menu-socio{
      .nav-item{
         a{
            color: #909399 ;
         }
         
         
         .router-link-exact-active,.active{
            background: $primary !important;
            color:white;
         }

      }
     
   }

.dark-layout{
   .menu-socio {
         .nav-item {
            a {
               color: white !important;
            }
   
   
            .router-link-exact-active,
            .active {
               background: $primary  !important;
               color: black !important;
            }
   
         }
   
      }
}


</style>