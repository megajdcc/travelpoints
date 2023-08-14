<template>
    <section id="dashboard">
        <b-container fluid>
          <b-row>
          <b-col cols="12" md="4">

            <medal-card title="Estatus del Lider" subtitle="Por promotores activos" :data="promotores_activos"
              v-if="$can('read', 'Tablero medal card lider') && rolUser == 'Lider'" :medal="usuario.status"
              :legendTooltip="getLegendaStatusLider(usuario.status)" :text-footer="getLegendaStatusLider(usuario.status)"
              legend="Promotores" />

            <medal-card title="Estatus del Coordinador" subtitle="Por lideres activos" :data="lideres_activos"
              v-if="$can('read', 'Tablero medal card coordinador') && rolUser == 'Coordinador'" :medal="usuario.status"
              :legendTooltip="getLegendaStatusCoordinador(usuario.status)"
              :text-footer="getLegendaStatusCoordinador(usuario.status)" legend="Lideres" />

            <statistic-card-horizontal icon="fa-money-bill" statisticTitle="Balance" color="success"
              colorIcon="dark" colorText="text-white" :statistic="saldoSistema" v-if="$can('read', 'Tablero balance travelpoints')">

              <template #statistic="{ statistic }">
                 {{ isoSistema }}{{ statistic | currency({ currency: isoSistema }) }}
              </template>

            </statistic-card-horizontal>
         
            <statistic-card-horizontal icon="fa-map-location" statisticTitle="Destinos Activos" color="dark"
              colorIcon="success" colorText="text-white" v-if="$can('read', 'Tablero destinos activos')" :statistic="destinosActivos">

              <template #statistic="{ statistic }">
                   {{ statistic }} 
              </template>

            </statistic-card-horizontal>


            <statistic-card-horizontal icon="fa-users-gear" statisticTitle="Total operaciones TravelPoints" color="danger"
              colorIcon="dark" colorText="text-white" v-if="$can('read', 'Tablero total operaciones travelpoints')" :statistic="operacionesTravel">

              <template #statistic="{ statistic }">
                    {{ statistic }} 
              </template>
           
            </statistic-card-horizontal>

            <statistic-card-horizontal icon="fa-sack-dollar" statisticTitle="Comisiones" color="warning" colorIcon="dark"
              colorText="text-white"
              v-if="$can('read', 'Comisiones cobradas y por cobrar') && ['Lider'].includes(usuario.rol ? usuario.rol.nombre : '')">

              <section class="d-flex flex-wrap">
                <strong class="d-flex flex-column">
                  {{ comisiones_cobradas | currency }}
                  <span>Cobradas</span>

                </strong>

                <strong class="ml-1 d-flex flex-column">
                  {{ comisiones_por_cobrar | currency }}
                  <span>Por cobrar</span>
                </strong>

              </section>


              <template #filtro>
                <flat-pickr v-model="filtro.fecha" :config="{
                  dateFormat: 'Y-m',
                  mode: 'single',
                  enableTime: false,
                }" class="form-control form-control-sm mt-2" placeholder="Fecha Mes y Año" />

              </template>

            </statistic-card-horizontal>


            <statistic-card-horizontal icon="fa-user-check" statisticTitle="Promotores Activos e Inactivos" color="primary"
              colorIcon="dark" colorText="text-white"
              v-if="$can('read', 'Status de promotores') && ['Lider'].includes(usuario.rol ? usuario.rol.nombre : '')">

              <section class="d-flex flex-wrap">

                <strong class="d-flex flex-column">
                  {{ promotores_status.activos }}
                  <span>Activos</span>

                </strong>

                <strong class="ml-1 d-flex flex-column">
                  {{ promotores_status.inactivos }}
                  <span>Inactivos</span>
                </strong>

              </section>

            </statistic-card-horizontal>


            <statistic-card-horizontal icon="fa-user-check" statisticTitle="Lideres Activos e Inactivos" color="primary"
              colorIcon="dark" colorText="text-white"
              v-if="$can('read', 'Status de coordinadores') && ['Coordinador'].includes(usuario.rol ? usuario.rol.nombre : '')">

              <section class="d-flex flex-wrap">

                <strong class="d-flex flex-column">
                  {{ lideres_status.activos }}
                  <span>Activos</span>

                </strong>

                <strong class="ml-1 d-flex flex-column">
                  {{ lideres_status.inactivos }}
                  <span>Inactivos</span>
                </strong>

              </section>

            </statistic-card-horizontal>

            <!-- Eficacia del mes -->
            <apex-chart titulo="Eficacia de viajeros" subtitulo="% de viajeros con consumos registrados"
              :chartOptions="porcentajeEficacia.chartOptions" :data="porcentajeEficacia.series" type="radialBar"
              :height="320"
              v-if="$can('read', 'Tablero eficacia lider') && ['Lider'].includes(usuario.rol ? usuario.rol.nombre : '')">

            </apex-chart>


            <!-- Eficacia del mes por promotores -->
            <apex-chart titulo="Eficacia de promotores" subtitulo="% de promotores con viajeros con registro de consumos"
              :chartOptions="porcentajeEficaciaPromotores.chartOptions" :data="porcentajeEficaciaPromotores.series"
              type="radialBar" :height="320"
              v-if="$can('read', 'Tablero eficacia lider') && ['Lider'].includes(usuario.rol ? usuario.rol.nombre : '')">

            </apex-chart>

            <!-- Porcentaje de uso del sistema viajeros -->
            <apex-chart titulo="Porcentaje de uso del sistema" subtitulo="Sobre el total de viajeros activos en el mes"
              :chartOptions="porcentajeUsoViajeros.chartOptions" :data="porcentajeUsoViajeros.series" type="radialBar"
              :height="320" v-if="['Coordinador'].includes(usuario.rol ? usuario.rol.nombre : '')">

            </apex-chart>

          </b-col>

          <b-col cols="12" md="8">
            <map-chart title="Total Paises activos" subtitulo="Con almenos un destino activo" :series="paisesActivos"
              v-if="$can('read', 'Tablero total paises activos')"></map-chart>


            <!-- Eficacia de Promotores -->
            <apex-chart titulo="Eficacia de Promotores" subtitulo="Totales / Activos"
              :chartOptions="eficaciaPromotores.chartOptions" :data="eficaciaPromotores.series" type="line" :height="320"
              v-if="$can('read', 'Tablero eficacia promotores') && ['Lider'].includes(usuario.rol ? usuario.rol.nombre : '')">

            </apex-chart>

            <!-- Viajeros Totales -->
            <apex-chart titulo="Viajeros totales" subtitulo="Ultimos tres meses"
              :chartOptions="viajerosTotales.chartOptions" :data="viajerosTotales.series" type="line" :height="320"
              v-if="$can('read', 'Tablero viajeros totales') && ['Lider'].includes(usuario.rol ? usuario.rol.nombre : '')">

              <template #filtro>
                <b-container fluid>
                  <b-row>
                    <b-col cols="12" md="6">
                      <b-form-group label="Promotor" description="Seleccione un promotor, si gusta filtrar">
                        <v-select v-model="filtro.promotor_id" :options="misPromotores" :reduce="option => option.id"
                          label="nombre">
                        </v-select>
                      </b-form-group>
                    </b-col>

                  </b-row>
                </b-container>

              </template>

            </apex-chart>


            <!-- Total Promotores por Lider del Coordinador -->
            <apex-chart titulo="Total Promotores" subtitulo="Por lider Activos / Inactivos"
              :chartOptions="totalPromotoresPorLider.chartOptions" :data="totalPromotoresPorLider.series" type="line"
              :height="320" v-if="['Coordinador'].includes(usuario.rol ? usuario.rol.nombre : '')">
            </apex-chart>

            <!-- Total eficacia de Promotores por coordinador -->
            <apex-chart titulo="Total Eficacia" subtitulo="De promotores"
              :chartOptions="totalEficaciaPromotoresCoordinador.chartOptions"
              :data="totalEficaciaPromotoresCoordinador.series" type="donut" :height="320"
              v-if="['Coordinador'].includes(usuario.rol ? usuario.rol.nombre : '')">

              <template #filtro>
                <b-form-group description="Filtre por promotor">
                  <v-select v-model="filtro.promotor_id" :options="promotores" :reduce="option => option.id" label="nombre"
                    placeholer="Filtre por promotor" />
                </b-form-group>
              </template>
            </apex-chart>

            <!-- Total viajeros de promotores por coordinador -->
            <apex-chart titulo="Total Viajeros" subtitulo="De promotores"
              :chartOptions="totalViajerosPorCoordinador.chartOptions" :data="totalViajerosPorCoordinador.series"
              type="line" :height="320" v-if="['Coordinador'].includes(usuario.rol ? usuario.rol.nombre : '')">

              <template #filtro>
                <b-form-group description="Filtre por promotor">
                  <v-select v-model="filtro.promotor_id" :options="promotores" :reduce="option => option.id" label="nombre"
                    placeholer="Filtre por promotor" />
                </b-form-group>
              </template>
            </apex-chart>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <el-divider content-position="left" v-if="$can('read', 'Tablero total negocios activos') ||
              $can('read', 'Tablero total viajeros')">Destinos</el-divider>
          </b-col>
          <b-col cols="12" md="6">
            <!-- Destinos Activos -->
            <apex-chart titulo="Total negocios activos" subtitulo="Por Destinos"
              :chartOptions="totalDestinosActivos.chartOptions" :data="totalDestinosActivos.series" type="bar" :height="400"
              v-if="$can('read', 'Tablero total negocios activos')">

            </apex-chart>
          </b-col>


        </b-row>

        <el-divider content-position="left"
          v-if="$can('read', 'Tablero total negocios afiliados') || $can('read', 'Tablero porcentaje negocios con operaciones registradas')">Negocios
          Turísticos</el-divider>

        <b-row>

          <b-col cols="12" md="6">
            <!-- Total Negocios Afiliados -->
            <apex-chart titulo="Total negocios afiliados" subtitulo="Por Paises"
              :chartOptions="negociosAfiliados.chartOptions" :data="negociosAfiliados.series" type="bar" :height="350"
              v-if="$can('read', 'Tablero total negocios afiliados')">

            </apex-chart>
          </b-col>

          <b-col cols="12" md="6">
            <!-- Porcentaje de Negocios con operación Registrada -->
            <apex-chart titulo="Porcentaje de Negocios " subtitulo="Con operación registradas"
              :chartOptions="porcentajeNegocio.chartOptions" :data="porcentajeNegocio.series" type="donut" :height="450"
              v-if="$can('read', 'Tablero porcentaje negocios con operaciones registradas')">

            </apex-chart>

          </b-col>

        </b-row>

        <b-row>
          <b-col cols="12">
            <tarjetas-agrupadas-staticas style="min-height:180px" title="Gasto turístico" isFiltro
              @changeFiltro="cargarGastosTuristicos" :items="gastosTuristicos.items" :filtro="filtro_gastos_turisticos"
              :fecha="gastosTuristicos.ultima_fecha" v-if="$can('read', 'Tablero gasto turistico')" />
          </b-col>
          <b-col cols="12">
            <tarjetas-agrupadas-staticas style="min-height:180px" title="Tienda de Regalos" :items="tiendaRegalos.items"
              :fecha="tiendaRegalos.ultima_fecha" v-if="$can('read', 'Tablero tienda de regalos')" />
          </b-col>
        </b-row>

        <el-divider content-position="left"
          v-if="$can('read', 'Tablero total promotores registrados') || $can('read', 'Tablero total coordinadores registrados') || $can('read', 'Tablero total comisiones generadas pagadas y por pagar')">Promotores</el-divider>

        <b-row>
          <b-col cols="12" md="6">
            <apex-chart titulo="Total promotores registrados" subtitulo="Activos / Inactivos"
              :chartOptions="totalPromotores.chartOptions" :data="totalPromotores.series" type="pie" :height="320"
              v-if="$can('read', 'Tablero total promotores registrados')">
            </apex-chart>
          </b-col>
          <b-col cols="12" md="6">
            <apex-chart titulo="Total coordinadores registrados" subtitulo="Activos / Inactivos"
              :chartOptions="totalCoordinadores.chartOptions" :data="totalCoordinadores.series" type="pie" :height="320"
              v-if="$can('read', 'Tablero total coordinadores registrados')">
            </apex-chart>
          </b-col>

          <b-col cols="12" md="6">
            <apex-chart titulo="Total comisiones generadas" subtitulo="Pagadas y por pagar"
              :chartOptions="totalComisionesGeneradas.chartOptions" :data="totalComisionesGeneradas.series" type="pie"
              :height="320" v-if="$can('read', 'Tablero total comisiones generadas pagadas y por pagar')">
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
        TarjetasAgrupadasStaticas: () => import('components/dashboard/TarjetasAgrupadasStaticas.vue'),
        MedalCard: () => import('components/dashboard/MedalCard.vue'),
        movimientos: () => import('views/socio/perfil/cuenta.vue'),
        PromotorListado: () => import('views/promotores/list.vue'),
        LideresListado: () => import('views/lideres/list.vue'),
        RevenueReport: () => import('components/cards/RevenueReport.vue'),
        StatisticCardWithAreaChart,
        VueApexCharts
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
            porcentajeUsoViajeros

        } = toRefs(store.state.dashboard)

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
            promotor_id: null
        })

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

            store.dispatch('dashboard/getTotalViajeros', filtro.value).then(() => { })

            store.dispatch('dashboard/cargarViajerosActivos', filtro.value).then((data) => {
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
            store.dispatch('dashboard/getTotalComisiones', filtro.value);

            if (['Lider'].includes(usuario.value.rol ? usuario.value.rol.nombre : '')) {
                store.dispatch('dashboard/promotoresStatus')
            }

            if (rolUser.value == 'Promotor') {
                cargarPromotor()
            }

            if (rolUser.value == 'Lider') {
                cargarLider()
            }

            if (rolUser.value == 'Coordinador') {
                cargarCoordinador()
            }


            fetchGastosTuristicos()
            fetchTiendaRegalos()

        }

        const cargarPromotor = () => {

            store.dispatch('usuario/getStatusPromotor').then(({ referidos }) => {
                viajeros_referidos.value = referidos.ultimo_trimestre;
            })


            getAnoPorMes(ano.value)

            getAcumuladoPorAno()

            getEfectividad()

        }

        const cargarLider = () => {
            store.dispatch('usuario/getStatusLider').then(({ promotores_activos: val }) => {
                promotores_activos.value = val.ultimo_trimestre;
            })

            store.dispatch('dashboard/getEficaciaPromotores')
            store.dispatch('dashboard/getTotalesViajeros', filtro.value)

            store.dispatch('dashboard/getMisPromotores')
            store.dispatch('dashboard/getEficaciaMes')
            store.dispatch('dashboard/getEficaciaMesPromotores')
        }

        const cargarCoordinador = () => {
            store.dispatch('usuario/getStatusCoordinador').then(({ lideres_activos: val }) => {
                lideres_activos.value = val.ultimo_trimestre;
            })

            store.dispatch('dashboard/coordinadoresStatus')
            store.dispatch('dashboard/getTotalPromotoresPorLider');

            store.dispatch('dashboard/getEficaciaPromotoresCoordinador', filtro.value);

            store.dispatch('usuario/getPromotores').then((data) => {
                promotores.value = data
            })

            store.dispatch('dashboard/getTotalViajerosPorCoordinador', filtro.value)

            store.dispatch('dashboard/getPorcentajeUsoViajeros')
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

        watch([() => filtro.value.rango_fecha], () => cargarDashboard());
        watch(()  => filtro.value.promotor_id, () => {

            if (rolUser.value == 'Lider') {
                store.dispatch('dashboard/getTotalesViajeros', filtro.value)
            }

            if (rolUser.value == 'Coordinador') {
                store.dispatch('dashboard/getEficaciaPromotoresCoordinador', filtro.value)
                store.dispatch('dashboard/getTotalViajerosPorCoordinador', filtro.value)
            }

        })
        watch([() => filtro.value.fecha], () => store.dispatch('dashboard/getTotalComisiones', filtro.value))
        watch(ano, (val) => getAnoPorMes(val))

        onActivated(() => cargarDashboard());
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
            porcentajeEfectividad
        }
    }

}
</script>