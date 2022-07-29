<template>
   <div>
      <perfil-info :usuario="usuario"></perfil-info>
      <b-card>

         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <!-- form -->
            <b-form @submit.prevent="handleSubmit(guardar)">
               <b-container fluid>

                  <b-row>
                     <b-col cols="12">
                        <h2>Información Personal</h2>
                     </b-col>
                  </b-row>
                  <hr>

                  <b-row>
                     <b-col cols="12" md="6">
                        <b-form-group>
                           <template #label>
                              Nombre: <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="nombre" rules="required" #default="{ errors }">
                              <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null" />

                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>

                        <b-form-group>
                           <template #label>
                              Apellido: <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="apellido" rules="required" #default="{ errors }">
                              <b-form-input v-model="formulario.apellido" :state="errors.length ? false : null" />

                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>

                        <b-form-group>
                           <template #label>
                              Email: <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="email" rules="required|email" #default="{ errors }">
                              <b-form-input v-model="formulario.email" :state="errors.length ? false : null"
                                 type="email" />

                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>
                     </b-col>

                     <b-col cols="12" md="6">

                        <b-form-group label-for="example-datepicker" label="Fecha de Nacimiento">
                           <validation-provider name="fecha_nacimiento" #default="{ errors }">
                              <flat-pickr v-model="formulario.fecha_nacimiento" class="form-control" name="date"
                                 placeholder="Fecha de nacimiento" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>

                        <b-form-group>
                           <template #label>
                              Teléfono:
                           </template>

                           <validation-provider name="telefono" #default="{ errors }">
                              <cleave id="phone" v-model="formulario.telefono" class="form-control" :raw="false"
                                 :options="clevePhone" placeholder="Número de telefono" />
                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>

                        <b-form-group v-if="formulario.telefono.length > 4">

                           <template #label>
                              ¿El número está asociado a WhatsApp?
                           </template>

                           <validation-provider name="is_whatsapp" #default="{ errors }">

                              <b-form-radio-group v-model="formulario.is_whatsapp"
                                 :options="[{ text: 'Sí', value: true }, { text: 'Nó', value: false }]"
                                 :state="errors.length ? false : null" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>

                        <b-form-group>

                           <template #label>
                              Sexo
                           </template>

                           <validation-provider name="genero" #default="{ errors }">

                              <b-form-radio-group v-model="formulario.genero"
                                 :options="[{ text: 'Masculino', value: 1 }, { text: 'Femenino', value: 2 }]"
                                 :state="errors.length ? false : null" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>



                     </b-col>
                  </b-row>

                  <el-divider content-position="left">Dirección</el-divider>

                  <b-row>

                     <!-- Direccion -->
                     <b-col cols="12">
                        <b-form-group label="Dirección" label-for="bio-domicilio">
                           <b-form-textarea id="bio-domicilio" v-model="formulario.direccion" rows="4"
                              placeholder="Dirección de domicilio" />
                        </b-form-group>
                     </b-col>

                  </b-row>

                  <b-row>
                     <b-col cols="12" md="4">
                        <b-form-group label="Pais">
                           <el-select v-model="pais_id" placeholder="Seleccione" class="w-100" filterable clearable>
                              <el-option v-for="(pais,i) in paises" :key="i" :value="pais.id" :label="pais.pais">
                              </el-option>
                           </el-select>
                        </b-form-group>
                     </b-col>
                     <b-col cols="12" md="4">

                        <b-form-group label="Estado">
                           <el-select v-model="estado_id" placeholder="Seleccione" class="w-100" filterable clearable>
                              <el-option v-for="(estado,i) in estados" :key="i" :value="estado.id"
                                 :label="estado.estado">
                              </el-option>
                           </el-select>
                        </b-form-group>

                     </b-col>
                     <b-col cols="12" md="4">

                        <b-form-group label="Ciudad">
                           <el-select v-model="formulario.ciudad_id" placeholder="Seleccione" class="w-100" filterable
                              clearable>
                              <el-option v-for="(ciudad,i) in ciudades" :key="i" :value="ciudad.id"
                                 :label="ciudad.ciudad">
                              </el-option>
                           </el-select>
                        </b-form-group>

                     </b-col>

                     <b-col cols="12" md="4">
                        <b-form-group label="Código Postal">
                           <validation-provider name="codigo_postal" #default="{ errors }">
                              <b-form-input v-model="formulario.codigo_postal" :state="errors.length ? false : null" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>
                        </b-form-group>
                     </b-col>

                  </b-row>

                  <el-divider content-position="left">Acerca de usted</el-divider>

                  <b-row>


                     <!-- bio -->
                     <b-col cols="12">
                        <b-form-group label="" label-for="bio-area">
                           <b-form-textarea id="bio-area" v-model="formulario.bio" rows="4"
                              placeholder="Redacte algo de usted, una pequeña Bio ... " />
                        </b-form-group>
                     </b-col>



                     <!-- Country -->
                     <b-col md="6">
                        <b-form-group label-for="website" label="Sitio web">
                           <b-form-input id="website" v-model="formulario.website" placeholder="Sitio web" />
                        </b-form-group>
                     </b-col>
                     <!--/ Country -->

                  </b-row>


                  <el-divider content-position="left">Redes Sociales</el-divider>

                  <b-row>
                     <b-col cols="12" md="4">
                        <b-form-group label="Facebook">
                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <feather-icon icon="FacebookIcon" />
                              </b-input-group-prepend>
                              <b-form-input v-model="formulario.facebook" />
                           </b-input-group>
                        </b-form-group>
                     </b-col>
                     <b-col cols="12" md="4">
                        <b-form-group label="Instagram">
                           <b-input-group>
                              <b-input-group-prepend is-text>
                                 <feather-icon icon="InstagramIcon" />
                              </b-input-group-prepend>
                              <b-form-input v-model="formulario.instagram" />
                           </b-input-group>
                        </b-form-group>

                     </b-col>
                     <b-col cols="12" md="4">
                        <b-form-group label="Twitter">
                           <b-input-group>
                              
                              <b-input-group-prepend is-text>
                                 <feather-icon icon="TwitterIcon" />
                              </b-input-group-prepend>

                              <b-form-input v-model="formulario.twitter" />
                           </b-input-group>
                        </b-form-group>
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col cols="12">

                        <b-button-group size="sm">
                           <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit"
                              title="Guardar" v-loading="loading">
                              <feather-icon icon="SaveIcon" />
                              Guardar
                           </b-button>

                           <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset"
                              variant="outline-secondary">
                              Limpiar
                           </b-button>

                        </b-button-group>
                     </b-col>
                  </b-row>
               </b-container>

            </b-form>
         </validation-observer>

      </b-card>
   </div>

