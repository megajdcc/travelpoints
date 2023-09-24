
<template>
  <listado :actions="actions" hideFooter>

    <template #btn-action-prepend>
      <el-date-picker v-model="mes" type="month" placeholder="Filtre por mes" size="small" class="mr-1"
        :picker-options="pickerOption">
      </el-date-picker>
    </template>
    <template #btn-action>

      <b-button variant="dark" size="sm" @click="regresar()" v-if="pais">
        <font-awesome-icon icon="fas fa-arrow-left" size="lg" />
      </b-button>

      <b-button variant="primary" size="sm" @click="descargar()">
        <font-awesome-icon icon="fas fa-download" size="lg" />
      </b-button>
    </template>

    <template #contenido="{ fetchData, tableColumns, isSortDirDesc, sortBy, perPage }">
      <b-card>
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          :empty-text="$t('No se encontró ningun Viajero por pais...')" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" :busy="loading" :perPage="perPage" showEmpty small stacked="md"
          @sort-changed="sortChange" @row-selected="fileSelected" hover select-mode="single" :selectable="!pais"
          selected-variant="primary">

          <template #cell(pais)="{item}">
            <b v-if="pais">
              {{ item.ciudad ? item.ciudad.estado.pais.pais : 'otros' }}
            </b>
            <b v-else>
             {{  item.pais ?? 'Otros' }}
            </b>
            
          </template>

          <template #cell(username)="{item}">
              <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
                <template #aside>
                  <b-avatar size="32" :src="`/storage/img-perfil/${item.imagen}`"
                    :text="avatarText(`${item.nombre} ${item.apellido}`)" :variant="`light-primary`"
                    @click="mostrarAboutUsuario(item)" />
                </template>
                <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
                  class="font-weight-bold d-block text-nowrap p-0">
                  {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre' }}
                </b-button>
                <small class="text-muted" v-if="item.username">{{ item.username }}</small>
              </b-media>
          </template>
        
        </b-table>
      </b-card>
    </template>

  </listado>
</template>
<script>

import { ref, computed, toRefs, watch,inject } from 'vue'
import store from '@/store'
import router from '@/router'
import useListViajeros from './useListViajeros.js'

import {
  BCard, BTable, BButton,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BLink,
  BMedia,
  BAvatar
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {

  components: {
    listado: () => import('components/Listado.vue'),
    BCard,
    BTable,
    BButton,
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BLink,
    BMedia,
    BAvatar

  },

  props: {
    pais: String
  },

  setup(props) {
    const { pais } = toRefs(props)
    const actions = useListViajeros(pais);

    const userAbout = inject('userAbout')
    const showAboutProfile = inject('showAboutProfile')
    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }
    const sortChange = (ct) => {

      actions.sortBy.value = ct.sortBy
      actions.isSortDirDesc.value = ct.sortDesc

    }
    const totalPaises = computed(() => actions.totalPaises.value)

    const pickerOption = ref({
      disabledDate: (fecha) => Date.now() < fecha.getTime()
    })

    const fileSelected = (item) => {
      if (item.length) {
        router.push({ path: '/reports/viajeros', query: { pais: item[0].pais ?? 'otros' } })
      } else if (!pais.value) {
        router.push({ path: '/reports/viajeros' })
      }
    }


    const regresar = () => {

      router.push({ path: '/reports/viajeros' })

    }


    return {
      loading: computed(() => store.state.loading),
      actions,
      sortChange,
      refTable: actions.refTable,
      descargar: actions.descargar,
      ano: actions.ano,
      mes: actions.mes,
      totalPaises,
      pickerOption,
      fileSelected,
      regresar,
      mostrarAboutUsuario,
      avatarText,
      dominacionMundial: computed(() => {
        return redondeo(totalPaises.value * 100 / 195, 2)
      }),
    }
  }

}

</script>
