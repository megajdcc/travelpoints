<template>
      <b-card>
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)">

               <form-wizard
                     color="#0293c9"
                     :title="null"
                     :subtitle="null"
                     stepSize="sm"
                     finish-button-text="Guardar"
                     back-button-text="Anterior"
                     next-button-text='Siguiente'
                     class="steps-transparent mb-1"
                     @on-complete="handleSubmit(guardar)">

                     <tab-content title="Datos" icon="feather icon-file-text">
                        <b-container fluid>
                           <b-row>
                              <b-col cols="12" md="6">
                                 <b-form-group>
                                    <template #label>
                                       Titulo: <span class="text-danger">*</span>
                                    </template>

                                    <validation-provider name="titulo" rules="required" #default="{ errors, valid }">

                                       <b-form-input v-model="formulario.titulo" :state="valid" />

                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                                    </validation-provider>
                                 </b-form-group>

                                 <b-form-group label="Seleccione un Destino o Atracción: " v-if="!negocio" >
                              
                                    <validation-provider name="model_id" rules="required" #default="{valid,errors}">
                                    
                                       <v-select v-model="formulario.model" :options="optionsEventos" label="nombre">
                                       
                                       </v-select>
                                       
                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>

                                    </validation-provider>

                                 </b-form-group>

                              </b-col>

                              <b-col cols="12" md="6">
                                 <b-form-group>
                                    <template #label>
                                       Url: <span class="text-danger">*</span>
                                    </template>
                           
                                    <validation-provider name="url" rules="required" #default="{ valid, errors }">
                                       <b-input-group :prepend="url_app">
                                          <b-form-input v-model="formulario.url" :state="valid" />
                           
                                       </b-input-group>
                           
                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                           
                                    </validation-provider>
                                 </b-form-group>
                              </b-col>

                           </b-row>

                           <b-row>
                              <b-col cols="12">
                                 <b-form-group>
                              
                                    <template #label>
                                       Contenido: <span class="text-danger">*</span>
                                    </template>

                                    <validation-provider name="contenido" rules="required" #default="{ errors, valid }">
                                          <editor output-format="html" :value="formulario.contenido" @input="formulario.contenido = $event"
                                                api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />

                                          <b-form-invalid-feedback :state="valid">
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                    </validation-provider>

                                 </b-form-group>

                              </b-col>
                           </b-row>

                        </b-container>
                     </tab-content>

                     <tab-content title="Fechas & Recurrencia" icon="feather icon-calendar">
                        <b-container fluid>
                           <b-row>

                              <b-col cols="12" md="4">
                                 <b-form-group>
                                    <template #label>
                                       Fecha de inicio: <span class="text-danger">*</span>
                                    </template>
                           
                                    <validation-provider name="fecha_inicio" rules="required" #default="{ valid, errors }">
                           
                                       <flat-pickr v-model="formulario.fecha_inicio" class="form-control"
                                          :config="{ ...dateOption, ...{ maxDate: formulario.fecha_fin } }" />
                           
                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                           
                                    </validation-provider>
                           
                                 </b-form-group>

                                 <b-form-group 
                                 description="Si el evento es recurrente y no desea que tenga fecha de finalización deje este campo en blanco">
                                    <template #label>
                                       Fecha de Culminación: <span class="text-danger" v-if="!formulario.recurrente">*</span>
                                    </template>
                              
                                    <validation-provider name="fecha_fin" :rules="!formulario.recurrente ? 'required' : ''" #default="{valid,errors}">
                              
                                       <flat-pickr v-model="formulario.fecha_fin" class="form-control"
                                          :config="{...dateOption,...{minDate:formulario.fecha_inicio}}" />
                              
                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                              
                                    </validation-provider>
                              
                                 </b-form-group>

                              </b-col>


                              <b-col cols="12" md="8">
                                 <section class="d-flex justify-content-around">
                                     <b-form-group>
                                       <template #label>
                                          ¿ Es recurrente ?
                                       </template>
                           
                                       <validation-provider name="recurrente" rules="required" #default="{ valid, errors }">
                           
                                          <b-form-checkbox switch v-model="formulario.recurrente" :value="true" :unchecked-value="false" />
                           
                                          <b-form-invalid-feedback :state="valid">
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                           
                                       </validation-provider>
                                    </b-form-group>

                                    <b-form-group>
                                       <template #label>
                                          ¿ El evento es todo el día ?
                                       </template>
                        
                                       <validation-provider name="all_dia" rules="required" #default="{ valid, errors }">
                        
                                          <b-form-checkbox switch v-model="formulario.all_dia" :value="true" :unchecked-value="false" />
                        
                                          <b-form-invalid-feedback :state="valid">
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                        
                                       </validation-provider>
                                    </b-form-group>

                                 </section>
                                
                                 <template v-if="formulario.recurrente">
                                    <b-form-group>
                                       <template #label>
                                          Tipo de recurrencia: <span class="text-danger">*</span>
                                       </template>

                                       <validation-provider name="tipo_recurrencia" rules="required" #default="{valid,errors}">
                                          <b-form-radio-group v-model="formulario.tipo_recurrencia" 
                                          :options="tipoRecurrencias" :state="valid">
                                          </b-form-radio-group>
                                          <b-form-invalid-feedback :state="valid">
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                       </validation-provider>
                                    </b-form-group>


                                    <b-form-group description="Días de la semana" v-if="formulario.tipo_recurrencia == 1">
                                       <template #label>
                                          ¿Que días?: <span class="text-danger">*</span>
                                       </template>

                                       <validation-provider name="dia_semana" rules="required" #default="{valid,errors}">
                                          <b-form-checkbox-group v-model="formulario.recurrencia.dia_semana" :options="diasSemana" />
                                          <b-form-invalid-feedback :state="valid">
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                       </validation-provider>
                                    </b-form-group>


                                    <section class="d-md-flex justify-content-around">
                                        <b-form-group 
                                       description="Hora en la que empieza el evento, si el evento es todo el día, esta opción no es requerida">
                                             <template #label>
                                                Hora de inicio: <span class="text-danger">*</span>
                                             </template>

                                             <validation-provider name="hora_inicio" 
                                             :rules="!formulario.all_dia ? 'required' : ''" #default="{ valid, errors }">
                                                <b-form-timepicker :disabled="formulario.all_dia"  hour12  label-close-button="Cerrar"
                                                v-model="formulario.recurrencia.hora_inicio" locale="es"/>
                                                <b-form-invalid-feedback :state="valid">
                                                   {{ errors[0] }}
                                                </b-form-invalid-feedback>
                                             </validation-provider>
                                       </b-form-group>

                                        <b-form-group 
                                          description="Hora en la que acaba el evento en el día, si el evento es todo el día, esta opción no es requerida">
                                                <template #label>
                                                   Hora de finalización: <span class="text-danger">*</span>
                                                </template>

                                                <validation-provider name="hora_fin" :rules="!formulario.all_dia ? 'required' : ''" #default="{ valid, errors }">
                                                   <b-form-timepicker :disabled="formulario.all_dia"  hour12  label-close-button="Cerrar"
                                                   v-model="formulario.recurrencia.hora_fin" locale="es"/>
                                                   <b-form-invalid-feedback :state="valid">
                                                      {{ errors[0] }}
                                                   </b-form-invalid-feedback>
                                                </validation-provider>
                                       </b-form-group>
                                    </section>
                                   

                                 </template>

                              </b-col>

                              
                           </b-row>
                        </b-container>
                     </tab-content>


               </form-wizard>

            </b-form>
         </validation-observer>
      </b-card>
