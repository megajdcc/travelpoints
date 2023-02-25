<template>
<section>
   <b-tabs vertical pills justified fill small nav-wrapper-class="col-12 col-md-4 col-lg-3 col-xl-2">

      <!-- Informacion del negocio -->
      <b-tab lazy>

         <template #title>
            Información del Negocio
         </template>
         
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(guardar)">
               <b-card class="p-0" body-class="p-0">

                  <b-card-header class="header-negocio-form " v-if="formulario.id" :style="{
                     'background-image':`url('/storage/negocios/fotos/${ imagenPrincipal }')`
                  }" >

                     <section class="d-flex align-items-center w-100 container-fluid">

                        <b-row>
                           <b-col cols="12" md="3">

                              <article class="header-logo-negocio" v-b-tooltip.hover.v-primary="'Clics para actualizar'" title="Clics para actualizar">
                                 <b-img :src="urlLogo" class="cursor-pointer" thumbnail  rounded @click="refLogo.$el.click()" />
                              </article>

                              <b-form-file accept="image/*" plain class="d-none" ref="refLogo" v-model="logotipo"  @input="actualizarLogo"/>
                           
                           </b-col>

                           <b-col cols="12" md="9">
                              <section class="d-flex mb-1">

                                 <b-badge variant="warning" class="text-black" v-if="formulario.categoria">
                                    {{  formulario.categoria.categoria }}
                                 </b-badge>

                                 <b-badge variant="success" class="text-black ml-1" v-if="formulario.id">
                                 <span v-if="formulario.tipo_comision == 1"> {{ formulario.comision }} % </span>
                                    <span v-else> {{ formulario.comision | currency({symbol:formulario.divisa ? formulario.divisa.simbolo : '$' }) }}</span>
                                 </b-badge>

                              </section>
                           
                              <h2 class="text-white display-4">{{ formulario.nombre }}</h2>
                              <p class="text-white font-weight-bolder" v-if="formulario.id">{{ formulario.direccion }} <br> 
                                 {{ formulario.ciudad ? formulario.ciudad.ciudad : '' }} {{ `${formulario.estado.estado} ${formulario.estado.pais.pais}` }}
                              </p>

                              <!-- Buttons actions -->

                              <b-button variant="primary" size="sm" @click="showImagenes" title="Mostrar Imagenes" class="btn-imagenes">
                                 <font-awesome-icon icon="fa-images" />
                                 Imagenes
                              </b-button>
                           
                           </b-col>

                        </b-row>

                     </section>
                  </b-card-header>


               
                  <b-container fluid class="mt-1">
                     <b-row>
                        <b-col cols="12" md="8">

                           <!-- Nombre del Neogcio -->
                           <b-form-group title="Los socios de TravelPoints pueden encontrar su negocio por su nombre."
                              v-b-tooltip.hover.v-primary>
                              <template #label>
                                 Nombre del negocio: <span class="text-danger">*</span>
                                 <feather-icon icon="HelpCircleIcon" class="text-warning" />
                              </template>
                        
                              <validation-provider name="nombre" rules="required" #default="{errors}">
                                 <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null"
                                    placeholder="Nombre del negocio" />
                        
                                 <b-form-invalid-feedback>
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>
                           
                           <!-- Breve del negocio -->
                           <b-form-group title="Describe tu negocio de manera concisa. Máximo 80 carácteres." v-b-tooltip.hover.v-primary>
                              <template #label>
                                 Descripción corta: <span class="text-danger">*</span>
                                 <feather-icon icon="HelpCircleIcon" class="text-warning" />
                              </template>
                        
                              <validation-provider name="descripcion" rules="required|max:80" #default="{errors}">
                                 <b-form-input v-model="formulario.breve" :state="errors.length ? false : null"
                                    placeholder="Ejemplo: Restaurante de mariscos" :rows="4" />
                        
                                 <b-form-invalid-feedback :state="errors.legnth ? false : null">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>

                           <!-- Url en el Sitio -->
                           <b-form-group title="Este será el enlace directo al perfil de tú negocio." v-b-tooltip.hover.v-primary>

                              <template #label>
                                 Enlace que desea del perfil de negocio: <span class="text-danger">*</span>
                                 <feather-icon icon="HelpCircleIcon" class="text-warning" />
                              </template>
                           
                              <validation-provider name="url" rules="required" #default="{errors,valid}">
                           
                                 <b-input-group>
                                    <b-input-group-prepend is-text>
                                       {{ url }}/
                                    </b-input-group-prepend>
                           
                                    <b-form-input v-model="formulario.url" :state="errors.length ? false : null" placeholder="nombre-de-negocio" />
                           
                                 </b-input-group>
                           
                                 <b-form-invalid-feedback :state="valid">
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
                        
                              <validation-provider name="categoria_id" rules="required" #default="{errors,valid}">
                                 <v-select v-model="formulario.categoria_id" class="w-100" placeholder="Seleccionar categoría" 
                                    clearable :options="categorias" :reduce="(option) => option.id" label="categoria" />
                                 
                        
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>
                           </b-form-group>
                        
                           <b-form-group v-b-tooltip.hover.v-primary title="Elija entre pagar una comisión o un monto fijo por persona">
                              <template #label>
                                 Tipo de pago: <span class="text-danger">*</span>
                                 <feather-icon icon="HelpCircleIcon" class="text-warning" />
                              </template>
                        
                              <validation-provider name="tipo_comision" rules="required" #default="{errors}">
                        
                                 <b-form-radio-group v-model="formulario.tipo_comision"
                                    :options="[{text:'Comisión',value:1},{text:'Monto Fíjo',value:2}]" button-variant="outline-primary" buttons
                                    size="md" :state="errors.length ? false : null" class="w-100" @change="formulario.comision = 10">
                        
                                 </b-form-radio-group>
                        
                                 <b-form-invalid-feedback :state="errors.length ? false : null">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                        
                              </validation-provider>
                        
                           </b-form-group>
                        
                           <b-form-group v-b-tooltip.hover.v-primary
                              title="Se te cobrará este porcentaje por cada venta que registres en nuestro sistema. Una mayor comisión significa un mejor posicionamiento."
                              v-if="formulario.tipo_comision == 1">
                              <template #label>
                                 Comisión: <span class="text-danger">*</span>
                                 <feather-icon icon="HelpCircleIcon" class="text-warning" />
                              </template>
                        
                              <validation-provider name="comision" rules="required|comision:10,100" #default="{errors}">
                        
                                 <b-form-input type="number" :max="100" :min="6" v-model="formulario.comision"
                                    :state="errors.length ? false : null" />
                                 <b-form-invalid-feedback :state="errors.length ? false : null">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                        
                              </validation-provider>
                        
                           </b-form-group>
                        
                           <b-form-group v-b-tooltip.hover.v-primary
                              title="Se te cobrará este monto por cada venta que registres en el sistema a cada persona" v-else>
                              <template #label>
                                 Monto: <span class="text-danger">*</span>
                                 <feather-icon icon="HelpCircleIcon" class="text-warning" />
                              </template>
                        
                              <validation-provider name="comision" rules="required" #default="{errors}">
                        
                        
                                 <currency-input :value="formulario.comision" @input="formulario.comision = $event" :options="optionsCurrency"
                                    class="form-control" />
                        
                                 <b-form-invalid-feedback :state="errors.length ? false : null">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                        
                              </validation-provider>
                        
                           </b-form-group>
                        
                           <b-form-group>
                              <template #label>
                                 Divisa: <span class="text-danger">*</span>
                        
                                 <validation-provider name="divisa_id" rules="required" #default="{valid,errors}">
                                    <v-select v-model="formulario.divisa_id" :reduce="(option) => option.id" :options="divisas.filter(val => !val.principal)" label="nombre"
                                       class="w-100" />
                        
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                 </validation-provider>
                              </template>
                           </b-form-group>
                        
                        
                        
                        </b-col>

                     </b-row>

                     <b-row>
                        <b-col>
                           <!-- Descripcion del negocio -->
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
                     </b-row>
                  
                  
                  </b-container>

                  <template #footer>
                  
                     <b-button-group size="sm">
                        <b-button type="submit" variant="primary" title="Guardar" v-loading="loading">
                  
                           <feather-icon icon="SaveIcon" />
                           Guardar
                  
                        </b-button>
                  
                        <b-button variant="dark" title="Regresar" @click="regresar">
                  
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
                  
                        </b-button>
                  
                     </b-button-group>
                  </template>
               </b-card>
            </b-form>
         </validation-observer>
      
      </b-tab>

      <!-- INformacion de direccion del negocio -->
      <b-tab>
         <template #title>
            Dirección
         </template>
         
           <validation-observer ref="formValidate" #default="{handleSubmit}">
               <b-form @submit.prevent="handleSubmit(guardar)">
                  <b-card>
                  
                     <b-container fluid>

                     <b-row>

                        <b-col cols="12" md="7">
                           <b-form-group>
                              <template #label>
                                 Dirección del negocio: <span class="text-danger">*</span>
                              </template>
                              <validation-provider name="direccion" rules="required" #default="{errors}">
                                 <b-input-group>
                                    <b-input-group-prepend is-text>
                                       <feather-icon icon="MapIcon" />
                                    </b-input-group-prepend>
                                    <b-form-input v-model="formulario.direccion" :state="errors.length ? false : null"
                                       placeholder="Dirección del negocio" />

                                 </b-input-group>
                                 <b-form-invalid-feedback>
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>
                        </b-col>

                        <b-col cols="12" md="5">

                           <b-form-group>

                              <template #label>
                                 IATA | Aeropuerto:
                              </template>
                              
                              <validation-provider name="iata_id" rules="required" #default="{errors,valid}">
                                 <b-input-group>
                                    <v-select v-model="formulario.iata_id" :reduce="(option) => option.id" :options="iatas" label="aeropuerto" clas="w-100" style="min-width:100%">

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
                              
                              <validation-provider name="codigo_postal" rules="required" #default="{errors}">
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
                           <b-col md="4">
                              <b-form-group>
                                 
                                 <template #label>
                                    Pais: <span class="text-danger">*</span>
                                 </template>

                                 <validation-provider name="pais_id" rules="required" #default="{valid,errors}">
                                    <v-select v-model="pais_id" :options="paises" :reduce="(option) => option.id" label="pais" @input="cargarEstados" /> 

                                    <b-form-invalid-feedback :state="valid" >
                                       {{  errors[0]  }}
                                    </b-form-invalid-feedback>
                                 </validation-provider>

                              </b-form-group>
                              
                           </b-col>
                           <b-col md="4">
                              <b-form-group>
                                 
                                 <template #label>
                                    Estado: <span class="text-danger">*</span>
                                 </template>
                              
                                 <validation-provider name="estado_id" rules="required" #default="{valid,errors}">
                                    <v-select v-model="formulario.estado_id" :options="estados" :reduce="(option) => option.id" label="estado"  @input="cargarCiudades" />
                              
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                 </validation-provider>
                                 
                              </b-form-group>
                           </b-col>
                           
                           <b-col md="4">
                              
                              <b-form-group>
                              
                                 <template #label>
                                    Ciudad: <span class="text-danger">*</span>
                                 </template>
                              
                                 <validation-provider name="ciudad_id" #default="{valid,errors}">
                                    
                                    <v-select v-model="formulario.ciudad_id" :options="ciudades" :reduce="(option) => option.id" label="ciudad" />
                              
                                    <b-form-invalid-feedback :state="valid">
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
                              <div class="input-group col-md-6 mt-2" id="myAutocomplete">
                                 <div class="input-group-prepend">
                                    <div class="input-group-text bg-secondary">
                                       <span class="fas fa-search text-white" aria-hidden="true"></span>
                                    </div>
                                 </div>
                     
                                 <gmap-autocomplete class="form-control py-1 " style="z-index:8000 !important" @place_changed="setPlace($event,formulario)">
                     
                                 </gmap-autocomplete>
                     
                              </div>
                           </div>
                     
                           <GmapMap ref="input" :center="{
                              lat:getLatitud(formulario.lat),
                              lng:getLongitud(formulario.lng)
                           }" :zoom="zoom_map" :options="options_map"
                              style="width:100%; height:250px; display: flex; justify-content:center;">
                              <GmapMarker :key="0" :position="{
                                 lat:getLatitud(formulario.lat),
                                 lng:getLongitud(formulario.lng)
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


                     </b-container>
                  
                     <template #footer>
                  
                        <b-button-group size="sm">
                           <b-button type="submit" variant="primary" title="Guardar" v-loading="loading">
                  
                              <feather-icon icon="SaveIcon" />
                              Guardar
                  
                           </b-button>
                  
                           <b-button variant="dark" title="Regresar" @click="regresar">
                  
                              <feather-icon icon="ArrowLeftIcon" />
                              Regresar
                  
                           </b-button>
                  
                        </b-button-group>
                     </template>
                  </b-card>
               </b-form>
         </validation-observer>
      </b-tab>

      <!-- Horarios -->
      <b-tab>
         <template #title>
            Horarios
         </template>
      
         <form-horario :actions="actionsHorario" :horarios="formulario.horarios" />
      
      </b-tab>
      <!-- telefonos -->
      <b-tab>
         <template #title>
            Teléfonos
         </template>
      
         <form-telefono :telefonos="formulario.telefonos" :actions="actionsTelefono" />
      
      </b-tab>

      <!-- Encargado General -->
      <b-tab>
         <template #title>
            Gerente General
         </template>

         <b-card>
            <validation-observer #default="{handleSubmit}" ref="formValidate">
               <b-form @submit.prevent="handleSubmit(guardar)">
                  <b-container>
                     <b-row>
                        <b-col cols="12">
                           <b-form-group>
                              <template #label>
                                 Gerente: <span class="text-danger">*</span>
                              </template>
            
                              <validation-provider name="usuario_id" rules="required" #default="{valid,errors}">
            
                                 <v-select v-model="formulario.usuario_id" :filterBy="filtrarUsuarios" :options="usuarios"
                                    :reduce="(option) => option.id">
            
                                    <template #no-options>
                                       No se encontró ningún usuario
                                    </template>
            
                                    <template #option="{nombre,apellido,email,imagen}">

                                       <section class="d-flex align-items-center">

                                          <b-img thumbnail rounded="circle" :src="`/storage/img-perfil/${imagen}`"
                                             style="height:50px; width:auto" class="mr-1" />
                                          <strong style="margin: 0">{{ `${nombre} ${apellido} - ${email}` }}</strong>
                                          
                                       </section>
            
                                    </template>
            
                                    <template #selected-option="{nombre,apellido,email,imagen}">
                                       <section class="d-flex align-items-center">
                                          <b-img thumbnail rounded="circle" :src="`/storage/img-perfil/${imagen}`"
                                             style="height:50px; width:auto" class="mr-1" />
                                          <strong style="margin: 0">{{ `${nombre} ${apellido} - ${email}` }}</strong>
                                       </section>
            
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
                           <b-button-group size="sm">
                              <b-button variant="primary" type="submit" v-loading="loading">
                                 <feather-icon icon="SaveIcon" />
                                 Guardar
                              </b-button>
                           </b-button-group>
                        </b-col>
                     </b-row>
                  </b-container>
               </b-form>
            </validation-observer>
         </b-card>
       
      </b-tab>
      

      
   </b-tabs>
   <b-modal v-model="isShowImagenes" size="xl" title="Imagenes del Negocio" centered hide-footer>
      <form-imagen path-imagenes="/storage/negocios/fotos/" :imagenes="formulario.imagenes" :actions="actionsImagenes" />
   </b-modal>
      
