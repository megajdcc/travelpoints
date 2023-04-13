<template>
  <b-card>
     <highcharts :constructorType="'mapChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
  </b-card>
 
</template>

<script>

import worldMap from '@highcharts/map-collection/custom/world.geo.json'
import {
  BCard
} from 'bootstrap-vue';

import {toRefs,computed} from 'vue'

export default {
  name: 'map-chart',

  components:{
    BCard
  },

  props:{
    title:{
      type:String,
      default:'Titulo de la grafica'
    },
    subtitulo:String,
    series:{
      type:Array,
      default: [{
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        allAreas: true,
        data: [
          ['km', 69],
          ['mn', 145],
          ['rw', 146],
          ['so', 147],
          ['bo', 148],
          ['cm', 149],
          // ['cg', 150],
          ['ci', 170],
          ['lr', 171],
          ['bn', 172],
          ['iq', 173],
          ['kg', 211],
          ['np', 212],
          ['ve', 100]
        ]
      }]

    },
  },

  setup(props){

    const {series,title,subtitulo} = toRefs(props)

    

    return {
      chartOptions:computed(() => ({
        title:{
          text:title.value
        },
        subtitle:{
          text:subtitulo.value
        },

        chart:{
          map:worldMap,
        },
        colorAxis: {
           stops: [
            [0, '#55aaff'],
            [1, '#2d5b88']
          ]
        },
        
        series: series.value
      }))
    }
  }


}
</script>