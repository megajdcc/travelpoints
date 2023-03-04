<template>
      <b-row>
         <b-col cols="12">
            <h3>{{ titulo }}</h3>
            <p>Los mejores tours, actividades y boletos</p>
         </b-col>
         <b-col cols="12">
               <!-- <SwiperComponent /> -->
               <swiper class="swiper-centered-slides px-0 py-1" :options="swiperOptions">
         
                  <!-- slides -->
                  <swiper-slide v-for="(atraccion, i) in atracciones" :key="i" class="rounded ">
         
                     <b-card class="cursor-pointer" header-class="p-0 header-card" body-class="mt-1 px-1 contenido-card" @click="$router.push(atraccion.ruta)" style="height:370px !important; "> 
         
                        <template #header>
         
                           <b-img v-if="atraccion.imagenes && atraccion.imagenes.length"
                              :src="`/storage/atracciones/imagenes/${atraccion.imagenes[0].imagen}`" thumbnail class="card-img"
                             />
         
                           <has-like v-if="is_loggin && atraccion.imagenes && atraccion.imagenes.length"
                              :model="{ model_id: atraccion.id, model_type: atraccion.modelType }" />
         
                        </template>
         
         
                        <b-link :to="atraccion.ruta">
         
                           <b-badge variant="primary" v-if="atraccion.duracion_sugerida"> Duración Sugerida: {{
                                 atraccion.duracion_sugerida
                           }}</b-badge>
         
                           <h4 class="title-card mt-1 mb-0">
                              {{ atraccion.nombre }}
                           </h4>
         
         
                        </b-link>
                        <section class="section-rate d-flex mt-0 p-0">
                          
                           <section class="d-flex align-items-center ">
                           
                              <!-- <h2 class="font-weight-bolder my-0 mr-1">
                                 {{ promedioCalificacion(atraccion) }}
                              </h2> -->
                           
                              <el-rate :value="promedioCalificacion(atraccion)" disabled disabled-void-color="#4f4f4f" void-color="#000000" />
                           
                              <p class="my-0 font-weight-bolder" v-if="atraccion.opinions">
                                 {{ atraccion.opinions.length }} <small>Opiniones</small>
                              </p>
                           
                           </section>

                        </section>
         
                        <p class="text-justify parrafo-card" >{{ atraccion.descripcion }}</p>
         
                     </b-card>
         
                  </swiper-slide>
         
                  <!-- Add Arrows -->
                  
                  <div slot="button-next" class="swiper-button-next btn-swiper-next">
                     <font-awesome-icon icon="fa-angle-right" size="2x" />
                  </div>

                  <!-- <div slot="button-prev" class="swiper-button-prev" /> -->
               </swiper>
         </b-col>

      

      </b-row>
</template>


<script>

import {
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormGroup,
   BImg,
   BFormRating,
   BLink,
   BCard, 
   BBadge

} from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import {ref,computed} from '@vue/composition-api'
import useAuth from '@core/utils/useAuth'
import store from '@/store'

export default {
   
   props:{
      atracciones:{
         type:Array,
         required:true
      },
      
      titulo:{
         type:String,
         required:false,
         default:'Las experiencias más populares en TravelPoints',
      }
   },

   components:{
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormGroup,
      SwiperSlide,
      Swiper,
      BImg,
      BLink,
      BFormRating,
      hasLike:() => import('components/HasLike.vue'),
      BCard,
      BBadge



   },


   setup(props){

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



      const {
         is_loggin
      } = useAuth();

      return {
         swiperOptions,
         is_loggin,

         promedioCalificacion:(atraccion) => store.getters['atraccion/promedioCalificacion'](atraccion)
      }

   }


}
</script>


<style lang="scss" scoped>
.banner-search {
   height: 300px;
   background-position: center top;
   background-repeat: no-repeat;
   background-size: cover;
   background-attachment: fixed;
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


.swiper-button-prev,
.swiper-button-next {
   // display: none;
}

.btn-swiper-next {
   background: #1e9ad7;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   color: white;
   font-weight: 900;

   &::after{
      content:'' !important;
   }
}

.contenido-card{
   overflow-y: hidden;
}

.parrafo-card{
   overflow-y: hidden;
   height: 60px;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;

}
</style>
