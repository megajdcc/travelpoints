<template>
    <section id="dashboard">
        <b-container fluid class="px-0">

          <!-- Origen de los Viajeros -->
          <b-row>
            <b-col cols="12">
            <b-card   v-if="$can('read', 'Tablero total paises activos')" body-class="pb-0" header-class="display-5" footer-class="d-none" >
              <template #header>
                <h3>Origen de tus viajeros registrados</h3>
              </template>
              <b-container fluid class="px-0 mx-0">
                <b-row>
                
                  <b-col cols="12" md="8">
                    <map-chart :series="paisesActivos" :chartOption="chartOptionMap"></map-chart>
                  </b-col>
                  <b-col cols="12" md="4" class="px-0 mb-0">
                    <section class="mb-1">
                       <b class="mb-1 d-block">Por País</b>
                        <table class=" w-100 " style="max-height: 100px !important; overflow-y: scroll; height:50px">
                          <tr v-for="({ pais, porcentaje }, i) in viajerosPorPais" :key="i" :style="{
                            backgroundColor: colorRand()
                          }">
                            <td style="width:10%; color:black !important;padding: 0.2rem;">{{ porcentaje }}%</td>
                            <td style="color:black !important; padding: 0.2rem;">{{ pais }}</td>
                          </tr>
                        </table>
                    </section>

                    <section>
                      <b class="mb-1 d-block">Dominación Mundial</b>
                            <table class="table table-hover table-sm w-100">
                              <tr>
                                <td style="width:10%; vertical-align: center;" class="">
                                  <font-awesome-icon icon="fas fa-chart-line" size="2xl" />
                                </td>
                                <td class="">
                                  <span> Total Paises:</span>
                                  <h4 class="my-0">{{ viajerosPorPais.length }} / 195</h4>
                                </td>
                              </tr>
                              <tr>
                                <td style="width:10%; vertical-align: center;" class="">
                                  <font-awesome-icon icon="fas fa-percent" size="2xl" />
                                </td>
                                <td class="">
                                  <section class="d-flex align-items-center">

                                    <h4 class="mr-1 py-0 my-0"> {{ dominacionMundial }}%</h4>de dominación
                                  </section>

                                </td>
                              </tr>

                            </table>
                    </section>
                    <statistic-card-horizontal icon="fa-map-location" statisticTitle="Total Destinos Activos" color="danger"
                      colorIcon="success" colorText="text-white" v-if="$can('read', 'Tablero destinos activos')" :statistic="destinosActivos" :to="{ name: 'destino.lists' }" class=" mt-1 ">

                      <template #statistic="{ statistic }">
                          {{ statistic }} 
                      </template>

                    </statistic-card-horizontal>

                    
                  </b-col>
                    <!-- <b-col cols="12" class="d-flex justify-content-start">

                     <statistic-card-horizontal icon="fa-money-bill" statisticTitle="Balance" color="success"
                        colorIcon="dark" colorText="text-white" :statistic="saldoSistema" v-if="$can('read', 'Tablero balance travelpoints')" :to="{ name: 'movimientos' }" class="flex-grow-1">
                          <template #statistic="{ statistic }">
                            {{ isoSistema }}{{ statistic | currency({ currency: isoSistema }) }}
                          </template>
                      </statistic-card-horizontal>
                
                    


                      <statistic-card-horizontal icon="fa-users-gear" statisticTitle="Total operaciones TravelPoints" color="danger"
                        colorIcon="dark" colorText="text-white" v-if="$can('read', 'Tablero total operaciones travelpoints')" :statistic="operacionesTravel" class=" ml-1" 
                        style="flex:0 1 300px">

                        <template #statistic="{ statistic }">
                              {{ statistic }} 
                        </template>
                  
                      </statistic-card-horizontal>
                  </b-col> -->

                </b-row>
              </b-container>
            </b-card>
            </b-col>
        </b-row>


        <!-- negocios -->
         <b-row>
              <b-col cols="12">
              <b-card body-class="pb-0">
                 <template #header>
                  <h3>Negocios</h3>
                </template>
                <b-container fluid class="px-0 mx-0">
                  <b-row>
                    <b-col cols="12" md="5">
                      <donut-chart 
                        title="Total Negocios" 
                        subtitulo="Por destino"
                        :series="totalNegociosPorDestino" 
                        v-if="$can('read', 'Tablero total negocios afiliados')"
                        /> 
                    </b-col>

                    <b-col cols="12" md="7">
                      <b class="text-center d-block font-weight-bolder" style="font-size:1.5rem">Total Negocios</b>
                      <b class="text-center d-block">Por Paises / Registrados y Activos</b>

                    <map-chart :series="negociosAfiliados" :chartOption="chartOptionMap"></map-chart>

                  
                    </b-col>

                   
                  </b-row>
                </b-container>
              </b-card>
              </b-col>
          </b-row>

          <!-- Viajeros -->
          <b-row>
                <b-col cols="12">
                <b-card  body-class="pb-0">
                  <template #header>
                    <h3>Viajeros</h3>
                  </template>
                  <b-container fluid class="px-0 mx-0">
                    <b-row>
                      <b-col cols="12" md="7" class="d-flex flex-column justify-content-around">
                        <b class="text-center d-block font-weight-bolder" style="font-size:1.5rem">Viajeros Por pais</b>
                        <map-chart :series="totalViajerosPorPais" :chartOption="{...chartOptionMap,...{chart:{...chartOptionMap.chart,...{ height: '90%' }}}}" class="flex-grow-1"></map-chart>
                        
                      </b-col>

                      <b-col cols="12" md="5">
                        

                        <donut-chart 
                            title="Total Viajeros" 
                            subtitulo="Activos con o sin consumos registrados / Sin actividad"
                            :series="totalViajerosActividad" 
                            /> 
                            <statistic-card-horizontal icon="fa-users" statisticTitle="Total Viajeros" color="warning"
                            colorIcon="black" colorText="text-primary" :statistic="cantidadViajeros" class="mt-1" >

                            <template #statistic="{ statistic }">
                                <h1 :class="[`text-${colorText}`, 'font-weight-bolder']">{{ statistic }} </h1>
                            </template>

                          </statistic-card-horizontal>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-card>
                </b-col>
          </b-row>

          <!-- Equipo Promotor -->
          <b-row>
            <b-col cols="12">
                <b-card  body-class="pb-0 mb-0" class="mb-0 pb-0">
                  <template #header>
                    <h3>Equipo Promotor</h3>
                  </template>
                  <b-container fluid class="px-0 mx-0">
                    <b-row>
                      <b-col cols="12" class="d-flex flex-column justify-content-around">
                        <b class="text-center d-block font-weight-bolder mb-1" style="font-size:1.5rem">Coordinadores, Líderes y Promotores</b>
                        <map-chart :series="equipoPromotor" :chartOption="{...chartOptionMap,...{chart:{...chartOptionMap.chart,...{ height: ['xs','sm'].includes(currentBreakPoint) ?'100%' : '50%' }}}}" class="flex-grow-1"></map-chart>
                        
                      </b-col>

                      <b-col cols="12" class="d-flex justify-content-between flex-wrap">
                          <statistic-card-horizontal icon="fa-user-tie" statisticTitle="Total Coordinadores" color="primary"
                              colorIcon="black" colorText="text-white" :statistic="totalCoordinadores" class="mt-1  flex-grow-1" >

                              <template #statistic="{ statistic }">
                                  <h1 :class="[`text-${colorText}`, 'font-weight-bolder']">{{ statistic }} </h1>
                              </template>

                          </statistic-card-horizontal>


                          <statistic-card-horizontal icon="fa-users-line" statisticTitle="Total Líderes" color="danger"
                            colorIcon="black" colorText="text-white" :statistic="totalLideres" class="mt-1  flex-grow-1 ml-md-1" >

                            <template #statistic="{ statistic }">
                                <h1 :class="[`text-${colorText}`, 'font-weight-bolder']">{{ statistic }} </h1>
                            </template>

                          </statistic-card-horizontal>


                           <statistic-card-horizontal icon="fa-users" statisticTitle="Total Promotores" color="warning"
                              colorIcon="black" colorText="text-white" :statistic="totalPromotores" class="mt-1 flex-grow-1 ml-md-1" >

                              <template #statistic="{ statistic }">
                                  <h1 :class="[`text-${colorText}`, 'font-weight-bolder']">{{ statistic }} </h1>
                              </template>

                            </statistic-card-horizontal>


                      </b-col>
                    </b-row>
                  </b-container>
                </b-card>
            </b-col>
          </b-row>


          <!-- Gasto Turísticos -->
          <b-row>
            <b-col cols="12">
              <tarjetas-agrupadas-staticas style="min-height:180px" title="Gasto turístico" isFiltro isNotFilterNegocio
                @changeFiltro="cargarGastosTuristicos" :items="gastosTuristicos.items" :filtro="filtro_gastos_turisticos"
                :fecha="gastosTuristicos.ultima_fecha" v-if="$can('read', 'Tablero gasto turistico')" class="mt-1" />
            </b-col>


            <!-- Tienda de Regalo -->
            <b-col cols="12">
                <tarjetas-agrupadas-staticas style="min-height:180px" title="Tienda de Regalos" :items="tiendaRegalos.items" hideFecha
                 v-if="$can('read', 'Tablero tienda de regalos')" class="mt-1" />
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
  BFormGroup,
  BLink,
  BButton,
  BCard,
  BCardBody,
  BCardTitle,
  BProgress

} from 'bootstrap-vue'


