<template>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-card >
               <b-container fluid>

                  <b-row>
                     <b-col cols="12" md="12">
                        <b-form-group >
                           <template #label>
                              Nombre de la amenidad: <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                              <b-form-input v-model="formulario.nombre" :state="valid"  placeholder="Nombre de la amenidad..."/>

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col cols="12" >

                        <b-button-group size="sm">
                           <b-button type="submit" variant="primary" v-loading="loading" :disabled="loading">
                              <feather-icon icon="SaveIcon" />
                              Guardar
                           </b-button>

                              <b-button  variant="dark" v-loading="loading" :disabled="loading" @click="regresar">
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
   BCard,BForm,BFormInput,
   BFormGroup,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup,
   BContainer,
   BRow,
   BCol

} from 'bootstrap-vue'


import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'

import { regresar } from '@core/utils/utils'

import store from '@/store'
import {toRefs,ref,computed} from '@vue/composition-api'

export default {
   
   components:{
      BCard, BForm, BFormInput,
      BFormGroup,
      BFormInvalidFeedback,
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BCol,
      ValidationObserver,
      ValidationProvider

   },


   setup(_,{emit}){

      const {amenidad:formulario} = toRefs(store.state.amenidad)
      const formValidate = ref(null)

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

      return {
         required,
         regresar,
         formValidate,
         formulario,
         guardar,
         loading:computed(() => store.state.loading)

      }
   }
}
</script>