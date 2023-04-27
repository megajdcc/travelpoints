<template>
  <section id="dashboard">
      <!-- Tablero Admin - Desarrollador -->

      <b-container fluid>

        <b-row>
          <b-col cols="12" md="4">

          <medal-card title="Estatus del Promotor" subtitle="Por Registros de viajeros" :data="viajeros_referidos" 
          v-if="$can('read','Tablero medal card promotor') && rolUser == 'Promotor'" :medal="usuario.status" 
          :legendTooltip="getLegendaStatusPromotor(usuario.status)" :text-footer="getLegendaStatusPromotor(usuario.status)" />
            
          <statistic-card-horizontal 
            icon="fa-money-bill" 
            statisticTitle="Balance TravelPoints" 
            color="success"
            colorIcon="dark"
            colorText="text-white" 
            v-if="$can('read','Tablero balance travelpoints')" >

            {{  saldoSistema | currency  }}
          
          </statistic-card-horizontal>

          <statistic-card-horizontal 
            icon="fa-money-bill" 
            statisticTitle="Mi saldo" 
            color="success"
            colorIcon="dark"
            colorText="text-white" 
            v-if="['Promotor','Coordinador','Lider'].includes(usuario.rol ? usuario.rol.nombre : '')" >

            {{  miSaldo | currency({currency:miDivisa})  }}
          
          </statistic-card-horizontal>


          <statistic-card-horizontal 
            icon="fa-percent" 
            statisticTitle="Viajeros Activos" 
            color="dark"
            colorIcon="success"
            colorText="text-white"
            v-if="$can('read', 'Tablero viajeros activos')">

            {{  viajerosActivos  }} %

            <template #filtro>
             <flat-pickr v-model="filtro.rango_fecha" :config="configRangoFecha" 
             class="form-control form-control-sm mt-2"
             placeholder="Rango de fecha" />

            </template>
          
          </statistic-card-horizontal>

          <statistic-card-horizontal 
              icon="fa-map-location" 
              statisticTitle="Destinos Activos" 
              color="dark"
              colorIcon="success"
              colorText="text-white" 
              v-if="$can('read', 'Tablero destinos activos')">
              {{ destinosActivos }} 
          </statistic-card-horizontal>


           <statistic-card-horizontal 
                icon="fa-users-gear" 
                statisticTitle="Total operaciones TravelPoints" 
                color="danger"
                colorIcon="dark"
                colorText="text-white" 
                v-if="$can('read', 'Tablero total operaciones travelpoints')">
                {{ operacionesTravel }} 
            </statistic-card-horizontal>

          </b-col>

          <b-col cols="12" md="8">
             <map-chart title="Total Paises activos" subtitulo="Con almenos un destino activo" :series="paisesActivos" v-if="$can('read', 'Tablero total paises activos')" ></map-chart>

              <apex-chart titulo="Total viajeros registrados " :subtitulo="`Mensuales del año ${getFecha(new Date(),'YYYY')}` " 
                  :chartOptions="viajerosTotalesAnual.chartOptions" :data="viajerosTotalesAnual.series" type="line" :height="320" v-if="$can('read','Total viajeros registrados promotor') && ['Promotor'].includes(usuario.rol ? usuario.rol.nombre : '')" >

                  <template #filtro>
                    <b-container fluid>
                      <b-row>
                        <b-col cols="12" md="6">
                           <statistic-card-horizontal 
                          icon="fa-chart-line" 
                          statisticTitle="Total Viajeros registrados" 
                          color="primary"
                          colorIcon="white"
                          colorText="text-white" 
                       
                           >

                          {{ totalViajerosRegistrados }}
                  
                        </statistic-card-horizontal>
                        </b-col>
                        <b-col cols="12" md="6">
                          <statistic-card-horizontal 
                            icon="fa-chart-line" 
                            statisticTitle="Total Viajeros con consumos" 
                            color="danger"
                            colorIcon="white"
                            colorText="text-white" 
                          
                             >

                            {{ totalViajerosConsumos }}
                  
                            </statistic-card-horizontal>
                        </b-col>
                      </b-row>
                    </b-container>
           
                  </template>

              </apex-chart>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <el-divider content-position="left" v-if="$can('read', 'Tablero total negocios activos') || 
             $can('read', 'Tablero total viajeros') ">Destinos</el-divider>
          </b-col>
          <b-col cols="12" md="6">
              <!-- Destinos Activos -->
              <apex-chart titulo="Total negocios activos" subtitulo="Por Destinos" 
              :chartOptions="totalDestinosActivos.chartOptions" :data="totalDestinosActivos.series" type="bar" :height="400" v-if="$can('read', 'Tablero total negocios activos')" > 
            
              </apex-chart>
          </b-col>

          <b-col cols="12" md="6">
              <!-- TOtal Viajeros -->
              <apex-chart titulo="Total Viajeros" subtitulo="Por Paises, Rango de Edad y Género" 
              :chartOptions="totalViajeros.chartOptions" :data="totalViajeros.series" type="pie" :height="320"    v-if="$can('read', 'Tablero total viajeros')" >
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

        <el-divider content-position="left" v-if="$can('read', 'Tablero total negocios afiliados') || $can('read', 'Tablero porcentaje negocios con operaciones registradas')" >Negocios Turísticos</el-divider>
        <b-row>

          <b-col cols="12" md="6" >
             <!-- Total Negocios Afiliados -->
              <apex-chart titulo="Total negocios afiliados" subtitulo="Por Paises" 
                :chartOptions="negociosAfiliados.chartOptions" :data="negociosAfiliados.series" type="bar" :height="350"  v-if="$can('read', 'Tablero total negocios afiliados')"> 
          
                </apex-chart>
          </b-col>

          <b-col cols="12" md="6" >
             <!-- Porcentaje de Negocios con operación Registrada -->
                <apex-chart titulo="Porcentaje de Negocios " subtitulo="Con operación registradas" 
                :chartOptions="porcentajeNegocio.chartOptions" :data="porcentajeNegocio.series" type="donut" :height="450" v-if="$can('read', 'Tablero porcentaje negocios con operaciones registradas')"> 
          
                </apex-chart>
            
          </b-col>

        </b-row>

        <b-row>
          <b-col cols="12">
            <tarjetas-agrupadas-staticas style="min-height:180px" title="Gasto turístico" isFiltro 
            @changeFiltro="cargarGastosTuristicos" :items="gastosTuristicos.items" 
            :filtro="filtro_gastos_turisticos" :fecha="gastosTuristicos.ultima_fecha"
            v-if="$can('read', 'Tablero gasto turistico')"
            />
          </b-col>
           <b-col cols="12">
              <tarjetas-agrupadas-staticas style="min-height:180px" title="Tienda de Regalos" 
                  :items="tiendaRegalos.items" :fecha="tiendaRegalos.ultima_fecha"
                  v-if="$can('read', 'Tablero tienda de regalos')"/>
            </b-col>  
        </b-row>

         <el-divider content-position="left" v-if="$can('read', 'Tablero total promotores registrados') || $can('read', 'Tablero total coordinadores registrados') || $can('read', 'Tablero total comisiones generadas pagadas y por pagar')" >Promotores</el-divider>

         <b-row>
          <b-col cols="12" md="6">
               <apex-chart titulo="Total promotores registrados" subtitulo="Activos / Inactivos" 
                :chartOptions="totalPromotores.chartOptions" :data="totalPromotores.series" type="pie" :height="320" v-if="$can('read', 'Tablero total promotores registrados')" >
                </apex-chart>
          </b-col>
           <b-col cols="12" md="6">
                <apex-chart titulo="Total coordinadores registrados" subtitulo="Activos / Inactivos" 
                  :chartOptions="totalCoordinadores.chartOptions" :data="totalCoordinadores.series" type="pie" :height="320" v-if="$can('read', 'Tablero total coordinadores registrados')">
                  </apex-chart>
            </b-col>

             <b-col cols="12" md="6">
                  <apex-chart titulo="Total comisiones generadas" subtitulo="Pagadas y por pagar" 
                    :chartOptions="totalComisionesGeneradas.chartOptions" :data="totalComisionesGeneradas.series" type="pie" :height="320" v-if="$can('read', 'Tablero total comisiones generadas pagadas y por pagar')">
                  </apex-chart>
              </b-col>
         </b-row>


         <template v-if="usuario.rol.nombre == 'Promotor'">

          <b-row>
            <b-col cols="12" >
              <movimientos />
            </b-col>
          </b-row>
        </template>

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

