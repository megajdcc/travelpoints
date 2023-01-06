<template>
   <b-container fluid class="px-0 mx-0">
      <b-row>
         <b-col >
            <h3 class="font-weight-bolder titulo">
               {{ atraccion.nombre }}
            </h3>

            <has-like :model="{model_type:atraccion.modelType,model_id:atraccion.id}" class="cursor-pointer" />

         </b-col>
      </b-row>

      <b-row class="my-1">
         <b-col cols="12">

            <section class="section-rate d-flex mt-0 p-0">
            
               <b-form-rating id="rating-sm-no-border" :value="promedioCalificacion" no-border variant="warning" inline size="sm" readonly
                  class="ml-0 pl-0 h-auto" style="background:transparent" />
            
               <!-- <span class="d-flex align-items-center">
                  {{ atraccion.likes.length}}
               </span> -->

               <ul class="list-inline my-0">
                  
                  <li class="list-inline-item mr-2" v-if="atraccion.horarios.length">
                     <strong class="font-weight-bolder">
                        <b-button @click="showHorario = !showHorario" size="sm" variant="outline-primary">
                           {{ legendHorario  }}
                        </b-button>
                     </strong>
                  </li>

                  <li class="list-inline-item mr-2" v-if="atraccion.horarios.length && horarioHoy">
                     <strong class="font-weight-bolder">
                       {{ horarioHoy }}
                     </strong>
                  </li>


                  <li class="list-inline-item mr-2" v-if="atraccion.sitio_web">
                     <strong class="font-weight-bolder" >
                        <b-link  :href="atraccion.sitio_web" target="_blank">
                           Visitar el sitio web
                        </b-link>
                     </strong>
                  </li>
                  
                  <li class="list-inline-item mr-2" v-if="atraccion.telefono">
                     <strong class="font-weight-bolder">
                        <b-link :href="`tel:${atraccion.telefono.telefono}`">Llamar</b-link>
                     </strong>
                  </li>

                  <li class="list-inline-item mr-2" v-if="atraccion.email" >
                     <strong class="font-weight-bolder">
                        <b-link  :href="`mailto:${atraccion.email}`" target="_blank">
                           Correo Electrónico
                        </b-link>
                     </strong>
                  </li>


                  <li class="list-inline-item mr-2">
                   
                    <OpinionForm :model-type="atraccion.modelType" :model-id="atraccion.id" @opinionGuardada="opinionGuardada" />
                  
                  </li>

               </ul>
            </section>
         </b-col>
      </b-row>

      <!-- Imagenes del Banner -->
      <b-row>

         <b-col cols="12" md="4">
            <b-card variant="light">
               
               <h3 class="font-weight-bolder">
                  Acerca de
               </h3>
               <strong class="font-weight-bolder">Duración Sugerida</strong>
               <p class="font-weight-bold">{{ atraccion.duracion_sugerida }}</p>

               <!-- <br> -->
               <p>
                  {{  atraccion.descripcion  }}
               </p>
               
               <el-divider></el-divider>
               <ul class="list-unstyled">
                  <li v-for="({sujeto,descripcion},i) in atraccion.incluye" :key="i">
                     <strong>Incluye {{  sujeto  }}</strong>
                     <p>{{  descripcion  }}</p>
                  </li>
               </ul>
            </b-card>

         </b-col>

         <b-col cols="12" md="8">
            <b-card class="gallerie">
               <!-- swiper1 -->
               <swiper ref="swiperTop" class="swiper-gallery gallery-top" :options="swiperOptions">

                  <swiper-slide v-for="(data,index) in swiperData" :key="index">
                     <b-img :src="data.img" fluid heigth="350px" class="imagen-gallerie"/>
                     
                  

                  </swiper-slide>

                  <div slot="button-next" class="swiper-button-next swiper-button-white" />
                  <div slot="button-prev" class="swiper-button-prev swiper-button-white" />

               </swiper>
               
               <!-- swiper2 Thumbs -->
               <swiper ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs">
                  <swiper-slide v-for="(data,index) in swiperData" :key="index">
                     <b-img :src="data.img" fluid class="imagen-thumb" />
                  </swiper-slide>
               </swiper>

                  <b-button variant="dark" @click="() => showGallerie = !showGallerie" size="sm" class="btn-gallerie" rounded>
                     <font-awesome-icon icon="fa-images" class="mr-1" />
                     Todas las fotos {{ atraccion.imagenes.length }}
                  </b-button>

            </b-card>   
         </b-col>

      </b-row>

      <!-- Atracciones Relacionadas al Destino -->
      <b-row>
         <b-col cols="12">
            <atracciones :atracciones="atraccionesCercanas"  titulo="Otras Atracciones cercanas"  v-if="atraccionesCercanas.length"/>
         </b-col>
      </b-row>

      <!-- Opinions reviews -->

      <b-row id="opinions">
         <b-col cols="12">
            <b-tabs pills >
               <b-tab>
                  <template #title>
                    <strong>Opiniones</strong> 
                  </template>

                  
                  <!-- Reviews.Opinions -->

                  <reviews-opinion :promedioCalificacion="promedioCalificacion" :cantidad="atraccion.opinions.length" :porcentajeOpinions="porcentajeOpinions" :model="{model_id:atraccion.id,model_type:atraccion.modelType}"  />

               </b-tab>

              

            </b-tabs>
         </b-col>
      </b-row>

      <horario :horarios="atraccion.horarios" :showHorario.sync="showHorario" />
      <gallerie :galleries="atraccion.imagenes" :showGallerie.sync="showGallerie" path="/storage/atracciones/imagenes" />  



   </b-container>
