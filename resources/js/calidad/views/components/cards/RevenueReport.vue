<template>
  <b-card no-body class="card-revenue-budget">


    <b-row class="mx-0">
      <b-col md="8" class="revenue-report-wrapper">
        <div class="d-sm-flex justify-content-between align-items-center mb-3">
          <h4 class="card-title mb-50 mb-sm-0">
            {{ titulo }}
          </h4>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center mr-2">
              <span class="bullet bullet-primary svg-font-small-3 mr-50 cursor-pointer" />
              <span>{{ $t('Ganancias') }}</span>
            </div>
            <div class="d-flex align-items-center ml-75">
              <span class="bullet bullet-warning svg-font-small-3 mr-50 cursor-pointer" />
              <span>{{  $t('Retiros')  }}</span>
            </div>
          </div>
        </div>

        <!-- chart -->
        <vue-apex-charts id="revenue-report-chart" ref="char1refRevenue" type="bar" height="230" :options="revenue_report.chartOptions"
          :series="revenue_report.series" />
      </b-col>

      <b-col md="4" class="budget-wrapper">
        <b-dropdown :text="anoSeleccionado.toString()" size="sm" class="budget-dropdown" variant="outline-primary">
          <template v-for="year in ultimosTresAnos" >
           <b-dropdown-item :key="year" @click="seleccionarAno(year)" v-if="anoSeleccionado != year">
              {{ year }}
            </b-dropdown-item>
          </template>
         
        </b-dropdown>

        <h2 class="mb-25">
           {{data.iso}} {{ data.saldo  | currency({symbol:''}) }}
        </h2>
        <div class="d-flex justify-content-center">
          <small class="font-weight-bolder mr-25">{{ $t('Retirado') }}:</small>
          <small>  {{ data.iso }} {{ data.retirado | currency({ symbol: '' }) }}</small>
        </div>
        <vue-apex-charts id="budget-chart" type="line" height="80" :options="budgetChart.options"
          :series="budgetChart.series" />

        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="cobrar()">
         {{ $t('Cobrar') }}
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BDropdown, BDropdownItem, BButton,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Ripple from 'vue-ripple-directive'

import {toRefs,ref,computed,watch} from 'vue'
import store from '@/store'
import { ultimosTresAnos } from '@core/utils/utils';

export default {
  components: {
    VueApexCharts,
    BDropdown,
    BDropdownItem,
    BCard,
    BButton,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  
  props: {
    titulo:{
      type:String,
      default:'Reporte de ingresos'
    },
    data:{
      type: Object,
      default:() => ({ saldo:'30.000',retirado:0,iso:'USD',chart1serie: [], chart2serie: []
      }),
    },

    ano:{
      type:String|Number,
      default:() => new Date().getFullYear()
    },

    cobrar:{
      type:Function,
      default:() => {},
      required:false,
    }
  },

  model:{
    prop:'ano',
    event:'update:ano'
  },

  setup(props,{emit}){
    const {data,ano} = toRefs(props)
    const char1refRevenue = ref(null)
    const revenue_report = ref({
      // options
       chartOptions: {
        chart: {
          stacked: true,
          type: 'bar',
          toolbar: { show: true },
        },
        grid: {
          padding: {
            top: -20,
            bottom: -10,
          },
          yaxis: {
            lines: { show: true },
          },
        },
        xaxis: {
          categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agost', 'Sep','Opt','Nov','Dic'],
          labels: {
            
            style: {
              colors: '#6E6B7B',
              fontSize: '0.86rem',
              fontFamily: 'TimeNewRoma',
              transform:'rotate(90deg)'
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
              enabled:true,
              intersect:true,
              shared: false,
              theme:true,
              inverseOrder: true,
              followCursor: true,
              marker:{
                show:true,
              },
              y: {
                formatter: function (val) {
                  return val
                }
              },
              x: {
                formatter: function (val) {
                  return val
                }
          }
        },

        colors: [$themeColors.primary, $themeColors.warning],
        plotOptions: {
          bar: {
            columnWidth: '15%',
            endingShape: 'rounded',
          },
          distributed: true,
        },
        yaxis: {
          show:true,
          labels: {
            style: {
              colors: '#6E6B7B',
              fontSize: '.85rem',
              fontWeight:'bolder',
              fontFamily: 'Roboto',
            },
          },
        },
      },
      // series
      series: computed(() => data.value.chart1serie)
    })
    const budgetChart = ref({
      options: {
        chart: {
          height: 80,
          toolbar: { show: false },
          zoom: { enabled: false },
          type: 'line',
          sparkline: { enabled: true },
        },
        stroke: {
          curve: 'smooth',
          dashArray: [0, 5],
          width: [2],
        },
        colors: [$themeColors.primary, '#dcdae3'],
        tooltip: {
          enabled: false,
        },
      },

      // series
      series: computed(() => data.value.chart2serie)
    })
    
    const seleccionarAno = (anio) => {
      emit('update:ano',anio)
      emit('ano-change',anio)
    }

   

    return {
      revenue_report,
      budgetChart,
      loading:computed(() => store.state.loading),
      ultimosTresAnos,
      anoSeleccionado: computed(() => ano.value),
      seleccionarAno,
      char1refRevenue
    }
  }
}
</script>
