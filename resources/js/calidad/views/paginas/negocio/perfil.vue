<template>
  <section class="w-100 d-flex flex-column">

    <b-card class="gallerie mt-1">
      <!-- swiper1 -->
      <swiper ref="swiperTop" class="swiper-gallery gallery-top" :options="swiperOptions">
    
        <swiper-slide v-for="(data, index) in swiperData" :key="index">
          <b-img :src="data.img" fluid heigth="350px" class="imagen-gallerie" />
    
        </swiper-slide>
    
        <div slot="button-next" class="swiper-button-next swiper-button-white" />
        <div slot="button-prev" class="swiper-button-prev swiper-button-white" />
    
      </swiper>
    
      <!-- swiper2 Thumbs -->
      <swiper ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs">
        <swiper-slide v-for="(data, index) in swiperData" :key="index">
          <b-img :src="data.img" fluid class="imagen-thumb" />
        </swiper-slide>
      </swiper>
    
      <b-button variant="dark" @click="() => showGallerie = !showGallerie" size="sm" class="btn-gallerie" rounded>
        <font-awesome-icon icon="fa-images" class="mr-1" />
        Todas las fotos {{ negocio.imagenes.length }}
      </b-button>
    
      <gallerie :galleries="negocio.imagenes" :showGallerie.sync="showGallerie" path="/storage/negocios/fotos" />
    
    </b-card>

  
    <!-- Perfil Negocio Mapa -->
  <!-- <GmapMap :center="{lat:Number(negocio.lat), lng:Number(negocio.lng)}" :zoom="17" map-type-id="terrain" style="width: 100%; height: 300px">
    
    <GmapMarker :key="0" :position="{
    	lat:Number(negocio.lat),
    	lng:Number(negocio.lng)
    }" :visible="true" :draggable="false" :clickable="false">

            <GmapInfoWindow :options="optionsPlace">
            </GmapInfoWindow>
    
    </GmapMarker>
    
  </GmapMap> -->

      <b-card>
        <b-card-body v-html="negocio.descripcion">
        </b-card-body>
      </b-card>
     <!-- <p class="text-justify">
            {{ negocio.descripcion }}
      </p> -->

  
  <!-- Video del negocio -->
  <template v-if="negocio.videos.length">
    <hr>
    <h2>Video</h2>
    
    <section class="d-flex flex-column ">
      <video :poster="portada" :src="`/storage/negocios/videos/${video}`" controls class="video-negocio" controlslist="nodownload"></video>
    </section>
    <hr>
  </template>

  <template v-if="negocio.tipo_menu == 2 || negocio.tipo_menu == 3">
      <hr>
      <h2>Menú</h2>
      <section class="d-flex justify-content-center">
          <mi-pdf  v-if="negocio.tipo_menu == 2" :pdf="negocio.menu" height="600px" />
          <b-img v-if="negocio.tipo_menu == 3" :src="`/storage/negocios/menu/${negocio.menu}`" class="w-100 h-auto rounded-sm" style="max-height:600px; object-fit: contain;"></b-img>
      </section>
      <hr>
  </template>

  <!-- Opiniones del negocio -->
  <h2 >Opiniones sobre este <strong class="text-warning">negocio</strong></h2>

  <section class="d-flex flex-column ">
    <reviews-opinion :promedioCalificacion="promedioCalificacion" :cantidad="negocio.opinions.length"
      :porcentajeOpinions="porcentajeOpinions" :model="{model_id:negocio.id,model_type:negocio.modelType}"
      class="mt-1 px-0 mx-0" />
      <!-- <b-button :to="{ name:'perfil.negocio.opiniones'}" title="Ir a opiniones" v-b-tooltip.hover class="align-self-end"> 
        Ir a Opiniones
      </b-button> -->
  </section>
 

  


  </section>
   

</template>

<script>

import {
  BCard,
  BImg,
  BButton,
  BCardBody,
  VBTooltip
} from 'bootstrap-vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { toRefs, computed, ref, nextTick , onMounted } from 'vue';
import store from '@/store'
import router from '@/router'

export default {

  components:{
    BCard,
    BCardBody,
    BImg,
    BButton,
    Swiper,
    SwiperSlide,
    Gallerie: () => import('components/Gallerie.vue'),
    ReviewsOpinion: () => import('components/ReviewsOpinion.vue'),
    MiPdf:() => import('components/MiPdf.vue')

  },

  directives:{
    'b-tooltip':VBTooltip
  },

  setup(props){

    const { negocio } = toRefs(store.state.negocio)
    const swiperThumbs = ref(null)
    const swiperTop = ref(null)
    const showGallerie= ref(false)

    const swiperOptions = ref({
      loop: true,
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
      loop: false,
      loopedSlides: 5, // looped slides should be the same
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 6,
      touchRatio: 0.2,
      slideToClickedSlide: true,
    });


    const swiperData = computed(() => {
      return negocio.value.imagenes.map(val => ({ img: `/storage/negocios/fotos/${val.imagen}` }))
    })
    

    onMounted(() => {

       nextTick(() => {
            const swiperTopC = swiperTop.value.$swiper
            const swiperThumbsC = swiperThumbs.value.$swiper
            swiperTopC.controller.control = swiperThumbsC
            swiperThumbsC.controller.control = swiperTopC

        })

    })  



    const portada = computed(() => {

      const imagen = negocio.value.imagenes.filter(val => val.portada)[0];

      if (imagen) {
        return `/storage/negocios/fotos/${imagen.imagen}`
      }

      return '';

    });


    return {
      swiperOptions,
      swiperOptionThumbs,
      swiperData,
      negocio,
      swiperThumbs,
      swiperTop,
      showGallerie,
      portada,
      video:computed(() => negocio.value.videos.length ? negocio.value.videos[0].url : ''),
      promedioCalificacion: computed(() => store.getters['negocio/promedioCalificacion'](negocio.value)),
      porcentajeOpinions: (cal) => store.getters['negocio/porcentajeOpinions'](cal),
      optionsPlace: computed(() => ({ content:`<strong>${negocio.value.nombre}</strong>`})),

    }
  }


}
</script>

<style lang="scss">

.swiper-slide {

    display: flex;
    justify-content: center;

    .imagen-gallerie {
      height: 350px;
      width: 100%;
      object-fit: contain;
      margin: auto 0px;
    }
  }

  .imagen-thumb {
    width: 70px;
    height: 50px;
    cursor: pointer;
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


.video-negocio{
  height:400px;
}

</style>