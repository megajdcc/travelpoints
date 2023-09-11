<template>
   <b-container fluid class="px-0 mx-0">
      <!-- Search -->
      <b-row>
         <b-col cols="12">
            <b-card class="banner-search" body-class="d-flex justify-content-center align-items-center py-3 w-100"
               :style="{ 'background-image': `url(${imageBanner})` }">
               <search :destino="destino_id" />
            </b-card>
            <b-breadcrumb style="margin-top: -20px;">
               <b-breadcrumb-item @click="limpiarDestinos">
                  <font-awesome-icon icon="fas fa-rotate-right" />
                  {{ $t('Destinos') }}
               </b-breadcrumb-item>
               <b-breadcrumb-item :to="rutaDestino" text>{{ getDestinoName }}</b-breadcrumb-item>
            </b-breadcrumb>

         </b-col>
      </b-row>

      <!-- Destinos -->
      <!-- <destinos :destinos="destinos" /> -->


      <b-tabs content-class="mt-3" nav-class="" ref="refTabs" lazy>
         <b-tab active>

            <template #title>
               <font-awesome-icon icon="fas fa-grip-vertical" class="mr-1" />
               {{ $t('Vista principal') }}
            </template>
            <!-- Destino Perfil -->

            <destino-perfil :destino="origen" isHome v-if="destino_id && origen.id" />
            <!-- Atracciones -->
            <atracciones :atracciones="atracciones.filter(val => val.destino_id == destino_id)" />

            <!-- Negocios -->
            <negocios :destino="destino" v-if="destino_id" id="negocios-list" ref="negociosElem"/>

            <!-- Eventos -->
            <eventos :destino="destino" v-if="destino_id" id="eventos-list" ref="eventosElem"/>

            <!-- Cupones -->

            <cupones :destino="destino" v-if="destino_id" id="cupones-list" ref="destinoElem"  />

         </b-tab>
         <b-tab title="Maps">

            <template #title>
               <font-awesome-icon icon="fas fa-map-location-dot" class="mr-1" />
               {{ $t('Vista Mapa') }}
            </template>

            <travel-map :destino="destino_id" v-if="destino_id" />
         </b-tab>

         <template #tabs-end>
            <li  class="nav-item">
               <b-button class="nav-link" variant="text" role="button"  v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="scrollIr('negocios-list')">
                  <font-awesome-icon icon="fas fa-store" />
                  {{ $t('Negocios') }}
               </b-button>
            </li>

            <li class="nav-item">
               <b-button class="nav-link" variant="text" role="button"  v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="scrollIr('eventos-list')">
                  <font-awesome-icon icon="fas fa-grip" />
                  {{ $t('Eventos') }}
               </b-button>
            </li>

             <li class="nav-item">
               <b-button class="nav-link" variant="text" role="button" v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="scrollIr('cupones-list')">
                  <font-awesome-icon icon="fas fa-tags" />
                  {{ $t('Cupones') }}
               </b-button>
            </li>

         </template>

      </b-tabs>


      <!-- Si el usuario no Ha seleccionado un destino, debe hacerlo  -->
      <el-dialog :title="$t('Elija un Destino')" :visible.sync="showDestino" width="90% !important" :show-close="false"
         :close-on-click-modal="false" :close-on-press-escape="false" class="dialogo-seleccion-destino">

         <template #title>
            <h3 class="card-title">
               <strong class="text-primary">
                  {{ $t('Comencemos') }}
               </strong>
               {{ $t('por elegir un destino') }}
            </h3>
         </template>
         <destino-selected isSelected @destinoSelected="destinoSeleccionado" />
      </el-dialog>

   </b-container>
</template>

<script>
import {
   BContainer,
   BCardTitle,
   BRow,
   BCol,
   BCard,
   BFormInput,
   BCarousel,
   BCarouselSlide,
   BImg,
   BLink,
   BBadge,
   BFormRating,
   BBreadcrumb,
   BBreadcrumbItem,
   BTabs,
   BTab,
   BButton
} from 'bootstrap-vue'
import { onMounted, onActivated, computed, ref, toRefs, watch,inject } from 'vue'

// import { Pagination, Navigation } from 'swiper'

import vSelect from 'vue-select'
import store from '@/store'
import useAuth from '@core/utils/useAuth';
import router from '@/router'
import Ripple from 'vue-ripple-directive'

