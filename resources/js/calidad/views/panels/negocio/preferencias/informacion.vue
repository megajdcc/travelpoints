<template>
   <validation-observer ref="formValidate" #default="{ handleSubmit }">
    
      <b-form @submit.prevent="handleSubmit(guardar)" ref="formSolicitud">
         <b-card>
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="8">
                     <b-form-group title="Los socios de TravelPoints pueden encontrar su negocio por su nombre."
                        v-b-tooltip.hover.v-warning>

                        <template #label>
                           Nombre del negocio: <span class="text-danger">*</span>
                           <feather-icon icon="HelpCircleIcon" class="text-warning" />
                        </template>

                        <validation-provider name="nombre" rules="required" #default="{ errors }">
                           <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null"
                              placeholder="Nombre del negocio" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>

                     <b-form-group title="Describe tu negocio de manera concisa. Máximo 80 carácteres."
                        v-b-tooltip.hover.v-warning>
                        <template #label>
                           Descripción corta: <span class="text-danger">*</span>
                           <feather-icon icon="HelpCircleIcon" class="text-warning" />
                        </template>

                        <validation-provider name="descripcion" rules="required|max:80" #default="{ errors }">
                           <b-form-input v-model="formulario.breve" :state="errors.length ? false : null"
                              placeholder="Ejemplo: Restaurante de mariscos" :rows="4" />

                           <b-form-invalid-feedback :state="errors.legnth ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>

                  </b-col>

                  <b-col cols="12" md="4">
                     <b-form-group>
                        <template #label>
                           Categoría del negocio: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="categoria_id" rules="required" #default="{ errors }">
                           <el-select v-model="formulario.categoria_id" class="w-100"
                              placeholder="Seleccionar categoría" filterable clearable>
                              <el-option v-for="(categoria, i) in categorias" :key="i" :value="categoria.id"
                                 :label="categoria.categoria"></el-option>
                           </el-select>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>

                      <b-form-group>
                           <template #label>
                              Divisa: <span class="text-danger">*</span>

                              <validation-provider name="divisa_id" rules="required" #default="{ valid, errors }">
                                 <v-select v-model="formulario.divisa_id" :reduce="(option) => option.id"
                                    :options="divisas.filter(val => !val.principal)" label="nombre" class="w-100" />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </template>
                     </b-form-group>

                     <b-form-group v-b-tooltip.hover.v-warning
                        title="Elija entre pagar una comisión o un cantidad fija por persona">
                        <template #label>
                           Tipo de pago: <span class="text-danger">*</span>
                           <feather-icon icon="HelpCircleIcon" class="text-warning" />
                        </template>

                        <validation-provider name="tipo_comision" rules="required" #default="{ errors }">

                           <b-form-radio-group v-model="formulario.tipo_comision"
                              :options="[{ text: 'Comisión', value: 1 }, { text: 'Cantidad Fija', value: 2 }]"
                              button-variant="outline-primary" buttons size="md" :state="errors.length ? false : null"
                              class="w-100" @change="validarMonto">

                           </b-form-radio-group>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>

                     <b-form-group v-b-tooltip.hover.v-warning
                        title="Se te cobrará este porcentaje por cada venta que registres en nuestro sistema. Una mayor comisión significa un mejor posicionamiento."
                        v-if="formulario.tipo_comision == 1">
                        <template #label>
                           Comisión: <span class="text-danger">*</span>
                           <feather-icon icon="HelpCircleIcon" class="text-warning" />
                        </template>

                        <validation-provider name="comision" rules="required|comision:10,100" #default="{ errors }">

                           <b-form-input type="number" :max="100" :min="6" v-model="formulario.comision"
                              :state="errors.length ? false : null" />


                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>

                     <b-form-group v-b-tooltip.hover.v-warning
                        title="Se te cobrará este monto por cada venta que registres en el sistema a cada persona"
                        v-else>
                        <template #label>
                           Monto: <span class="text-danger">*</span>
                           <feather-icon icon="HelpCircleIcon" class="text-warning" />
                        </template>

                        <validation-provider name="comision" rules="required" #default="{ errors }">

                           <currency-input :value="formulario.comision" @input="formulario.comision = $event"
                              :options="{...optionsCurrency,...{ currency: getCurrency }}" class="form-control" @blur="validarMonto"  />

                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>


                        </validation-provider>

                     </b-form-group>

                    



                  </b-col>
               </b-row>
               <b-row>
                  <b-col cols="12">

                      <b-form-group
                                    title="Explica con más detalle acerca de tu negocio. Los socios de TravelPoints tambien pueden encontrar tu negocio por su descripción. Puedes agregar palabras claves para facilitar la busqueda."
                                    v-b-tooltip.hover.v-primary>
                                    <template #label>
                                       Descripción del negocio: <span class="text-danger">*</span>
                                       <feather-icon icon="HelpCircleIcon" class="text-warning" />
                                    </template>
                           
                                    <validation-provider name="descripcion" rules="required" #default="{ errors }">
                                         <editor output-format="html" :value="formulario.descripcion" @input="formulario.descripcion = $event"
                             api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
                                       <b-form-invalid-feedback :state="errors.length ? false : null">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                           
                                    </validation-provider>
                                 </b-form-group>
                  </b-col>

                  <b-col cols="12">

                     <b-form-group title="Este será el enlace directo al perfil de tú negocio."
                        v-b-tooltip.hover.v-warning>
                        <template #label>
                           Enlace desea del perfil de negocio: <span class="text-danger">*</span>
                           <feather-icon icon="HelpCircleIcon" class="text-warning" />
                        </template>

                        <validation-provider name="url" rules="required" #default="{ errors }">

                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 {{ url }}/
                              </b-input-group-prepend>

                              <b-form-input v-model="formulario.url" :state="errors.length ? false : null"
                                 placeholder="nombre-de-negocio" />

                           </b-input-group>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>
                     </b-form-group>
                  </b-col>

               </b-row>

            </b-container>
         </b-card>

         <b-card>
            <h2>Información de contacto del negocio</h2>
            <hr>

            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">

                     <b-button-group size="sm">
                        <b-button type="primary" @click="agregarEmail" :disabled="formulario.emails.length >= 5" >Agregar</b-button>
                     </b-button-group>

                     <table class="table table-sm table-hover table-borderless mt-1">
                        <thead>
                           <th>
                              Emails
                           </th>
                           <th >
                              ¿ Principal ?
                           </th>
                           <th></th>
                           
                        </thead>

                        <tbody>
                           <tr v-for="(email,i) in formulario.emails" :key="i" >
                              <td>
                                 <validation-provider name="email" rules="email|required" #default="{valid,errors}">
                                    <b-form-input v-model="email.email" :state="valid" />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0]  }}
                                    </b-form-invalid-feedback>

                                 </validation-provider>
                              </td>
                              <td>
                                 <validation-provider name="principal" #default="{valid,errors}" >
                                       <b-form-checkbox v-model="email.principal" switch />

                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0]  }}
                                       </b-form-invalid-feedback>
                                 </validation-provider> 
                              
                              </td>
                              <td>
                                 <b-button @click="quitarEmail(i)" size="sm" variant="danger">
                                    <feather-icon icon="TrashIcon"/>
                                 </b-button>
                              </td>

                           </tr>
                        </tbody>
                     </table>

                  </b-col>

                  <b-col cols="12" md="6">

                           <b-button-group size="sm">
                        <b-button type="primary" @click="agregarTelefono" :disabled="formulario.telefonos.length >= 5">Agregar</b-button>
                     </b-button-group>

                     <table class="table table-sm table-hover table-borderless mt-1">
                        <thead>
                           <th>
                              Teléfonos
                           </th>
                           <th >
                              ¿ Principal ?
                           </th>

                           <th>
                              ¿ Whatsapp ?
                           </th>

                           <th></th>
                           
                        </thead>

                        <tbody>
                           <tr v-for="(telefono,i) in formulario.telefonos" :key="i" >
                              <td>
                                 <validation-provider name="telefono" rules="required"  #default="{valid,errors}">
                                    <b-form-input v-model="telefono.telefono" :state="valid"  v-mask="'+#############'" />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0]  }}
                                    </b-form-invalid-feedback>

                                 </validation-provider>
                              </td>
                              <td>
                                 <validation-provider name="principal" #default="{valid,errors}" >
                                       <b-form-checkbox v-model="telefono.principal" switch />

                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0]  }}
                                       </b-form-invalid-feedback>
                                 </validation-provider> 
                              
                              </td>

                              <td>
                                 <validation-provider name="is_whatsapp" #default="{valid,errors}" >
                                       <b-form-checkbox v-model="telefono.is_whatsapp" switch />

                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0]  }}
                                       </b-form-invalid-feedback>
                                 </validation-provider> 
                              
                              </td>

                              <td>
                                 <b-button @click="quitarTelefono(i)" size="sm" variant="danger">
                                    <feather-icon icon="TrashIcon"/>
                                 </b-button>
                              </td>

                           </tr>
                        </tbody>
                     </table>
                  </b-col>

                  <b-col cols="12">
                     <b-form-group v-b-tooltip.hover.v-warning
                        title="Si no tienes sitio web del negocio, dejalo en blanco">
                        <template #label>
                           Sitio web del negocio:
                        </template>

                        <validation-provider name="sitio_web" #default="{ errors }">

                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <feather-icon icon="GlobeIcon" />
                              </b-input-group-prepend>
                              <b-form-input type="tel" v-model="formulario.sitio_web"
                                 :state="errors.length ? false : null" placeholder="Sitio web del negocio" />
                           </b-input-group>


                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>

                     </b-form-group>
                  </b-col>

               </b-row>
            </b-container>

         </b-card>

         <b-card>
            <h2>Ubicación del negocio</h2>
            <hr>
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="7">
                     <b-form-group>
                        <template #label>
                           Dirección del negocio: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="direccion" rules="required" #default="{ errors, valid }">
                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <feather-icon icon="MapIcon" />
                              </b-input-group-prepend>

                              <b-form-textarea v-model="formulario.direccion" :state="valid"
                                 placeholder="Dirección del negocio" :rows="4" />

                           </b-input-group>
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
                  <b-col cols="12" md="5">

                     <b-form-group
                        description="Seleccione el Aeropuerto mas cercano a este negocio, esto no es importante">
                        <template #label>
                           Iata | Aeropuerto mas cercano:
                        </template>
                        <validation-provider name="iata_id" #default="{ errors, valid }">
                           <b-input-group>

                              <v-select v-model="formulario.iata_id" :reduce="(option) => option.id" :options="iatas"
                                 label="aeropuerto" class=" w-100">

                                 <template #no-options>
                                    NO Hay Código Iata para esta busqueda
                                 </template>

                                 <template #option="{ aeropuerto, codigo }">
                                    <strong style="margin: 0">{{ aeropuerto }}</strong>
                                    <em>{{ codigo }}</em>
                                 </template>

                                 <template #selected-option="{ aeropuerto, codigo }">
                                    <div style="display: flex; align-items: baseline">
                                       <strong>{{ aeropuerto }}</strong>
                                       <em style="margin-left: 0.5rem">{{ codigo }}</em>
                                    </div>
                                 </template>

                              </v-select>


                           </b-input-group>
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>


                     <b-form-group>
                        <template #label>
                           Código postal del negocio: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="codigo_postal" rules="required" #default="{ errors }">
                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <feather-icon icon="MailIcon" />
                              </b-input-group-prepend>
                              <b-form-input v-model="formulario.codigo_postal" :state="errors.length ? false : null"
                                 placeholder="Código postal del negocio" />

                           </b-input-group>
                           <b-form-invalid-feedback>
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
                           Pais: <span class="text-danger">*</span>
                        </template>

                        <el-select v-model="pais_id" class="w-100" placeholder="Selecciona un pais" filterable clearable
                           @change="cargarEstados">
                           <el-option v-for="(pais, i) in paises" :key="i" :value="pais.id" :label="pais.pais">
                           </el-option>
                        </el-select>

                     </b-form-group>
                  </b-col>
                  <b-col cols="12" md="4">
                     <b-form-group>
                        <template #label>
                           Estado: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="estado_id" rules="required" #default="{ errors }">
                           <el-select v-model="formulario.estado_id" class="w-100" placeholder="Luego un estado"
                              filterable clearable @change="cargarCiudades">
                              <el-option v-for="(estado, i) in estados" :key="i" :value="estado.id"
                                 :label="estado.estado">
                              </el-option>
                           </el-select>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
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

                        <validation-provider name="ciudad_id" #default="{ errors }">
                           <el-select v-model="formulario.ciudad_id" class="w-100" placeholder="Luego una ciudad"
                              filterable clearable>
                              <el-option v-for="(ciudad, i) in ciudades" :key="i" :value="ciudad.id"
                                 :label="ciudad.ciudad">
                              </el-option>
                           </el-select>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>


                     </b-form-group>
                  </b-col>
               </b-row>
               <hr>

               <b-row>
                  <b-col>
                     <div class="form-group">
                        <label for="map-canvas">Posici&oacute;n en el mapa <span class="required">*</span></label>
                        <p class="text-grey">
                        <ul>
                           <li class="text-grey">Arrastra el marcador hacia la ubicaci&oacute;n del hotel.</li>
                           <li class="text-grey">Puedes apoyarte escribiendo una ubicaci&oacute;n como una ciudad,
                              municipio, colonia, etc. y seleccionar una de las opciones sugeridas.</li>
                        </ul>
                        Las coordenadas de la ubicaci&oacute;n se crean automaticamente.
                        </p>
                     </div>


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
                        lat: getLatitud(),
                        lng: getLongitud()
                     }" :zoom="zoom_map" :options="options_map"
                        style="width:100%; height:250px; display: flex; justify-content:center;">
                        <GmapMarker :key="0" :position="{
                           lat: getLatitud(),
                           lng: getLongitud()
                        }" :visible="visibleMarker" :draggable="true" :clickable="true" :icon="iconMarker"
                           @mouseup="moviendomapa" @position_changed="posicionCambiada()">
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


            </b-container>

         </b-card>



         <b-container fluid class="mb-1">
            <b-row>
               <b-col cols="12" md="8">
                  <span>Los campos marcados con <strong class="text-danger">*</strong> son obligatorios</span>
               </b-col>

               <b-col cols="12" md="4" class="d-flex justify-content-end">

                  <b-button-group size="sm" >
                     
                     <b-button size="sm" type="submit" variant="primary" v-loading="loading" :disabled="loading">
                        <feather-icon icon="SaveIcon" />
                        Guardar
                     </b-button>

                     <b-button @click="regresar" varaint="dark">
                        <feather-icon icon="ArrowLeftIcon"/>
                        Regresar
                     </b-button>


                  </b-button-group>

               </b-col>
            </b-row>
         </b-container>

      </b-form>

   </validation-observer>

