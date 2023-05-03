<template>
      <b-card>
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)" >
               <b-container fluid>
                  <b-row>

                     <b-col cols="12" md="6" >
                        <b-form-group description="Seleccione un pais para el estado">
                           <template #label >
                              Pais: <span class="text-danger">*</span>
                           </template>
                           <validation-provider rules="required" name="pais_id" #default="{errors}">

                              <v-select v-model="formulario.pais_id" :reduce="(option) => option.value" :options="paises.map(val => ({label:val.pais,value:val.id}))" />
                     
                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                     
                        </b-form-group>
                     </b-col>

                     <b-col cols="12" md="6" >
                        <b-form-group>
                           <template #label>
                              Estado: <span class="text-danger">*</span>
                           </template>
                           <validation-provider rules="required" name="estado" #default="{errors,valid}">
                              <b-form-input v-model="formulario.estado" :state="valid" />

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
import vSelect from 'vue-select'

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
      BButtonGroup,
      vSelect
   },

   setup(props,{emit}){

      const formulario = computed(() => store.getters['estado/draft'])
      const { paises } = toRefs(store.state.pais)


      onMounted(() => {

         if(!paises.value.length){
            store.dispatch('pais/getPaises')
         }

      })


      const formValidate = ref(null)

      const guardar = () => emit('save',formulario.value,formValidate.value)

      return {
         loading:computed(() => store.state.loading),
         formulario,
         formValidate,
         guardar,
         required,
         regresar,
         paises
      }
   }
   
}
</script>