</template>

<script>

import { 
   BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormTextarea,
   BContainer,
   BFormInvalidFeedback,
   BFormRadioGroup,
   BButtonGroup,
   BInputGroup,
   BInputGroupPrepend
   }
 from 'bootstrap-vue'

import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

import { ValidationObserver, ValidationProvider} from 'vee-validate'
import {ref,toRefs,onMounted,computed,watch } from '@vue/composition-api'

import {required,email} from '@validations'
import store from '@/store'
import useDireccion from '@core/utils/useDireccion';
export default {
   components: {
      BButton,
      BForm,
      BFormGroup,
      BFormInput,
      BRow,
      BCol,
      BCard,
      BFormTextarea,
      vSelect,
      flatPickr,
      Cleave,
      ValidationObserver,
      ValidationProvider,
      BFormInvalidFeedback,
      BContainer,
      BFormRadioGroup,
      BButtonGroup,
      BInputGroup,
      BInputGroupPrepend,
      PerfilInfo:() => import('components/PerfilInfo')

   },

   directives: {
      Ripple,
   },


   setup(){


      const formulario = ref(store.getters['usuario/draftUsuario'])
      const formValidate = ref(null)
      const usuario = computed(() => store.state.usuario.usuario)
      
      const clevePhone =  {
         phone: true,
         phoneRegionCode: 'US',
      }

      const countryOption =  ['USA', 'India', 'Canada']

      const {
         paises,
         ciudades,
         estados,
         pais_id,
         estado_id
      } = useDireccion();

      const guardar = ()  => {

         store.dispatch('usuario/guardarUsuario',formulario.value).then(({usuario:user,result}) => {

            if(result){
               toast.success('Se ha guardado con Éxito el perfil')
               // formulario.value = clone(user)
            }else{
               toast.error('Los cambios no surtierón efecto, inténtelo de nuevo')
            }

         }).catch(e => {

            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)

            }

         })

      } 
      
      const cargarForm = () => {
         if (formulario.value.ciudad_id) {
            pais_id.value = formulario.value.ciudad.estado.pais_id;
            estado_id.value = formulario.value.ciudad.estado_id;
         }
      }

      onMounted(() => cargarForm())

      watch([formulario,paises],() => cargarForm())


      return {
         formulario,
         loading:computed(() => store.state.loading),
         required,
         email,
         guardar,
         formValidate,
         clevePhone,
         countryOption,
         usuario,
         paises,
         ciudades,
         estados,
         pais_id,
         estado_id
      }
   }

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