import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'

import { ref, onMounted, watch, toRefs, computed, onActivated, inject } from 'vue';


// import StatisticCardWithLineChart from 'components/dashboard/StaticCardWithLineChart.vue'
// import TarjetasAgrupadasStaticas from 'components/dashboard/TarjetasAgrupadasStaticas.vue';

import store from '@/store';
// import ApexChart from 'components/ApexChart/ApexChart.vue';

import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

// import ChartjsPolarArea from 'components/charts/ChartjsPolarArea.vue'

import { chartColors } from '@core/utils/utils';
import { $themeColors, $themeConfig } from '@themeConfig'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useDireccion from '@core/utils/useDireccion.js'

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { getFecha, siguienteNivel } from '@core/utils/utils';
import { kFormatter } from '@core/utils/filter'

import useMap from '@core/utils/useMap'
export default {
    
    components:{
        BRow,
        BCol,
        BContainer,
        BLink,
        BButton,
        BCardBody,
        BCard,
        BCardTitle,
        BProgress,
        StatisticCardHorizontal,
        TotalViajeros: () => import('components/TotalViajeros.vue'),
        ApexChart: () => import('components/ApexChart/ApexChart.vue'),
        vSelect,
        BFormGroup,
        flatPickr,
        MapChart: () => import('components/highcharts/MapChart.vue'),
        DonutChart: () => import('components/highcharts/DonutChart.vue'),

        TarjetasAgrupadasStaticas: () => import('components/dashboard/TarjetasAgrupadasStaticas.vue'),
        MedalCard: () => import('components/dashboard/MedalCard.vue'),
        movimientos: () => import('views/socio/perfil/cuenta.vue'),
        RevenueReport: () => import('components/cards/RevenueReport.vue'),
        StatisticCardWithAreaChart,
        VueApexCharts
    },

    setup(props){

        const totalNegociosPorDestino = ref([])
        const cantidadViajeros = ref(0)
        const totalViajerosPorPais = ref([])
        const equipoPromotor = ref([])
        const totalCoordinadores = ref(0)
        const totalLideres = ref(0)
        const totalPromotores = ref(0)


         const { totalViajeros,
            viajerosActivos,
            destinosActivos,
            paisesActivos,
            negociosAfiliados,
            gastosTuristicos,
            tiendaRegalos,
            operacionesTravel,
            viajerosTotalesAnual,
            totalViajerosRegistrados,
            totalViajerosConsumos,
            comisiones_cobradas,
            comisiones_por_cobrar,
            promotores_status,
            lideres_status,
            eficaciaPromotores,
            viajerosTotales,
            misPromotores,
            porcentajeEficacia,
            porcentajeEficaciaPromotores,
            totalPromotoresPorLider,
            totalEficaciaPromotoresCoordinador,
            totalViajerosPorCoordinador,
            porcentajeUsoViajeros,
            viajerosPorPais

        } = toRefs(store.state.dashboard)

        const totalViajerosActividad = ref([])
        const viajeros_referidos = ref(0)
        const promotores_activos = ref(0)
        const lideres_activos = ref(0)
        const { layout } = $themeConfig;
        const promotores = ref([])
        const ano = ref(new Date().getFullYear())
        const siteTraffic = ref({});
        const rolUser = computed(() => store.getters['usuario/rolUser'])
        const { usuario } = toRefs(store.state.usuario)
        const efectividad = ref({
            userReg: 0,
        })
        
        const filtro_gastos_turisticos = ref({
            pais_id: null,
            rango_fecha: null,
            destino_id: null,
            negocio_id: null
        })

        const activaciones = ref({
            nivel: 0,
            activaciones: 0
        })

        const acumulado = ref(0)
        const showSidebarRetiro = inject('showSidebarRetiro')
        const chartDataAcumulado = ref([])

        const dataRevenueReport = ref({
            saldo: 0,
            retirado: 0,
            iso: 'USD',
            chart1serie: [],
            chart2serie: [],
        })

        const configRangoFecha = ref({
            mode: "range",
            maxDate: "today",
            dateFormat: "Y-m-d",
            conjunction: ','
        })

        const filtro = ref({
            pais: null,
            edades: null,
            genero: null,
            rango_fecha: null,
            fecha: null,
            usuario_id: computed(() => usuario.value.id)
        })

        const {
          chartOptionMap,
          colorText
        } = useMap();

        const porcentajeEfectividad = computed(() => {
            if (efectividad.value.userReg > 0) {
                return [store.getters['usuario/activaciones'].activaciones * 100 / efectividad.value.userReg]
            }

            return [0];
        });

        const chartEfectividad = ref({
            series: computed(() => porcentajeEfectividad.value),
            chartOptions: {
                chart: {
                    sparkline: {
                        enabled: true,
                    },
                    dropShadow: {
                        enabled: true,
                        blur: 3,
                        left: 1,
                        top: 1,
                        opacity: 0.1,
                    },
                },
                colors: [$themeColors.danger],
                plotOptions: {
                    radialBar: {
                        offsetY: -10,
                        startAngle: 0,
                        endAngle: 350,
                        hollow: {
                            size: '65%',
                        },
                        track: {
                            background: '#ebe9f1',
                            strokeWidth: '50%',
                        },
                        dataLabels: {
                            name: {
                                show: false,
                            },
                            value: {
                                color: '#5e5873',
                                fontSize: '2.5rem',
                                fontWeight: '200',
                                fontFamily: 'Myriad Regular',
                                offsetY: 15,
                            },
                            total: {
                                show: false
                            }
                        },
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 1,
                        gradientToColors: [$themeColors.primary],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100],
                    },
                },
                stroke: {
                    lineCap: 'round',
                },
                grid: {
                    padding: {
                        bottom: 0,
                        right: 0,
                    },
                },
            },
        })

        const edades = ref([
            {
                label: 'De 12 a 18 años',
                value: [12, 18],
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
                label: 'Masculino',
                value: 1,

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

            store.dispatch('dashboard/getTotalViajeros', filtro.value)
            store.dispatch('dashboard/cargarViajerosActivos', filtro.value)
            store.dispatch('dashboard/cargarDestinosActivos', filtro.value)
            store.dispatch('dashboard/cargarDestinosActivosChart')
            store.dispatch('dashboard/cargarPaisesActivos',usuario.value.id)
            store.dispatch('dashboard/cargarNegociosAfiliados');
            store.dispatch('dashboard/cargarPorcentajeNegocio');
            store.dispatch('dashboard/fetchTotalPromotores');
            store.dispatch('dashboard/fetchTotalCoordinadores');
            store.dispatch('dashboard/fetchTotalComisionesGeneradas');
            store.dispatch('dashboard/getTotalOperacionesTravel');
            store.dispatch('dashboard/getTotalViajerosRegistradoAnual',usuario.value.id);
            store.dispatch('dashboard/getTotalComisiones', filtro.value);
            store.dispatch('dashboard/getOrigenViajerosPorPais',usuario.value.id)
            fetchGastosTuristicos()
            fetchTiendaRegalos()

            axios.get('/api/dashboard/total-negocios-por-destino').then(({data}) => {
                totalNegociosPorDestino.value = data
            })

            // Viajeros con o sin consumos

            axios.get(`/api/dashboard/get/viajeros/pie-chart`).then(({data}) => {
              totalViajerosActividad.value = data
            }).catch( e => toast.info(`No se pudo cargar la data de viajeros`))

            axios.get('/api/dashboard/get/total-viajeros').then(({data}) => {
              cantidadViajeros.value = data
            })

            axios.get('/api/dashboard/get/viajeros/por-pais').then(({data}) => totalViajerosPorPais.value = data)

            axios.get('/api/dashboard/equipo-promotor').then(({data}) => {
              equipoPromotor.value = data
            })

            axios.get(`/api/dashboard/get/total-coordinadores`).then(({data}) => {
              totalCoordinadores.value = data
            })

            axios.get(`/api/dashboard/get/total-lideres`).then(({data}) => {
              totalLideres.value = data
            })

            axios.get(`/api/dashboard/get/total-promotores`).then(({ data }) => {
              totalPromotores.value = data
            })

        }

        const fetchGastosTuristicos = () => {
            store.dispatch('dashboard/fetchGastosTuristicos', filtro_gastos_turisticos.value).then(({ data }) => {

            })
        }

        const fetchTiendaRegalos = () => {
            store.dispatch('dashboard/fetchTiendaRegalos')
        }

        const cargarGastosTuristicos = () => {
            fetchGastosTuristicos()
        }

        const cargarTiendaRegalos = () => {
            fetchTiendaRegalos();
        }

        const getAnoPorMes = (anio) => {
            ano.value = anio

            store.dispatch('usuario/getMovimientosPorMes', { anio: ano.value, usuario: usuario.value.id }).then((data) => {
                dataRevenueReport.value.chart1serie = data.graficas
                dataRevenueReport.value.chart2serie = data.graficas
                dataRevenueReport.value.saldo = data.saldo
                dataRevenueReport.value.iso = data.iso
                dataRevenueReport.value.retirado = data.retirado
            })

        }

        const getAcumuladoPorAno = () => {
            store.dispatch('usuario/getAcumuladoPorAno').then((data) => {
                acumulado.value = data.acumulado
                chartDataAcumulado.value = data.series
            })
        }

        const getEfectividad = () => {
            store.dispatch('usuario/getEfectividad').then((data) => {
                efectividad.value.userReg = data
            })
        }


        const nivel = computed(() => store.getters['usuario/activaciones'])

        watch([() => filtro.value.rango_fecha], (val) => {
          if(val){
            cargarDashboard()
          }
        });

        watch([() => filtro.value.fecha], () => store.dispatch('dashboard/getTotalComisiones', filtro.value))

        watch(ano, (val) => getAnoPorMes(val))
        cargarDashboard();

        return {
            siteTraffic,
            saldoSistema: computed(() => store.getters['sistema/saldo']),
            isoSistema: computed(() => store.getters['sistema/isoSistema']),
            filtro,
            paises,
            edades,
            generos,
            cargarDashboard,
            totalViajeros,
            configRangoFecha,
            viajerosActivos,
            viajerosTotalesAnual,
            destinosActivos,
            paisesActivos,
            negociosAfiliados,
            cargarGastosTuristicos,
            cargarTiendaRegalos,
            filtro_gastos_turisticos,
            gastosTuristicos,
            tiendaRegalos,
            totalPromotores,
            totalLideres,
            operacionesTravel,
            rolUser,
            viajeros_referidos,
            ano,
            promotores_activos,
            usuario,
            skin: computed(() => store.state.appConfig.layout.skin),
            activaciones,
            miSaldo: computed(() => store.getters['usuario/miSaldo']),
            miDivisa: computed(() => store.getters['usuario/miDivisa']),
            getLegendaStatusPromotor: (status) => {
                let legenda = ['Activo, con al menos un Viajero al mes', 'En peligro, no registra nuevos viajeros en los ultimos 30 días', 'Inactivo, no registra nuevos viajeros en los ultimos 90 días'];

                return legenda[status - 1];

            },

            getLegendaStatusLider: (status) => {
                let legenda = [
                    'Activo, con al menos un promotor activo',
                    'En peligro, no tienes promotores activos en los ultimos 30 días',
                    'Inactivo, no Tienes promotores activos en los ultimos 90 días, has perdido tu red de Promotores'
                ];

                return legenda[status - 1];

            },

            getLegendaStatusCoordinador: (status) => {
                let legenda = [
                    'Activo, con al menos dos lideres activo',
                    'En peligro, no tienes lideres activos en los ultimos 30 días',
                    'Inactivo, no Tienes lideres activos en los ultimos 90 días, has perdido tu red de Lideres'
                ];
                return legenda[status - 1];
            },

            getFecha,
            totalViajerosRegistrados,
           colorRand: colorRand,

            totalViajerosConsumos,
            comisiones_cobradas,
            comisiones_por_cobrar,
            promotores_status,
            eficaciaPromotores,
            viajerosTotales,
            misPromotores,
            porcentajeEficacia,
            porcentajeEficaciaPromotores,
            lideres_activos,
            lideres_status,
            totalPromotoresPorLider,
            totalEficaciaPromotoresCoordinador,
            promotores,
            totalViajerosPorCoordinador,
            porcentajeUsoViajeros,
            totalViajerosActividad,
            dataRevenueReport,
            chartDataAcumulado,
            getAnoPorMes,
            retirar: () => showSidebarRetiro.value = true,
            kFormatter,
            acumulado,
            nivel,
            siguienteNivel,
            chartEfectividad,
            efectividad,
            porcentajeEfectividad,
            chartOptionMap,
            viajerosPorPais,
            totalNegociosPorDestino,
            dominacionMundial: computed(() => {
              return redondeo(viajerosPorPais.value.length * 100 / 195, 2)
            }),
            cantidadViajeros,
            totalViajerosPorPais,
            colorText,
            equipoPromotor,
            totalCoordinadores,
            currentBreakPoint:computed(() => store.getters['app/currentBreakPoint'])
        }
    }

}
</script>