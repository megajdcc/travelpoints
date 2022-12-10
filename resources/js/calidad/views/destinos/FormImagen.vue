<template>
      <b-card>
         <b-container fluid>
            
            <b-row v-loading="loading">
               <b-col md="8">
                  <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="user-chats scroll-area w-100" style="height:950px" >
                     <b-container fluid >
                        <b-row>
                           <b-col cols="12" md="4" v-for="(imagen,i) in destino.imagenes" :key="i" class="my-1">
                              <b-card body-class="p-0 m-0" footer-class="p-0 m-0" header-class="p-0 m-0">
                                 <template #header>
                                    <b-img :src="`/storage/destinos/imagenes/${imagen.imagen}`"
                                       style="width:220px; height:220px; object-fit:cover; cursor:pointer; margin:auto 0px" @click="index = i" thumbnail
                                       fluid lazy />
                                 </template>
                                 
                                 <template #footer>
                                    <b-button-group size="sm">
                                       <b-button variant="danger" @click="eliminar(imagen.id)">
                                          <feather-icon icon="TrashIcon" />
                                          Eliminar
                                       </b-button>
                                    </b-button-group>
                                 </template>
                              </b-card>
                             
                     
                           </b-col>
                        </b-row>
                     </b-container>
                  </vue-perfect-scrollbar>
                
               </b-col>

               <b-col md="4">
                  <b-form-group title="Esta imagen la mostraremos en el perfil Público del Destino" v-b-tooltip.hover.v-warning
                     description="Presiona encima del recuadro para buscar una imagen.">
                     <template #label>
                        Adjunta una fotografía del destino: <span class="text-danger">*</span>
                        <feather-icon icon="HelpCircleIcon" class="text-warning" />
                     </template>
                  
                     <validation-provider name="foto" #default="{errors}">
                  
                        <b-form-file v-model="imagenes" ref="refFoto" accept="image/*" @input="fotoSeleccionada"
                           :state="errors.length ? false : null" browse-text="Buscar Imagen" multiple />
                  
                        <b-form-invalid-feedback :state="errors.length ? false : null">
                           {{ errors[0] }}
                        </b-form-invalid-feedback>
                  
                     </validation-provider>
                  
                  </b-form-group>
               </b-col>
            
            </b-row>

         
         </b-container>
         <vue-gallery-slideshow :images="destino.imagenes.map(val => `/storage/destinos/imagenes/${val.imagen}`)" :index="index" @close="index = null"></vue-gallery-slideshow>
      </b-card>
</template>

<script>

import {computed,toRefs,ref,onMounted} from '@vue/composition-api'

import store from '@/store'
import VueGallerySlideshow from 'vue-gallery-slideshow';
import {ValidationProvider,ValidationObserver} from 'vee-validate'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BFormFile,
   BCarousel,
   BCarouselSlide,
   VBTooltip,
   BImg,
   BButtonGroup,
   BButton,
   BFormInvalidFeedback

} from 'bootstrap-vue'

export default {
   
   props:['id'],
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormFile,
      BFormGroup,
      VueGallerySlideshow,
      ValidationProvider,
      ValidationObserver,
      BFormInvalidFeedback,
      BCarousel,
      BCarouselSlide,
      BImg,
      BButtonGroup,
      BButton,
      VuePerfectScrollbar


   },

   directives:{
      'b-tooltip': VBTooltip
   },


   setup(props){

      const {id} = toRefs(props)
      const destino = computed(() => store.state.destino.destino)

      const {destinos} = toRefs(store.state.destino)
      
      const index = ref(null)
      const imagenes = ref([])

      const cargarForm = () => {

         if(!destinos.value.length){
            store.dispatch('destino/fetch',id.value)
         }else{
            store.commit('destino/capturar',id.value)
         }


      }

      onMounted(() => {
         cargarForm()
      })



      const fotoSeleccionada = (files) => {
 

         if(files.length){

            store.dispatch('destino/cargarImagen', { imagenes: files }).then(({ result }) => {

               if (result) {
                  toast.success('Se ha cargado con éxito la imagen', { position: 'bottom-right' })

               } else {
                  toast.info('No se pudo cargar la imagen, inténtelo de nuevo ', { position: 'bottom-right' })
               }

            }).then(() => {
               imagenes.value = [];
            })

         }
            

      }

      const perfectScrollbarSettings = ref({
         maxScrollbarLength: 450,
         wheelPropagation: false,
      }) 

      const eliminar = (imagen_id) => {

         store.dispatch('destino/eliminarImagen',imagen_id).then(({result}) => {
            
            if(result){
               toast.success('Se ha eliminado con éxito la imagen',{position:'bottom-right'})
            }else{
               toast.info('No se pudo eliminar la Imagen, inténtelo de nuevo', { position: 'bottom-right' })

            }

         })
      }

      return {
         fotoSeleccionada,
         destino,
         index,
         imagenes,
         perfectScrollbarSettings,
         eliminar,
         mostrarImagen:(i) => {
            console.log('Ejemplo',i)
         },
         
         loading:computed( () => store.state.loading)

      }



   }



}
</script>

<style lang="scss">

</style>