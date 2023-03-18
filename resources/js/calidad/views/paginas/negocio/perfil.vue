<template>
  <section class="w-100 d-flex flex-column">

    <swiper-gallery :imagenes="negocio.imagenes" path="/storage/negocios/fotos/" class="mt-1" :heightGallery="400" :coverImg="false" />
  

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


import { toRefs, computed, ref, nextTick , onMounted } from 'vue';
import store from '@/store'

export default {

  components:{
    BCard,
    BCardBody,
    BImg,
    BButton,
    ReviewsOpinion: () => import('components/ReviewsOpinion.vue'),
    MiPdf:() => import('components/MiPdf.vue'),
    SwiperGallery:() => import('components/SwiperGallery.vue')

  },

  directives:{
    'b-tooltip':VBTooltip
  },

  setup(props){

    const { negocio } = toRefs(store.state.negocio)

    const portada = computed(() => {

      const imagen = negocio.value.imagenes.filter(val => val.portada)[0];

      if (imagen) {
        return `/storage/negocios/fotos/${imagen.imagen}`
      }

      return '';

    });

    return {
      negocio,
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

.video-negocio{
  height:400px;
}

</style>