<template>
  <b-container :fluid="windowWidth < 762 ? true : false" class=" px-0 mt-1" :class="{ 'mx-0': windowWidth < 762, 'mx-auto': windowWidth > 762 }" >

      <b-row v-if="pagina.is_contacto">

        <b-col cols="12">

          <strong class="text-center mb-2 d-block" style="font-size:18pt; font-style:italic">{{ $t('¡Contáctenos!') }}</strong>

          <validation-observer ref="formValidate" #default="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(enviar)" >
                <b-container fluid class="mx-0 px-0">
                  <b-row>
                    <b-col cols="12" sm="6" lg="3">
                        <b-form-group >
                        <validation-provider name="nombre" rules="required" #default="{ errors }">
                            <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null"
                              :placeholder="$t('Su nombre')" />

                            <b-form-invalid-feedback>
                              {{ errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                      </b-form-group>
                    </b-col>

                      <b-col cols="12" sm="6" lg="3">
                          <b-form-group >
                            <validation-provider name="email" rules="required|email" #default="{ errors }">
                              <b-form-input v-model="formulario.email" :state="errors.length ? false : null" :placeholder="$t('Su email')" />

                              <b-form-invalid-feedback>
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                            </validation-provider>
                          </b-form-group>
                      </b-col>
                       <b-col cols="12" sm="6" lg="3">
                              <b-form-group >
                                <validation-provider name="telefono" rules="required" #default="{ errors }">
                                  <the-mask v-model="formulario.telefono" :mask="'+############'" class="form-control" type="tel" masked
                                    :placeholder="$t('Su número de teléfono')" />

                                  <b-form-invalid-feedback :state="errors.length ? false : null">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>
                              </b-form-group>
                        </b-col>

                          <b-col cols="12" sm="6" lg="3">
                            <b-form-group >
                                <validation-provider name="asunto" rules="required" #default="{ errors,valid }">
                                  <b-form-input v-model="formulario.asunto" :state="valid" :placeholder="$t('Asunto')" />

                                  <b-form-invalid-feedback>
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" sm="6" lg="3">
                          <b-form-group >
                              <validation-provider name="perfil" rules="required" #default="{ errors,valid }">
                              <v-select v-model="formulario.perfil" :options="perfiles" :placeholder="$t('Perfil de socio Travel Points')" :reduce="option => option.value" />

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
                          <validation-provider name="mensaje" rules="required" #default="{ valid, errors }">
                            <b-form-textarea v-model="formulario.mensaje" :state="valid" :placeholder="$t('Su caso')" :rows="3" />

                            <b-form-invalid-feedback>
                              {{ errors[0] }}
                            </b-form-invalid-feedback>
                            
                          </validation-provider>
                        </b-form-group>
                    </b-col>

                    <b-col cols="12">
                        <b-form-checkbox id="checkbox-1" v-model="politicas">
                          {{ $t('Usted acepta nuestras') }} <b-link :to="{ path: pagePolitica }"> {{ $t('Políticas de privacidad') }} </b-link>
                        </b-form-checkbox>
                    </b-col>
                  </b-row>

                  <b-row class="mt-1" >
                    <b-col cols="12">
                        <b-button variant="primary" title="Enviar" type="submit" v-loading="loading" :disabled="!politicas">
                          <feather-icon icon="SendIcon" />
                          {{ $t('Enviar Mensaje') }}
                        </b-button>
                    </b-col>  
                    
                  </b-row>
                </b-container>
              </b-form>
          </validation-observer>
          
        </b-col>
        <el-divider content-position="left">{{$t('Sucursales')}}</el-divider>
        <b-col cols="12" class="mt-2">
            <GmapMap :center="{ lat: promedioLatitud, lng: promedioLongitud }" :zoom="3" map-type-id="terrain"
                      style="width: 100%; height: 300px" :options="{ styles: stylosMap }" ref="refMap">
                
                <GmapMarker :visible="true" :draggable="false" :icon="iconMapa" :clickable="true" 
                v-for="(sucursal, i) in sistema.sucursales" :key="i" :position="{
                  lat: Number(sucursal.lat),
                  lng: Number(sucursal.lng)
                }">
          
                  <GmapInfoWindow :options="optionsPlace(sucursal)">
                  </GmapInfoWindow>
          
                </GmapMarker>
          
            </GmapMap>
        </b-col>

        <b-col cols="12">
            <div v-html="pagina.contenido">
    
            </div>
        </b-col>
      </b-row>

      <b-row v-else>
        <b-col cols="12">
          <div v-html="pagina.contenido">
    
          </div>
        </b-col>
      </b-row>

    </b-container>
 
  
</template>

<script>

import store from '@/store'
import {ref,computed,toRefs,watch,inject} from 'vue'
import router from '@/router';
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BImg,
  BLink,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormTextarea,
  BForm,
  VBTooltip,
  BFormRadioGroup,
  BFormCheckbox,
} from 'bootstrap-vue'


