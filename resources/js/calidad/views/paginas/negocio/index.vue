<template>
  <b-container fluid class="mx-0 px-0" v-if="negocio.id">
    
    <b-row class="mx-0">
      <b-col cols="12 mx-0 px-0">

        <!-- Banner Header Perfil Negocio - terminar actions de los botones y las calificaciones -->
        <banner-negocio :negocio="negocio" :promedioCalificacion="promedioCalificacion"></banner-negocio>
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="12" md="8">

        <transition :name="routerTransition" mode="out-in">
          <router-view />
        </transition>

      </b-col>

      <b-col cols="12" md="4">

        <b-card class="mt-1">

          <section class="d-flex flex-wrap " >

            <font-awesome-icon icon="fas fa-handshake" class="mr-1" />
              {{ negocio.seguidores.length > 1 ? `${negocio.seguidores.length} personas siguen a este negocio` : `${negocio.seguidores.length} persona siguen a este negocio` }}

          </section>

          <section class="d-flex flex-wrap " >

            <font-awesome-icon icon="fas fa-heart" class="mr-1" color="red" />
            {{ negocio.recomendaciones.length > 1 ? `${negocio.recomendaciones.length} personas lo recomienda` : `${negocio.recomendaciones.length} persona lo recomienda` }} 

          </section>


          <section class="d-flex align-items-center sticky-top" style="top:5rem">
          
            <h2 class="font-weight-bolder my-0 mr-1">
              {{ promedioCalificacion }}
            </h2>
          
            <el-rate :value="promedioCalificacion" disabled disabled-void-color="#4f4f4f" void-color="#000000"
              class="d-flex flex-nowrap" />
          
            <p class="my-0 font-weight-bolder">
              {{ negocio.opinions.length }} <small>Opiniones</small>
            </p>
          
          </section>

          <!-- <section class="d-flex flex-wrap ">
            <font-awesome-icon icon="fas fa-star " class="mr-1" color="yellow" />
            5 / 5 de <b-link> {{ negocio.opinions.length  }} opiniones</b-link>
          </section> -->

        </b-card>

        <h2 class="display-4">Sobre <span class="text-warning">{{ negocio.nombre }}</span></h2>

        <b-card body-class="d-flex flex-column justify-content-center">

          <section class="d-flex align-items-center">
            <!-- Logo -->
            <section class="w-25">
              <b-img style="width:100%; height:60px; object-fit:contain"
                :src="`/storage/negocios/logos/${negocio.logo}`" />
            </section>

            <!-- Otros -->
            <section class="w-75">
              <table class="table table-sm table-hover" border="0">
                <tr class="" v-if="negocio.emails.length">
                  <td>
                    <font-awesome-icon icon="fas fa-envelope" />
                  </td>

                  <td>
                    <b-link :href="`mailto:${negocio.emails[0].email}`" target="_blank">
                      {{ negocio.emails[0].email }}
                    </b-link>
                  </td>
                </tr>

                <tr class="" v-if="negocio.telefonos.length">
                  <td>
                    <font-awesome-icon icon="fas fa-phone" />
                  </td>

                  <td>
                    <b-link :href="`tel:${negocio.telefonos[0].telefono}`" target="_blank">
                      {{ negocio.telefonos[0].telefono }}
                    </b-link>
                  </td>
                </tr>


                <tr class="" v-if="negocio.sitio_web">
                  <td>
                    <font-awesome-icon icon="fas fa-globe" />
                  </td>

                  <td>
                    <b-link :href="negocio.sitio_web" target="_blank">
                      {{ negocio.sitio_web }}
                    </b-link>
                  </td>
                </tr>

                <tr class="">
                  <td>
                    <font-awesome-icon icon="fas fa-map" />
                  </td>

                  <td>
                    {{ negocio.direccion }}
                  </td>
                </tr>




              </table>
            </section>

          </section>

          <el-divider></el-divider>

       

          <!-- Perfil Negocio Mapa -->
            <GmapMap :center="{lat:Number(negocio.lat), lng:Number(negocio.lng)}" :zoom="17" map-type-id="terrain" style="width: 100%; height: 300px">
              
              <GmapMarker :key="0" :position="{
                lat:Number(negocio.lat),
                lng:Number(negocio.lng)
              }" :visible="true" :draggable="false" :clickable="false">

                      <GmapInfoWindow :options="optionsPlace">
                      </GmapInfoWindow>
              
              </GmapMarker>
              
            </GmapMap>


          <el-divider></el-divider>

          <table class="table table-hover table-sm table-responsive" border="0" v-if="negocio.precios">
            <tr>
              <td>
                <strong>Rango de precios</strong>
              </td>
              <td>
                Min: {{ negocio.precios.precio_minimo | currency(negocio.divisa.iso) }} - Max: {{
                  negocio.precios.precio_maximo | currency(negocio.divisa.iso)
                }}
              </td>
            </tr>
          </table>

          <el-divider></el-divider>

          <table class="table table-hover table-sm " border="0" v-if="negocio.redes.length">
            <tr>
              <td>
                <strong>Seguir</strong>
              </td>
              <td>

                <section class="d-flex justify-content-around">

                  <b-avatar v-for="({ icono, nombre, url }, i) in negocio.redes" :key="i" :href="url" target="_blank"
                    v-b-tooltip.hover="nombre" :variant="getColorRed(nombre)">
                    <font-awesome-icon :icon="['fab', icono]" />
                  </b-avatar>

                </section>

              </td>
            </tr>
          </table>

        </b-card>

        <!-- Menú  -->
        <b-card>
          <b-nav vertical card-header class="menu-socio">

            <b-nav-item :to="{ name: 'perfil.negocio' }" active-class="active" exact>
              <font-awesome-icon icon="fas fa-home"/>
              {{ negocio.nombre  }}
            </b-nav-item>

              <!-- <b-nav-item :to="{ name: 'perfil.negocio.cupones' }" active-class="active" exact >
                <font-awesome-icon icon="fas fa-ticket" />
                Cupones
              </b-nav-item> -->


              <b-nav-item :to="{ name: 'perfil.negocio.publicaciones' }" active-class="active">
                <font-awesome-icon icon="fas fa-flag"/>
                Publicaciones
              </b-nav-item>

              <b-nav-item :to="{ name: 'perfil.negocio.eventos' }" active-class="active">
                <font-awesome-icon icon="fas fa-calendar" />
                Eventos
              </b-nav-item>


              <!-- <b-nav-item :to="{ name: 'perfil.negocio.opiniones' }" active-class="active">
                <font-awesome-icon icon="fas fa-comments" />
                Opiniones
              </b-nav-item> -->
        
          </b-nav>
        </b-card>

        <template v-if="negocio.horarios.length">
            <h2 class="display-4">Horario de  <span class="text-warning">Trabajo</span></h2>

          <b-card>
            <table class="table table-sm table-hover ">

              <tr v-for="(horario, i) in negocio.horarios">
                  <td>
                    {{ horario.dia | dia }}
                  </td>

                  <td>
                    <template v-if="horario.apertura && horario.cierre">
                      {{ horario.apertura | fecha('hh:mm A', true) }} - {{ horario.cierre | fecha('hh:mm A', true) }}
                    </template>

                    <template v-else>
                      <strong class="text-danger">Cerrado</strong>
                    </template>
                  
                  </td>
              </tr>

            </table>
          </b-card>
        </template>
      

        <template v-if="negocio.amenidades.length">
          <h2 class="display-4">Amenidades</h2>
          <b-card>

            <b-form-checkbox-group :options="negocio.amenidades"  text-field="nombre" value-field="id"
             disabled :checked="negocio.amenidades.map(val => val.id)">
            </b-form-checkbox-group>

          </b-card>
        </template>
      

        <section class="d-flex justify-content-center align-items-center flex-column" v-if="negocio.formas_pago.length">
            <h2 class="display-5 text-muted">Pagos Aceptados</h2>

            <article class="d-flex flex-wrap">
              <b-form-checkbox-group :options="negocio.formas_pago" text-field="nombre" value-field="id" disabled
                :checked="negocio.formas_pago.map(val => val.id)">
              </b-form-checkbox-group>
            </article>
            
        </section>

        
          
        


      </b-col>

    </b-row>



  </b-container>
