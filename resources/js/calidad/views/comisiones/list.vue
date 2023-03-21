<template>
    <listado :actions="actions" hideFooter>
      <template #btn-action>
        <b-button type="variant" :to="{ name: 'comision.create' }" v-if="$can('write', 'comisiones')"
          class="d-flex flex-column justify-content-center">
          Asignar comisión
        </b-button>
      </template>
      <template #contenido="{fetchData,tableColumns,perPage,eliminar}">
        <b-card class="mt-1">
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
            :sort-by.sync="sortBy" empty-text="No se encontró ningúna comisión" :sort-desc.desc="isSortDirDesc"
            sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
            showEmpty small stacked="md">


            <template #cell(comision)="{ item }">

              <span class="text-nowrap">
                {{ item.comision ? Number(item.comision).toFixed() : 0 }} %
              </span>

            </template>

            <template #cell(rol_id)="{ item }">
                <span class="text-nowrap">
                  {{ item.rol.nombre }} 
                </span>
            </template>

            <template #cell(actions)="{ item }">

              <b-button-group size="sm">

                <b-button :to="{ name: 'comision.edit', params: { id: item.id } }" variant="primary"
                  v-if="$can('update', 'comisiones')">
                  Editar
                </b-button>

                <b-button @click="eliminar(item.id)" variant="danger" 
                v-if="$can('delete', 'comisiones')">
                  Eliminar
                </b-button>
              </b-button-group>
            </template>

          </b-table>
        </b-card>
      </template>
    </listado>
</template>

<script>

import {computed,toRefs,onMounted} from 'vue'
import store from '@/store'

import useComisionesList from './useComisionesList.js'

import {
  BCard,
  BButton,
  BButtonGroup,
  BTable
} from 'bootstrap-vue'

export default {
  
  components:{
    Listado:() => import('components/Listado.vue'),
    BCard,
    BButton,
    BButtonGroup,
    BTable

  },

  setup(props){

    const actions = useComisionesList();

    onMounted(() => setTimeout(() => actions.refetchData(),500))

    return {
      loading:computed(() => store.state.loading),
      actions,
      sortBy:actions.sortBy,
      refTable:actions.refTable,
      isSortDirDesc:actions.isSortDirDesc
    }
  }
}
</script>