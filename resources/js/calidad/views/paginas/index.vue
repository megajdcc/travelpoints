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
      <b-row>
         <b-col cols="12">

            <h3>Las experiencias más populares en TravelPoints</h3>
            <p>Los mejores tours, actividades y boletos</p>

         </b-col>

         <b-col cols="12">
            <!-- <SwiperComponent /> -->

            <swiper class="swiper-centered-slides px-0 py-1" :options="swiperOptions"  >
            
               <!-- slides -->
               <swiper-slide v-for="(atraccion,i) in atracciones" :key="i" class="rounded ">

                  <b-card class="cursor-pointer" header-class="p-0 header-card" body-class="mt-1 px-1 " >
                     
                     <template #header>

                        <b-img v-if="atraccion.imagenes.length" :src="`/storage/atracciones/imagenes/${atraccion.imagenes[0].imagen}`" thumbnail class="card-img" @click="irAtraccion(atraccion)"  />

                        <has-like v-if="is_loggin && atraccion.imagenes.length" :model="{model_id:atraccion.id,model_type:atraccion.modelType}" />

                     </template>

                   
                     <b-link :to="{name:'edit.atraccion',params:{id:atraccion.id}}">
                        
                        <b-badge variant="primary" v-if="atraccion.duracion_sugerida"> Duración Sugerida: {{ atraccion.duracion_sugerida  }}</b-badge>

                        <h4 class="title-card mt-1 mb-0">
                           {{ atraccion.nombre }}
                        </h4>


                     </b-link>
                     <section class="section-rate d-flex mt-0 p-0">
                        <b-form-rating id="rating-sm-no-border" :value="5" no-border variant="warning" inline size="sm" readonly class="ml-0 pl-0" /> <span class="d-flex align-items-center" >{{ atraccion.likes.length }}</span>
                     </section>
                     
                     <p class="text-justify">{{  atraccion.descripcion.substring(0,80)  }}</p>

                  </b-card>
               
               </swiper-slide>
            
               <!-- Add Arrows -->
               <div slot="button-next" class="swiper-button-next" />
               <div slot="button-prev" class="swiper-button-prev" />
            </swiper>


         </b-col>
      </b-row>

      <!-- Destinos -->
      <b-row>
         <b-col cols="12">
         
            <h3>Los destinos más populares para los amantes del viaje</h3>
            <p>Recomendado en función de tus actividades</p>
         
         </b-col>

            <b-col cols="12">
               <!-- <SwiperComponent /> -->
            
               <swiper class="swiper-centered-slides px-0 py-1" :options="swiperOptions">
            
                  <!-- slides -->
            
                  <swiper-slide v-for="(destino,i) in destinos" :key="i" class="rounded ">
            
                     <b-card class="cursor-pointer" header-class="p-0 header-card" body-class="mt-1 px-1 ">
            
                        <template #header>
                           <b-img :src="`/storage/destinos/imagenes/${destino.imagenes[0].imagen}`" thumbnail class="card-img"
                              @click="irDestino(destino)" />

                            <has-like :model="{model_id:destino.id,model_type:destino.modelType}" />

                        </template>
            
            
                     <b-link :to="{name:'edit.destino',params:{id:destino.id}}">
                     
                        <h4 class="title-card mt-1 mb-0">
                           {{ destino.nombre }}
                        </h4>
                     
                     
                     </b-link>
                     <section class="section-rate d-flex mt-0 p-0">
                        <b-form-rating id="rating-sm-no-border" :value="5" no-border variant="warning" inline size="sm" readonly
                           class="ml-0 pl-0" /> <span class="d-flex align-items-center">{{ destino.likes.length }}</span>
                     </section>
                     
                     <p class="text-justify">{{ destino.titulo.substring(0,80) }}</p>
            
                     </b-card>
            
                  </swiper-slide>
            
                  <!-- Add Arrows -->
                  <div slot="button-next" class="swiper-button-next" />
                  <div slot="button-prev" class="swiper-button-prev" />
               </swiper>
            
            
            </b-col>


      </b-row>

      <!-- Certificados -->
      <b-row >  
         <b-col  cols="12" class="d-flex justify-content-center" >
      
            <h3>Certificados de Regalos</h3>
      
         </b-col>
      
         <b-col cols="12" >
      
         </b-col>
      
      
      </b-row>

      <!-- Actividades y Eventos... -->
      <b-row>
         <b-col cols="12" class="d-flex justify-content-center">
      
            <h3>Actividades & Eventos</h3>
      
         </b-col>
      
         <b-col cols="12">

         </b-col>
         
      </b-row>

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
      Search:() => import('components/Search.vue')
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


.swiper-button-prev,.swiper-button-next{
   display:none;
}

</style>