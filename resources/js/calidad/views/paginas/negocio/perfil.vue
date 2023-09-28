<template>
  <section class="w-100 d-flex flex-column">

    <swiper-gallery :imagenes="negocio.imagenes" path="/storage/negocios/fotos/" class="mt-1" :heightGallery="400" :coverImg="false" />
  
      <h2 class="display-4 d-flex d-md-none">{{ $t('Sobre') }} <span class="text-warning">{{ $t(negocio.nombre) }}</span></h2>
      <b-card body-class="d-flex flex-column justify-content-center d-flex d-md-none">

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
                      <b-link :href="`mailto:${negocio.emails[0].email}`" target="_blank">
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
                        {{ negocio.direccion }}
                      </td>
                    </tr>

                     <tr class="" v-if="negocio.tipo_menu == 1" >

                        <td colspan="2">
                          <b-button :href="negocio.menu" target="_blank" style="text-decoration:none;" block variant="warning">
                            <font-awesome-icon icon="fas fa-book-open"/>
                            {{  $t('Ver menú / Lista de Precios') }}
                          </b-button>
                        </td>
                      </tr>

                </table>
              </section>

            </section>
            <el-divider></el-divider>

            <!-- Perfil Negocio Mapa -->
              <GmapMap :center="{ lat: Number(negocio.lat), lng: Number(negocio.lng) }" :zoom="17" map-type-id="terrain" style="width: 100%; height: 300px">
              
                <GmapMarker :key="0" :position="{
                    lat: Number(negocio.lat),
                    lng: Number(negocio.lng)
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

      <b-card>
        <b-card-body >
          <section v-html="negocio.descripcion"></section>
        </b-card-body>
      </b-card>
     <!-- <p class="text-justify">
            {{ negocio.descripcion }}
      </p> -->

  
  <!-- Video del negocio -->
  <template v-if="negocio.videos.length">
    <hr>
    <h2>{{ $t('Video') }}</h2>
    
    <section class="d-flex flex-column ">
      <video :poster="portada" :src="`/storage/negocios/videos/${video}`" controls class="video-negocio" controlslist="nodownload"></video>
    </section>
    <hr>
  </template>

  <template v-if="negocio.tipo_menu == 2 || negocio.tipo_menu == 3">
      <hr>
      <h2>{{ $t('Menú / Lista de Precios') }}</h2>
      <section class="d-flex justify-content-center">
          <mi-pdf  v-if="negocio.tipo_menu == 2" :pdf="negocio.menu" height="600px" />
          <b-img v-if="negocio.tipo_menu == 3" :src="`/storage/negocios/menu/${negocio.menu}`" class="w-100 h-auto rounded-sm" style="max-height:600px; object-fit: contain;"></b-img>
      </section>
      <hr>
  </template>

  <!-- Opiniones del negocio -->
  <h2 class="d-none d-md-flex" >{{ $t('Opiniones sobre este') }} <strong class="text-warning ml-1"> {{ $t('Negocio') }}</strong></h2>
  <section class="d-none d-md-flex flex-column ">
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
  VBTooltip,
  BLink,
  BAvatar
} from 'bootstrap-vue'


import { toRefs, computed, ref, nextTick , onMounted } from 'vue';
import store from '@/store'

export default {

  components:{
    BCard,
    BCardBody,
    BImg,
    BButton,
    BAvatar,

    ReviewsOpinion: () => import('components/ReviewsOpinion.vue'),
    MiPdf:() => import('components/MiPdf.vue'),
    SwiperGallery:() => import('components/SwiperGallery.vue'),
    BLink

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

<style lang="scss">

.video-negocio{
  height:400px;
}

</style>