</template>


<script>

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import Editor from '@tinymce/tinymce-vue'
import vSelect from 'vue-select'

import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BForm,
   BButtonGroup,
   BButton,
   BFormInput,
   BFormInvalidFeedback,
   BFormCheckbox,
   BFormCheckboxGroup,
   BInputGroup,
   BFormRadioGroup,
   BFormTimepicker
} from 'bootstrap-vue'

import { optionsEditor,dateOption,regresar, diasSemana } from '@core/utils/utils'
import flatPickr from 'vue-flatpickr-component'

import {computed,onMounted,watch,toRefs,ref} from 'vue'

import store from '@/store'

export default {

   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback, 
      ValidationObserver,
      ValidationProvider,
      BForm,
      BButtonGroup,
      BButton,
      Editor,
      vSelect,
      flatPickr,
      BFormCheckbox,
      BInputGroup,
      BFormRadioGroup,
      BFormCheckboxGroup,
      TabContent,
      FormWizard,
   BFormTimepicker



   },

   props:{
      negocio:{
         type:Boolean,
         default:false
      }
   },

   setup(props,{emit}){

      const {negocio} = toRefs(props)
      const { evento:formulario } = toRefs(store.state.evento)
      const optionsEventos = ref([])
      const formValidate = ref(null)

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

      onMounted(() => {
         
         if(!negocio.value){
            axios.get(`/api/get/all/destinos-y-atraccions`).then(({ data }) => {
               optionsEventos.value = data
            }).catch(e => {
               console.log(e)
            })
         }
        

      })


      const tipoRecurrencias = ref([
         { text: 'Diariamente', value: 0 },
         { text:'Semanal',value:1},
         // { text:'Mensual', value:2},
         // { text:'Anual', value: 3 },
      ])


      return {
         formValidate,
         guardar,
         formulario,
         loading:computed(() => store.state.loading),
         required,
         optionsEditor,
         optionsEventos,
         dateOption,
         regresar,
         url_app: computed(() => `${window.location.origin}/evento/`),
         tipoRecurrencias,
         diasSemana,
      }
   }

}
</script>

<style lang="scss" >
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

.dark-layout .stepTitle{
   color: #b5adad !important;
}
</style>

