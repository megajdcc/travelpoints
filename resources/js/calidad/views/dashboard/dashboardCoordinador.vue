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

              <!-- <apex-chart titulo="Total viajeros registrados "
            :subtitulo="`Mensuales del año ${getFecha(new Date(), 'YYYY')}`"
            :chartOptions="viajerosTotalesAnual.chartOptions" :data="viajerosTotalesAnual.series" type="line"
            :height="320"
            v-if="$can('read', 'Total viajeros registrados promotor') && ['Promotor'].includes(usuario.rol ? usuario.rol.nombre : '')">

            <template #filtro>
              <b-container fluid>
                <b-row>
                  <b-col cols="12" md="6">
                    <statistic-card-horizontal icon="fa-chart-line" statisticTitle="Total Viajeros registrados"
                      color="primary" colorIcon="white" colorText="text-white">

                      {{ totalViajerosRegistrados }}

                    </statistic-card-horizontal>
                  </b-col>
                  <b-col cols="12" md="6">
                    <statistic-card-horizontal icon="fa-chart-line" statisticTitle="Total Viajeros con consumos"
                      color="danger" colorIcon="white" colorText="text-white">

                      {{ totalViajerosConsumos }}

                    </statistic-card-horizontal>
                  </b-col>
                </b-row>
              </b-container>

            </template>

          </apex-chart> -->

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
            <b-row>
              <b-col cols="12">
                <!-- <LideresListado @change="cargarDashboard()" /> -->
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

  components: {
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BLink,
    BButton,
    BCard,
    BCardBody,
    BCardTitle,
    BProgress,
    vSelect,
    VueApexCharts,
    StatisticCardHorizontal,
    flatPickr,
    StatisticCardWithAreaChart
  },

  setup(props) {

  }
}
</script>