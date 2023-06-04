<template>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-card>

               <b-container fluid>
                  <b-row>
                     <b-col cols="12">
                        <h3>Rango de precios y divisa del negocio</h3>
                        <p class="text-mute">
                           La divisa predeterminada es la divisa principal que utiliza tu negocio para cualquier registro que hagas. También se muestra en el perfil de negocio. Es posible cambiarla en cualquier momento, o especificar una divisa distinta para cada registro en particular.
                        </p>
                     </b-col>
                  </b-row>
                  <b-row>
                     <b-col md="4">
                        <b-form-group>
                           <template #label>
                              Divisa predeterminada: <span class="text-danger">*</span> 
                           </template>

                           <validation-provider name="divisa_id" rules="required"  #default="{valid,errors}">

                                <v-select v-model="formulario.divisa_id" :options="divisas.filter(val => !val.principal)" label="nombre" :reduce="(option) => option.id"></v-select>

                                 <b-form-invalid-feedback :state="valid">
                                    {{  errors[0]  }}
                                 </b-form-invalid-feedback>
                                 
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                     <b-col md="4">
                        <b-form-group>
                           <template #label>
                              Precio mínimo:
                           </template>
                        
                           <validation-provider name="precio_minimo" #default="{valid,errors}">
                        
                              <currency-input v-model="formulario.precios.precio_minimo" :options="{ ...optionsCurrency,...{currency:getCurrency.iso} }" input-class="form-control" />
                        
                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                     <b-col md="4">
                           <b-form-group>
                              <template #label>
                                 Precio máximo:
                              </template>
                           
                              <validation-provider name="precio_maximo" #default="{valid,errors}">
                           
                                 <currency-input v-model="formulario.precios.precio_maximo"
                                    :options="{ ...optionsCurrency,...{currency:getCurrency.iso} }" input-class="form-control" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           </b-form-group>
                     </b-col>

                     <b-col md="4">
                           <b-form-group description="Por Persona">
                              <template #label>
                                Compra promedio:
                              </template>
                           
                              <validation-provider name="compra_promedio" #default="{valid,errors}">
                           
                                 <currency-input v-model="formulario.precios.compra_promedio"
                                    :options="{ ...optionsCurrency,...{currency:getCurrency.iso} }" input-class="form-control" />
                           
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
                     <b-button type="submit" variant="primary" title="Guardar" v-loading="loading" :disabled="loading" >
                        <feather-icon icon="SaveIcon" />
                        Guardar
                     </b-button>

                     <b-button  variant="dark" title="Regresar" @click="regresar">
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
   ValidationProvider,
} from 'vee-validate'


import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BForm,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton
} from 'bootstrap-vue'

import {computed,toRefs,ref,onMounted} from 'vue'

import store from '@/store'
import { regresar, optionsCurrency } from '@core/utils/utils'

import {required} from '@validations'
import vSelect from 'vue-select'
export default {


   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      ValidationObserver,
      ValidationProvider,
      vSelect,
      CurrencyInput:() => import('components/CurrencyInput.vue')
   },


   setup(){
      
      const {negocio:formulario} = toRefs(store.state.negocio)

      const { divisas } = toRefs(store.state.divisa)

      const formValidate = ref(null)

      const cargarForm = () => {
         
         if(!divisas.value.length){
            store.dispatch('divisa/getDivisas')
         }

      }

      onMounted(() => cargarForm())

      const guardar = () => {
         
         store.dispatch('negocio/guardar',formulario.value).then(({result}) => {
            if(result){
               toast.success('Se ha Guardado con éxito los cambios',{position:'bottom-right'})
            }else{
               toast.info('No se pudo guardar, inténtelo de nuevo',{position:'bottom-right'})

            }
         })

      }

      return {
         loading:computed(() => store.state.loading),
         formulario,
         guardar,
         regresar,
         required,
         optionsCurrency,
         formValidate,
         divisas,

         getCurrency:computed(() => store.getters['divisa/getCurrency'](formulario.value.divisa_id))


      }
   }

}
</script>