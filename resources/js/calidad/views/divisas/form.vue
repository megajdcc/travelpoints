<template>
      <b-card>
            <validation-observer #default="{ handleSubmit }">
               <b-form @submit.prevent="handleSubmit(guardar)" ref="formValidate">
                  
                  <b-container fluid>

                     <b-row>

                        <b-col cols="12" md="6">
                           <b-form-group >
                              <template #label>
                                 Nombre: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="nombre" rules="required" #default="{errors,valid}" >
                                    <b-form-input v-model="formulario.nombre" :state="valid" placeholder="Nombre de la divisa..."/>

                                    <b-form-invalid-feedback :state="valid">
                                          {{  errors[0] }}
                                    </b-form-invalid-feedback>

                              </validation-provider>
                           </b-form-group>
                        </b-col>

                        <b-col cols="12" md="6">
                           <b-form-group>

                              <template #label>
                                 Iso de la moneda: <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="iso" rules="required" #default="{errors,valid}">
                                 <b-form-input v-model="formulario.iso" :state="valid" placeholder="Example MXN, USD, BS ...  " @input="verificarMoneda" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           </b-form-group>
                        </b-col>

                     </b-row>

                     <b-row>
                        <b-col cols="12" md="6">

                           <b-form-group description="Simbolo de la moneda" >
                              <template #label>
                                 Simbolo : <span class="text-danger">*</span>
                              </template>


                              <validation-provider name="simbolo" #default="{errors,valid}" rules="required">
                                 <b-form-input v-model="formulario.simbolo" :state="valid" placeholder="Example: $,€ ... " />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>

                        </b-col>

                        <b-col cols="12" md="6">

                           <b-form-group label="Es la moneda principal? ">
                              <validation-provider name="principal" rules="required" #default="{errors,valid}">
                                 <b-form-radio-group v-model="formulario.principal" :options="[{text:'Sí',value:true},{text:'No',value:false}]"
                                    :state="valid" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           
                           </b-form-group>


                         
                        </b-col>
                     </b-row>

                     <b-row>
                        <b-col cols="12" md="6" v-if="(!formulario.principal && (formulario.iso.length > 2))">

                           <b-form-group description="El tipo de cambio con relación a la moneda principal">

                              <template #label>
                                 Tasa: <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="tasa" rules="required" #default="{errors,valid}">
                           
                                 <currency-input :value="formulario.tasa" @input="formulario.tasa = $event" :options="optionsCurrency"
                                    class="form-control"  />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>

                           </b-form-group>

                        </b-col>
                     </b-row>

                     <b-row>
                        <b-col>
                           <b-button-group>
                              <b-button type="submit" v-loading="loading" variant="primary"> 
                                 <feather-icon icon="SaveIcon"/>
                                 Guardar
                              </b-button>

                              <b-button type="button" v-loading="loading" @click="regresar" >
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
import { toRefs, ref, computed, onMounted, watch } from 'vue'
import store from '@/store'
import {regresar} from '@core/utils/utils';

import {
   BFormGroup,
   BFormRadioGroup,
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
      BFormRadioGroup,
      BFormInput,
      ValidationObserver,
      ValidationProvider,
      BContainer,
      BRow,
      BCol,
      BCard,
      CurrencyInput: () => import('components/CurrencyInput')


   },


   setup(_,{emit}){
      
      const {divisa:formulario} = toRefs(store.state.divisa)

      const optionsCurrency = ref({
         currency: 'MXN',
         locale: 'es-ES',
         autoDecimalDigits: true,
      })
      const formValidate = ref(null)

      const guardar = () => {

         emit('save',formulario.value,formValidate.value)
      }  


      const verificarMoneda = (val) => {
         optionsCurrency.value.currency = val.toUpperCase()
      }

      return {
         formulario,
         required,
         formValidate,
         guardar,
         regresar,
         loading:computed(() => store.state.loading),
         optionsCurrency,
         verificarMoneda,

      }
   }
}
</script>