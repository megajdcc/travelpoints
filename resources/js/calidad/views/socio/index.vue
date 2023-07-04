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
                              {{ ` ${usuario.nombre ? usuario.nombre +' ' +usuario.apellido : usuario.username}` }}
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

                  <!-- <b-nav-item :to="{ name: 'socio.cupones' }" active-class="active">
                     <span class="fas fa-ticke"></span>
                     Cupones
                  </b-nav-item> -->

                  <b-nav-item :to="{ name: 'socio.compras' }" active-class="active">
                     <span class="fas fa-weight-hanging"></span>
                     Compras
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.consumos' }" active-class="active">
                     <font-awesome-icon icon="fas fa-concierge-bell" />
                     Consumos
                  </b-nav-item>



               </b-nav>
            </b-card>

            <b-card v-if="route.meta.name == 'negocio'">
               <b-nav vertical card-header class="menu-socio">

                  <b-nav-item :to="{ name: 'socio.negocio.list' }" exact active-class="active">
                     <span class="fas fa-concierge-bell"></span>
                     Mis Negocios
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'socio.negocio.afiliar' }" active-class="active">
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

                  <b-nav-item :to="{ name: 'socio.negocio.solicitudes' }"  active-class="active">
                     <span class="fas fa-file"></span>
                     Solicitudes enviadas

                     <b-badge variant="danger" pill>{{ solicitudesSinAceptar  }}</b-badge>
                  </b-nav-item>
               </b-nav>
            </b-card>

            <b-card v-if="route.meta.name == 'perfil'">

               <b-nav vertical card-header class="menu-socio">
                  <b-nav-item :to="{ name: 'miperfil' }" exact active-class="active">
                     <span class="fas fa-user"></span>
                     Perfil de socio
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'micuenta' }" exact active-class="active">
                     <span class="fas fa-money-check"></span>
                     Cuenta y Movimientos
                  </b-nav-item>


                  <b-nav-item :to="{ name: 'mi.tarjetas' }" exact active-class="active">
                     <span class="fas fa-credit-card"></span>
                     Tarjetas asociadas
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'misreferidos' }" exact active-class="active">
                     <span class="fas fa-user-plus"></span>
                     Mis amigos
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'perfil.editar' }" exact active-class="active">
                     <span class="fas fa-user-edit"></span>
                     Editar Información
                  </b-nav-item>

                  <b-nav-item :to="{ name: 'perfil.datos_pago' }" exact active-class="active" v-if="$can('write','Datos de pago')">
                     <font-awesome-icon icon="fas fa-money-check-dollar"/>
                     Datos de información de pago
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


            <b-card v-if="route.meta.name == 'consumos'">

               <b-nav vertical card-header class="menu-socio">

                  <b-nav-item :to="{ name: 'socio.consumos' }"  exact active-class="active">
                     <font-awesome-icon icon="fas fa-concierge-bell" />
                     Mis consumos
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
   BAvatar,
   BBadge

} from 'bootstrap-vue'
import store from '@/store'
import { computed, toRefs,watch,onMounted } from 'vue'

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
      BAvatar,
      BBadge

   },

   setup() {
      const route = useRoute();
      const {solicitudes} = toRefs(store.state.solicitud)
      const { usuario } = toRefs(store.state.usuario)

      onMounted(() => {

         if(!solicitudes.value.length){
               store.dispatch('solicitud/getMisSolicitudes');
         }
      })


      return {
         usuario,
         route,
         solicitudesSinAceptar:computed(() => `${solicitudes.value.filter(val => val.situacion != 3 ).length}` )
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