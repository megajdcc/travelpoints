<template>
   <listado :actions="actions" hideFooter>

      <template #btn-action>
         <b-button variant="dark" :to="{ name: 'create.pais' }">
            <feather-icon size="18" icon="PlusSquareIcon" />
            Añadir
         </b-button>
      </template>

      <template #contenido="{fetchData,tableColumns,sortBy,isSortDirDesc,eliminar}">
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
            empty-text="No se encontró ningún Pais" :sort-desc="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false" small :busy="loading" show-empty>


               <template #empty>
                  <span class="text-nowrap text-center d-block">
                     No se encontró níngún Pais...
                  </span>
               </template>

               <template #table-busy>
                  <div class="text-center my-2">
                     <b-spinner class="align-middle" variant="primary"></b-spinner>
                     <strong>Cargando...</strong>
                  </div>
               </template>

               <!-- Column: Actions -->
               <template #cell(actions)="{ item }">

                  <b-button-group size="sm">

                     <b-button :to="{ name: 'edit.pais', params: { id: item.id } }" variant="primary" title="Editar Pais" v-if="$can('update', 'pais')">
                        <feather-icon icon="EditIcon" />
                     </b-button>

                     <b-button @click="eliminar(item.id)" variant="danger" title="Eliminar Pais" v-if="$can('delete', 'pais')">
                        <feather-icon icon="TrashIcon" />
                     </b-button>

                  </b-button-group>

               </template>

            </b-table>
      </template>

   </listado>
 
</template>


<script>

import usePaisList from './usePaisList.js'
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

import { regresar } from '@core/utils/utils'
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
      PerPage: () => import('components/PerPage'),
      PaginateTable: () => import('components/PaginateTable'),
      BInputGroup,
      BFormInput,
      BSpinner,
      Listado:() => import('components/Listado.vue')

   },

   setup(props) {

      const actions = usePaisList();



      onMounted(() => {
         setTimeout(() => {
            actions.refetchData()
         }, 1000)
      })


      return {
         refTable:actions.refTable,
         loading: computed(() => store.state.loading),
         actions
      }
   }
}

</script>