<template>

   <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-card>
               <b-container fluid >
                  <b-row>
                     <b-col cols="12"> 
                        <p class="">
                           Comparte un video de tu negocio con tus clientes. El video enlazado o cargado aparecerá en el perfil de negocio.
                           <br>
                           <!-- <strong>En el caso en que el vídeo sea de Youtube puedes ingresar:</strong> 
                           
                           <ul>
                              <li>Cualquier enlace a un video de YouTube</li>
                           </ul> -->
                        
                        </p>
                     </b-col>
                  </b-row>

                  <b-row v-if="formulario.videos.length == 0 ">
                     <b-col cols="12">
                        <b-button-group size="sm">
                           <b-button variant="primary" title="Agregar Video" @click="agregar">
                              Agregar Video
                           </b-button>
                        </b-button-group>
                     </b-col>
                  </b-row>
                  <el-divider></el-divider>
                  <b-row v-for="(video, i) in formulario.videos" :key="i">

                     <!-- <b-col cols="12" md="4">
                        <b-form-group >
                           <template #label>
                              ¿ Es de youtube ? : <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="youtube" rules="required" #default="{valid,errors}">

                             <b-form-radio-group v-model="video.youtube" :options="[{text:'Sí',value:true},{text:'No',value:false}]" :state="valid" @change="video.url = null"></b-form-radio-group>

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>
                     </b-col> -->

                     <b-col cols="12" md="6">
                        <b-form-group>
                           <template #label>
                              Nombre : <span class="text-danger">*</span>
                           </template>
                        
                           <validation-provider name="nombre" rules="required" #default="{valid,errors}">

                              <b-form-input v-model="video.nombre" :state="valid" />

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0]  }}
                              </b-form-invalid-feedback>

                           </validation-provider>
                        
                        </b-form-group>

                        <b-form-group>
                           <template #label>
                              {{ video.youtube ? 'Url' : 'Vídeo' }} : <span class="text-danger">*</span>
                           </template>
                        
                        
                           <validation-provider v-if="video.youtube" name="url" rules="required|url" #default="{valid,errors}">
                        
                        
                              <b-form-input v-model="video.url" :state="valid" />
                        
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                           </validation-provider>
                        
                           <validation-provider name="url" #default="{valid,errors}" v-else>
                        
                              <b-form-file v-model="video.url" :state="valid" accept="video/*" browse-text="Busque el video" />
                        
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                           </validation-provider>
                        
                        
                        </b-form-group>


                     </b-col>

                     <b-col cols="12" md="6" class="d-flex justify-content-center">
                           <template v-if="urlVideo">
                              <b-embed type="iframe" aspect="16by9" :src="urlVideo" allowfullscreen v-if="formulario.videos[0].youtube"></b-embed>
                              
                              <video :src="`/storage/negocios/videos/${urlVideo}`" width="450" controls v-else></video>
                           </template>
                     </b-col>

                  </b-row>

                  <b-row>
                     <b-col cols="12" >
                        <b-button-group size="sm">
                           <b-button type="submit" variant="primary" title="Guardar" v-loading="loading" :disabled="loading" v-if="formulario.videos.length">
                              <feather-icon icon="SaveIcon"/>
                              Guardar
                           </b-button>

                           <b-button variant="dark" title="Regresar" v-loading="loading" :disabled="loading" @click="regresar">
                              <feather-icon icon="ArrowLeftIcon" />
                              Regresar
                           </b-button>

                        </b-button-group>
                     </b-col>
                  </b-row>

               </b-container>
            </b-card>
         </b-form>   
   </validation-observer>
   
 
</template>

<script>


import {
   ValidationObserver,
   ValidationProvider
} from 'vee-validate'
import { required,url } from '@validations'

import {
   BForm,
   BContainer,
   BRow,
   BCol,
   BCard,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BFormFile,
   BFormRadio,
   BFormRadioGroup,
   BEmbed
} from 'bootstrap-vue'

import store from '@/store'
import { toRefs, ref, computed, onMounted,watch } from '@vue/composition-api'
import { regresar } from '@core/utils/utils'

export default {
   
   components:{
      BForm,
      BContainer,
      BRow,
      BCol,
      BCard,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      BFormFile,
      ValidationObserver,
      ValidationProvider,
      BFormRadio,
      BFormRadioGroup,
      BEmbed


   },


   setup(props){
      const formValidate = ref(null)
      const { negocio:formulario } = toRefs(store.state.negocio)

      const urlVideo = ref(null)

      const guardar = () => {

            if(!formulario.value.videos[0].youtube && formulario.value.videos[0].url){
               urlVideo.value = URL.createObjectURL(formulario.value.videos[0].url)
            }

            store.dispatch('negocio/guardarVideo',formulario.value.videos[0]).then(({result}) => {

               if(result){
                  toast.success('Se ha guardado con éxito el vídeo',{position:'bottom-right'})
               }else{
                  toast.info('No se pudo guardar, inténte con otro', { position: 'bottom-right' })
               }

            }).catch(e => {

               if(e.response.status === 422){
                  formValidate.value.setErrors(e.response.data.errors)
               }
               
            })

      }


      const agregar = () => {
         store.commit('negocio/agregarVideo');
      }

      const cargarForm = () => {

         if(formulario.value.videos.length){
            urlVideo.value = formulario.value.videos[0].url
            formulario.value.videos[0].url = null 
         }

      }

      onMounted(() => cargarForm())
      watch([formulario],() => cargarForm())

      return {
         formValidate,
         loading:computed(() => store.state.loading),
         formulario,
         guardar,
         required,
         agregar,
         url,
         regresar,
         urlVideo
      }
    }

}
</script>