</template>

<script>

import {toRefs, ref,onMounted,computed,nextTick} from '@vue/composition-api'
import store from '@/store'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'



import {

   BContainer,
   BCard,
   BRow,
   BCol,
   BImg,
   BButton,
   BFormRating,
   BLink,
   BListGroup,
   BListGroupItem,
   BTabs,
   BTab,
   BProgress
} from 'bootstrap-vue'


export default {
   
   props:['query'],

   components:{

      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BImg,
      BFormRating,
      Gallerie:() => import('components/Gallerie.vue'),
      Horario:() => import('components/Horario.vue'),
      hasLike:() => import('components/HasLike.vue'),
      Swiper,
      SwiperSlide,
      BLink,
      BListGroup,
      BListGroupItem,
      BTabs,
      BTab,
      BProgress,
      OpinionForm:() => import('views/opinions/form.vue'),
      ReviewsOpinion:() => import('components/ReviewsOpinion.vue'),
      Atracciones:() => import('components/Atracciones.vue')

   }, 

   setup(props){
      const swiperTop  =ref(null)
      const swiperThumbs = ref(null)
      const {atraccion} = toRefs(store.state.atraccion)
      const showGallerie = ref(false)
      const showHorario = ref(false)
      const atraccionesCercanas = ref([])

      const swiperOptions = ref({
         loop        : true,
         // autoplay:{
         //    delay:5000
         // },
         loopedSlides: 5,
         spaceBetween: 10,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
      });

      const swiperOptionThumbs = ref({
         loop               : false,
         loopedSlides       : 5, // looped slides should be the same
         spaceBetween       : 10,
         centeredSlides     : true,
         slidesPerView      : 6,
         touchRatio         : 0.2,
         slideToClickedSlide: true,
      });

      const  swiperData =  computed(() => {
         return atraccion.value.imagenes.map(val => ({img:`/storage/atracciones/imagenes/${val.imagen}`}))
      })



      onMounted(() => {

         store.dispatch('atraccion/getAtraccionesCercanas',atraccion.value.id).then((atracciones) => {
            atraccionesCercanas.value = atracciones
         })

         nextTick(() => {
            const swiperTopC = swiperTop.value.$swiper
            const swiperThumbsC = swiperThumbs.value.$swiper
            swiperTopC.controller.control = swiperThumbsC
            swiperThumbsC.controller.control = swiperTopC
         })

      })
      
      const opinionGuardada = (opinion) => {
         store.commit('atraccion/pushOpinion',opinion)
      } 


      return {
         swiperTop,
         swiperThumbs,
         swiperOptions,
         swiperOptionThumbs,
         atraccion,
         showGallerie,
         showHorario,
         swiperData,
         opinionGuardada,
         porcentajeOpinions: (cal) => store.getters['atraccion/porcentajeOpinions'](cal),
         colorRandon: computed(() => colorRand()),
         portada: computed(() => store.getters['atraccion/getPortada']),
         legendHorario:computed(() => store.getters['atraccion/legendHorario']),
         horarioHoy:computed(() => store.getters['atraccion/horarioHoy']),
         promedioCalificacion:computed(() => store.getters['atraccion/promedioCalificacion']),
         atraccionesCercanas
      }
      
   }


}
</script>

<style lang="scss">
.titulo{
      font-size:24pt;
   }

.swiper-slide{
   display: flex;
   justify-content: center;
   
   .imagen-gallerie {
      height: 350px;
      width:100%;
      object-fit: cover;
      margin: auto 0px;
   }
}

.imagen-thumb{
   width: 70px;
   height: 50px;
   cursor:pointer;
}
  .gallerie {
   //   flex: 1 1 60%;
     position: relative;
   
      // .swiper-slide-active{
      .btn-gallerie {
            position: absolute;
            left: 2rem;
            top: 3rem;
            bottom: auto;
            right: auto;
            z-index: 10;
         }
      // }
   
   }

   .table-calificacion tr td{
      padding-left:0px !important;
   }

</style>