<template>
      <b-card>
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)">
                  <b-container fluid>
                     <b-row>
                        <b-col cols="12" md="6">
                           <b-form-group>
                              <template #label>
                                 Titulo: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="titulo" rules="required" #default="{errors,valid}">

                                 <b-form-input v-model="formulario.titulo" :state="valid" />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>
                        </b-col>

                        <b-col cols="12" md="6">

                           <b-form-group label="Seleccione un Destino o Atracción: " >

                              
                              <validation-provider name="model_id" rules="required" #default="{valid,errors}">
                              
                                 <v-select v-model="formulario.model" :options="optionsEventos" label="nombre">
                                 
                                 </v-select>
                                 
                                   <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>

                           </b-form-group>

                        </b-col>
                     </b-row>

                     <b-row>
                        <b-col cols="12" md="4">
                           <b-form-group>
                              <template #label>
                                 Fecha de inicio: <span class="text-danger">*</span>
                              </template>
                              
                              <validation-provider name="fecha_inicio" rules="required" #default="{valid,errors}">

                                 <flat-pickr v-model="formulario.fecha_inicio" class="form-control" :config="{ ...dateOption ,...{maxDate:formulario.fecha_fin}}"/>

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>
                           
                           </b-form-group>
                        </b-col>

                         <b-col cols="12" md="4">
                           <b-form-group>
                              <template #label>
                                 Fecha de Culminación: <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="fecha_fin" rules="required" #default="{valid,errors}">
                           
                                 <flat-pickr v-model="formulario.fecha_fin" class="form-control" :config="{...dateOption,...{minDate:formulario.fecha_inicio}}" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           
                           </b-form-group>
                        </b-col>

                        <b-col cols="12" md="4">
                           <b-form-group description="Cuando sea sí su elección, El evento estará activo en la misma fecha todos los años, el sistema se encargará de actualizar las fecha de inicio y de fin una vez culminado el primer evento del año en curso...">
                              <template #label>
                                 ¿ Es recurrente ? 
                              </template>

                              <validation-provider name="recurrente" rules="required" #default="{valid,errors}">

                                 <b-form-checkbox switch  v-model="formulario.recurrente" :value="true" :unchecked-value="false"/>

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>
                           </b-form-group>
                        </b-col>
                        
                     </b-row>
                     <b-row>

                        <b-col md="6">
                           <b-form-group>
                              <template #label>
                                 Url: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="url" rules="required" #default="{valid,errors}">
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

                              <validation-provider name="contenido" rules="required" #default="{errors,valid}">
                                    <editor output-format="html" :value="formulario.contenido" @input="formulario.contenido = $event"
                                          api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />

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
                              <b-button type="submit" variant="primary" v-loading="loading" >
                                 <feather-icon icon="SaveIcon"/>
                                 Guardar
                              </b-button>

                              <b-button @click="regresar" variant="dark" v-loading="loading" >
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

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import Editor from '@tinymce/tinymce-vue'
import vSelect from 'vue-select'
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
   BInputGroup
} from 'bootstrap-vue'

import { optionsEditor,dateOption,regresar } from '@core/utils/utils'
import flatPickr from 'vue-flatpickr-component'

import {computed,onMounted,watch,toRefs,ref} from '@vue/composition-api'

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
      BInputGroup


   },

   setup(props,{emit}){

      const { evento:formulario } = toRefs(store.state.evento)
      const optionsEventos = ref([])
      const formValidate = ref(null)

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

      onMounted(() => {
         axios.get(`/api/get/all/destinos-y-atraccions`).then(({data}) => {
            optionsEventos.value = data
         }).catch(e => {
            console.log(e)
         })

      })


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
         url_app: computed(() => `${window.location.origin}/evento/`)
      }
   }

}
</script>

<style lang="scss" >
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>

