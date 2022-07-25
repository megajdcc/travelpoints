<template>
  <b-card no-body>
    <b-card-header>
      <!-- title and subtitle -->
      <div>
        <b-card-title class="mb-1">
          {{titulo}}
        </b-card-title>
        <b-card-sub-title>{{ subtitulo }}</b-card-sub-title>
      </div>
      <!--/ title and subtitle -->

      <!--/ badge -->
    </b-card-header>

    <b-card-body>
      <vue-apex-charts
        type="bar"
        height="400"
        :options="chartOptions"
        :series="data"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle, BBadge,BFormGroup
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import apexChatData from './apexChartData'
import { $themeColors } from '@themeConfig'
import {ref, toRefs} from '@vue/composition-api';
import vSelect from 'vue-select'
export default {

   props:{
      titulo:{
         type:String,
         default:'Balance'
      },
      
      subtitulo:{
         type:String,
         default:''
      },

      subjects:{
         type:Array,
         default:[]
      },

      subjectFilter:{
         type:[Number,null],
         default:null

      },

      subjectTitle:{
         type:String,
         default:'Bodas'
      },

      subjectDescription:{
         type:String,
         default:''
      },
      chartOptions:{
         type:Object,
         default:{
               chart: {
                  zoom: {
                     enabled: true,
                  },
                  toolbar: {
                     show: true,
                  },
               },
               markers: {
                  strokeWidth: 7,
                  strokeOpacity: 1,
                  strokeColors: [$themeColors.light],
                  colors: [$themeColors.warning],
               },
               colors: [$themeColors.warning],
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  curve: 'straight',
               },
               grid: {
                  xaxis: {
                     lines: {
                        show: true,
                     },
                  },
               },
               tooltip: {
                  custom(data) {
                     return `${'<div class="px-1 py-50"><span>'}${data.series[data.seriesIndex][data.dataPointIndex]
                        } Reservas</span></div>`
                  },
               },
               xaxis: {
                  
                  labels: {
                     rotate:-45
                  },

                  categories: [
                    'hola','pedro'
                  ],
               },
               yaxis: {
                  // opposite: isRtl,
               },
         },
      },

      data:{
         type:Array,
         default:[],
      }



   },

  components: {
    VueApexCharts,
    BCardHeader,
    BCard,
    BBadge,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BFormGroup,
    vSelect
  },

  data() {
    return {
      value:null
    }
  },

  setup(props){

     return {
        $themeColors
     };
  }

 

}
</script>
