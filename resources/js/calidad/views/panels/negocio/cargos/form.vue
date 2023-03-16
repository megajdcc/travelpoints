<template>
   <b-card>

      <validation-observer ref="formValidate" #default="{ handleSubmit }">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12">
                     <b-form-group>

                        <template #label>
                           Nombre del cargo | <span class="text-danger">*</span>
                        </template>
                        
                        <validation-provider name="cargo" rules="required" #default="{ errors,valid }">
                           <b-form-input v-model="formulario.cargo" :state="valid" />

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>

                     </b-form-group>

                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-card class="border mt-1" class-header="px-0">

                        <b-card-header >
                           <b-card-title class="font-medium-2">
                              <feather-icon icon="LockIcon" size="18" />
                              <span class="align-middle ml-50">Permisos asociados al Cargo</span>
                           </b-card-title>
                        </b-card-header>


                        <b-form-group>

                           <validation-provider name="permisos" #default="{valid,errors}">
                              
                              <b-form-checkbox-group v-model="formulario.permisos" 
                              :options="permisos" value-field="id" text-field="nombre" >

                           </b-form-checkbox-group> 

                              <b-form-invalid-feedback :state="valid">
                                 {{  errors[0]  }}
                              </b-form-invalid-feedback>
                              
                           </validation-provider>
                        </b-form-group>

                     </b-card>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">
                        <b-button variant="primary" type="submit" v-loading="loading">
                           <feather-icon icon="SaveIcon" />
                           Guardar
                        </b-button>

                        <b-button variant="secondary" @click="regresar">
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
   BButton,
   BMedia,
   BAvatar,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BForm,
   BTable,
   BCard,
   BCardHeader,
   BCardTitle,
   BFormCheckbox,
   BButtonGroup,
   BContainer,
   BFormCheckboxGroup,
   BFormInvalidFeedback
} from 'bootstrap-vue'


import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { required } from '@validations';

import store from '@/store'
import { ref, onMounted, watch, computed, toRefs } from 'vue'

import { regresar } from '@core/utils/utils';
export default {
   components: {
      ValidationObserver,
      ValidationProvider,
      BButton,
      BMedia,
      BAvatar,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BForm,
      BTable,
      BCard,
      BCardHeader,
      BCardTitle,
      BFormCheckbox,
      BButtonGroup,
      BContainer,
      BFormInvalidFeedback,
      BFormCheckboxGroup,

   },

   setup(_, { emit }) {

      const formValidate = ref(null)
      const permisos = ref([])
      const {negocio} = toRefs(store.state.negocio)
      const { cargo: formulario } = toRefs(store.state.cargo)
      const cargarForm = () => {

         if(formulario.value.id){
            formulario.value.permisos = formulario.value.permisos.map(val => val.permiso_id)
         }

         store.dispatch('getPermisosPorPanel','Negocio').then((data) => permisos.value = data)
      }  

      onMounted(() => {
         cargarForm();
      })

      watch([formulario], () => {
         cargarForm()
      })

      const guardar = () => {
         formulario.value.negocio_id = negocio.value.id
         emit('save', formulario.value, formValidate.value)
      }


      return {
         guardar,
         formValidate,
         required,
         formulario,
         loading: computed(() => store.state.loading),
         regresar,
         permisos,

      }
   }

}

</script>