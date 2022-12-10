<template>
   <b-card>
      <validation-observer #default="{ handleSubmit }" ref="formValidate">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col md="6">
                     <b-form-group description="Nombre de la Atracción">

                        <template #label>
                           Nombre: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="nombre" rules="required" #default="{ errors, valid }">

                           <b-form-input v-model="formulario.nombre" :state="valid" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>
                     </b-form-group>

                     <b-form-group label="Duración Sugerida" description="Esto no es necesario, pero si quieres, puedes establecerlo, si existe, lo mostraremos en el perfil publico de esta atracción">

                        <validation-provider name="duracion_sugerida" #default="{errors,valid}">
                           <b-form-input v-model="formulario.duracion_sugerida" :state="valid" />

                           <b-form-invalid-feedback >
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                           
                        </validation-provider>

                     </b-form-group>


                  

                  </b-col>

                  <b-col md="6">
                        <b-form-group label="Email"
                           description="Esto no es necesario, pero si quieres, puedes establecerlo, si existe, lo mostraremos en el perfil publico de esta atracción">
                        
                           <validation-provider name="email" rules="email" #default="{errors,valid}">
                              <b-form-input v-model="formulario.email" :state="valid" />
                        
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                           </validation-provider>
                        
                        </b-form-group>


                        <b-form-group label="Sitio web"
                           description="Esto no es necesario, pero si quieres, puedes establecerlo, si existe, lo mostraremos en el perfil publico de esta atracción">
                        
                           <validation-provider name="sitio_web" rules="url" #default="{errors,valid}">
                              <b-form-input v-model="formulario.sitio_web" :state="valid" />
                        
                              <b-form-invalid-feedback>
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
                           Descripción: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="descripcion" rules="required|min:10" #default="{ errors, valid }">

                           <b-form-textarea v-model="formulario.descripcion" :rows="3" :state="valid">

                           </b-form-textarea>

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>


                  </b-col>
               </b-row>

              

               <el-divider content-position="left">Ubicación Exacta</el-divider>
               <!-- google map -->
               <b-row>
                  <b-col>

                     <div class="d-none">
                        <div class="input-group col-md-6 mt-2" id="myAutocomplete">
                           <div class="input-group-prepend">
                              <div class="input-group-text bg-secondary">
                                 <span class="fas fa-search text-white" aria-hidden="true"></span>
                              </div>
                           </div>

                           <gmap-autocomplete class="form-control py-1 " style="z-index:8000 !important"
                              @place_changed="setPlace($event, formulario)">

                           </gmap-autocomplete>

                        </div>
                     </div>

                     <GmapMap ref="input" :center="{
                        lat: getLatitud(formulario.lat),
                        lng: getLongitud(formulario.lng)
                     }" :zoom="zoom_map" :options="options_map"
                        style="width:100%; height:250px; display: flex; justify-content:center;">
                        <GmapMarker :key="0" :position="{
                           lat: getLatitud(formulario.lat),
                           lng: getLongitud(formulario.lng)
                        }" :visible="visibleMarker" :draggable="true" :clickable="true" :icon="iconMarker"
                           @mouseup="moviendomapa($event, formulario)"
                           @position_changed="posicionCambiada($event, formulario)">
                           <GmapInfoWindow :options="optionsPlace">
                           </GmapInfoWindow>
                        </GmapMarker>

                     </GmapMap>

                  </b-col>
               </b-row>

               <!-- Lat y lng  -->
               <b-row>
                  <b-col md="6">

                     <b-form-group label="Latitud">
                        <validation-provider name="lat" rules="required" #default="{ errors }">
                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <span class="fas fa-map-marked-alt"></span>
                              </b-input-group-prepend>

                              <b-form-input v-model="formulario.lat" :state="errors.length ? false : null" />

                           </b-input-group>
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>

                  </b-col>

                  <b-col md="6">

                     <b-form-group label="Longitud">

                        <validation-provider name="lng" rules="required" #default="{ errors }">
                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <span class="fas fa-map-marked-alt"></span>
                              </b-input-group-prepend>
                              <b-form-input v-model="formulario.lng" :state="errors.length ? false : null" />
                           </b-input-group>

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>

                     </b-form-group>

                  </b-col>
               </b-row>

               <b-row class="my-1">
                  
                  <b-col cols="12" md="6">

                     <b-form-group label="Teléfono" description="Puede agregar un número de teléfono o no, esto es opcional">
                        <b-form-input v-model="formulario.telefono.telefono" />
                     </b-form-group>
                     
                     <b-form-group label="¿Está asociado a whatsapp?">
                        <b-form-checkbox switch v-model="formulario.telefono.is_whatsapp" :value="true" :unchecked-value="false" />
                     </b-form-group>

                  </b-col>

                  <b-col cols="12" md="6">
                     <h5>¿Que incluye esta atracción?</h5>

                     <b-button-group size="sm" class="mb-1">
                        <b-button @click="agregarInclusion" variant="primary"> 
                           <feather-icon icon="PlusIcon"/>
                           Agregar Inlcusión
                        </b-button>
                     </b-button-group>

                     <table class="table table-hover table-sm ">
                        <thead>
                           <th>Sujeto</th>
                           <th>Descripción</th>
                           <th></th>
                        </thead>

                        <tbody>
                           <tr v-for="(item,i) in formulario.incluye">
                              <td>
                                 <b-form-group>
                                    <template #label>
                                       Sujeto: <span class="text-danger">*</span>
                                    </template>

                                     <validation-provider name="sujeto" rules="required" #default="{ valid,errors }">
                                       <b-input-group>
                                          <b-form-input v-model="item.sujeto" :state="valid" />
                                       </b-input-group>

                                       <b-form-invalid-feedback>
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                                    </validation-provider>

                                 </b-form-group>
                              </td>

                              <td>
                                 <b-form-group description="Describa de que se trata esta inclusión ">
                                    <template #label>
                                       Descripción: <span class="text-danger">*</span>
                                    </template>
                              
                                    <validation-provider name="descripcion" rules="required" #default="{ valid,errors }">

                                       <b-input-group>
                                          <b-form-input v-model="item.descripcion" :state="valid" />
                                       </b-input-group>
                              
                                       <b-form-invalid-feedback>
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                                    </validation-provider>
                              
                                 </b-form-group>
                              </td>
                              <td>
                                 <b-button variant="danger" @click="quitarInclusion(i)">
                                    <feather-icon icon="TrashIcon"/>
                                 </b-button>
                              </td>
                           </tr>
                        </tbody>

                     </table>

                     <b-form-group v-for="(item,i) in formulario.incluye" :key="i"></b-form-group>
                  </b-col>
               </b-row>

               <b-row>
                  <b-button-group size="sm">
                     <b-button type="submit" v-loading="loading" variant="primary">
                        <feather-icon icon="SaveIcon" />
                        Guardar
                     </b-button>

                     <b-button @click="regresar" variant="dark">
                        <feather-icon icon="ArrowLeftIcon" />
                        Regresar
                     </b-button>
                  </b-button-group>
               </b-row>

            </b-container>

         </b-form>
      </validation-observer>
   </b-card>
