<template>
   <listado :actions="actions" hideFooter>
      <template #btn-action>
         <b-button variant="dark" :to="{ name: 'create.estado' }">
            <feather-icon size="18" icon="PlusSquareIcon" />
            Añadir
         </b-button>
      </template>

      <template #contenido="{fetchData,eliminar,tableColumns,sortBy,isSortDirDesc}">
         <b-card>
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
               empty-text="No se encontró ningún Estado" :sort-desc="isSortDirDesc" sticky-header="700px"
               :no-border-collapse="false" small :busy="loading" show-empty>


                  <template #empty>
                     <span class="text-nowrap text-center d-block">
                        No se encontró níngún Estado...
                     </span>
                  </template>

                  <template #table-busy>
                     <div class="text-center my-2">
                        <b-spinner class="align-middle" variant="primary"></b-spinner>
                        <strong>Cargando...</strong>
                     </div>
                  </template>

                  <template #cell(pais)="{item}">
                     <span class="text-nowrap">
                        {{ item.pais.pais }}
                     </span>

                  </template>

                  <!-- Column: Actions -->
                  <template #cell(actions)="{ item }">

                     <b-button-group size="sm">

                        <b-button :to="{ name: 'edit.estado', params: { id: item.id } }" variant="primary" title="Editar Estado" v-if="$can('update','estado')">
                           <feather-icon icon="EditIcon" />
                        </b-button>

                        <b-button @click="eliminar(item.id)" variant="danger" title="Eliminar Estado" v-if="$can('delete','estado')">
                           <feather-icon icon="TrashIcon" />
                        </b-button>

                     </b-button-group>

                  </template>

            </b-table>
         </b-card>
      </template>

   </listado>
  
</template>


<script>

import useEstadoList from './useEstadoList.js'
import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BTable,
   BButtonGroup,
   BButton,
   BInputGroup,
   BFormInput,
   BSpinner

} from 'bootstrap-vue'

import { computed, onMounted } from 'vue'

import store from '@/store'

export default {

   components: {
      BCard,
      BContainer,
      BRow,
      BCol,
      BTable,
      BButtonGroup,
      BButton,
      BInputGroup,
      BFormInput,
      BSpinner,
      Listado:() => import('components/Listado.vue')

   },

   setup(props) {


      const actions = useEstadoList();


      onMounted(() => {
         setTimeout(() => {
            actions.refetchData()
         }, 400)
      })


      return {
         refTable:actions.refTable,
         loading: computed(() => store.state.loading),
         actions
      }
   }
}

</script>