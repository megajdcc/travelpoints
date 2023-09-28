<template>
   <b-container fluid class="px-0 mx-0">
      <b-row>
         <b-col >
            <h3 class="font-weight-bolder titulo">
               {{ $t(atraccion.nombre) }}
            </h3>

            <has-like :model="{model_type:atraccion.modelType,model_id:atraccion.id}" class="cursor-pointer" />

         </b-col>
      </b-row>

      <b-row class="my-1">
         <b-col cols="12">

            <section class="section-rate d-flex mt-0 p-0">
            
               <b-form-rating id="rating-sm-no-border" :value="promedioCalificacion" no-border variant="warning" inline size="sm" readonly
                  class="ml-0 pl-0 h-auto" style="background:transparent" />
            
         

               <ul class="list-inline my-0">
                  
                  <li class="list-inline-item mr-2" v-if="atraccion.horarios.length">
                     <strong class="font-weight-bolder">
                        <b-button @click="showHorario = !showHorario" size="sm" variant="outline-primary">
                           {{ $t(legendHorario)  }}
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
                           {{ $t('Visitar el sitio web') }}
                        </b-link>
                     </strong>
                  </li>
                  
                  <li class="list-inline-item mr-2" v-if="atraccion.telefono">
                     <strong class="font-weight-bolder">
                        <b-link :href="`tel:${atraccion.telefono.telefono}`">{{ $t('Llamar') }}</b-link>
                     </strong>
                  </li>

                  <li class="list-inline-item mr-2" v-if="atraccion.email" >
                     <strong class="font-weight-bolder">
                        <b-link  :href="`mailto:${atraccion.email}`" target="_blank">
                           {{ $t('Correo Electrónico') }}
                        </b-link>
                     </strong>
                  </li>

                  


                  <li class="list-inline-item mr-2">
                   
                     <OpinionForm :model-type="atraccion.modelType" :model-id="atraccion.id" @opinionGuardada="opinionGuardada" >
                        <template #btn-prepend>
                           <b-button size="sm" variant="outline-dark" @click="comoLlegar">
                              <font-awesome-icon icon="fas fa-map-location-dot"/>
                              {{ $t('¿Cómo llegar?') }}
                           </b-button>
                        </template>
                     </OpinionForm>
                  
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
                  {{ $t('Acerca de') }}
               </h3>
               <strong class="font-weight-bolder">{{ $t('Duración Sugerida') }}</strong>
               <p class="font-weight-bold">{{ $t(atraccion.duracion_sugerida) }}</p>

               <!-- <br> -->
               <p class="contenido-parrafo"  :class="{'show-text' : isShowText}" >
                  {{  $t(atraccion.descripcion)  }}
               </p>
               <b-button v-if="atraccion.descripcion.length > 384" @click="toggleShowDescription" variant="link" size="sm">{{ isShowText ? $t("Menos") : $t('Seguir Leyendo') }}</b-button>
               
               <el-divider></el-divider>
               <ul class="list-unstyled">
                  <li v-for="({sujeto,descripcion},i) in atraccion.incluye" :key="i">
                     <strong>{{ $t('Incluye') }} {{  $t(sujeto)  }}</strong>
                     <p>{{  $t(descripcion)  }}</p>
                  </li>
               </ul>
            </b-card>

         </b-col>

         <b-col cols="12" md="8">
           <swiper-gallery :imagenes="atraccion.imagenes" path="/storage/atracciones/imagenes/" />
           <agendar :modelId="atraccion.id" :modelType="'App\\Models\\Atraccion'" :modelName="atraccion.nombre"/>

         </b-col>

      </b-row>

      <!-- Atracciones Relacionadas al Destino -->
      <b-row>
         <b-col cols="12">
            <atracciones :atracciones="atraccionesCercanas"  titulo="Otras Atracciones cercanas"  v-if="atraccionesCercanas.length > 0"/>
         </b-col>
      </b-row>


      <!-- Negocios cercanos a la atraccion -->
      <b-row>
      <b-col cols="12" v-if="atraccion">
            <negocios :atraccion="atraccion" subTitulo="Con negocios cercanos a ti..."></negocios>
         </b-col>
      </b-row>

      <!-- Opinions reviews -->

      <b-row id="opinions">
         <b-col cols="12">
            <b-tabs pills >
               <b-tab>
                  <template #title>
                    <strong>{{  $t('Opiniones')  }}</strong> 
                  </template>

                  
                  <!-- Reviews.Opinions -->

                  <reviews-opinion :promedioCalificacion="promedioCalificacion" :cantidad="atraccion.opinions.length" :porcentajeOpinions="porcentajeOpinions" :model="{model_id:atraccion.id,model_type:atraccion.modelType}"   />

               </b-tab>

              

            </b-tabs>
         </b-col>
      </b-row>

      <horario :horarios="atraccion.horarios" :showHorario.sync="showHorario" />
      
      <show-directions v-model="showDirections" :showDirections.sync="showDirections" :origin="origin" :destination="destination" :destinoName="atraccion.nombre"  @originChange="cambiarOrigin"></show-directions>
      
   </b-container>
