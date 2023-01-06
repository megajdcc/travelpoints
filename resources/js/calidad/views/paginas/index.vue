<template>

   <b-container fluid class="px-0">
      <!-- Search -->
      <b-row>
         <b-col cols="12">
            <b-card class="banner-search" body-class="d-flex justify-content-center align-items-center py-3 w-100" :style="{'background-image':`url(${imageBanner})`}" >
               <search />
            </b-card>
         </b-col>
      </b-row>

      <!-- Atracciones -->
      <atracciones :atracciones="atracciones"  />

      <!-- Destinos -->
      <destinos :destinos="destinos"/>

      <!-- Certificados -->
      <!-- <b-row >  
         <b-col  cols="12" class="d-flex justify-content-center" >
      
            <h3>Certificados de Regalos</h3>
      
         </b-col>
      
         <b-col cols="12" >
      
         </b-col>
      
      
      </b-row> -->

      <!-- Actividades y Eventos... -->
      <!-- <b-row>
         <b-col cols="12" class="d-flex justify-content-center">
      
            <h3>Actividades & Eventos</h3>
      
         </b-col>
      
         <b-col cols="12">

         </b-col>

      </b-row> -->

      <b-row>
         <b-col cols="12">
          

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
   BFormInput,
   BCarousel,
   BCarouselSlide,
   BImg,
   BLink,
   BBadge,
   BFormRating,
} from 'bootstrap-vue'
import { Swiper,SwiperSlide } from 'vue-awesome-swiper'
import {onMounted,onActivated,computed,ref,toRefs} from '@vue/composition-api'

// import { Pagination, Navigation } from 'swiper'

import vSelect from 'vue-select'
import store from '@/store'
import useAuth from '@core/utils/useAuth';
import router from '@/router'
import 'swiper/css/swiper.css'
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
      Swiper,
      SwiperSlide,
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
      Destinos : () => import('components/Destinos.vue')
   },

   directives: {
      Ripple,
   },

   setup() {

      const search = ref(null)

      const { authGoogle,is_loggin } = useAuth()
      const { atracciones } = toRefs(store.state.atraccion)
      const { destinos } = toRefs(store.state.destino)

      
      const cargarForm = () => {
         if(!atracciones.value.length){
            store.dispatch('atraccion/getAtracciones')
         }

         if (!destinos.value.length) {
            store.dispatch('destino/getDestinos')
         }

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
         imageBanner: require('@images/banner/banner-travel.jpg'),
      }

   },
}

</script>

<style lang="scss">
.banner-search{
   height: 300px;
   background-position: center top;
   background-repeat: no-repeat;
   background-size: cover;
   background-attachment: fixed;
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