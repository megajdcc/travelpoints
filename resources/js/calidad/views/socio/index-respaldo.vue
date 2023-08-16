<template>
   <div v-if="usuario.id" id="user-profile">
      <profile-header :header-data="usuario" />
      <!-- profile info  -->
      <section id="profile-info">
         <b-row>
            <!-- about suggested page and twitter feed -->
            <b-col lg="3" cols="12" order="2" order-lg="1">

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

                        <b-nav-item :to="{ name: 'socio.negocio.solicitudes' }" active-class="active">
                        <span class="fas fa-file"></span>
                        Solicitudes enviadas

                        <b-badge variant="danger" pill>{{ solicitudesSinAceptar }}</b-badge>
                        </b-nav-item>
                     </b-nav>
               </b-card>

               <b-card v-if="route.meta.name == 'perfil'">

                  <b-nav vertical card-header class="menu-socio"> 
                        <b-nav-item :to="{ name: 'miperfil' }" exact active-class="active" v-if="$can('read', 'perfil')">
                        <span class="fas fa-user"></span>
                        Perfil de viajero
                        </b-nav-item>

                        <b-nav-item :to="{ name: 'micuenta' }" exact active-class="active"
                        v-if="$can('read', 'socio perfil movimientos')">
                        <span class="fas fa-money-check"></span>
                        Cuenta y Movimientos
                        </b-nav-item>


                        <b-nav-item :to="{ name: 'mi.tarjetas' }" exact active-class="active"
                        v-if="$can('read', 'socio perfil tarjetas')">
                        <span class="fas fa-credit-card"></span>
                        Tarjetas asociadas
                        </b-nav-item>

                        <b-nav-item :to="{ name: 'misreferidos' }" exact active-class="active"
                        v-if="$can('read', 'socio perfil amigos')">
                        <span class="fas fa-user-plus"></span>
                        Mis amigos
                        </b-nav-item>

                     </b-nav>
               </b-card>

               <profile-about :about-data="datosPerfil" />
               <!-- <profile-suggested-pages :pages-data="profileData.suggestedPages" /> -->
               <!-- <profile-twitter-feed :twitter-feed="profileData.twitterFeeds" /> -->
            </b-col>
            <!--/ about suggested page and twitter feed -->

            <!-- post -->
            <b-col lg="9" cols="12" order="1" order-lg="2">
               <router-view></router-view>

               <!-- <profile-post :posts="profileData.post" /> -->
            </b-col>
            <!-- post -->

            <!-- latest photos suggestion and polls -->
            <!-- <b-col lg="3" cols="12" order="3"> -->
               <!-- <profile-latest-photos :latest-images="profileData.latestPhotos" /> -->
               <!-- <profile-suggestion :suggestions="profileData.suggestions" /> -->
               <!-- <profile-polls :polls-data="profileData.polls" /> -->
            <!-- </b-col> -->
            <!--/ latest photos suggestion and polls -->

         </b-row>
      </section>
      <!--/ profile info  -->
   </div>
</template>

<script>
import { 
   BRow, 
   BCol,
   BContainer,
   BCard,
   BCardBody,
   BButton,
   BNav,
   BNavItem,
   BAvatar,
   BBadge
 } from 'bootstrap-vue'

import ProfileHeader from 'components/profile/ProfileHeader.vue'
import ProfileAbout from 'components/profile/ProfileAbout.vue'
import CardAdvanceProfile from 'components/profile/CardAdvanceProfile.vue'
// import ProfileSuggestedPages from 'components/ProfileSuggestedPages.vue'
// import ProfileTwitterFeed from 'components/ProfileTwitterFeed.vue'
// import ProfilePost from 'components/ProfilePost.vue'
// import ProfileLatestPhotos from 'components/ProfileLatestPhotos.vue'
// import ProfileSuggestion from 'components/ProfileSuggestion.vue'
// import ProfilePolls from 'components/ProfilePolls.vue'
import profileBottom from 'components/profile/profileBottom.vue'
import { useRoute, } from 'vue2-helpers/vue-router'

import {computed,toRefs,ref,watch, onMounted } from 'vue'
import store from '@/store'
import {getFecha} from '@core/utils/utils'

/* eslint-disable global-require */
export default {
  components: {
      BRow,
      BCol,
      BContainer,
      BCard,
      BCardBody,
      BButton,
      BNav,
      BNavItem,
      BAvatar,
      BBadge,
   CardAdvanceProfile,
    ProfileHeader,
    ProfileAbout,
   //  ProfileSuggestedPages,
   //  ProfileTwitterFeed,
   //  ProfilePost,
   //  ProfileLatestPhotos,
   //  ProfileSuggestion,
   //  ProfilePolls,
    profileBottom,
  },
  

  setup(props){
   const {usuario} = toRefs(store.state.usuario)
   const { solicitudes } = toRefs(store.state.solicitud)

   const route = useRoute();
    onMounted(() => {

         if (!solicitudes.value.length) {
            store.dispatch('solicitud/getMisSolicitudes');
         }
      })

   return {
      usuario,
      route,
      solicitudesSinAceptar: computed(() => `${solicitudes.value.filter(val => val.situacion != 3).length}`),
      datosPerfil:computed(() => ({
         nombre: usuario.value.nombre ? usuario.value.nombre+" "+usuario.value.apellido :usuario.value.username,
         portada:usuario.value.portada,
         avatar:usuario.value.avatar,
         direccion:usuario.value.direccion,
         rol:usuario.value.rol ? usuario.value.rol.nombre : '',
         pais:usuario.value.ciudad ? usuario.value.ciudad.estado.pais.pais : '',
         'teléfono':`<a href="tel:${usuario.value.telefonos.length ? usuario.value.telefonos[0].telefono : ''}">${usuario.value.telefonos.length ? usuario.value.telefonos[0].telefono : ''}</a>`,
         'Registrado desde': getFecha(usuario.value.created_at),
         'Sitio web': `<a href="${usuario.value.website}" target="_blank">${usuario.value.website}</a>`,
         email: `<a href="mailto:${usuario.value.email}" target="_blank">${usuario.value.email}</a>`,
         'Acerca':usuario.value.bio
      }))

   }
  }
 
}
/* eslint-disable global-require */
</script>

<style lang="scss" >
@import '@core/scss/vue/pages/page-profile.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/assets/scss/variables/variables';

.menu-socio {
   .nav-item {
      a {
         color: #909399;
      }


      .router-link-exact-active,
      .active {
         background: $primary !important;
         color: white;
      }

   }

}

.dark-layout {
   .menu-socio {
      .nav-item {
         a {
            color: white !important;
         }


         .router-link-exact-active,
         .active {
            background: $primary !important;
            color: black !important;
         }

      }

   }
}
</style>



