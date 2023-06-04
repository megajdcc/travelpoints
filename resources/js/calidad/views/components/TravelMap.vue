<template>
    <b-container fluid>
      <b-row>
        <b-col cols="12">

          <GmapMap
              :center="{ lat: promedioLatitud, lng: promedioLongitud }"
              :zoom="3"
              map-type-id="terrain"
              style="width: 100%; height: 600px"
              :options="{ styles: stylosMap }"
              ref="refMap"
              @zoom_changed="zoomChange"
            >
                
            <GmapMarker
              :visible="true"
              :draggable="false"
              :icon="iconMapa"
              :clickable="true"
              v-for="(travel, i) in locations"
              :key="i"
              @click="travelSelected($event,travel)"
              :position="{
                lat: Number(travel.lat),
                lng: Number(travel.lng)
              }"
            >
          
            <GmapInfoWindow :options="optionsPlace(travel)"  :opened="showInfoWindow" >
              <!-- <template #default="{ infoWindow }">
                <div>
                  <b-button variant="primary" @click="infoWindow && (infoWindow.popover = !infoWindow.popover)">
                    Mostrar detalles
                  </b-button>
                  <b-popover :show="infoWindow && infoWindow.popover" target="popover-button" triggers="click">
                    Detalles del lugar: {{ travel.nombre }}, {{ travel.direccion }}
                  </b-popover>
                </div>
              </template> -->
              <!-- <p>Pera</p> -->
            </GmapInfoWindow>


            </GmapMarker>
          
          </GmapMap>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import store from '@/store'
import {toRefs,ref,computed,watch} from 'vue'
import useMap from '@core/utils/useMap';
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
  BPopover
} from 'bootstrap-vue'



export default {
  
  components:{
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
    BFormRadioGroup,
    BFormCheckbox,
    BPopover
  },

  props:{
    destino:String|Number
  },

  directives:{
    'b-tooltip' : VBTooltip
  },


  setup(props,{emit}){

    const {destino} = toRefs(props)
    const options_map = ref({})
    const refMap = ref(null); 
    const travels = ref([]);
    const showInfoWindow = ref(false);

    const cargarForm = () => {
      axios.get(`/api/travels/map/destino/${destino.value}`).then(({data}) => {
    
        travels.value = data
      }).catch(e => console.log(e))
    }
    

    cargarForm();

    const {
      iconMap,
      iconMapa,
      stylosMap
    } = useMap();

    watch(destino,() => {
        cargarForm()
    })

    const zoomChange = ( zoom ) => {
      showInfoWindow.value = zoom >= 13 
    }   


    const travelSelected = (mark,travel) => {
      router.push(travel.ruta)
    }

    const getRutaTravel = (travel) => {

        switch (travel.tipo) {
          case 'Destino':
            return {path:travel.ruta}
            break;

          case 'Atraccion':
            return { path: travel.ruta }
          break;

          case 'Negocio':
            return { path: `/negocio/${travel.url}` }
          break;
        
          default:
            return { path:'#'}
            break;
        }
    }
    
    return {
      loading:computed(() => store.state.loading),
      iconMap,
      iconMapa,
      zoomChange,
      stylosMap,
      options_map,
      refMap,
      travels,
      travelSelected,
      locations:computed(() => {
        return travels.value.map(val => ({
          lng:val.lng,
          lat:val.lat,
          nombre:val.nombre ? val.nombre : 'Sin definir',
          direccion:val.direccion ? val.direccion : 'Sin definir',
          ruta:getRutaTravel(val),
          tipo:val.tipo,
        }))
      }),

      optionsPlace: (travel) => ({
        content: `<strong>${travel.tipo.toUpperCase()}: ${travel.nombre}<br>${travel.direccion}</strong>`,
        disableAutoPan:true
      }),

      promedioLatitud: computed(() => {
          let sum = 0;

          travels.value.forEach((val) => {
            sum += Number(val.lat) || 0;
          });

          let result = sum / travels.value.length;
          return Number.isFinite(result) ? result : 0; // Verificar si el resultado es finito
        }),

        promedioLongitud: computed(() => {
          let sum = 0;

          travels.value.forEach((val) => {
            sum += Number(val.lng) || 0;
          });

          let result = sum / travels.value.length;
          return Number.isFinite(result) ? result : 0; // Verificar si el resultado es finito
        }),
        showInfoWindow

    }
  }
}
</script>