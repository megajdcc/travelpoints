<template>

  <b-container fluid="md">

    <b-row class="mt-3">
      <b-col cols="12">
          <b-card no-body header-class="d-flex align-items-center justify-content-start">
            <template #header>
              <h3 class="my-0">Invitación enviada por:</h3>
               <b-button variant="outline-danger" id="perfil-invitador" class="py-0 d-flex align-items-center b-bottom">
                    <h3 class="my-0 py-0"> {{ aboutDataInvitador.nombre }} </h3>
                </b-button>
              <h3 class="my-0 ml-auto">Fecha Invitación: {{ invitacion.created_at | fecha('DD/MM/YYYY hh:mm A') }}</h3>
                <b-popover target="perfil-invitador" triggers="focus" custom-class="">
                      <profile-about :about-data="aboutDataInvitador" />
                </b-popover>
            </template>
          </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <validation-observer ref="formValidate" #default="{ handleSubmit }">
         
          <b-form @submit.prevent="handleSubmit(guardar)" class="mb-3" >
            <b-card >
                <b-container fluid="md">

                  <b-row>
                    <b-col>
                      <h2>Información del usuario encargado del negocio en TravelPoints</h2>
                        <hr>
                    </b-col>
                  </b-row>
                  

                  <b-row>
                    <b-col cols="12">
                       <b-container fluid>
                        <b-row>
                          <b-col cols="12" md="6">
                            <b-form-group >
                              <template #label>
                                Nombre: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="usuario.nombre" rules="required" #default="{errors,valid}">
                                <b-form-input v-model="formulario.usuario.nombre" :state="valid" autocomplete />
                                  <b-form-invalid-feedback :state="valid">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                              </validation-provider>
                            </b-form-group>

                             <b-form-group >
                              <template #label>
                                Apellido: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="usuario.apellido" rules="required" #default="{errors,valid}">
                                <b-form-input v-model="formulario.usuario.apellido" :state="valid" autocomplete />
                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                            </b-form-group>


                            <b-form-group >
                                <template #label>
                                  Username: <span class="text-danger">*</span>
                                </template>

                                <validation-provider name="usuario.username" rules="required" #default="{errors,valid}">
                                  <b-form-input v-model="formulario.usuario.username" :state="valid"  autocomplete />
                                  <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>
                              </b-form-group>

                          </b-col>

                          <b-col cols="12" md="6">
                             <b-form-group >
                                <template #label>
                                  Email: <span class="text-danger">*</span>
                                </template>

                                <validation-provider name="usuario.email" rules="required|email" #default="{errors, valid}">
                                  <b-form-input v-model="formulario.usuario.email" :state="valid" type="email" autocomplete />
                                  <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>
                              </b-form-group>

                              <b-form-group label-for="password" >
                                
                                <template #label>
                                  Contraseña: <span class="text-danger">*</span>
                                </template>

                                <validation-provider #default="{ errors,valid }" name="Password" vid="usuario.password" rules="required">
                                    <b-input-group class="input-group-merge" >
                                      <b-form-input
                                        id="password"
                                        v-model="formulario.usuario.password"
                                        class="form-control-merge"
                                        :type="passwordFieldType"
                                        :state="valid"
                                        name="register-password"
                                        placeholder="············"
                                      />
                                      <b-input-group-append is-text>
                                        <feather-icon
                                          :icon="passwordToggleIcon"
                                          class="cursor-pointer"
                                          @click="togglePasswordVisibility"
                                        />
                                      </b-input-group-append>
                                    </b-input-group>
                                   <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                  </validation-provider>
                                </b-form-group>

                                 <b-form-group label-for="r_password" >
                                
                                  <template #label>
                                    Repetir contraseña: <span class="text-danger">*</span>
                                  </template>

                                  <validation-provider #default="{ errors, valid }" name="R_Password" vid="usuario.r_password" rules="required">
                                      <b-input-group class="input-group-merge" >
                                        <b-form-input
                                          id="r_password"
                                          v-model="formulario.usuario.r_password"
                                          class="form-control-merge"
                                          :type="passwordFieldType"
                                          :state="valid"
                                          name="retype-password"
                                          placeholder="············"
                                        />
                                        <b-input-group-append is-text>
                                          <feather-icon
                                            :icon="passwordToggleIcon"
                                            class="cursor-pointer"
                                            @click="togglePasswordVisibility"
                                          />
                                        </b-input-group-append>
                                      </b-input-group>
                                     <b-form-invalid-feedback :state="valid">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                    </validation-provider>
                                  </b-form-group>


                          </b-col>
                        </b-row>
                       </b-container>
                    </b-col>
                  </b-row>


                    <b-row>
                      <b-col cols="12">
                          <h2>Información del Negocio</h2>
                          <hr>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12" md="8">
                  
                          <b-form-group title="Los socios de TravelPoints pueden encontrar su negocio por su nombre."
                            v-b-tooltip.hover.v-warning>
                            <template #label>
                                Nombre del negocio: <span class="text-danger">*</span>
                                <feather-icon icon="HelpCircleIcon" class="text-warning" />
                            </template>

                            <validation-provider name="nombre" rules="required" #default="{ errors, valid }">
                                <b-form-input v-model="formulario.nombre" :state="valid" autocomplete
                                  placeholder="Nombre del negocio" />

                                <b-form-invalid-feedback :state="valid">
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

                            <validation-provider name="descripcion" rules="required|max:80" #default="{ errors, valid }">
                                <b-form-input v-model="formulario.breve" :state="valid" autocomplete
                                  placeholder="Ejemplo: Restaurante de mariscos" :rows="4" />

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

                            <validation-provider name="categoria_id" rules="required" #default="{ errors, valid }">
                                <el-select v-model="formulario.categoria_id" class="w-100" placeholder="Seleccionar categoría"
                                  filterable clearable>
                                  <el-option v-for="(categoria, i) in categorias" :key="i" :value="categoria.id"
                                      :label="categoria.categoria"></el-option>
                                </el-select>

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                            </validation-provider>
                          </b-form-group>

                          <b-form-group>
                              <template #label>
                                Divisa: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="divisa_id" rules="required" #default="{ valid, errors }">

                                <v-select v-model="formulario.divisa_id" :reduce="(option) => option.id"
                                    :options="divisas.filter(val => val.iso != 'Tp')" label="nombre" class="w-100" />

                                <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                          
                          </b-form-group>


                          <b-form-group v-b-tooltip.hover.v-warning
                            title="Elija entre pagar una comisión o una cantidad fija por persona">
                            <template #label>
                                Tipo de pago: <span class="text-danger">*</span>
                                <feather-icon icon="HelpCircleIcon" class="text-warning" />
                            </template>

                            <validation-provider name="tipo_comision" rules="required" #default="{ errors, valid }">

                                <b-form-radio-group v-model="formulario.tipo_comision" 
                                  :options="[{ text: 'Comisión', value: 1 }, { text: 'Monto Fíjo', value: 2 }]"
                                  button-variant="outline-primary" buttons size="md" :state="valid"
                                  class="w-100" @change="validarMonto">

                                </b-form-radio-group>

                                <b-form-invalid-feedback :state="valid">
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

                            <validation-provider name="comision" rules="required|comision:10,100" #default="{ errors, valid }">

                                <b-form-input type="number" :max="100" :min="6" v-model="formulario.comision"
                                  :state="valid" />

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>

                            </validation-provider>

                          </b-form-group>

                          <b-form-group v-b-tooltip.hover.v-warning
                            title="Se te cobrará este monto por cada venta que registres en el sistema a cada persona" v-else>

                            <template #label>
                                Monto: <span class="text-danger">*</span>
                                <feather-icon icon="HelpCircleIcon" class="text-warning" />
                            </template>

                            <validation-provider name="comision" rules="required" #default="{ errors, valid }">
                                <currency-input :value="formulario.comision" @input="formulario.comision = $event"
                                  :options="{ ...optionsCurrency, ...{ currency: getCurrency } }" class="form-control" @blur="validarMonto" />
                                <b-form-invalid-feedback :state="valid">
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
                            v-b-tooltip.hover.v-warning>
                            <template #label>
                                Descripción del negocio: <span class="text-danger">*</span>
                                <feather-icon icon="HelpCircleIcon" class="text-warning" />
                            </template>

                            <validation-provider name="descripcion" rules="required" #default="{ errors }">
                                <b-form-textarea v-model="formulario.descripcion" autocomplete  :state="errors.length ? false : null" :row="3"
                                  placeholder="Descripción del negocio" />
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
                                      {{ url }}/negocio/
                                  </b-input-group-prepend>

                                  <b-form-input v-model="formulario.url" :state="errors.length ? false : null" autocomplete
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
                <b-container fluid="md">
                  <b-row>
                    <b-col cols="12">
                      <h2>Información de contacto del negocio</h2>
                      <hr>
                    </b-col>
                  </b-row>
                    <b-row>
                      <b-col cols="12" md="6">
                          <b-form-group>

                            <template #label>
                                Correo electrónco del negocio: <span class="text-danger">*</span>
                            </template>

                            <validation-provider name="email" rules="required|email" #default="{ errors, valid }">
                                <b-input-group>

                                  <b-input-group-prepend is-text>
                                      <feather-icon icon="AtSignIcon" />
                                  </b-input-group-prepend>
                                  <b-form-input type="email" v-model="formulario.email" :state="valid" autocomplete
                                      placeholder="Correo electrónico del negocio" />

                                </b-input-group>
                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                            </validation-provider>

                          </b-form-group>
                      </b-col>

                      <b-col cols="12" md="6">
                          <b-form-group>
                            <template #label>
                                Número telefónico del negocio: <span class="text-danger">*</span>
                            </template>

                            <validation-provider name="telefono" rules="required" #default="{ errors, valid }">

                                <b-input-group>
                                  <b-input-group-prepend is-text>
                                      <feather-icon icon="PhoneIcon" />
                                  </b-input-group-prepend>
                                  <b-form-input type="tel" v-model="formulario.telefono" :state="valid" autocomplete
                                      placeholder="Número telefónico" v-mask="'+#############'" />
                                </b-input-group>


                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                            </validation-provider>

                          </b-form-group>
                      </b-col>

                      <b-col cols="12">
                          <b-form-group v-b-tooltip.hover.v-warning
                            title="Si no tienes sitio web del negocio, dejalo en blanco">
                            <template #label>
                                Sitio web del negocio:
                            </template>

                            <validation-provider name="sitio_web" #default="{ errors, valid }">

                                <b-input-group>
                                  <b-input-group-prepend is-text>
                                      <feather-icon icon="GlobeIcon" />
                                  </b-input-group-prepend>
                                  <b-form-input type="tel" v-model="formulario.sitio_web" :state="valid" autocomplete
                                      placeholder="Sitio web del negocio" />
                                </b-input-group>

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>

                            </validation-provider>

                          </b-form-group>
                      </b-col>

                    </b-row>
                </b-container>

                <b-container fluid="md">
                    <b-row>
                      <b-col cols="12">
                        <h2>Ubicación del negocio</h2>
                        <hr>
                      </b-col>
                    </b-row>
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

                                  <b-form-textarea v-model="formulario.direccion" :state="valid" autocomplete
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
                            <validation-provider name="iata_id" rules="required" #default="{ errors, valid }">
                                <b-input-group>

                                  <v-select v-model="formulario.iata_id" :reduce="(option) => option.id" :options="iatas" autocomplete
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
                            <validation-provider name="codigo_postal" rules="required" #default="{ errors, valid }">
                                <b-input-group>
                                  <b-input-group-prepend is-text>
                                      <feather-icon icon="MailIcon" />
                                  </b-input-group-prepend>
                                  <b-form-input v-model="formulario.codigo_postal" :state="valid" autocomplete
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

                            <el-select v-model="pais_id" class="w-100" placeholder="Selecciona un pais" filterable clearable autocomplete
                                @change="cargarEstados">
                                <el-option v-for="(pais, i) in paises" :key="i" :value="pais.id" :label="pais.pais">
                                </el-option>
                            </el-select>

                          </b-form-group>
                      </b-col>
                      <b-col cols="12" md="4">
                          <b-form-group>
                            <template #label>
                                Provincia/Estado: <span class="text-danger">*</span>
                            </template>

                            <validation-provider name="estado_id" rules="required" #default="{ errors }">
                                <el-select v-model="formulario.estado_id" class="w-100" placeholder="Luego un estado" filterable autocomplete
                                  clearable @change="cargarCiudades">
                                  <el-option v-for="(estado, i) in estados" :key="i" :value="estado.id" :label="estado.estado">
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
                                Ciudad/Municipio:
                            </template>

                            <validation-provider name="ciudad_id" #default="{ errors }">
                                <el-select v-model="formulario.ciudad_id" class="w-100" placeholder="Luego una ciudad" autocomplete
                                  filterable clearable>
                                  <el-option v-for="(ciudad, i) in ciudades" :key="i" :value="ciudad.id" :label="ciudad.ciudad">
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
                                <li class="text-grey">Arrastra el marcador hacia la ubicaci&oacute;n del negocio.</li>
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
                            lat: getLatitud(formulario.lat),
                            lng: getLongitud(formulario.lng)
                          }" :zoom="zoom_map" :options="options_map"
                            style="width:100%; height:250px; display: flex; justify-content:center;">
                            <GmapMarker :key="0" :position="{
                              lat: getLatitud(formulario.lat),
                              lng: getLongitud(formulario.lng)
                            }" :visible="visibleMarker" :draggable="true" :clickable="true" :icon="iconMarker"
                                @mouseup="moviendomapa($event,formulario)">
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

                <b-container fluid="md">
                  <b-row>
                      <b-col cols="12">
                        <h2>Imágenes del negocio</h2>
                        <hr>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="12" md="6">
                          <b-form-group
                            title="Este logo aparecerá en el perfil de negocio, se recomienda una imagen cuadrada de mínimo 300x300 px y un peso inferior a 2mb. La imagen debe estar en formato jpg o png"
                            v-b-tooltip.hover.v-warning description="Presiona encima del recuadro para buscar una imagen.">
                            <template #label>
                                Adjunta el logo de tu negocio: <span class="text-danger">*</span>
                                <feather-icon icon="HelpCircleIcon" class="text-warning" />
                            </template>

                            <section class="content-logo" @click="() => refLogo.$refs.input.click()"
                                :style="`background:url(${urlLogo})`">

                            </section>

                            <validation-provider name="logo" rules="required" #default="{ errors }">
                                <b-form-file v-model="formulario.logo" ref="refLogo" plain accept="image/*" class="d-none"
                                  @input="logoSeleccionado" :state="errors.length ? false : null" />

                                <b-form-invalid-feedback :state="errors.length ? false : null">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>

                            </validation-provider>



                          </b-form-group>

                          <small class="text-justify">
                            Este logo aparecerá en el perfil de negocio, se recomienda una imagen cuadrada de mínimo 300x300 px
                            y un peso inferior a 2mb. La imagen debe estar en formato jpg o png
                          </small>
                      </b-col>
                      <b-col cols="12" md="6">

                          <b-form-group
                            title="Esta será la imagen de portada de tu negocio. Se recomienda una imagen horizontal panoramica y un peso inferior a 2mb, la imagen debe estar en formato jpg o png."
                            v-b-tooltip.hover.v-warning description="Presiona encima del recuadro para buscar una imagen.">
                            <template #label>
                                Adjunta una fotografía de tu negocio: <span class="text-danger">*</span>
                                <feather-icon icon="HelpCircleIcon" class="text-warning" />
                            </template>


                            <section class="content-logo" @click="refFoto.$refs.input.click()"
                                :style="`background:url(${urlFoto})`">
                            </section>

                            <validation-provider name="foto"  rules="required" #default="{ errors, valid }">

                                <b-form-file v-model="formulario.foto" ref="refFoto" plain accept="image/*" class="d-none"
                                  @input="fotoSeleccionada" :state="errors.length ? false : null" />

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>

                            </validation-provider>

                          </b-form-group>

                          <small class="text-justify">
                            Esta será la imagen de portada de tu negocio. Se recomienda una imagen horizontal panoramica y un
                            peso inferior a 2mb, la imagen debe estar en formato jpg o png.
                          </small>

                      </b-col>

                    </b-row>
                </b-container>

                <template #footer>
                  <b-container fluid="md">
                    <b-row class="mb-1" style="margin-bottom:3rem;">
                        <b-col cols="12" md="4" >
                          <b-button type="submit" variant="primary" v-loading="loading" title="Enviar">
                            <feather-icon icon="CheckIcon" />
                            Enviar
                          </b-button>

                        </b-col>

                        <b-col cols="12" md="8" class="d-flex justify-content-end">
                          <span>Los campos marcados con <strong class="text-danger">*</strong> son obligatorios</span>
                        </b-col>

                  
                    </b-row>
                  </b-container>
                </template>
            </b-card>

          </b-form>

        </validation-observer>
      </b-col>
    </b-row>

  
  </b-container>
  

