<template>

  <listado :actions="actions" hide-footer>

    <template #btn-action>
      <b-button variant="primary" class="d-flex align-items-center" href="/reports/descargar/activaciones" download>
        <font-awesome-icon icon="fas fa-file-pdf" class="mr-1" size="2x"/>
        Descargar
      </b-button>
    </template>
    
    <!-- Gráfica -->

    <template #header-contenido>
        <vue-apex-charts id="revenue-report-chart" ref="char1refRevenue" type="line" height="230" :options="graficaActivaciones.chartOptions"
            :series="graficaActivaciones.series" />
    </template>

    <!-- tabla -->
    <template #contenido="{ tableColumns, sortBy, isSortDirDesc,fetchData}">
      <b-table ref="refUserListTable" class="position-relative" :items="fetchData" responsive :fields="tableColumns"
          primary-key="id" :sort-by="sortBy" show-empty empty-text="No matching records found"
          :sort-desc="isSortDirDesc">

          <!-- Column: User -->
          <template #cell(username)="{ item }">
            <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
              <template #aside>
                <b-avatar size="32" :src="item.avatar" :text="avatarText(`${item.nombre} ${item.apellido}`)"
                  :variant="`light-${resolveUserRoleVariant(item.rol.nombre)}`" @click="mostrarAboutUsuario(item)" />
              </template>
              <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
                class="font-weight-bold d-block text-nowrap p-0">
                {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre' }}
              </b-button>
              <small class="text-muted" v-if="item.username">{{ item.username }}</small>
            </b-media>
          </template>

          <template #cell(created_at)="{ item }">
            {{ item.created_at | fecha }}
          </template>


          <template #cell(activo)="{ item }">
            <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)"
              v-if="['Desarrollador', 'Administrador'].includes(usuario.rol.nombre)">
              {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
            </b-form-checkbox>

            <span v-else>
              {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
            </span>
          </template>

          <!-- Column: Rol -->
          <template #cell(rol)="{ item }">
            <div class="text-nowrap">
              <feather-icon :icon="resolveUserRoleIcon(item.rol ? item.rol.nombre : '')" size="18" class="mr-50"
                :class="`text-${resolveUserRoleVariant(item.rol ? item.rol.nombre : '')}`" />
              <span class="align-text-top text-capitalize">{{ item.rol ? item.rol.nombre : 'Sin definir' }}</span>
            </div>
          </template>


          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
              </template>


              <b-dropdown-item :to="{ name: 'edit.usuario', params: { id: data.item.id } }"
                v-if="$can('update', 'usuarios')">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Editar</span>
              </b-dropdown-item>

              <b-dropdown-item @click="eliminarUsuario(data.item)" v-if="$can('delete', 'usuarios')">
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">Eliminar</span>
              </b-dropdown-item>

              <b-dropdown-item :to="{ name: 'movimientos.user', params: { id: data.item.id } }"
                v-if="['Desarrollador', 'Administrador'].includes(usuario.rol.nombre)">
                <font-awesome-icon icon="fas fa-money-check" />
                <span class="align-middle ml-50">Movimientos de cuenta</span>
              </b-dropdown-item>

              <b-dropdown-item :to="{ name: 'promotores.list', params: { id: data.item.id } }"
                v-if="$can('read', 'promotores')">
                <font-awesome-icon icon="fas fa-user-tie" />
                <span class="align-middle ml-50">Promotores</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>

      </b-table>
    </template>

  </listado>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BPagination,
  BFormCheckbox
} from 'bootstrap-vue'

import store from '@/store'
import { avatarText } from '@core/utils/filter'
import useActivacionesList from './useActivacionesList'
import { mapGetters } from 'vuex';
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

import { toRefs, inject,ref,computed } from 'vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BDropdownItemButton,
    BPagination,
    BInputGroup,
    BFormCheckbox,
    VueApexCharts,
    listado:() => import('components/Listado.vue')
  },

  computed: {
    ...mapGetters('rol', ['getRols'])
  },

  mounted() {
    this.$eventHub.$on('fetch-user', () => {
      this.refetchData();
    })
  },

  setup() {
    const { usuario } = toRefs(store.state.usuario)

    const userAbout = inject('userAbout')
     const actions = useActivacionesList();
    const showAboutProfile = inject('showAboutProfile')
    const graficaActivaciones = ref({
      
      chartOptions: {
        
        chart: {
          stacked: true,
          type: 'line',
          toolbar: { 
            show: true,
            tools:{
              reset:false,
              pan:false,
              selection:false
            }
           },
        },

        title:{
          text:'Activaciones mensuales de este año con relación al año pasado',
          style:{
            fontSize: '18px',
            fontWeight: 'bolder',
            fontFamily: 'Myriad',
            color: $themeColors.primary
          }
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
          categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agost', 'Sep', 'Opt', 'Nov', 'Dic'],
          labels: {

            style: {
              colors: '#6E6B7B',
              fontSize: '0.86rem',
              fontFamily: 'TimeNewRoma',
              transform: 'rotate(90deg)'
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
          show: true,
        },
        dataLabels: {
          enabled: true,
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: false,


          x: {
            show: true,
            format: '{point.value}',
          },
          marker: {
            show: true,
          },
         
          fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 2,
          dashArray: 0,
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
          show: true,
          labels: {
            style: {
              colors: '#6E6B7B',
              fontSize: '.85rem',
              fontWeight: 'bolder',
              fontFamily: 'Roboto',
            },
          },
        },
      },

      series: computed(() => actions.activaciones.value)
    })

    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }

   

    return {
      userAbout,
      showAboutProfile,
      actions,
      mostrarAboutUsuario,

      // Filter
      avatarText,
      usuario,
      graficaActivaciones,
      resolveUserRoleVariant: actions.resolveUserRoleVariant,
      resolveUserRoleIcon:actions.resolveUserRoleIcon,
      refUserListTable:actions.refUserListTable,
      legendBtn: computed(() => {

        if (!['Lider', 'Coordinador', 'Promotor'].includes(usuario.value.rol ? usuario.value.rol.nombre : '')) {
          return 'Agregar Usuario'
        }

        return 'Agregar Viajero'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>