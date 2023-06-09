<template>
  <b-modal v-model="show" size="lg" centered title="Como llegar" hide-footer @show="getDirections()" lazy>
    <div>
      <GmapMap :zoom="zoom"
              :center="origin"
              map-type-id="roadmap"
              style="width: 100%; height: 400px"
              :options="{ styles: stylosMap }"
              ref="refMap"
              :streetViewControl="true"
              >
              <GmapMarker
              :visible="true"
              :draggable="false"
              :icon="iconMapa"
              :clickable="true"
              :position="origin"
            >
              <GmapInfoWindow :options="optionsPlace('Yo')" >
              </GmapInfoWindow>
          </GmapMarker>

            <GmapMarker
                :visible="true"
                :draggable="false"
                :icon="iconMapa"
                :clickable="true"
                :position="destination"
              >
              <GmapInfoWindow :options="optionsPlace(destinoName)" >
              </GmapInfoWindow>
            </GmapMarker>
        <DirectionsRenderer :options="directionsOptions" :directions="directions" v-if="directions" />
      </GmapMap>

      <b-tabs content-class="mt-3">
        <b-tab title="Ver detalles de la ruta " active>
          <div>
          
            <div v-if="direcciones">
              <h2>{{ direcciones.summary }}</h2>
              <ul>
                <li v-for="step in direcciones.steps" :key="step.instructions" v-html="step.instructions"></li>
              </ul>
            </div>
          </div>
        </b-tab>
         <template #tabs-end>
            <li role="presentacion" class="nav-item">
                <b-button class="nav-link" variant="text" @click="openDirections">
                  <font-awesome-icon icon="fas fa-map-location-dot" />
                    Abrir en Google Maps
                </b-button>
            </li>
           </template>
      </b-tabs>
      
    </div>
  </b-modal>
</template>

<script>
import { BModal,BButton,BTabs,BTab } from 'bootstrap-vue';
import DirectionsRenderer from './DirectionsRenderer.js';
import { gmapApi } from 'vue2-google-maps';
import {computed,ref,toRefs,watch,onMounted} from 'vue';
import useMap from '@core/utils/useMap';

export default {
  components: {
    BModal,
    BButton,
    BTabs, BTab, 
    DirectionsRenderer
  },
  props: {
    showDirections: Boolean,
    destination:{
      type:Object,
      default:() => ({
        lat: 0, 
        lng: 0
      })
    },
    origin: {
      type: Object,
      default: () => ({
        lat: 0,
        lng: 0
      })
    },
    destinoName:{
      type:String,
      default:'Destino'
    }
  },
  model: {
    prop: 'showDirections',
    event: 'update:showDirections'
  },

  setup(props,{emit}){
    const {showDirections,destination,origin} = toRefs(props);
    const show = ref(false)
    const goog = computed(() => gmapApi());
    const center = ref({
      lat: 0, 
      lng: 0
    })

    const directionsOptions = ref({
      preserveViewport: true,
      suppressMarkers: true,
      draggable: true,
      polylineOptions: {
        strokeColor: '#0097CE',
        strokeOpacity: 0.7,
        strokeWeight: 4
      }
    })
    const zoom = ref(12)
    const directions = ref(null)
    const direcciones = ref(null)

    const refMap= ref(null)
    const {
      iconMap,
      iconMapa,
      stylosMap
    } = useMap();

     const getDirections = () => {

      setTimeout(() => {

          if (goog.value) {

          const directionsService = new goog.value.maps.DirectionsService();

          const placeOrigin = new goog.value.maps.LatLng(origin.value.lat, origin.value.lng)
          const placeDestination = new goog.value.maps.LatLng(destination.value.lat, destination.value.lng)

          const response = directionsService.route({
            origin: placeOrigin,
            destination: placeDestination,
            provideRouteAlternatives: false,
            travelMode: 'DRIVING',
          })


          response.then(res => {
            console.log(res.routes)
            if (res.status == 'OK') {
              directions.value = res;
              direcciones.value= res.routes[0].legs[0];
            } else {
              console.error('Error al obtener las direcroutes[0].legs[0]ciones.');
            }
          }).catch(e => console.log(e))

        } else {
          console.error('La API de Google Maps no se ha cargado correctamente.');
        }

      }, 500);
      

    }

    const  openDirections = () =>  {
      const originStr = `${origin.value.lat},${origin.value.lng}`;
      const destinationStr = `${destination.value.lat},${destination.value.lng}`;

      // Generar el enlace de ruta
      const link = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originStr)}&destination=${encodeURIComponent(destinationStr)}`;

      // Abrir el enlace en el navegador del dispositivo
      window.open(link);
    }

    watch(showDirections,(value) => {
      show.value = value;
    })

    watch(show,(value) => {
      emit('update:showDirections',value)
    })

   
      

    return {
      getDirections,
      show,
      directions,
      zoom,
      center,
      direcciones,
      goog,
      stylosMap,
      iconMap,
      iconMapa,
      refMap,
      openDirections,
      directionsOptions,
       optionsPlace: (to) => ({
        content: `<strong>${to}</strong>`,
        disableAutoPan: true
      }),
      
    }
  }
 
};
</script>
