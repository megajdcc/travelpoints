<template>
  <section id="dashboard">
      <!-- Tablero Admin - Desarrollador -->

      <b-container fluid>

        <b-row>
          <b-col cols="12" md="4">
            
          <statistic-card-horizontal 
            icon="fa-money-bill" 
            statisticTitle="Balance TravelPoints" 
            color="primary"
            colorIcon="sucess"
            colorText="text-white">

            {{  saldoSistema | currency  }}
          
          </statistic-card-horizontal>

          </b-col>

          <b-col cols="12" md="8">
              <apex-chart titulo="Total Viajeros" subtitulo="Por Paises, Rango de Edad y Género" 
              :chartOptions="totalViajeros.chartOptions" :data="totalViajeros.series" type="pie">
                <template #filtro>
                  <b-container fluid class="mx-0 px-0">

                    <b-row>
                      <b-col cols="12" md="4">
                        <b-form-group label="Pais">
                          <v-select v-model="filtro.pais" :options="paises" :reduce="option => option.id" 
                            label="pais" @input="cargarDashboard">
                          </v-select>
                        </b-form-group>
                      </b-col>

                      <b-col cols="12" md="4">
                          <b-form-group label="Edades">
                            <v-select v-model="filtro.edades" :options="edades" :reduce="option => option.value" 
                              label="label" @input="cargarDashboard">
                            </v-select>
                          </b-form-group>
                      </b-col>

                        <b-col cols="12" md="4">
                          <b-form-group label="Genero">
                            <v-select v-model="filtro.genero" :options="generos" :reduce="option => option.value" 
                              label="label" @input="cargarDashboard">
                            </v-select>
                          </b-form-group>
                      </b-col>

                    </b-row>
                    
                  </b-container>
                </template>
              </apex-chart>
          </b-col>
        </b-row>

      </b-container>

  </section>
</template>

<script>

import {
  BContainer, 
  BRow, 
  BCol,
  BFormGroup

} from 'bootstrap-vue'

import vSelect from 'vue-select'

import { ref, onMounted, watch, toRefs, computed } from 'vue';

// import StatisticCardWithLineChart from 'components/dashboard/StaticCardWithLineChart.vue'
// import TarjetasAgrupadasStaticas from 'components/dashboard/TarjetasAgrupadasStaticas.vue';

import store from '@/store';
// import ApexChart from 'components/ApexChart/ApexChart.vue';

import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

// import ChartjsPolarArea from 'components/charts/ChartjsPolarArea.vue'

import { chartColors} from '@core/utils/utils';
import { $themeColors } from '@themeConfig'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useDireccion from '@core/utils/useDireccion.js'

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  
  components: {
    BRow,
    BCol,
    BContainer,
    StatisticCardHorizontal,
    TotalViajeros:() => import('components/TotalViajeros.vue'),
    ApexChart:() => import('components/ApexChart/ApexChart.vue'),
    vSelect,
    BFormGroup,
    flatPickr

  },
  
  setup(props){  
    const { totalViajeros } = toRefs(store.state.dashboard)
    const siteTraffic = ref({});

    const filtro = ref({
      pais:null,
      edades:null,
      genero:null

    })  

    const edades = ref([
      {
        label:'De 12 a 18 años',
        value:[12,18],
      },
      {
        label: 'De 19 a 27 años',
        value: [19, 27],
      },
      {
        label: 'De 28 a 35 años',
        value: [28, 35],
      },
      {
        label: 'De 36 a 45 años',
        value: [36, 45],
      },
      {
        label: 'De 46 a 60 años',
        value: [46, 60],
      },
      {
        label: 'De 61 a 100 años',
        value: [61, 100],
      }
    ])

    const generos = ref([
      {
        label:'Masculino',
        value:1,

      },
      {
        label: 'Femeninno',
        value: 2,

      }
    ])

    const {
      paises
    } = useDireccion();

    const cargarDashboard = () => {

      store.dispatch('dashboard/getTotalViajeros',filtro.value).then(() => {

      })

    
    }

    cargarDashboard();

    return {
      siteTraffic,
      saldoSistema:computed(() => store.getters['sistema/saldo']),
      filtro,
      paises,
      edades,
      generos,
      cargarDashboard,
      totalViajeros
    };

  }


}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
