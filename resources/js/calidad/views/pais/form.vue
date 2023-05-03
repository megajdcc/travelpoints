<template>
      <b-card>
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)" >
               <b-container fluid>
                  <b-row>
                     <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                           <template #label>
                              Pais: <span class="text-danger">*</span>
                           </template>
                           <validation-provider rules="required" name="pais" #default="{errors,valid}">
                              <b-form-input v-model="formulario.pais" :state="valid" />

                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                         
                        </b-form-group>
                     </b-col>

                     <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                           <template #label>
                              Código:
                           </template>
                           <validation-provider  name="codigo" #default="{errors,valid}">
                              <b-form-input v-model="formulario.codigo" :state="valid" />
                     
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                     
                        </b-form-group>
                     </b-col>

                     <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                           <template #label>
                              LADA:
                           </template>
                           <validation-provider name="lada" #default="{errors,valid}">
                              <b-form-input v-model="formulario.lada" :state="valid" />
                     
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                     
                        </b-form-group>
                     </b-col>


                  </b-row>
                  <b-row>
                     <b-col>
                        <small><strong>Nota:</strong> Los campos con el ( <span class="text-danger">*</span> ) son importantes no deben faltar. </small>
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col>
                        <b-button-group size="sm">
                           <b-button type="submit" title="Guardar" v-loading="loading" variant="primary">
                              <feather-icon icon="SaveIcon"/>
                              Guardar
                           </b-button>

                           <b-button title="Regresar" v-loading="loading" variant="secondary" @click="regresar">
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
import {
   BForm,BContainer,
   BCard,BRow,BCol,
   BButton,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup

} from 'bootstrap-vue'

import {ValidationProvider,ValidationObserver} from 'vee-validate'
import {required} from '@validations'

import {onMounted,computed,toRefs,ref} from 'vue';
import store from '@/store';
import {regresar} from '@core/utils/utils'

export default {

   components:{
      BForm, BContainer,
      BCard, BRow, BCol,
      BButton,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      ValidationProvider,
      ValidationObserver,
      BButtonGroup
   },

   setup(props,{emit}){

      const formulario = computed(() => store.getters['pais/draft'])
      const formValidate = ref(null)

      const guardar = () => emit('save',formulario.value,formValidate.value)

      return {
         loading:computed(() => store.state.loading),
         formulario,
         formValidate,
         guardar,
         required,
         regresar
      }
   }
   
}
</script>