</template>

<script>

import {toRefs, ref,onMounted,computed,nextTick,watch,inject} from 'vue'
import store from '@/store'
import { useGeolocation } from '@vueuse/core'
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
   BProgress,
   VBPopover
} from 'bootstrap-vue'


export default {
   
   props:['query'],

   directives:{
      'b-popover':VBPopover
   }, 

   components:{

      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BImg,
      BFormRating,
      Horario:() => import('components/Horario.vue'),
      hasLike:() => import('components/HasLike.vue'),
      BLink,
      BListGroup,
      BListGroupItem,
      BTabs,
      BTab,
      BProgress,
      OpinionForm:() => import('views/opinions/form.vue'),
      ReviewsOpinion:() => import('components/ReviewsOpinion.vue'),
      Atracciones:() => import('components/Atracciones.vue'),
      Negocios:() => import('components/Negocios.vue'),
      SwiperGallery:() => import('components/SwiperGallery.vue'),
      ShowDirections:() => import('components/ShowDirections.vue'),
      agendar:() => import('components/agendar.vue')
   }, 

   setup(props){

      const {atraccion} = toRefs(store.state.atraccion)
      const showHorario = ref(false)
      const atraccionesCercanas = ref([])
      const isShowText  = ref(false)
      const {query} = toRefs(props)
      const showDirections = ref(false)
      const { coords, locatedAt, error, resume, pause } = useGeolocation()
      const i18n = inject('i18n')
      watch(query,() => {
         store.dispatch('atraccion/fetchName',query.value).then(({result}) => {
            if(result){
               cargarAtraccionesCercanas()
               
            }

         })
      })

      const cargarAtraccionesCercanas = () => {
         store.dispatch('atraccion/getAtraccionesCercanas', atraccion.value.id).then((atracciones) => {
            atraccionesCercanas.value = atracciones
         })
      }

      onMounted(() => {
         cargarAtraccionesCercanas()
      })
      
      const opinionGuardada = (opinion) => {
         store.commit('atraccion/pushOpinion',opinion)
      } 

      const toggleShowDescription = () => {

         isShowText.value = !isShowText.value;
      }

      const comoLlegar = () => {
        
         if (error.code == 1 && error.message == 'User denied Geolocation') {
            toast.info(i18n.t('No podemos procesar tu solicitud , sin saber cual es tu ubicación, permite a la aplicación el uso de geolocalización'))
            resume()
         }else{
            showDirections.value = true
         }
      }

      watch(error,({message,code}) => {
         console.log(message,code)
         
         if(code == 1 && message == 'User denied Geolocation'){
            toast.info(i18n.t('No podemos procesar tu solicitud , sin saber cual es tu ubicación, permite a la aplicación el uso de geolocalización'))
            resume()
         }

      })

      const cambiarOrigin = (dato) => {

      }

      return {
         comoLlegar,
         atraccion,
         showHorario,
         opinionGuardada,
         porcentajeOpinions: (cal) => store.getters['atraccion/porcentajeOpinions'](cal),
         colorRandon: computed(() => colorRand()),
         portada: computed(() => store.getters['atraccion/getPortada']),
         legendHorario:computed(() => store.getters['atraccion/legendHorario']),
         horarioHoy:computed(() => store.getters['atraccion/horarioHoy']),
         promedioCalificacion:computed(() => store.getters['atraccion/promedioCalificacion'](atraccion.value)),
         atraccionesCercanas,
         isShowText,
         toggleShowDescription,
         showDirections,
         origin:computed(() => ({
            lat: coords.value.latitude,
            lng:coords.value.longitude
         })),
         destination:computed(() => ({
            lng:Number(atraccion.value.lng), 
            lat:Number(atraccion.value.lat)
         })),
         cambiarOrigin
      }
      
   }


}
</script>

<style lang="scss" scoped>

.titulo{
   font-size:24pt;
}

.table-calificacion tr td{
padding-left:0px !important;
}

.contenido-parrafo{
   text-overflow: ellipsis;
   overflow: hidden;
   -webkit-line-clamp: 7;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   text-align: justify;
   /* white-space: nowrap; */
   width: 100%;
   height: 145px;
}

.show-text{
   height:250px !important;
   overflow-y: scroll !important;
}
</style>