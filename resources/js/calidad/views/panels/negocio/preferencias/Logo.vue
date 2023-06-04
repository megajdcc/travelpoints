<template>
      <b-container fluid  class="px-0 mx-0">


         <b-row>
            <b-col cols="12 ">
               <b-card>
                  <b-card-header class="header-negocio-form " v-if="formulario.id" :style="{
                                       'background-image':`url('/storage/negocios/fotos/${ imagenPrincipal }')`
                                    }">
                  
                     <section class="d-flex align-items-center w-100 container-fluid">
                  
                        <b-row class="w-100">
                           <b-col cols="12" md="3">
                  
                              <article class="header-logo-negocio" v-b-tooltip.hover.v-primary="'Clics para actualizar'"
                                 title="Clics para actualizar">
                                 <b-img :src="urlLogo" class="cursor-pointer" thumbnail rounded @click="refLogo.$el.click()" />
                              </article>
                  
                              <b-form-file accept="image/*" plain class="d-none" ref="refLogo" v-model="logotipo"
                                 @input="actualizarLogo" />
                  
                           </b-col>
                  
                           <b-col cols="12" md="9">
                              <!-- <section class="d-flex mb-1">
                  
                                 <b-badge variant="warning" class="text-black" v-if="formulario.categoria">
                                    {{ formulario.categoria.categoria }}
                                 </b-badge>
                  
                                 <b-badge variant="success" class="text-black ml-1" v-if="formulario.id">
                                    <span v-if="formulario.tipo_comision == 1"> {{ formulario.comision }} % </span>
                                    <span v-else> {{ formulario.comision | currency({symbol:formulario.divisa ? formulario.divisa.simbolo
                                       : '$' }) }}</span>
                                 </b-badge>
                  
                              </section> -->
                  
                              <!-- <h2 class="text-white display-4">{{ formulario.nombre }}</h2> -->
                              <!-- <p class="text-white font-weight-bolder" v-if="formulario.id">{{ formulario.direccion }} <br>
                                 {{ formulario.ciudad ? formulario.ciudad.ciudad : '' }} {{ `${formulario.estado.estado}
                                 ${formulario.estado.pais.pais}` }}
                              </p> -->
                  
                              <!-- Buttons actions -->
                  
                              <b-button variant="primary" size="sm" @click="showImagenes" title="Mostrar Imagenes" class="btn-imagenes">
                                 <font-awesome-icon icon="fa-images" />
                                 Imagenes
                              </b-button>
                  
                           </b-col>
                  
                        </b-row>
                  
                     </section>
                  </b-card-header>

                  <strong class="text-danger">Nota:</strong>
                  <p class="text-mute">
                     Seleccione la imagen del logo si desea cambiarla;
                     Si desea cambiar la portada, seleccione Imagenes para abrir el dialogo donde puede seleccionar la portada.
                  </p>
               </b-card>
            </b-col>
         </b-row>

         <b-row>
            <b-col cols="12">
               <b-button-group size="sm">
                  
                  <b-button type="submit" variant="primary" v-loading="loading" :disabled="loading" >
                     <feather-icon icon="SaveIcon"/>
                     Guardar
                  </b-button>

                  <b-button variant="dark" v-loading="loading" :disabled="loading" @click="regresar">
                     <feather-icon icon="ArrowLeftIcon" />
                     Regresar
                  </b-button>

                  
               </b-button-group>
            </b-col>
         </b-row>

          <b-modal v-model="isShowImagenes" size="xl" title="Imagenes del Negocio" centered hide-footer>
            <form-imagen path-imagenes="/storage/negocios/fotos/" :imagenes="formulario.imagenes" :actions="actionsImagenes" />
         </b-modal>
         
      </b-container>
</template>

<script>

import {
   BCard,
   BFormInput,
   BFormFile,
   BFormGroup,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup,
   BContainer,
   BRow,
   BCol,
   BCardHeader,
   VBTooltip,
   BImg,
   BModal
} from 'bootstrap-vue'


import {ValidationObserver,ValidationProvider} from 'vee-validate'

import {required} from '@validations'
import { regresar } from '@core/utils/utils'

import store from '@/store'
import {toRefs,ref,onMounted,watch,computed,toRef} from 'vue'

