<template>
      <b-card>
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)">
               <b-container fluid>
                  <b-row>
                     <b-col cols="12">
                        <b-form-group>
                           <template #label>
                              Panel: <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="panel" rules="required" #default="{valid,errors}">
                              <b-form-input v-model="formulario.panel" :state="valid" placeholder="Nombre del panel" />

                              <b-form-invalid-feedback :state="valid">
                                 {{  errors[0]  }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                  </b-row>

                  <b-row >
                     <b-col cols="12" >
                        <b-button-group size="sm">
                           <b-button type="submit" title="guardar" v-loading="loading">
                              <FeatherIcon icon="SaveIcon" />
                              Guardar
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


import {
   BCard,BForm,BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup,
   BContainer,
   BRow,
   BCol,
} from 'bootstrap-vue' 

import {required} from '@validations'

import {toRefs,ref,computed} from '@vue/composition-api';

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import store from '@/store'

export default {
   
   components:{
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    ValidationObserver,
    ValidationProvider,
},


   setup(props,{emit}){

      const {panel:formulario} = toRefs(store.state.panel)
      const formValidate = ref(null)

      const guardar = () => {

         emit('save',formulario.value,formValidate.value)

      }

      return {
         required,
         formulario,
         formValidate,
         guardar,
         loading:computed(() => store.state.loading)

      }
   }

}
</script>