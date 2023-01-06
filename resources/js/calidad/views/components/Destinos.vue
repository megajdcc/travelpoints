<template>
         <b-row>
            <b-col cols="12">
         
               <h3>{{ titulo }}</h3>
               <p>Recomendado en función de tus actividades</p>
         
            </b-col>
         
            <b-col cols="12">
               <!-- <SwiperComponent /> -->
         
               <swiper class="swiper-centered-slides px-0 py-1" :options="swiperOptions">
         
                  <!-- slides -->
         
                  <swiper-slide v-for="(destino, i) in destinos" :key="i" class="rounded ">
         
                     <b-card class="cursor-pointer" header-class="p-0 header-card" body-class="mt-1 px-1 "
                        @click="$router.push(destino.ruta)">
         
                        <template #header>
                           <b-img  v-if="destino.imagenes.length" :src="`/storage/destinos/imagenes/${destino.imagenes[0].imagen}`" thumbnail class="card-img"/>
         
                           <has-like :model="{ model_id: destino.id, model_type: destino.modelType }" />
         
                        </template>
         
         
                        <b-link :to="destino.ruta">
         
                           <h4 class="title-card mt-1 mb-0">
                              {{ destino.nombre }}
                           </h4>
         
         
                        </b-link>
                        <section class="section-rate d-flex mt-0 p-0">
                           <b-form-rating id="rating-sm-no-border" :value="5" no-border variant="warning" inline size="sm"
                              readonly class="ml-0 pl-0" /> <span class="d-flex align-items-center">{{
                                 destino.likes.length
                              }}</span>
                        </section>
         
                        <p class="text-justify">{{ destino.titulo.substring(0, 80) }}</p>
         
                     </b-card>
         
                  </swiper-slide>
         
                  <!-- Add Arrows -->
                  <div slot="button-next" class="swiper-button-next" />
                  <div slot="button-prev" class="swiper-button-prev" />
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

import { ref } from '@vue/composition-api'
import useAuth from '@core/utils/useAuth'
export default {

   props: {
      destinos: {
         type: Array,
         required: true
      },

      titulo: {
         type: String,
         required: false,
         default: 'Los destinos más populares para los amantes del viaje',
      }
   },

   components: {
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
      hasLike: () => import('components/HasLike.vue'),
      BCard,
      BBadge



   },


   setup(props) {

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
         is_loggin
      }

   }


}
</script>


<style lang="scss">
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
   display: none;
}
</style>