export default {
   
   components:{
      BCard,
      BFormInput,
      BFormFile,
      BFormGroup,
      BFormInvalidFeedback,
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BCol,
      BCardHeader,
      BImg,
      BModal,

      ValidationObserver,
      ValidationProvider,

      FormImagen: () => import('components/FormImagen.vue'),



   },
   
   directives:{
      'b-tooltip': VBTooltip
   },

   setup(){
      
      const formulario = computed(() => store.getters['negocio/draft'])
      const refLogo = ref(null)
      const urlLogo = ref(null)
      const logotipo = ref(null)
      const isShowImagenes = ref(false)


      const cargarForm = () => {

         if (formulario.value.id) {
            urlLogo.value = `/storage/negocios/logos/${formulario.value.logo}`
            formulario.value.logo = null
           
         }

      }

      onMounted(() => cargarForm())
      watch([formulario], () => cargarForm())


      const actualizarLogo = (file) => {

         if (file) {

            store.dispatch('negocio/actualizarLogo', { logo: file }).then(({ result }) => {

               if (result) {
                  toast.success('Se ha actualizado con éxito el Logo', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo cargar el Logo,inténte de nuevo', { position: 'bottom-right' })

               }
            }).catch(e => console.log(e))
               .then(() => logotipo.value = null)

         }


      }

      const showImagenes = () => {
         isShowImagenes.value = true
      }

      const actionsImagenes = () => {

         const eliminar = (imagen_id) => {

            store.dispatch('negocio/eliminarImagen', imagen_id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha eliminado con éxito la imagen')
               } else {
                  toast.error('No se pudo eliminar la Imagen')
               }

            }).catch(e => console.log(e))


         }

         const fotoSeleccionada = (files) => {


            store.dispatch('negocio/addImagenes', { 'imagenes': files, negocio_id: formulario.value.id }).then(({ result }) => {

               if (result) {
                  toast.success(`Imagenes cargada con éxito`)
               } else {
                  toast.error('No se pudo cargar las Imagenes...')
               }

            }).catch(e => console.log(e))

         }

         const checkPrincipal = (valor, imagen_id) => {

            store.dispatch('negocio/togglePortada', { imagen: imagen_id, portada: valor, negocio: formulario.value.id }).then(({ result }) => {

               if (result) {

                  toast.success('Se ha actualizado con éxito', { position: 'bottom-right' })

               } else {

                  toast.info('No se pudo actualizar, inténte de nuevo...', { position: 'bottom-right' })

               }


            }).catch(e => console.log(e))

         }

         return {
            eliminar,
            checkPrincipal,
            fotoSeleccionada
         }
      }



      return {
         loading:computed(() => store.state.loading),
         regresar,
         required,
         refLogo,
         actualizarLogo,   
         imagenPrincipal: computed(() => {

            if (formulario.value.imagenes.find(val => val.portada)) {
               return formulario.value.imagenes.find(val => val.portada).imagen
            } else {
               return '';
            }

         }),

         urlLogo,
         logotipo,
         isShowImagenes,
         showImagenes,

         actionsImagenes,
         formulario,


      }

   }

}
</script>

<style lang="scss" scoped>
.header-logo-negocio{
   width: 100%;
   height: 80% !important;
   transition: 3s ease ;
   position:relative;

   padding: 1rem;
   border:2px dotted; 
   border-radius: 10px;
   img{
      width: 100%;
      height:auto;
      position:relative;
   }
   // &:hover{
   //    &::before {
   //          content: 'Clics para actualizar';
   //          cursor: pointer;
   //          position:absolute;
   //          width:100%;
   //          display: flex;
   //          justify-content: center;
   //       }
   // }
   

}

.header-negocio-form{
      width: 100%;
      // height: 150px;
      position:relative;   
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
   
      &::before{
         content:'';
         width:100%;
         position:absolute;
         height:100%;
         left:0;
         background-color: rgba(0,0,0,0.4);
         // z-index: 1;
      }

      section{
         z-index: 2;
      }

      p{
         font-size: 14pt;
      }

      .btn-imagenes{

         position:absolute;
         left:auto;
         right:.5rem !important;
         top:.5rem !important;
      
      }

}

</style>
