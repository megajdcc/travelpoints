<template>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
               <b-card>

                  <b-container fluid>

                     <b-row>
                        <b-col cols="12">
                           <b-form-group>
                              
                              <template #label>
                                 Titulo: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="titulo" rules="required" #default="{errors,valid}">

                                 <b-form-input v-model="formulario.titulo" :state="valid"/>

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>

                           </b-form-group>
                        </b-col>

                        <b-col cols="12">
                           <b-form-group>
                        
                              <template #label>
                                 Contenido: <span class="text-danger">*</span>
                              </template>
                        
                              <validation-provider name="contenido" rules="required" #default="{errors,valid}">
                        
                                 <b-form-textarea v-model="formulario.contenido" :rows="3" :state="valid"></b-form-textarea>
                        
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                        
                              </validation-provider>
                        
                           </b-form-group>
                        </b-col>

                     </b-row>
                  </b-container>

                  <template #footer>

                     <b-button-group size="sm">

                        <b-button type="submit" variant="primary" title="Guardar" v-loading="loading" :disabled="loading">
                           <feather-icon icon="SaveIcon"/>
                           Guardar
                        </b-button>

                        <b-button @click="regresar" variant="dark" title="Regresar" v-loading="loading" :disabled="loading">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
                        </b-button>

                     </b-button-group>
                  </template>
               </b-card>
         </b-form>
      </validation-observer>
     
</template>


<script>

import {
   ValidationObserver,
   ValidationProvider
} from 'vee-validate'


import {
   BContainer,
   BRow,
   BCol,
   BCard,
   BForm,
   BFormInput,
   BFormGroup,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BFormTextarea
} from 'bootstrap-vue'

import store from '@/store'
import {required} from '@validations'

import {regresar} from '@core/utils/utils'

import {computed,toRefs,ref} from 'vue'


export default {
   
   components:{
      ValidationObserver,
      ValidationProvider,

      BCard,
      BForm,
      BFormInput,
      BFormGroup,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,

      BContainer,
      BRow,
      BCol,
      BFormTextarea



   },


   setup(_,{emit}){

      const {publicacion:formulario} = toRefs(store.state.publicacion)
      const formValidate = ref(null)

      const guardar = () => {
      

         emit('save',formulario.value,formValidate.value)
      }


      return {
         required,
         regresar,
         loading:computed(() => store.state.loading),
         formulario,
         guardar,
         formValidate
      }
   }


}
</script>