</template>

<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Editor from '@tinymce/tinymce-vue'

import {
   BForm,
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BFormRadioGroup,
   BButtonGroup,
   BButton,
   VBTooltip,
   BInputGroup,
   BInputGroupAppend,
   BInputGroupPrepend,
   BFormCheckboxGroup,
   BFormTextarea,
   BFormFile,
   BBadge,
   BFormCheckbox
} from 'bootstrap-vue'

import useDireccion from '@core/utils/useDireccion'
import vSelect from 'vue-select'

import { toRefs, ref, onMounted, watch, computed } from 'vue'
import store from '@/store'
import { required, min, max, comision, email } from '@validations'
import { optionsCurrency, getSituacionSolicitud } from '@core/utils/utils'

import { regresar, optionsEditor } from '@core/utils/utils'
export default {

   components: {
      BForm,
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BFormRadioGroup,
      BButtonGroup,
      BButton,
      ValidationProvider,
      ValidationObserver,
      BInputGroup,
      BInputGroupAppend,
      BInputGroupPrepend,
      BFormCheckboxGroup,
      BFormCheckbox,
      BFormTextarea,
      BFormFile,
      BBadge,
      vSelect,
      Editor,
      CurrencyInput: () => import('components/CurrencyInput.vue')
   },

   directives: {
      'b-tooltip': VBTooltip
   },

   setup(_, { emit }) {

      const formValidate = ref(null)
      
      const { negocio: formulario } = toRefs(store.state.negocio);
      const { categorias } = toRefs(store.state.categoriaNegocio)
      
      const url = ref(window.location.origin)
      const buscadormap = ref('');
      const visibleMarker = ref(true);
      const zoom_map = ref(10);
      const markers = ref([]);
      const iconMarker = ref('');
      const input = ref(null)

      const formSolicitud = ref(null)

      const iatas = computed(() => store.state.iata.iatas);

      const divisas = computed(() => store.state.divisa.divisas)
      
      const optionsPlace = computed(() => {
         return {
            content: `<strong>${formulario.value.nombre ? formulario.value.nombre : 'Sin definir'}</strong>`,
         }
      })

      const options_map = ref({
         mapTypeControl: false,
         zoomControl: true,
      })

      const guardar = () => {
         //  guardar

         store.dispatch('negocio/guardar',formulario.value).then(({result}) => {
            
            if(result){
               toast.success('Se ha guadado con éxito')
            }else{
               toast.info('No se ha podido guardar el Negocio')
            }


         })

      }

      const {
         paises,
         ciudades,
         estados,
         cargarEstados,
         cargarCiudades,
         pais_id
      } = useDireccion();

      const cargarForm = () => {

         if (!categorias.value.length) {
            store.dispatch('categoriaNegocio/getCategorias').then((data) => {
               categorias.value = data
            })
         }

         if (!divisas.value.length) {
            store.dispatch('divisa/getDivisas')
         }

         if (!iatas.value.length) {
            store.dispatch('iata/getIatas')
         }

         if (formulario.value.id) {
            pais_id.value = formulario.value.estado.pais_id
            cargarCiudades(formulario.value.estado_id)

         }


      }


      onMounted(() => {

         cargarForm()

         input.value.$mapPromise.then((map) => {
            var myControl = document.getElementById('myAutocomplete');
            myControl.index = 1;
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(myControl);
         });

      })

      watch(formulario, () => cargarForm())
      watch(divisas,() => cargarForm());
      
      const getLatitud = () => {
         return Number(formulario.value.lat)
      }

      const getLongitud = () => {
         return Number(formulario.value.lng);
      }

      const setPlace = (place) => {
         visibleMarker.value = false;
         var address = '';
         if (place.address_components) {
            address = [
               (place.address_components[0] && place.address_components[0].short_name || ''),
               (place.address_components[1] && place.address_components[1].short_name || ''),
               (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
         }

         zoom_map.value = 17

         formulario.value.lat = Number(place.geometry.location.lat());
         formulario.value.lng = Number(place.geometry.location.lng());

         iconMarker.value = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
         };

         visibleMarker.value = true;

         optionsPlace.value.content = '<div><strong>' + place.name + '</strong><br>' + address
      }


      const moviendomapa = (dato) => {
         formulario.value.lat = Number(dato.latLng.lat())
         formulario.value.lng = Number(dato.latLng.lng())
      }

      const posicionCambiada = (dato) => { }

      const agregarEmail = () => {

         formulario.value.emails.push({email:'',principal:false})
      }


      const quitarEmail = (i) => {
         formulario.value.emails.splice(i , 1)
      }


      const agregarTelefono = () => {

         formulario.value.telefonos.push({telefono:'',principal:false,is_whatsapp:false})
      }


      const quitarTelefono = (i) => {
         formulario.value.telefonos.splice(i , 1)
      }

       const validarMonto = () => {
         if (formulario.value.tipo_comision == 2 && isDivisa('MXN')) {

            if (formulario.value.comision < 50) {
               formulario.value.comision = 50;
               toast.info('El monto mínimo permitido para MXN son 50')

            }

         } else {
            formulario.value.comision = formulario.value.comision || 10;
         }


      }

      const isDivisa = (iso) => {

         let divisa = divisas.value.find(val => val.id == formulario.value.divisa_id)

         if (divisa != undefined) {
            return divisa.iso == iso ? true : false
         }
         return false;

      }

      watch(() => formulario.value.divisa_id, () => {
         validarMonto()
      })
      watch(() => formulario.value.tipo_comision, () => {
         validarMonto();
      });


      return {
         formValidate,
         posicionCambiada,
         moviendomapa,
         getLatitud,
         getLongitud,
         setPlace,
         loading: computed(() => store.state.loading),
         paises,
         ciudades,
         estados,
         cargarEstados,
         cargarCiudades,
         pais_id,
         formulario,
         guardar,
         categorias,
         required, min, max,
         optionsCurrency,
         comision,
         url,
         email,
         buscadormap,
         visibleMarker,
         zoom_map,
         markers,
         iconMarker,
         optionsPlace,
         options_map,
         input,
         formSolicitud,
         divisas,
         iatas,
         status: computed(() => getSituacionSolicitud(formulario.value.situacion)),
         regresar,
         validarMonto,
         agregarEmail,
         quitarEmail,
         agregarTelefono,
         quitarTelefono,
         optionsEditor,
         getCurrency:computed(() => {
            
            let divisa = divisas.value.find(val => val.id === formulario.value.divisa_id)
            
            if(divisa != undefined){
               return divisa.iso
            }

            return 'MXN'
         })
      }

   },
}
</script>

<style lang="scss" scoped>
.content-logo {
   border: 3px dotted rgba(44, 23, 23, 0.568);
   height: 150px;
   border-radius: 10px;
   box-shadow: -5px 10px 25px rgb(0 0 0 / 50%);
   cursor: pointer;
   background-repeat: no-repeat !important;
   background-size: contain !important;
   background-position: center center !important;

   &::after {
      content: "Buscar la imagen";
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-weight: bolder;
   }

   &:hover {
      transform: scale3d(1.2, 1.2, 3.5);

      &::after {
         content: "" !important;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100%;
         font-weight: bolder;
      }


   }





}
</style>