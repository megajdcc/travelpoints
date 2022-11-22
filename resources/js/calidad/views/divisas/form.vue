<template>
      <b-card>
            <validation-observer #default="{ handleSubmit }">
               <b-form @submit.prevent="handleSubmit(guardar)" ref="formValidate">
                  
                  <b-container fluid>

                     <b-row>

                        <b-col col="12" md="6">
                           <b-form-group >
                              <template #label>
                                 Nombre: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                                    <b-form-input v-model="formulario.nombre" :state="!valid"/>

                                    <b-form-invalid-feedback :state="!valid">
                                          {{  errors[0] }}
                                    </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>
                        </b-col>

                     </b-row>

                     <b-row>
                        <b-col>
                           <b-button-group>
                              <b-button type="submit" v-loading="loading"> 
                                 <feather-icon icon="SaveIcon"/>
                                 Guardar
                              </b-button>

                              <b-button type="button" v-loading="loading" @click="regresar">
                                 <feather-icon icon="ArrowLeftIcon" />
                                 Regresar
                              </b-button>
                           </b-button-group>
                        </b-col>
                     </b-row>
                  </b-container>
               </b-form>
            </validation-observer>
      </b-card>
     
</template>

<script>

import {ValidationObserver,ValidationProvider} from 'vee-validate';
import {required} from '@validations'
import {toRefs,ref,computed,onMounted,watch} from 'vue'
import store from '@/store'
import {regresar} from '@core/utils/utils';

import {
   BFormGroup,
   BForm,
   BFormInput,
   BButtonGroup,
   BButton,
   BFormInvalidFeedback,
   BContainer,
   BRow,
   BCol,
   BCard

} from 'bootstrap-vue'


export default {
   
   components:{
      BFormGroup,
      BForm,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      BFormInput,
      ValidationObserver,
      ValidationProvider,
      BContainer,
      BRow,
      BCol,
      BCard

   },


   setup(_,{emit}){
      
      const {divisa:formulario} = toRefs(store.state.solicitud)
      const formValidate = ref(null)

      const guardar = () => {

         emit('save',formulario.value,formValidate.value)
      }

      return {
         formulario,
         required,
         formValidate,
         guardar,
         regresar,
         loading:computed(() => store.state.loading)
      }
   }
}
</script>