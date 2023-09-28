<template>
  <b-container :fluid="windowWidth < 762 ? true : false" class=" px-0 " :class="{'mx-0': windowWidth < 762, 'mx-auto': windowWidth > 762 }" >

    <b-row>

      <b-col cols="12">

        <strong class="text-center mb-2 d-block" style="font-size:14pt; font-style:italic">Ponte en contácto con nosotros !</strong>

        <validation-observer ref="formValidate" #default="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(enviar)" >
              <b-container fluid class="mx-0 px-0">
                <b-row>
                  <b-col cols="12" sm="6" lg="3">
                      <b-form-group >
                      <validation-provider name="nombre" rules="required" #default="{ errors }">
                          <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null"
                            placeholder="Su Nombre" />

                          <b-form-invalid-feedback>
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                    </b-form-group>
                  </b-col>

                    <b-col cols="12" sm="6" lg="3">
                        <b-form-group >
                          <validation-provider name="email" rules="required|email" #default="{ errors }">
                            <b-form-input v-model="formulario.email" :state="errors.length ? false : null" placeholder="Su Email" />

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
                                  placeholder="Su número de teléfono" />

                                <b-form-invalid-feedback :state="errors.length ? false : null">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                            </b-form-group>
                      </b-col>

                        <b-col cols="12" sm="6" lg="3">
                          <b-form-group >
                              <validation-provider name="asunto" rules="required" #default="{ errors }">
                                <b-form-input v-model="formulario.asunto" :state="errors.length ? false : null" placeholder="Asunto" />

                                <b-form-invalid-feedback>
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                          </b-form-group>
                      </b-col>

                      <b-col cols="12" sm="6" lg="3">
                        <b-form-group >
                            <validation-provider name="perfil" rules="required" #default="{ errors }">
                             <v-select v-model="formulario.perfil" :options="perfiles" placeholder="Perfil de socio TravelPoints" :reduce="option => option.value"></v-select>

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
                        <validation-provider name="mensaje" rules="required" #default="{ valid, errors }">
                          <b-form-textarea v-model="formulario.mensaje" :state="valid" placeholder="Su caso" :rows="3" />

                          <b-form-invalid-feedback>
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </b-form-group>
                  </b-col>

                  <b-col cols="12">
                      <b-form-checkbox id="checkbox-1" v-model="politicas">
                        Usted acepta nuestras <b-link :to="{ path: pagePolitica }"> Políticas de Privacidad ?</b-link>
                      </b-form-checkbox>
                  </b-col>
                </b-row>

                <b-row >
                  <b-col cols="12">
                      <b-button variant="primary" title="Enviar" type="submit" v-loading="loading" :disabled="!politicas">
                        <feather-icon icon="SendIcon" />
                        Enviar Mensaje
                      </b-button>
                  </b-col>  
                    
                </b-row>
              </b-container>
            </b-form>
        </validation-observer>
          
      </b-col>
      <el-divider content-position="left">Sucursales</el-divider>
      <b-col cols="12" class="mt-2">
          <GmapMap :center="{ lat: promedioLatitud, lng: promedioLongitud }" :zoom="3" map-type-id="terrain"
                    style="width: 100%; height: 300px" :options="{ styles: stylos }" ref="refMap">
                
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
    </b-row>

  </b-container>

</template>

<script>
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

import store from '@/store'

import { toRefs, ref, computed } from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from '@validations'
import iconMapa from '@images/icons/icon_map.png' 
import vSelect from 'vue-select'

export default {

  components: {
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
    vSelect
  },


  directives: {
    'b-tooltip': VBTooltip
  },

  metaInfo: {
    title: 'Contáctanos | TravelPoints.es'
  },

  setup() {

    const windowWidth = computed(() => store.state.app.windowWidth)
    const {paginas} = toRefs(store.state.pagina)
    const { sistema } = toRefs(store.state.sistema)
    const formValidate = ref(null)
    const politicas = ref(false)
    const options_map = ref({})
    const refMap = ref(null);
    const formulario = ref({
      email: '',
      nombre: '',
      telefono: null,
      asunto: '',
      mensaje: '',
      perfil:null
    })

    const cargarForm = () => {
      
      if(!paginas.value.lenth){
        store.dispatch('pagina/getPaginas')
      }

    }

    cargarForm();


    const enviar = () => {

      axios.post('/api/enviar/mensaje/contacto', formulario.value).then(({ data }) => {

        if (data.result) {
          toast.success('Se ha enviado con éxito su mensaje.')
          formulario.value = {
            email: '',
            nombre: '',
            telefono: null,
            asunto: '',
            mensaje: ''
          }

        } else {
          toast.info('No se pudo enviar Su mensaje, inténtelo de nuevo...')
        }

      }).catch(e => {
        if (e.response.status === 422) {
          formValidate.value.setErrors(e.response.data.errors)
        }
      })


    } 

    const perfiles = ref([
      {label:'Soy un Viajero',value:1},
      {label:'Soy un Negocio',value:2},
      {label:'No estoy registrado',value:3},
      {label:'Otro',value:4},
    ])


    const iconMap =  ref({
      // path: iconMapa,
      fillColor: "#e01283",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: .1,
      icon:iconMapa,
    })

    // const beachMarker = new google.maps.Marker({
    //   // position: { lat: -33.89, lng: 151.274 },
    //   refMap,
    //   icon: iconMapa,
    // });
    

    return {
      windowWidth,
      sistema,
      required,
      perfiles,
      formulario,
      enviar,
      email,
      formValidate,
      perfiles,
      options_map,
      loading: computed(() => store.state.loading),
      iconMap,
      refMap,
      politicas,
      iconMapa,
      pagePolitica:computed(() => store.getters['pagina/pagePolitica']),
      optionsPlace: (sucursal) => ({ content: `<strong>${sucursal.nombre} 
        <br> ${sucursal.direccion} 
        <br> Teléfonos: ${sucursal.telefonos.map(val => val.telefono).join()} </strong>` }),

      promedioLatitud: computed(() => {

        let sum = 0;

        sistema.value.sucursales.forEach(val => {
          sum = sum + Number(val.lat)
        })


        let result = sum / sistema.value.sucursales.length


        return result
      }),

      promedioLongitud: computed(() => {
        let sum = 0;

        sistema.value.sucursales.forEach(val => {
          sum += Number(val.lng) || 0

        })

        let result = sum / sistema.value.sucursales.length
        return result

      }),
      stylos: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    }
  },
}

</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

ul li {
  list-style: none;
}


.header-contacto {
  height: 300px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  position:relative;
  align-items: center;
  // background-image: url('/storage/parallax-4.jpg');
  // background-repeat: no-repeat;
  // background-size: ;
  // background-position: center center;



  &::before {
    content: "";
    width: 100%;
    height: 300px;
    position: absolute;
    // background-color: #0000007d;
  }

  h2 {
    padding: 1rem;
    border: 2px solid white;
    font-weight: bolder;
    color: white;

  }
}

@media (min-width:762px) {
  .border-right-md-4 {
    border-right: 4px solid;
  }
}


@media (min-width:1092px) {
  .header-contacto {
    // background-attachment: fixed;
    // background-size: cover;
  }
}

</style>