</template>

<script>

import { toRefs, ref, computed } from '@vue/composition-api'

import store from '@/store'
import router from '@/router';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import {
  BContainer,
  BRow,
  BCol,
  BForm,
  BImg,
  BBadge,
  BButtonGroup,
  BButton,
  VBTooltip,
  BCard,
  BLink,
  BMedia,
  BAvatar,
  BNav,
  BNavItem,
  BFormCheckboxGroup


} from 'bootstrap-vue'

import useAppConfig from '@core/app-config/useAppConfig'

export default {

  components: {
    BContainer,
    BRow,
    BCol,
    BForm,
    BImg,
    BBadge,
    BButtonGroup,
    BButton,
    Swiper,
    SwiperSlide,
    BCard,
    BLink,
    BMedia,
    BAvatar,
    BNav,
    BNavItem,
    BFormCheckboxGroup,
    BannerNegocio:() => import('components/BannerNegocio.vue'),


  },

  directives: {
    'b-tooltip': VBTooltip
  },

  props: {
    url: String
  },


  setup(props) {
    const { url } = toRefs(props)
    const { negocio } = toRefs(store.state.negocio)


    store.dispatch('negocio/negocioUrl', url.value).then(({ result }) => {

      if (!result) {
        router.push({ name: 'inicio' })
      }

    }).catch(e => {
      router.push({ name: 'inicio' })
    })


    const {
      routerTransition
    } = useAppConfig();

 

    return {
      routerTransition,
      loading: computed(() => store.state.loading),
      negocio,
      promedioCalificacion: computed(() => store.getters['negocio/promedioCalificacion'](negocio.value)),
      porcentajeOpinions: (cal) => store.getters['negocio/porcentajeOpinions'](cal),
      optionsPlace: computed(() => ({ content: `<strong>${negocio.value.nombre}</strong>` })),

      getColorRed: (red) => {
        switch (red) {
          case 'Facebook':
            return 'primary'
            break;

          default:
            return 'dark'
            break;
        }
      }

    }
  }

}
</script>




<style lang="scss" scoped>
@import '@/assets/scss/variables/variables';

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