</template>

<script>

import {computed,toRefs,ref,onMounted,inject} from 'vue'
import store from '@/store'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import vSelect from 'vue-select'

import useDireccion from '@core/utils/useDireccion'
import {optionsCurrency, getFecha } from '@core/utils/utils'
import useForm from '@core/utils/form'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  VBTooltip,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormTextarea,
  BFormFile,
  BBadge,
  BSidebar,
  BPopover
} from 'bootstrap-vue'

import {required,email,comision} from '@validations'
import router from '@/router';

export default {

  props:{
    'invitacion_id':Number|String
  },

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    BFormInput,
    BFormRadioGroup,
    BFormCheckboxGroup,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormTextarea,
    BFormFile,
    BBadge,
    BPopover,

    BSidebar,
    ProfileAbout: () => import('components/profile/ProfileAbout.vue'),
    CurrencyInput: () => import('components/CurrencyInput.vue')

  },

  directives: {
      'b-tooltip': VBTooltip
   },


  setup(props){
    const {invitacion_id} = toRefs(props)
    const formValidate = ref(null)
    const {invitacion} = toRefs(store.state.invitacion) 
    const invitador = computed(() => invitacion.value.usuario)
    const { solicitud: formulario } = toRefs(store.state.solicitud);
    const { categorias } = toRefs(store.state.categoriaNegocio)
    const {divisas} = toRefs(store.state.divisa)
    const showInvitador = ref(false)
      const refLogo = ref(null)
      const refFoto = ref(null)
      const urlLogo = ref(null)
      const urlFoto = ref(null)
      const logo = ref(null)
      const foto = ref(null)
      const url = ref(window.location.origin)
    const swal = inject('swal')

    const {
      togglePasswordVisibility,
      passwordFieldType,
      passwordToggleIcon
    } = useForm();
    const {
      paises,
      ciudades,
      estados,
      cargarPaises,
      cargarEstados,
      cargarCiudades,
      pais_id,
      estado_id,

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

       
        
        if (!categorias.value.length) {
          store.dispatch('categoriaNegocio/getCategorias')
        }

         if (!divisas.value.length) {
            store.dispatch('divisa/getDivisas')
         }

         if (!iatas.value.length) {
            cargarIatas()
         }

      }

    const validarMonto = () => {
      if (formulario.value.tipo_comision == 2 && isDivisa('MXN')) {

        if (formulario.value.comision < 50) {
          formulario.value.comision = 50;
          toast.info('El monto mínimo permitido para MXN son 50')

        }

      } else if (formulario.value.tipo_comision == 2 && isDivisa('EUR')) {

        if (formulario.value.comision < 2) {
          formulario.value.comision = 2;
          toast.info('El monto mínimo permitido para EUR es de 2€ EUR')
        }
        formulario.value.comision = formulario.value.comision || 10;
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

     const logoSeleccionado = (file) => {
      urlLogo.value = URL.createObjectURL(file)
    }

    const fotoSeleccionada = (file) => {
      urlFoto.value = URL.createObjectURL(file)
    }

   
    const guardar = () => {
      formulario.value.invitacion_id = invitacion_id.value
      store.dispatch('invitacion/afiliarNegocio',formulario.value).then(({result}) => {
        if(result){
          swal({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Felicidades, hemos recibido tus datos, para que Afiliemos a tu Negocio, en las próximas horas te estaremos informando por correo como va. Ademas te hemos afiliado tu usuario a TravelPoints, Ya puedes entrar con los datos que nos has proporcionado.',
          })

          router.push('/login')
        }else{
          toast.error('No pudimos afiliar a tu negocio, inténtelo de nuevo ')
        }
      }).catch(e => {
        console.log(e)
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }

      })
    }

    onMounted(() => {
      cargarBuscador();
    })
    
    cargarForm();
    return {
      loading:computed(() => store.state.loading),
      formValidate,
      guardar,
      formulario,
      categorias,
      divisas,
      isDivisa,
      validarMonto,
      logoSeleccionado,
      fotoSeleccionada,
      required,
      email,
      comision,
      getCurrency: computed(() => {

        let divisa = divisas.value.find(val => val.id === formulario.value.divisa_id)

        if (divisa != undefined) {
          return divisa.iso
        }

        return 'MXN'
      }),
      optionsCurrency,
      foto,
      refFoto,
      refLogo,
      logo,
      urlLogo,
      urlFoto,
      url,
      invitacion,
      aboutDataInvitador: computed(() => {
        if (invitador.value.id) {
         
          return {
            nombre: invitador.value.nombre ? invitador.value.nombre + " " + invitador.value.apellido : invitador.value.username,
            portada: invitador.value.portada || '/storage/img-portada/banner-travel.jpg',
            avatar: invitador.value.avatar,
            direccion: invitador.value.direccion,
            rol: invitador.value.rol ? invitador.value.rol.nombre : '',
            pais: invitador.value.ciudad ? invitador.value.ciudad.estado.pais.pais : '',
            'teléfono': invitador.value.telefonos && invitador.value.telefonos.length ? `<a href="tel:${invitador.value.telefonos && invitador.value.telefonos.length ? invitador.value.telefonos[0].telefono : ''}">${invitador.value.telefonos && invitador.value.telefonos.length ? invitador.value.telefonos[0].telefono : ''}</a>` : null,
            'Registrado desde': getFecha(invitador.value.created_at),
            'Sitio web': invitador.value.website ? `<a href="${invitador.value.website}" target="_blank">${invitador.value.website}</a>` : null,
            email: `<a href="mailto:${invitador.value.email}" target="_blank">${invitador.value.email}</a>`,
            'Acerca': invitador.value.bio
          }
        } else {
          return {}
        }
      }),
      
      showInvitador,

      togglePasswordVisibility,
      passwordFieldType,
      passwordToggleIcon,


      // useDireccion
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
      iatas,
      cargarIatas
    }
  }
  



}
</script>


<style lang="scss" scoped>
.content-logo {
   border: 1px solid rgba(44, 23, 23, 0.1);
   height: 150px;
   border-radius: 10px;
   box-shadow: 0px 0px 30px rgb(0 0 0 / 20%);
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
      // transform: scale3d(2, 1.2, 3.5);

      &::after {
         content: "" !important;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100%;
         font-weight: bolder;
      }


   }





}</style>
