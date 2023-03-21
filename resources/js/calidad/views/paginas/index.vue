<template>

   <b-container fluid class="px-0 mx-0">
      <!-- Search -->
      <b-row>
         <b-col cols="12">
            <b-card class="banner-search" body-class="d-flex justify-content-center align-items-center py-3 w-100" :style="{'background-image':`url(${imageBanner})`}" >
               <search />
            </b-card>
         </b-col>
      </b-row>

      <!-- Destinos -->
      <destinos :destinos="destinos"/>

      <!-- Atracciones -->
      <atracciones :atracciones="atracciones"  />

      <!-- Negocios -->
      <negocios />

   </b-container>
</template>

<script>
import {
   BContainer,
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
} from 'bootstrap-vue'
import {onMounted,onActivated,computed,ref,toRefs} from 'vue'

// import { Pagination, Navigation } from 'swiper'

import vSelect from 'vue-select'
import store from '@/store'
import useAuth from '@core/utils/useAuth';
import router from '@/router'
import Ripple from 'vue-ripple-directive'


export default {

   components:{
      BContainer,
      BRow,
      BCard,
      BFormInput,
      BCol,
      vSelect,
      BCarousel,
      BCarouselSlide,

      BImg,
      BLink,
      BBadge,
      BFormRating,
      SwiperComponent:() => import('@/views/extensions/swiper/Swiper.vue'),
      NabvarPagina: () => import('components/NabvarPagina'),
      HasLike:() => import('components/HasLike.vue'),
      FormWizard:() => import('@/views/forms/form-wizard/FormWizard.vue'),
      Search:() => import('components/Search.vue'),
      Atracciones: () => import('components/Atracciones.vue'),
      Destinos : () => import('components/Destinos.vue'),
      Negocios:() => import('components/Negocios.vue')
   },

   directives: {
      Ripple,
   },

   setup() {

      const search = ref(null)

      const { authGoogle,is_loggin } = useAuth()
      const { atracciones } = toRefs(store.state.atraccion)
      const { destinos } = toRefs(store.state.destino)
      const { sistema } = toRefs(store.state.sistema)

      
      const cargarForm = () => {
         // if(!atracciones.value.length){
            store.dispatch('atraccion/getAtracciones')
         // }

         // if (!destinos.value.length) {
            store.dispatch('destino/getDestinos')
         // }

      }

      onMounted(() => {
         authGoogle()
         cargarForm()
      })
      
      const remoteMethod = () => {

      }  


      const swiperOptions =  ref({
         slidesPerView: 4,
         // allowSlidePrev:false,
         // allowSlideNext: false,
         autoplay:{
            delay:5000,
         },
         // centeredSlides: true,
         spaceBetween: 30,
         watchSlidesProgress:true,
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
            dynamicBullets:true,
         },
         navigation:{
               nextEl:'',
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

      return {
         search,
         remoteMethod,
         swiperOptions,
         atracciones,
         destinos,
         is_loggin,
         irAtraccion: (atrac) => router.push({name:'edit.atraccion', params: { id: atrac.id}}),
         loading:computed(() => store.state.loading),
         // imageBanner: require('@images/banner/banner-travel.jpg'),
         imageBanner:computed(() => `/storage/${sistema.value.banner_principal}`)
      }

   },
}

</script>

<style lang="scss">
.banner-search{
   height: 300px;
   background-position: center center !important;
   background-repeat: no-repeat;
   background-size: cover;
   // background-attachment: fixed;
}
.title-card{
   font-size: 16pt;
}

.card-img{
   height: 200px !important;
   width: 100%;
   object-fit: cover;
}

.header-card{
   position:relative;
}


// .swiper-button-prev,.swiper-button-next{
//    display:none;
// }

</style>