import {getFecha} from '@core/utils/utils';

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
    flatPickr,
    MapChart:() => import('components/highcharts/MapChart.vue'),
    TarjetasAgrupadasStaticas:() => import('components/dashboard/TarjetasAgrupadasStaticas.vue'),
    MedalCard:() => import('components/dashboard/MedalCard.vue'),
    movimientos: () => import('views/socio/perfil/cuenta.vue')
  },
  
  setup(props){  
    
    const { totalViajeros, 
      viajerosActivos, 
      destinosActivos, 
      totalDestinosActivos,
      paisesActivos, 
      negociosAfiliados, 
      porcentajeNegocio, 
      gastosTuristicos,
      tiendaRegalos,
      totalPromotores,
      totalCoordinadores,
      totalComisionesGeneradas,
      operacionesTravel,
      viajerosTotalesAnual,
      totalViajerosRegistrados,
      totalViajerosConsumos
     } 
    = toRefs(store.state.dashboard)
    const viajeros_referidos = ref(0)
    const siteTraffic = ref({});
     const rolUser = computed(() => store.getters['usuario/rolUser'])
     const {usuario} = toRefs(store.state.usuario)
     const filtro_gastos_turisticos = ref({
      pais_id: null,
      rango_fecha: null,
      destino_id: null,
      negocio_id: null
    })
    
    const configRangoFecha = ref({
      mode: "range",
      maxDate: "today",
      dateFormat: "Y-m-d",
      conjunction:','

    })

    const filtro = ref({
      pais:null,
      edades:null,
      genero:null,
      rango_fecha:null
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

      store.dispatch('dashboard/cargarViajerosActivos',filtro.value).then((data) => {
      })

       store.dispatch('dashboard/cargarDestinosActivos', filtro.value).then((data) => {
      })

      store.dispatch('dashboard/cargarDestinosActivosChart').then((data) => {

      });

      store.dispatch('dashboard/cargarPaisesActivos').then(() => {
        
      });

      store.dispatch('dashboard/cargarNegociosAfiliados');
      store.dispatch('dashboard/cargarPorcentajeNegocio');
      store.dispatch('dashboard/fetchTotalPromotores');
      store.dispatch('dashboard/fetchTotalCoordinadores');
      store.dispatch('dashboard/fetchTotalComisionesGeneradas');
      store.dispatch('dashboard/getTotalOperacionesTravel');
      store.dispatch('dashboard/getTotalViajerosRegistradoAnual');

      if(rolUser.value == 'Promotor'){
        store.dispatch('usuario/getStatusPromotor').then((data) => {
          viajeros_referidos.value = data.ultimo_trimestre;
        })
      }

      fetchGastosTuristicos()
      fetchTiendaRegalos()
    
    }

    const fetchGastosTuristicos = () => {
      store.dispatch('dashboard/fetchGastosTuristicos',filtro_gastos_turisticos.value).then(({data}) => {

      })
    }

    const fetchTiendaRegalos = () => {
       store.dispatch('dashboard/fetchTiendaRegalos')
    }

    watch([() => filtro.value.rango_fecha],() => cargarDashboard());
    cargarDashboard();

    const cargarGastosTuristicos = () => {
      fetchGastosTuristicos()
    }

    const cargarTiendaRegalos = () => {
      fetchTiendaRegalos();
    }


    return {
      siteTraffic,
      saldoSistema:computed(() => store.getters['sistema/saldo']),
      filtro,
      paises,
      edades,
      generos,
      cargarDashboard,
      totalViajeros,
      totalDestinosActivos,
      configRangoFecha,
      viajerosActivos,
      viajerosTotalesAnual,
      destinosActivos,
      paisesActivos,
      negociosAfiliados,
      porcentajeNegocio,
      cargarGastosTuristicos,
      cargarTiendaRegalos,
      filtro_gastos_turisticos,
      gastosTuristicos,
      tiendaRegalos,
      totalPromotores,
      totalCoordinadores,
      totalComisionesGeneradas,
      operacionesTravel,
      rolUser,
      viajeros_referidos,
      usuario,
      miSaldo:computed(() => store.getters['usuario/miSaldo']),
      miDivisa:computed(() => store.getters['usuario/miDivisa']),
      getLegendaStatusPromotor:(status) => {
        let legenda = ['Activo, con al menos un Viajero al mes','En peligro, no registra nuevos viajeros en los ultimos 30 días','Inactivo, no registra nuevos viajeros en los ultimos 90 días'];

        return legenda[status - 1];

      },
      getFecha,
      totalViajerosRegistrados,

      totalViajerosConsumos
    };

  }


}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
