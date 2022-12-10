<template>

   <b-card>
         <validation-observer #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)">
                  <b-container fluid>
                     <b-row>
                        <b-col md="6">
                           <b-form-group size="sm">
                              <template #label>
                                 Código Iata: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="codigo" rules="required" #default="{errors,valid}">
                                 
                                 <b-form-input v-model="formulario.codigo" :state="valid" size="sm"/>

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>
                           </b-form-group>

                           <b-form-group size="sm" description="Nombre del Aeropuerto mas cercano asociado a este código Iata">
                              <template #label>
                                 Aeropuerto: <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="aeropuerto" rules="required" #default="{errors,valid}">
                           
                                 <b-form-input v-model="formulario.aeropuerto" :state="valid" size="sm" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           </b-form-group>

                        </b-col>

                        <b-col md="6">
                           <b-form-group size="sm">
                              <template #label>
                                 Pais: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="pais_id" rules="required" #default="{errors,valid}">

                                 <v-select v-model="pais_id" :reduce="(option) => option.id" :options="paises" label="pais" @change="cargarEstados" size="small" class="form-control-sm" />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                 
                              </validation-provider>

                           </b-form-group>

                           <b-form-group size="sm">
                              <template #label>
                                 Estado: <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="estado_id" rules="required" #default="{errors,valid}">
                           
                                 <v-select v-model="formulario.estado_id" :reduce="(option) => option.id" :options="estados" label="estado" @input="cargarCiudads($event)"
                                    size="small" class="form-control-sm mt-0" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           
                           </b-form-group>

                           <b-form-group size="sm">

                              <template #label>
                                 Ciudad:
                              </template>
                           
                              <validation-provider name="ciudad_id" #default="{errors,valid}">
                           
                                 <v-select v-model="formulario.ciudad_id" :reduce="(option) => option.id" :options="ciudades" label="ciudad"
                                     size="small" class="form-control-sm mt-0" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           
                           </b-form-group>


                        </b-col>

                     </b-row>

                     <b-row>
                        <b-col>
                           <span>Si no sabes cual es tú código Iata mas cercano, por favor visita esta Pagina <b-link target="_black" href="https://es.wikipedia.org/wiki/C%C3%B3digo_de_aeropuertos_de_IATA">Códigos de aeropuertos de IATA</b-link>.</span>
                        </b-col>
                     </b-row>

                     <b-row>
                        <b-col>
                           <b-button-group size="sm">

                              <b-button variant="primary" v-loading="loading" type="submit"> 
                                 <feather-icon icon="SaveIcon" />
                                 Guardar
                              </b-button>

                              <b-button variant="dark" v-loading="loading" @click="regresar">
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
   BContainer,
   BRow,
   BCol,
   BForm,
   BFormGroup,
   BFormInput,
   BButtonGroup,
   BButton,
   BCard,
   BFormInvalidFeedback,
   BLink
} from 'bootstrap-vue'

import vSelect from 'vue-select'

import {ValidationObserver,ValidationProvider} from 'vee-validate';
import {required} from '@validations'

import store from '@/store'
import {toRefs,ref,computed,onMounted,watch} from '@vue/composition-api';
import { regresar } from '@core/utils/utils';
import useDireccion from '@core/utils/useDireccion';
export default {
   
   components:{
      ValidationObserver,
      ValidationProvider,

      //  BBS,
      BFormGroup,
      BFormInput,
      BButtonGroup,
      BButton,
      BForm,
      BContainer,
      BRow,
      BCol,
      BLink,
      BCard,
      BFormInvalidFeedback,


      vSelect


   },


   setup(props,{emit}){

      const {iata : formulario} = toRefs(store.state.iata)
      const formValidate = ref(null)

      const {
         paises,
         ciudades,
         estados,
         cargarPaises,
         cargarEstados,
         cargarCiudades,
         pais_id,
      } = useDireccion();

      const cargarForm = () => {

         if(formulario.value.id){
            pais_id.value = formulario.value.estado.pais_id;
            cargarCiudades(formulario.value.estado_id);
         }

      }


      onMounted(() => {
         cargarForm()
      })

      watch(formulario, () => cargarForm())

      const guardar = () => {

         emit('save',formulario.value,formValidate.value)
      }

      const cargarCiudads = (estado) => {
            console.log('cargandoCiudades')
            cargarCiudades(estado)
      } 

      return { 
         guardar,
         formulario,
         formValidate,
         required,
         regresar,
         loading:computed(() => store.state.loading),

         paises,
         ciudades,
         estados,
         cargarPaises,
         cargarEstados,
         pais_id,
         cargarCiudads

      }
   }

}
</script>