</template>
<script>


import {
   ValidationProvider,
   ValidationObserver
} from 'vee-validate'
import { required, min,email,url } from '@validations'

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BForm,
   BFormTextarea,
   BInputGroupPrepend,
   BInputGroup,
   BFormCheckbox
} from 'bootstrap-vue'

import store from '@/store'

import { computed, toRefs, ref, onMounted, watch } from '@vue/composition-api'

import vSelect from 'vue-select'

import { regresar } from '@core/utils/utils'
import useDireccion from '@core/utils/useDireccion'
export default {

   components: {
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      BForm,
      BFormTextarea,
      BInputGroupPrepend,
      ValidationProvider,
      ValidationObserver,
      BInputGroup,
      vSelect,
      BFormCheckbox
   },


   setup(props, { emit }) {

      const formValidate = ref(null)

      const formulario = computed(() => store.state.atraccion.atraccion)

      const guardar = () => {
         emit('save', formulario.value, formValidate.value)
      }




      const {
        
         buscadormap,
         visibleMarker,
         zoom_map,
         markers,
         iconMarker,
         input,
         optionsPlace,
         options_map,
         getLatitud,
         getLongitud,

         setPlace,
         moviendomapa,
         posicionCambiada,
         cargarBuscador,

      } = useDireccion()

      const cargarform = () => {

         if (formulario.value.id) {
            optionsPlace.value.content = '<div><strong>' + formulario.value.nombre + '</strong>'
         }

      }

      onMounted(() => {
         cargarBuscador()
         cargarform()
      })

      watch(formulario, () => cargarform())

      const agregarInclusion = () => {
         store.commit('atraccion/agregarInclusion')
      }

      const quitarInclusion = (i) => {
         store.commit('atraccion/quitarInclusion',i)
      }


      return {
         formValidate,
         required,
         loading: computed(() => store.state.loading),
         guardar,
         regresar,
         formulario,
         min,

         buscadormap,
         visibleMarker,
         zoom_map,
         markers,
         iconMarker,
         input,
         optionsPlace,
         options_map,


         setPlace,
         moviendomapa,
         posicionCambiada,
         getLatitud,
         getLongitud,
         email,
         url,
         agregarInclusion,
         quitarInclusion
      }
   }

}
</script>