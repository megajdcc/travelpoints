<template>
    <b-container fluid>
      <b-row>
        <b-col cols="12">

          <GmapMap :center="{ lat: promedioLatitud, lng: promedioLongitud }" :zoom="3" map-type-id="terrain"
                        style="width: 100%; height: 600px" :options="{ styles: stylosMap }" ref="refMap">
                
            <GmapMarker :visible="true" :draggable="false" :icon="iconMapa" :clickable="true" 
            v-for="(travel, i) in locations" :key="i" :position="{
              lat: Number(travel.lat),
              lng: Number(travel.lng)
            }">
          
            <GmapInfoWindow :options="optionsPlace(travel)">
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

    const cargarForm = () => {
      axios.get(`/api/travels/map/destino/${destino.value}`).then(({data}) => {
        console.log(data)
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

    return {
      loading:computed(() => store.state.loading),
      iconMap,
      iconMapa,
      stylosMap,
      options_map,
      refMap,
      travels,
      locations:computed(() => {
        return travels.value.map(val => ({
          lng:val.lng,
          lat:val.lat,
          nombre:val.nombre ? val.nombre : 'Sin definir',
          direccion:val.direccion ? val.direccion : 'Sin definir'
        }))
      }),

      optionsPlace: (travel) => ({
        content: `<strong>${travel.nombre} 
        <br> ${travel.direccion} 
        </strong>`
      }),


      promedioLatitud: computed(() => {

        let sum = 0;

        travels.value.forEach(val => {
          sum = sum + Number(val.lat)
        })

        let result = sum / travels.value.length
        return result
      }),

      promedioLongitud: computed(() => {
        let sum = 0;

        travels.value.forEach(val => {
          sum += Number(val.lng) || 0

        })

        let result = sum / travels.value.length
        return result

      }),

    }
  }
}
</script>