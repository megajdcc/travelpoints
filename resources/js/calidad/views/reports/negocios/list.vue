
<template>
  <listado :actions="actions" hideFooter>

    <template #btn-action-prepend>
      <el-date-picker v-model="mes" type="month" placeholder="Filtre por mes" size="small" class="mr-1"
        :picker-options="pickerOption">
      </el-date-picker>
    </template>
    <template #btn-action>

      <b-button variant="dark" size="sm" @click="regresar()" v-if="destino || pais">
        <font-awesome-icon icon="fas fa-arrow-left" size="lg" />
      </b-button>

      <b-button variant="primary" size="sm" @click="descargar()">
        <font-awesome-icon icon="fas fa-download" size="lg" />
      </b-button>
    </template>

    <template #contenido="{ fetchData, tableColumns, isSortDirDesc, sortBy, perPage }">
      <b-card>
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          :empty-text="$t('No se encontró ningún negocio por pais...')" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" :busy="loading" :perPage="perPage" showEmpty small stacked="md"
          @sort-changed="sortChange" @row-selected="fileSelected" hover select-mode="single" :selectable="!destino"
          selected-variant="primary">

          <template #cell(pais)="{ item }">
            <b >
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
import useNegociosList from './useNegociosList.js'

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
    pais: String,
    destino:String
  },

  setup(props) {
    const { pais,destino } = toRefs(props)
    const actions = useNegociosList(pais,destino);


    const sortChange = (ct) => {

      actions.sortBy.value = ct.sortBy
      actions.isSortDirDesc.value = ct.sortDesc

    }

    const pickerOption = ref({
      disabledDate: (fecha) => Date.now() < fecha.getTime()
    })

    const fileSelected = (item) => {

      console.log(item);
      if (item.length) {

        if(!pais.value && !destino.value){
            router.push({ path: '/reports/negocios', query: { pais: item[0].pais ?? 'otros' } })
        }else if(pais.value){
           router.push({ path: '/reports/negocios', query: { destino: item[0].destino ?? 'otros' } })
        }
       

      } else if (pais.value && !destino.value) {
        router.push({ path: '/reports/negocios',query:{pais:pais.value} })
      } else if(!pais.value && destino.value){
        router.push({ path: '/reports/negocios', query: { destino: destino.value } })
      }else{
        router.push({ path: '/reports/negocios'})
      }
    }


    const regresar = () => {

      router.push({ path: '/reports/negocios' })

    }


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
 
    }
  }

}

</script>
