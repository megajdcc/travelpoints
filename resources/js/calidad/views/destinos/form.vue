<template>
      <b-card>
         <validation-observer #default="{handleSubmit}" ref="formValidate">
               <b-form @submit.prevent="handleSubmit(guardar)">
                  <b-container fluid>
                     <b-row>
                        <b-col md="6">
                           <b-form-group description="Nombre del destino">

                              <template #label>
                                 Nombre: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                                 
                                 <b-form-input v-model="formulario.nombre" :state="valid" />

                                 <b-form-invalid-feedback>
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>
                           </b-form-group>

                              <b-form-group description="Este titulo lo mostraremos en el perfil publico de este Destino">
                                 <template #label>
                                    Título: <span class="text-danger">*</span>
                                 </template>
                              
                                 <validation-provider name="titulo" rules="required" #default="{errors,valid}">
                              
                                    <b-form-input v-model="formulario.titulo" :state="valid" />
                              
                                    <b-form-invalid-feedback>
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                              
                                 </validation-provider>
                              </b-form-group>

                        </b-col>

                        <b-col md="6">
                           <b-form-group description="Cual es el Aeropuerto mas cercano a este destino, selecciona el IATA Correspondiente">
                              <template #label>
                                 IATA: <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="iata_id" rules="required" #default="{errors,valid}">
                           
                                 <v-select v-model="formulario.iata_id" :reduce="(option) => option.id" :options="iatas" :filter="filterIata">
                                    <template #option="{codigo,aeropuerto}"> 
                                       <h3 style="margin: 0">{{ aeropuerto }}</h3>
                                       <em> {{ codigo }}</em>
                                    </template>

                                    <template #no-options>
                                       <span> No hay Códigos IATA registrados</span>
                                    </template>

                                    <template #selected-option="{codigo,aeropuerto}">
                                       <strong style="margin: 0">{{ aeropuerto }} - {{ codigo }}</strong>
                                    </template>

                                      
                                 </v-select>
                           
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
                                 Descripción: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="descripcion" rules="required|min:10" #default="{errors,valid}">

                                  <editor output-format="html" :value="formulario.descripcion" @input="formulario.descripcion = $event"
                                       api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider> 

                           </b-form-group>


                        </b-col>

                        <b-col cols="12" >
                            <b-form-group>
          
                                 <template #label>
                                    ¿Que debe saber el Viajero para el viaje?
                                 </template>
                        
                                 <validation-provider name="about_travel" #default="{ errors, valid }">
                        
                                    <editor output-format="html" :value="formulario.about_travel" @input="formulario.about_travel = $event"
                                    api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
                        
                                    <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                    </b-form-invalid-feedback>
                        
                                 </validation-provider>
                        
                              </b-form-group>
                        </b-col>
                     </b-row>

                     <b-row>

                        <b-col cols="12"> 
                           <el-divider content-position="left">Dirección</el-divider>

                        </b-col>

                        <b-col cols="12" md="4">
                           <b-form-group>
                              <template #label>
                                 Pais
                              </template>
                              <validation-provider name="pais_id" rules="required" #default="{errors,valid}">
                                 
                                 <v-select v-model="pais_id" :reduce="(option) => option.id" :options="paises" label="pais"/>


                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>
                        </b-col>

                        <b-col cols="12" md="4">

                           <b-form-group>
                              <template #label>
                                 Estado: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="estado_id" rules="required" #default="{errors,valid}">
                           
                                 <v-select v-model="formulario.estado_id" @input="cargarCiudades($event)" :reduce="(option) => option.id" :options="estados" label="estado" />
                           
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>
                        
                        </b-col>

                        <b-col cols="12" md="4">
                        <b-form-group>
                           <template #label>
                              Ciudad:
                           </template>
                           <validation-provider name="ciudad_id" #default="{errors,valid}">
                        
                              <v-select v-model="formulario.ciudad_id" :reduce="(option) => option.id" :options="ciudades" label="ciudad" />

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>
                        </b-col>
                     </b-row>


                     <!-- google map -->
                     <b-row>
                        <b-col>
                     
                           <div class="d-none">
                              <gmap-autocomplete class="col-12 py-1" style="z-index:8000 !important" @place_changed="setPlace($event, formulario)" #default="{ attrs, listeners }" id="myAutocomplete" slotRefName="inputAutocomplete">
                                    <b-input-group class="col-md-6 mt-2" >
                                       <b-input-group-prepend is-text>
                                          <span class="fas fa-search text-black" aria-hidden="true"></span>
                                       </b-input-group-prepend>
                                   
                                       <b-form-input ref="inputAutocomplete"  v-bind="attrs" v-on="listeners" />
                                    </b-input-group>
                                
                                 </gmap-autocomplete>
                     
                           </div>
                     
                           <GmapMap ref="input" :center="{
                           	lat:getLatitud(formulario.lat),
                           	lng:getLongitud(formulario.lng)
                           }" :zoom="zoom_map" :options="options_map"
                              style="width:100%; height:250px; display: flex; justify-content:center;">
                              <GmapMarker :key="0" :position="{
                                 lat: getLatitud(formulario.lat),
                              	lng:getLongitud(formulario.lng)
                              }" :visible="visibleMarker" :draggable="true" :clickable="true" :icon="iconMarker"
                                 @mouseup="moviendomapa($event,formulario)" @position_changed="posicionCambiada($event,formulario)">
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
                              <validation-provider name="lat" rules="required" #default="{errors}">
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
                              <validation-provider name="lng" rules="required" #default="{errors}">
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

                     <template v-if="!formulario.id">
                           <el-divider content-position="left">Asociar imagenes al destino</el-divider>
                           <b-row>
                           <b-col cols="12">
                              <multimedia hideVideos seleccionable />

                           </b-col>
                           </b-row>
                        </template>

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
import {required,min} from '@validations'

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
   BInputGroup
} from 'bootstrap-vue'
import Editor from '@tinymce/tinymce-vue'