</section>

</template>


<script>
import Editor from '@tinymce/tinymce-vue'

import {
   BCard,
   BTabs,
   BTab,
   BContainer,
   BImg,
   BForm,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BRow,
   BCol,
   BSpinner,
   VBTooltip,
   BButtonGroup,
   BButton,
   BCardHeader,
   BBadge,
   BFormFile,
   BFormRadioGroup,
   BFormTextarea,
   BInputGroupPrepend,
   BInputGroup,
   BModal

} from 'bootstrap-vue'

import { ValidationObserver , ValidationProvider} from 'vee-validate'

import { required, min, max, comision, email } from '@validations'
import vSelect from 'vue-select'
import store from '@/store'

import {regresar} from '@core/utils/utils'
import {computed,onMounted,watch,toRefs,ref} from '@vue/composition-api'

import useDireccion from '@core/utils/useDireccion'
import { optionsEditor } from '@core/utils/utils';

export default {
   
   components:{
      BCard,
      BTabs,
      BTab,
      BContainer,
      BImg,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BRow,
      BCol,
      ValidationObserver,
      ValidationProvider,
      VBTooltip,
      BButtonGroup,
      BButton,
      BCardHeader,
      BBadge,
      BFormFile,
      BSpinner,
      BFormRadioGroup,
      vSelect,
      BFormTextarea,
      BInputGroupPrepend,
      BInputGroup,
      BModal,
      CurrencyInput:() => import('components/CurrencyInput.vue'),
      FormImagen: () => import('components/FormImagen.vue'),
      FormHorario: () => import('components/FormHorario.vue'),
      FormTelefono:() => import('components/FormTelefono.vue'),
      Editor

   },

   directives:{
      'b-tooltip': VBTooltip,
   },


   setup(props,{emit}){

      const formValidate = ref(null)
      const refLogo = ref(null)
      const logotipo = ref(null)
      const {negocio:formulario} = toRefs(store.state.negocio)
      const {divisas} = toRefs(store.state.divisa)
      const { categorias } = toRefs(store.state.categoriaNegocio)
      const urlLogo = ref(null)
      const isShowImagenes = ref(false)
      const {usuarios} = toRefs(store.state.usuario)

      const {
         paises,
         ciudades,
         estados,
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
      } = useDireccion();


      const cargarForm = () => {

         if(formulario.value.id){
            urlLogo.value = `/storage/negocios/logos/${formulario.value.logo}`
            formulario.value.logo = null
            pais_id.value = formulario.value.estado.pais_id;
            cargarCiudades(formulario.value.estado_id)
         }

         if(!categorias.value.length) {
            store.dispatch('categoriaNegocio/getCategorias').then((data) => {
               categorias.value = data
            })
         }

         if(!divisas.value.length){
            store.dispatch('divisa/getDivisas')
         }

         if(!iatas.value.length){
           cargarIatas()
         }

         if(!usuarios.value.length){
            store.dispatch('usuario/cargarUsuarios')
         }


         optionsPlace.value = {
            content:`<strong>${formulario.value.nombre}</strong>`,
         }
      
      } 

      onMounted(() => {
         cargarForm()
         cargarBuscador()
         
      })

      watch(formulario,() => cargarForm())

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

      const actionsTelefono = () => {

         const quitarTelefono = (telefono_id) => {
               
               store.dispatch('negocio/quitarTelefono',telefono_id).then(({result}) => {
                  if (result) {

                     toast.success('Se ha quitado con éxito el número de teléfono...', { position: 'bottom-right' })

                  } else {

                     toast.info('No see pudo quitar, inténtelo de nuevo', { position: 'bottom-right' })

                  }
               })

         }

         const guardar = (form,formVali,next) => {

            store.dispatch('negocio/addTelefono',form).then(({result}) => {

               if(result){
               
                  toast.success('Se ha asociado con éxito el número de teléfono...',{position:'bottom-right'})
               
               }else{

                  toast.info('No see pudo asociar, inténtelo de nuevo',{position:'bottom-right'})
               
               }

            }).catch(e => {

               console.log(e)

               if(e.response.status === 422){
                  formVali.setErrors(e.response.data.errors)
               }


            }).then(() => next())


         }  

         return {
            quitarTelefono,
            guardar
         }


      }


      const actionsHorario = () => {

         const aperturarHorario = () => {

            store.dispatch('negocio/aperturarHorario',formulario.value.id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha aperturado el Horario correctamente', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo aperturar el horario, inténte de nuevo')
               }

            });
         }

         const guardarHorario = (horario) => {

               // if (horario.apertura && horario.cierre) {
                  store.dispatch('negocio/guardarHorario', horario).then(({ result }) => {

                     if (result) {
                        toast.success('Se ha actualizado el horario', { position: 'bottom-right' })
                     } else {
                        toast.info('No se ha actualizado el horario, inténte de nuevo', { position: 'bottom-right' })
                     }

                  })
               // }
         }

         const quitarHorario = () => {

            store.dispatch('negocio/quitarHorario', formulario.value.id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha quitado con éxito el horario', { position: 'bottom-right' })
               } else {

                  toast.info('No se ha quitado el horario, inténte de nuevo', { position: 'bottom-right' })
               }

            })

         }
         
         return {
            aperturarHorario,
            guardarHorario,
            quitarHorario
         }

      }

      const actualizarLogo = (file) => {

         if(file){

            store.dispatch('negocio/actualizarLogo', { logo: file }).then(({ result }) => {
               if (result) {
                  toast.success('Se ha actualizado con éxito el Logo', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo cargar el Logo,inténte de nuevo', { position: 'bottom-right' })

               }
            }).catch(e => console.log(e))
               .then(() => logotipo.value = null)

         }
       

      }

      const showImagenes = () => {
         isShowImagenes.value = true
      }

      const actionsImagenes = () => {

         const eliminar = (imagen_id) => {

            store.dispatch('negocio/eliminarImagen',imagen_id).then(({ result }) => {
               
               if(result){
                  toast.success('Se ha eliminado con éxito la imagen')
               }else{
                  toast.error('No se pudo eliminar la Imagen')
               }

            }).catch(e => console.log(e))


         }

         const fotoSeleccionada = (files) => {
           

            store.dispatch('negocio/addImagenes',{'imagenes' : files,negocio_id:formulario.value.id}).then(({result}) => {

               if(result){
                  toast.success(`Imagenes cargada con éxito`)
               }else{
                  toast.error('No se pudo cargar las Imagenes...')
               }

            }).catch( e => console.log(e))

         }

         const checkPrincipal = (valor,imagen_id) => {

            store.dispatch('negocio/togglePortada',{imagen:imagen_id,portada:valor,negocio:formulario.value.id}).then(({result}) => {
               
               if(result){

                  toast.success('Se ha actualizado con éxito',{ position:'bottom-right'})
               
               }else{
               
                  toast.info('No se pudo actualizar, inténte de nuevo...',{ position:'bottom-right'})
               
               }


            }).catch(e => console.log(e))

         }

         return {
            eliminar,
            checkPrincipal,
            fotoSeleccionada
         }
      }

      return {
         loading:computed(() => store.state.loading),
         regresar,
         required,
         formulario,
         formValidate,
         guardar,
         refLogo,
         actualizarLogo,
         logotipo,
         divisas,
         urlLogo,
         categorias,
         
         paises,
         ciudades,
         estados,
         cargarEstados,
         cargarCiudades,
         pais_id,
         isShowImagenes,

         url:window.location.origin,

         optionsCurrency:computed(() => ({
            currency:divisas.value.length && formulario.value.divisa_id ? divisas.value.find(val => val.id === formulario.value.divisa_id).iso : 'USD',
            locale: 'es-ES',
            autoDecimalDigits:true,
         })),


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

         min,
         max,
         comision,
         email,
         iatas,
         showImagenes,
         actionsHorario,
         actionsImagenes,
         actionsTelefono,
         usuarios,
         optionsEditor,
         filtrarUsuarios:({nombre,email},search) => {
            
            return (nombre || email || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
         },

         imagenPrincipal:computed(() => {

            if(formulario.value.imagenes.find(val => val.portada)){
               return formulario.value.imagenes.find(val => val.portada).imagen
            }else{
               return '';
            }

         })
         // cargarSearch:() => {
         //    setTimeout(() => {
         //       cargarBuscador()
         //    }, 500);
         // }


      }

   }

}
</script>

<style lang="scss" scoped>
.header-logo-negocio{
   width: 100%;
   height: 80% !important;
   transition: 3s ease ;
   position:relative;

   padding: 1rem;
   border:2px dotted; 
   border-radius: 10px;
   img{
      width: 100%;
      height:auto;
      position:relative;
   }
   // &:hover{
   //    &::before {
   //          content: 'Clics para actualizar';
   //          cursor: pointer;
   //          position:absolute;
   //          width:100%;
   //          display: flex;
   //          justify-content: center;
   //       }
   // }
   

}

.header-negocio-form{
      width: 100%;
      // height: 150px;
      position:relative;   
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
   
      &::before{
         content:'';
         width:100%;
         position:absolute;
         height:100%;
         left:0;
         background-color: rgba(0,0,0,0.4);
         // z-index: 1;
      }

      section{
         z-index: 2;
      }

      p{
         font-size: 14pt;
      }

      .btn-imagenes{

         position:absolute;
         left:auto;
         right:.5rem !important;
         top:.5rem !important;
      
      }

}

</style>