<template>
     <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-card>
               <b-container class="mx-0 px-0" fluid>
                  
                  <b-row>
                     <b-col cols="12" md="8">
                        <b-form-group description="Nombre Corto y Objetivo">
                           <template #label>
                              Nombre del Cupón : <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                              <b-form-input v-model="formulario.nombre" :state="valid" placeholder="Nombre del cupón" />
                              
                              <b-form-invalid-feedback :state="valid">
                                 {{  errors[0]  }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>

                           <b-form-group>
                              <template #label>
                                 Descripción del Cupón : <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="descripcion" rules="required" #default="{valid,errors}">
                                 <b-form-textarea v-model="formulario.descripcion" :rows="2" :state="valid" placeholder="Descripción del cupón"></b-form-textarea>
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>

                           <b-form-group description="Para redimir el cupón">
                              <template #label>
                                 Condiciones del Cupón : 
                              </template>
                           
                              <validation-provider name="condiciones" #default="{valid,errors}">
                                 <b-form-textarea v-model="formulario.condiciones" :rows="2" 
                                    placeholder="Condiciones"></b-form-textarea>
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>


                           <b-form-group >
                              <template #label>
                                 Restricciones del Cupón : 
                              </template>
                           
                              <validation-provider name="restricciones" #default="{valid,errors}">
                                 <b-form-textarea v-model="formulario.restricciones" :rows="2"
                                    placeholder="Restricciones"></b-form-textarea>
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>



                     </b-col>

                     <b-col cols="12" md="4">

                        <b-form-group>
                           <template #label>
                              Fecha y Hora de Inicio: <span class="text-danger">*</span>
                           </template>

                           <validation-provider nombre="expide" rules="required" #default="{valid,errors}">
                                 <flat-pickr v-model="formulario.expide" class="form-control" :config="{ dateFormat: 'Y-m-d H:i', time_24hr: true, enableTime: true,maxDate: formulario.vence }"
                                    placeholder="YYYY-MM-DD H:i" />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>

                           </validation-provider>
                        </b-form-group>

                          <b-form-group>
                           <template #label>
                              Fecha y Hora de fin: <span class="text-danger">*</span>
                           </template>

                           <validation-provider nombre="vence" rules="required" #default="{valid,errors}">
                                 <flat-pickr v-model="formulario.vence" class="form-control" :config="{ dateFormat: 'Y-m-d H:i', time_24hr: true, enableTime:true,minDate:formulario.expide}"
                                    placeholder="YYYY-MM-DD H:i" />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>

                        <b-form-group>
                           <template #label>
                             Disponibles: <span class="text-danger">*</span>
                           </template>

                           <validation-provider nombre="disponibles" rules="required" #default="{valid,errors}">

                                 <!-- <b-form-input type="number" :min="0" :step="1" v-model="formulario.disponibles" :state="valid" /> -->
                                <b-form-spinbutton id="demo-sb" v-model="formulario.disponibles" min="1" :state="valid"  />
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>,


                        <b-form-group>
                           <template #label>
                              Precio: <span class="text-danger">*</span>
                           </template>
                        
                           <validation-provider nombre="precio" rules="required" #default="{valid,errors}">
                        
                              <currency-input v-model="formulario.precio" :options="{...optionsCurrency,...{currency:getCurrency}}" input-class="form-control" />

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                           </validation-provider>
                        
                        </b-form-group>


                        <b-form-group>
                           <template #label>
                              Divisa: <span class="text-danger">*</span>
                           </template>
                        
                           <validation-provider nombre="divisa_id" rules="required" #default="{valid,errors}">
                        
                              <v-select v-model="formulario.divisa_id" :options="divisas" label="nombre" :reduce="(option) => option.id" ></v-select>
                        
                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                           </validation-provider>
                        
                        </b-form-group>




                       
                     </b-col>
                  </b-row>

                  <b-row >
                     
                     <b-col cols="12">
                        <p>Cargue una imagen para el cupón</p>
                     </b-col>
                     <b-col cols="12" class="imagen_content" @click="formFile.$el.click()">
                           <b-img :src="urlImagen" class="imagen" ></b-img>
                     </b-col>

                     <b-col cols="12" >
                        <validation-provider name="imagen" #default="{valid,errors}">
                           <b-form-file ref="formFile" accept="image/*" v-model="formulario.imagen" plain class="d-none"
                              @input="imagenSeleccionada" :state="valid" />

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>
                      
                     </b-col>

                  </b-row>
                  

               </b-container>
               
               <template #footer>

                  <b-button-group size="sm">

                     <b-button variant="primary" type="submit" title="Guardar" v-loading="loading" :disabled="loading">
                        <feather-icon icon="SaveIcon"/>
                        Guardar
                     </b-button>

                     <b-button variant="dark" title="Regresar" v-loading="loading" :disabled="loading" @click="regresar">
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

import {ValidationObserver,ValidationProvider} from 'vee-validate';


import {
   BForm,
   BFormInput,
   BFormGroup,
   BContainer,
   BRow,
   BCol,
   BCard,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BFormFile,
   BFormTextarea,
   BFormSpinbutton,
   BImg,
} from 'bootstrap-vue'

import {regresar} from '@core/utils/utils'
import flatPickr from 'vue-flatpickr-component'

import {toRefs,ref,computed,onMounted,watch} from '@vue/composition-api'
import store from '@/store'
import {required} from '@validations'
import { optionsCurrency } from '@core/utils/utils';

import vSelect from 'vue-select'

export default {

   components:{
      ValidationObserver,
      ValidationProvider,

      BForm,
      BFormInput,
      BFormGroup,
      BContainer,
      BRow,
      BCol,
      BCard,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      BFormFile,
      BFormTextarea,
      BFormSpinbutton,
      vSelect,
      flatPickr,
      BImg,
      CurrencyInput:() => import('components/CurrencyInput.vue')
   },

   setup(_,{emit}){
      const formValidate  = ref(null)
      const {cupon:formulario} = toRefs(store.state.cupones)
      const {divisas} = toRefs(store.state.divisa)
      const formFile = ref(null)
      const urlImagen = ref(null)
      
      const cargarForm = () => {

         if(!divisas.value.length){
            store.dispatch('divisa/getDivisas')
         }

         if(formulario.value.id){
            urlImagen.value = `/storage/negocios/cupones/${formulario.value.imagen}`
            formulario.value.imagen = null
         }

      }

      onMounted(() => cargarForm())
      watch(formulario,() => cargarForm())

      const imagenSeleccionada = (img) => {
         urlImagen.value = URL.createObjectURL(img)
      } 

      const guardar = () => {
         emit('save',formulario.value, formValidate.value)
      }
      return {
         loading:computed(() => store.state.loading),
         formValidate,
         formulario,
         regresar,
         required,
         optionsCurrency,
         divisas,
         divisas,
         formFile,
         urlImagen,
         guardar,
         imagenSeleccionada,
         fechainicioDisabled:(date) => {
            return (moment(formulario.value.expide).isAfter(moment(date)))
         },


         getCurrency:computed(() => {

            if(formulario.value.divisa_id){
               let divisa = divisas.value.find(val => val.id === formulario.value.divisa_id);
               
               return divisa ? divisa.iso : 'MXN'
            }

            return 'MXN';

         })

      }
   }


}
</script>

<style lang="scss" >
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

.imagen_content{
   height: 300px;
   border: 2px dotted #898787;
   border-radius: 10px;
   padding: 1rem;
   display: flex;
   justify-content: center;
   cursor: pointer;
}
</style>

