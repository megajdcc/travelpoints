
<template>
  <listado :actions="actions" hideFooter>
    <template #otros>
      <b-card title="5 Países con Mayores Registro">
        <table class="table table-sm table-hover w-md-50">
          <thead>
            <th>Pais</th>
            <th>Registros</th>
            <th>Porc</th>
          </thead>
          <tr v-for="(ventas, i) in cincoPaisesConMasRegistro" :key="i">
            <td>{{ ventas.pais }}</td>
            <td>{{ ventas.ventas }}</td>
            <td>{{ redondeo(ventas.promedio) }}%</td>


          </tr>
        </table>
      </b-card>
      
    </template>

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
          :empty-text="$t('No se encontró data')" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" :busy="loading" :perPage="perPage" showEmpty small stacked="md"
          @sort-changed="sortChange" @row-selected="fileSelected" hover select-mode="single" :selectable="!pais"
          selected-variant="primary">

         <template #thead-top>
          <b-tr>
            <b-th colspan="4">
              <h4>Filtrado {{ pais ? 'por Destino' : 'por Países' }}</h4>
            </b-th>
          </b-tr>
        </template>

          <template #cell(pais)="{ item }">
            <b>
              {{ item.pais ?? 'Otros' }}
            </b>

          </template>

        </b-table>
      </b-card>
    </template>

  </listado>
</template>
<script>

import { ref, computed, toRefs, watch, inject } from 'vue'
import store from '@/store'
import router from '@/router'
import useGastoTuristicoList from './useGastoTuristicoList.js'

import {
  BCard, BTable, BButton,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BLink,
  BMedia,
  BAvatar, 
  BTr,
  BTh
} from 'bootstrap-vue'

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
    BAvatar,
    BTr,
    BTh
  },

  props: {
    pais: String,
  },

  setup(props) {
    const { pais } = toRefs(props)
    const actions = useGastoTuristicoList(pais);
    const cincoPaisesConMasRegistro =ref([])

    const sortChange = (ct) => {

      actions.sortBy.value = ct.sortBy
      actions.isSortDirDesc.value = ct.sortDesc

    }

    const pickerOption = ref({
      disabledDate: (fecha) => Date.now() < fecha.getTime()
    })

    const fileSelected = (item) => {
      if (item.length) {
        router.push({ path: '/reports/gasto-turistico', query: { pais: item[0].pais ?? 'otros' } })
      } else {
        router.push({ path: '/reports/gasto-turistico' })
      }
    }


    const regresar = () => {

      router.push({ path: '/reports/gasto-turistico' })

    } 


    const cargar = () => {
      store.dispatch('venta/getCincoPaisesConMasRegistro').then((data)  =>  {
        cincoPaisesConMasRegistro.value = data
      })
    }


    cargar()

    return {
      loading: computed(() => store.state.loading),
      actions,
      sortChange,
      refTable: actions.refTable,
      descargar: actions.descargar,
      ano: actions.ano,
      mes: actions.mes,
      pickerOption,
      fileSelected,
      regresar,
      cincoPaisesConMasRegistro,
      redondeo:redondeo

    }
  }

}

</script>