import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from '@validations'
import useMap from '@core/utils/useMap';
import vSelect from 'vue-select'

export default {
  
  props:{
    page:String
  },

  components:{
    BContainer,
    BRow,
    BCol,
    BButton,
    BImg,
    BLink,
    ValidationObserver,
    ValidationProvider,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormTextarea,
    BForm,
    VBTooltip,
    BFormRadioGroup,
    BFormCheckbox,
    vSelect,
  },

  setup(props){

    const {page} = toRefs(props)

    const {pagina,paginas} = toRefs(store.state.pagina)

    const windowWidth = computed(() => store.state.app.windowWidth)
    const { sistema } = toRefs(store.state.sistema)
    const formValidate = ref(null)
    const politicas = ref(false)
    const options_map = ref({})
    const refMap = ref(null);
    const i18n = inject('i18n')

    const formulario = ref({
      email: '',
      nombre: '',
      telefono: null,
      asunto: '',
      mensaje: ''
    })


    const enviar = () => {

      axios.post('/api/enviar/mensaje/contacto', formulario.value).then(({ data }) => {

        if (data.result) {
          toast.success(i18n.t('Se ha enviado con éxito su mensaje.'))
          formulario.value = {
            email: '',
            nombre: '',
            telefono: null,
            asunto: '',
            mensaje: '',
            perfil:null
          }

        } else {
          toast.info(i18n.t('No se pudo enviar Su mensaje, inténtelo de nuevo...'))
        }

      }).catch(e => {
        if (e.response.status === 422) {
          formValidate.value.setErrors(e.response.data.errors)
        }
      })


    }


    watch(page,() => {
        store.dispatch('pagina/capturarPagina', page.value).then(({ result }) => {
          if (!result) {
              router.push({ name: 'error-404' })
          }
        })
    })

    
    const {
      iconMap,
      iconMapa,
      stylosMap
    } = useMap();
    

    const perfiles = ref([
      {label:i18n.t('Soy un Viajero'),value:1},
      {label:i18n.t('Soy un Negocio'),value:2},
      {label:i18n.t('No estoy registrado'),value:3},
      {label:i18n.t('Otro'),value:4},
    ])


    return {
      pagina,
      enviar,
      iconMap,
      stylosMap,
      loading:computed(() => store.state.loading),
      windowWidth,
      sistema,
      required,
      formulario,
      enviar,
      email,
      formValidate,
      options_map,
      refMap,
      politicas,
      perfiles,
      iconMapa,
      promedioLatitud: computed(() => {

        let sum = 0;

        sistema.value.sucursales.forEach(val => {
          sum = sum + Number(val.lat)
        })


        let result = sum / sistema.value.sucursales.length


        return result
      }),
      pagePolitica: computed(() => store.getters['pagina/pagePolitica']),
      
      optionsPlace: (sucursal) => ({
        content: `<strong>${sucursal.nombre} 
        <br> ${sucursal.direccion} 
        <br> ${i18n.t('Teléfonos')}: ${sucursal.telefonos.map(val => val.telefono).join()} </strong>`
      }),

      promedioLongitud: computed(() => {
        let sum = 0;

        sistema.value.sucursales.forEach(val => {
          sum += Number(val.lng) || 0

        })

        let result = sum / sistema.value.sucursales.length
        return result

      }),

    }
  }
  
}
</script>