import store from '@/store'

import {computed,toRefs,ref,onMounted,watch,provide} from 'vue'

import vSelect  from 'vue-select'

import { regresar, optionsEditor } from '@core/utils/utils'
import useDireccion from '@core/utils/useDireccion'
export default {

   components:{
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
      multimedia: () => import('views/multimedias/multimedia.vue'),
      Editor
   },


   setup(props,{emit}) {

      const formValidate = ref(null)
      const {idiomas} = toRefs(store.state.idioma)
      const formulario = computed(() => store.getters['destino/draft'])
      const seleccionados = ref([])

      provide('seleccionados', seleccionados)

      const guardar = () => {
          if (seleccionados.value.length) {
            formulario.value.imagenes = seleccionados.value
         }
         emit('save',formulario.value,formValidate.value)
      }


    

      const {
         paises,
         ciudades,
         estados,
         cargarPaises,
         cargarEstados,
         cargarCiudades,
         pais_id, 
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
         iatas,
         cargarIatas

      } = useDireccion()

      const cargarform = () => {

         if (formulario.value.id) {
            pais_id.value = formulario.value.estado.pais_id
            
            cargarEstados(pais_id.value)

            cargarCiudades(formulario.value.estado_id)
            optionsPlace.value.content = '<div><strong>' + formulario.value.nombre + '</strong>'
         }

      }

      onMounted(() => {
         cargarBuscador()
         cargarIatas()
         cargarform()
      })

      watch(formulario, () => cargarform())


      return {
         formValidate,
         required,
         loading:computed(() => store.state.loading),
         guardar,
         regresar,
         formulario,
         min,


         paises,
         ciudades,
         estados,
         cargarPaises,
         cargarEstados,
         cargarCiudades,
         pais_id,

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
         iatas,
         optionsEditor,
         idiomas,

         filterIata:(options,search) => {

            return  options.filter(({codigo,aeropuerto}) => {
               return (aeropuerto ||  '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
            }) 

          
         }

         



        
      }
   }

}
</script>