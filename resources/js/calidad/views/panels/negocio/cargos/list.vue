<template>
   <b-container fluid class="px-0 mx-0">

      <!-- Table Container Card -->
      <b-card no-body class="mb-0">

         <div class="m-2">
            <!-- Table Top -->
            <b-row>
               <!-- Per Page -->
               <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <per-page v-model="perPage" :perPageOptions="perPageOptions"></per-page>
               </b-col>

               <b-col md="6">
                  <div class="d-flex align-items-center justify-content-end">

                     <b-input-group size="sm">

                        <b-form-input v-model="searchQuery" type="search" placeholder="..." />

                        <template #append>
                           <b-button variant="dark" :to="{ name: 'cargo.create' }" v-if="$can('write','cargos negocio')">
                              <feather-icon size="18" icon="PlusSquareIcon" />
                              Añadir
                           </b-button>
                        </template>
                     </b-input-group>


                  </div>
               </b-col>

            </b-row>

         </div>

         <b-table ref="refTable" :fields="tableColumns" 
            :sort-by.sync="sortBy"  :items="fetchData" empty-text="No se encontró ningún Cargo" :sort-desc.sync="isSortDirDesc"
            sticky-header="700px"  responsive borderless outlined small show-empty :busy="loading" stacked="md">

            <!-- Column: Actions -->
            <template #cell(actions)="{ item }">

               <b-button-group size="sm">

                  <b-button :to="{ name: 'cargo.edit', params: { id: item.id } }" variant="primary"
                     title="Editar Cargo"  v-if="$can('update','cargos negocio')">
                     <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button @click="eliminar(item.id)" variant="danger" title="Eliminar Cargo" v-if="$can('delete','cargos')">
                     <feather-icon icon="TrashIcon" />
                  </b-button>

               </b-button-group>

            </template>

         </b-table>

         <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" />

      </b-card>
   </b-container>
</template>


<script>

import useCargosList from './useCargosList'
import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BTable,
   BButtonGroup,
   BButton,
   BInputGroup,
   BFormInput

} from 'bootstrap-vue'

import { regresar } from '@core/utils/utils'
import store from '@/store'
import {toRefs,watch,computed,onMounted} from 'vue'

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
      BFormInput

   },

   setup(props) {

      const { negocio } = toRefs(store.state.negocio)

      const {
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refTable,
         total,
         dataMeta,
         refetchData,
         fetchData,
         tableColumns,
         eliminar
      } = useCargosList(negocio);


      watch(negocio,() => {
         
         refetchData()
      })

      onMounted(() => {

         refetchData()
      })


      return {
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refTable,
         total,
         dataMeta,
         refetchData,
         fetchData,
         tableColumns,
         eliminar,
         regresar,
         loading:computed(() => store.state.loading),
         negocio
      }
   }
}

</script>