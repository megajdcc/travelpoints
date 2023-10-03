<template>
  <b-container fluid class="mx-0 px-0" v-if="negocio.id">
    
    <b-row class="mx-0 px-0">
      <b-col cols="12 mx-0 px-0 ">

        <!-- Banner Header Perfil Negocio - terminar actions de los botones y las calificaciones -->
        <banner-negocio :negocio="negocio" :promedioCalificacion="promedioCalificacion"></banner-negocio>
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="12" md="8" class="">

        <transition :name="routerTransition" mode="out-in">
          <router-view />
        </transition>

      </b-col>

      <b-col cols="12" md="4" class="">

        <b-card class="mt-1">

          <section class="d-flex flex-wrap " >

            <font-awesome-icon icon="fas fa-handshake" class="mr-1" />
              {{ negocio.seguidores.length > 1 ? `${negocio.seguidores.length} ` + $t('personas siguen a este negocio') : `${negocio.seguidores.length} `+ $t('persona siguen a este negocio') }}

          </section>

          <section class="d-flex flex-wrap " >

            <font-awesome-icon icon="fas fa-heart" class="mr-1" color="red" />
            {{ negocio.recomendaciones.length > 1 ? `${negocio.recomendaciones.length} `+ $t('personas lo recomienda') : `${negocio.recomendaciones.length} `+ $t('persona lo recomienda') }} 

          </section>

          <section class="d-flex align-items-center sticky-top" style="top:5rem">
          
            <h2 class="font-weight-bolder my-0 mr-1">
              {{ promedioCalificacion }}
            </h2>
          
            <el-rate :value="promedioCalificacion" disabled disabled-void-color="#4f4f4f" void-color="#000000"
              class="d-flex flex-nowrap" />
          
            <p class="my-0 font-weight-bolder">
              {{ negocio.opinions.length }} <small>{{ $t('Opiniones')  }}</small>
            </p>
          
          </section>

          <!-- <section class="d-flex flex-wrap ">
            <font-awesome-icon icon="fas fa-star " class="mr-1" color="yellow" />
            5 / 5 de <b-link> {{ negocio.opinions.length  }} opiniones</b-link>
          </section> -->

        </b-card>

        <h2 class="display-4 d-none d-md-flex">{{ $t('Sobre') }} <span class="text-warning">{{ $t(negocio.nombre) }}</span></h2>

        <b-card body-class="flex-column justify-content-center d-none d-md-flex">

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
                    <b-link :href="`mailto:${negocio.emails[0].email}`" target="_blank" style="overflow-wrap: anywhere;">
                      {{ negocio.emails[0].email }}
                    </b-link>
                  </td>
                </tr>

                <tr class="" v-if="negocio.telefonos.length">
                  <td>
                    <font-awesome-icon icon="fas fa-phone" />
                  </td>

                  <td>
                    <b-link :href="`tel:${negocio.telefonos[0].telefono}`" target="_blank" style="overflow-wrap: anywhere;">
                      {{ negocio.telefonos[0].telefono }}
                    </b-link>
                  </td>
                </tr>


                <tr class="" v-if="negocio.sitio_web">
                  <td>
                    <font-awesome-icon icon="fas fa-globe" />
                  </td>

                  <td>
                    <b-link :href="negocio.sitio_web" target="_blank" style="overflow-wrap:anywhere ;">
                      {{ negocio.sitio_web }}
                    </b-link>
                  </td>
                </tr>

               
                
                 <tr class="" >
                    <td>
                      <font-awesome-icon icon="fas fa-map" />
                    </td>

                    <td>
                      {{ $t(negocio.direccion) }}
                    </td>
                  </tr>

                    <tr class="" v-if="negocio.tipo_menu == 1" >
                      <td colspan="2">
                        <b-button :href="negocio.menu" target="_blank" style="text-decoration:none;" block variant="warning">
                          <font-awesome-icon icon="fas fa-book-open"/>
                          {{ $t('Ver menú') }}
                        </b-button>
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
              <tr v-if="negocio.precios.compra_promedio">
                <td>
                  <strong>{{ $t('Compra promedio por persona') }}</strong>
                </td>
                <td>
                  <!-- Min: {{ negocio.precios.precio_minimo | currency(negocio.divisa.iso) }} - Max: {{
                    negocio.precios.precio_maximo | currency(negocio.divisa.iso)
                  }} -->

                  {{  negocio.precios.compra_promedio | currency(negocio.divisa.iso)  }}
                </td>
              </tr>
            </table>

          <el-divider></el-divider>

          <table class="table table-hover table-sm " border="0" v-if="negocio.redes.length">
            <tr>
              <td>
                <strong>{{ $t('Seguir') }}</strong>
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
              {{ $t(negocio.nombre)  }}
            </b-nav-item>

              <!-- <b-nav-item :to="{ name: 'perfil.negocio.cupones' }" active-class="active" exact >
                <font-awesome-icon icon="fas fa-ticket" />
                Cupones
              </b-nav-item> -->


              <b-nav-item :to="{ name: 'perfil.negocio.publicaciones' }" active-class="active">
                <font-awesome-icon icon="fas fa-flag"/>
                {{ $t('Publicaciones')  }}
              </b-nav-item>

              <b-nav-item :to="{ name: 'perfil.negocio.eventos' }" active-class="active">
                <font-awesome-icon icon="fas fa-calendar" />
                {{ $t('Eventos') }}
              </b-nav-item>


              <!-- <b-nav-item :to="{ name: 'perfil.negocio.opiniones' }" active-class="active">
                <font-awesome-icon icon="fas fa-comments" />
                Opiniones
              </b-nav-item> -->
        
          </b-nav>
        </b-card>

        <template v-if="negocio.horarios.length">
            <h2 class="display-4">{{ $t('Horario de')  }}  <span class="text-warning">{{ $t('Trabajo') }}</span></h2>

          <b-card>
            <table class="table table-sm table-hover ">

              <tr v-for="(horario, i) in negocio.horarios" :key="i">
                  <td>
                    {{ horario.dia | dia }}
                  </td>

                  <td>
                    <section v-if="!horario.doble_turno">
                       <template v-if="horario.apertura[0] && horario.cierre[0]">
                        {{ horario.apertura[0] | fecha('hh:mm A', true) }} - {{ horario.cierre[0] | fecha('hh:mm A', true) }}
                      </template>

                      <template v-else>
                        <strong class="text-danger">{{ $t('Cerrado') }}</strong>
                      </template>
                    </section>

                    <section v-else class="">
                       <template v-if="horario.apertura.length && horario.cierre.length">

                        <section class="d-flex justify-content-between">

                          <template v-if="horario.apertura[0] && horario.cierre[0]">
                            {{$t('Mañana')}}: ({{ horario.apertura[0] | fecha('hh:mm A', true) }} - {{ horario.cierre[0] | fecha('hh:mm A', true) }})
                          </template>

                          <template v-else>
                            <strong class="text-danger">{{ $t('Cerrado') }}</strong>
                          </template>

                        </section>
                       
                        <section class="d-flex justify-content-between">
                             <template v-if="horario.apertura[1] && horario.cierre[1]">
                              {{ $t('Tarde') }}: ({{ horario.apertura[1] | fecha('hh:mm A', true) }} - {{ horario.cierre[1] | fecha('hh:mm A', true) }})
                            </template>

                            <template v-else>
                              <strong class="text-danger">{{ $t('Cerrado') }}</strong>
                            </template>
                        </section>
                       
                      </template>

                      <template v-else>
                        <strong class="text-danger">{{ $t('Cerrado') }}</strong>
                      </template>
                    </section>
                   
                  
                  </td>
              </tr>

            </table>
          </b-card>
        </template>
      

        <template v-if="negocio.amenidades.length">
          <h2 class="display-4">{{ $t('Amenidades') }}</h2>
          <b-card>

            <b-form-checkbox-group :options="negocio.amenidades"  text-field="nombre" value-field="id"
             disabled :checked="negocio.amenidades.map(val => val.id)">
            </b-form-checkbox-group>

          </b-card>
        </template>
      

        <section class="d-flex justify-content-center align-items-center flex-column" v-if="negocio.formas_pago.length">
            <h2 class="display-5 text-muted">{{ $t('Pagos Aceptados') }} </h2>

            <article class="d-flex flex-wrap">
              <b-form-checkbox-group :options="negocio.formas_pago" text-field="nombre" value-field="id" disabled
                :checked="negocio.formas_pago.map(val => val.id)">
              </b-form-checkbox-group>
            </article>
            
        </section>

        <h2 class="d-flex d-md-none mt-2" >{{ $t('Opiniones sobre este') }} <strong class="text-warning">{{ $t('Negocio') }}</strong></h2>

        <section class="d-flex d-md-none flex-column ">
          <reviews-opinion :promedioCalificacion="promedioCalificacion" :cantidad="negocio.opinions.length"
            :porcentajeOpinions="porcentajeOpinions" :model="{ model_id: negocio.id, model_type: negocio.modelType }"
            class="mt-1 px-0 mx-0" />

        </section>

      </b-col>

    </b-row>



  </b-container>
</template>

<script>

import { toRefs, ref, computed,onMounted,watch,inject } from 'vue'

import store from '@/store'
import router from '@/router';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

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
    ReviewsOpinion: () => import('components/ReviewsOpinion.vue'),



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
    const cargarForm = () => {
    const i18n = inject('i18n')
      if(negocio.value.id){
         store.dispatch('negocio/aumentarVisita', negocio.value.id)
      }
     
    }

    store.dispatch('negocio/negocioUrl', url.value).then(({ result }) => {

      if (!result) {
        router.push({ name: 'inicio' })
      }

    }).catch(e => {
      router.push({ name: 'inicio' })
    })


   

    onMounted(() => cargarForm())

    watch(negocio,() => cargarForm())

    const {
      routerTransition
    } = useAppConfig();

    const optionsPlace = computed(() => {
      return {
        content: `<strong>${negocio.value.nombre}</strong>`
      }
    })

    return {
      routerTransition,
      loading: computed(() => store.state.loading),
      negocio,
      promedioCalificacion: computed(() => store.getters['negocio/promedioCalificacion'](negocio.value)),
      porcentajeOpinions: (cal) => store.getters['negocio/porcentajeOpinions'](cal),
      optionsPlace,

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