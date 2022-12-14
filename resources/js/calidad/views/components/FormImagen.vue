<template>
   <b-card>
      <b-container fluid>

         <b-row v-loading="loading">
            <b-col md="8">
               <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="user-chats scroll-area w-100"
                  style="height:950px">
                  <b-container fluid>
                     <b-row>
                        <b-col cols="12" md="4" v-for="(imagen, i) in imagenes" :key="i" class="my-1">
                           <b-card body-class="p-0 m-0" footer-class="p-0 m-0" header-class="p-0 m-0">
                              <template #header>
                                 <b-img :src="`${pathImagenes}${imagen.imagen}`"
                                    style="width:220px; height:220px; object-fit:cover; cursor:pointer; margin:auto 0px"
                                    @click="index = i" thumbnail fluid lazy />
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
               <b-form-group title="Esta imagen la mostraremos en el perfil Público "
                  v-b-tooltip.hover.v-warning description="Presiona encima del recuadro para buscar una imagen.">
                  <template #label>
                     Adjunta una fotografía : <span class="text-danger">*</span>
                     <feather-icon icon="HelpCircleIcon" class="text-warning" />
                  </template>

                  <validation-provider name="foto" #default="{ errors }">

                     <b-form-file v-model="imagens" ref="refFoto" accept="image/*" @input="fotoSeleccionada($event,() => imagens = [])"
                        :state="errors.length ? false : null" browse-text="Buscar Imagen" multiple />

                     <b-form-invalid-feedback :state="errors.length ? false : null">
                        {{ errors[0] }}
                     </b-form-invalid-feedback>

                  </validation-provider>

               </b-form-group>

               <b-button @click="regresar" variant="dark">
                  <feather-icon icon="ArrowLeftIcon"/>
                  Regresar
               </b-button>
            </b-col>

         </b-row>


      </b-container>
      <vue-gallery-slideshow v-if="imagenes" :images="imagenes.map(val => `${pathImagenes}${val.imagen}`)"
         :index="index" @close="index = null"></vue-gallery-slideshow>
   </b-card>
</template>

<script>

import { computed, toRefs, ref, onMounted } from '@vue/composition-api'

import store from '@/store'
import VueGallerySlideshow from 'vue-gallery-slideshow';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {regresar} from '@core/utils/utils'

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

   props:{
      'path-imagenes':{
         type:String
      },

      imagenes:{
         type:Array
      },

      actions:{
         type:Function
      }
   },

   components: {
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

   directives: {
      'b-tooltip': VBTooltip
   },


   setup(props) {


      const imagens = ref([])

      const {
         fotoSeleccionada,
         eliminar
      } = props.actions();

      const index = ref(null)

      const perfectScrollbarSettings = ref({
         maxScrollbarLength: 450,
         wheelPropagation: false,
      })


      return {
         fotoSeleccionada,
         index,
         perfectScrollbarSettings,
         eliminar,
         imagens,
         regresar,
         loading: computed(() => store.state.loading)
      }

   }
}
</script>

<style lang="scss">

</style>