import { useElementBounding } from '@vueuse/core'
export default {

   components: {
      BContainer,
      BRow,
      BCard,
      BFormInput,
      BCol,
      vSelect,
      BCarousel,
      BCarouselSlide,
      BButton,
      BImg,
      BLink,
      BBadge,
      BFormRating,
      SwiperComponent: () => import('@/views/extensions/swiper/Swiper.vue'),
      NabvarPagina: () => import('components/NabvarPagina.vue'),
      HasLike: () => import('components/HasLike.vue'),
      FormWizard: () => import('@/views/forms/form-wizard/FormWizard.vue'),
      Search: () => import('components/Search.vue'),
      Atracciones: () => import('components/Atracciones.vue'),
      destinoSelected: () => import('components/DestinoSelected.vue'),
      Negocios: () => import('components/Negocios.vue'),
      Eventos: () => import('components/Eventos.vue'),
      Cupones: () => import('components/Cupones.vue'),

      TravelMap: () => import('components/TravelMap.vue'),
      BBreadcrumb,
      BBreadcrumbItem,
      BTabs,
      BTab,
      DestinoPerfil:() => import('views/paginas/DestinoPerfil.vue')
   },

   directives: {
      Ripple,
   },

   setup() {

      const search = ref(null)

      const { authGoogle, is_loggin } = useAuth()
      const { atracciones } = toRefs(store.state.atraccion)
      const { destinos, destino: origen } = toRefs(store.state.destino)
      const { sistema } = toRefs(store.state.sistema)
      const destino_id = ref(localStorage.getItem('destino_id'))
      const showDestino = ref(false)
      const destino = ref({ id: computed(() => destino_id.value) })
      destino_id.value = localStorage.getItem('destino_id')
      const refTabs = ref(null)
      const negociosElem = ref(null)
      const eventosElem = ref(null)
      const i18n = inject('i18n')
      
      const cargarForm = () => {
         
         if(destino_id.value){
            store.dispatch('destino/fetchPublic', destino_id.value)
            store.dispatch('atraccion/getAtracciones')
         }

         // if(!atracciones.value.length){
         // store.dispatch('atraccion/getAtracciones')
         // }

         // if (!destinos.value.length) {
         // store.dispatch('destino/getDestinos')
         // }
         
       

         if (!destino_id.value) {
            showDestino.value = true
         }

      }

      onMounted(() => {
         authGoogle()
      })

      cargarForm();

      const remoteMethod = () => {

      }


      const swiperOptions = ref({
         slidesPerView: 4,
         // allowSlidePrev:false,
         // allowSlideNext: false,
         autoplay: {
            delay: 5000,
         },
         // centeredSlides: true,
         spaceBetween: 30,
         watchSlidesProgress: true,
         effect: 'creative',
         creativeEffect: {
            prev: {
               // will set `translateZ(-400px)` on previous slides
               translate: [0, 0, -400],
            },
            next: {
               // will set `translateX(100%)` on next slides
               translate: ['100%', 0, 0],
            },
         },

         pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            dynamicBullets: true,
         },
         navigation: {
            nextEl: '',
            prevEl: ''

         },
         breakpoints: {
            1024: {
               slidesPerView: 4,
               spaceBetween: 40,
            },
            768: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
            640: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            320: {
               slidesPerView: 1,
               spaceBetween: 10,
            },
         },

      })

      const destinoSeleccionado = (dest_id) => {
         localStorage.setItem('destino_id', dest_id)

         destino_id.value = localStorage.getItem('destino_id')
         cargarForm();
         showDestino.value = false

         // window.location.reload();
      }


      const limpiarDestinos = () => {
         localStorage.removeItem('destino_id')
         showDestino.value = true
      }

      const scrollIr = (to) => {

         refTabs.value.firstTab();

         setTimeout(() => {
            const elem = document.getElementById(to)
            window.scrollTo({
               top: elem.offsetTop - 80,
               behavior: 'smooth',
            })
         }, 200);
         

      }


      watch(destino_id, () => {
          store.dispatch('destino/fetchPublic', destino_id.value).then((data) => {
            store.dispatch('atraccion/getAtracciones')
         })
      })


      return {
         showDestino,
         search,
         remoteMethod,
         refTabs,
         swiperOptions,
         atracciones,
         destinos,
         is_loggin,
         destino_id,
         scrollIr,
         eventosElem,
         negociosElem,
         origen,
         destino,
         limpiarDestinos,
         destinoSeleccionado,
         irAtraccion: (atrac) => router.push({ name: 'edit.atraccion', params: { id: atrac.id } }),
         loading: computed(() => store.state.loading),
         imageBanner: computed(() => `/storage/${sistema.value.banner_principal}`),
         getDestinoName: computed(() => {
            if (destino_id.value) {
               // let desti = destinos.value.find(val => val.id == destino_id.value)
               // return desti != undefined ? desti.nombre : destino.value.nombre
               return origen.value.nombre 
            } else {
               return i18n.t('Elejir Destino')
            }
         }),
         rutaDestino: computed(() => {
            if (destino_id.value && origen.value.ruta) {

               // let desti = destinos.value.find(val => val.id == destino_id.value)
               // return desti != undefined ? desti.ruta : ''

               return origen.value.ruta
            } else {
               return '#'
            }
         })
      }

   },
}

</script>

<style lang="scss">
.banner-search {
   height: 300px;
   background-position: center center !important;
   background-repeat: no-repeat;
   background-size: cover;
   // background-attachment: fixed;
}

.title-card {
   font-size: 16pt;
}

.card-img {
   height: 200px !important;
   width: 100%;
   object-fit: cover;
}

.header-card {
   position: relative;
}


// .swiper-button-prev,.swiper-button-next{
//    display:none;
// }
</style>

<style lang="scss">
.el-dialog {
   width: 80% !important;
}


</style>

<style lang="scss" scoped>
   .dialogo-seleccion-destino::v-deep .el-dialog__body {
      padding-top: 0px !important;
   }
</style>