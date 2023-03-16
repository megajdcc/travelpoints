<template>
   <b-container fluid class="px-0 mx-0">

      <!-- Table Container Card -->
      <b-card no-body class="mb-0">

         <div class="m-2">
            <!-- Table Top -->

          
            <b-row>
               <!-- Per Page -->
               <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <per-page v-model="perPage" :perPageOptions="perPageOptions"></per-page>
               </b-col>

               <b-col md="8">
                     <b-input-group size="sm">
                        <b-form-input v-model="searchQuery" type="search" placeholder="..." />
                        <b-input-group-append >
                           <b-button variant="dark" size="sm" :to="{name:'iata.create'}" v-if="$can('write','iatas')" class="d-flex">
                              <span class="d-flex align-items-center py-0">
                                 Agregar
                              </span>
                           </b-button>
                        </b-input-group-append>
                     </b-input-group>
               </b-col>

            </b-row>

         </div>

         <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
            :sort-by.sync="sortBy" empty-text="No se encontró ningún Iata" :sort-desc.sync="isSortDirDesc"
            sticky-header="700px" :no-border-collapse="false" borderless outlined >


            <template #cell(aeropuerto)="{item}">
               <span class="text-nowrap font-weight-bolder">
                  {{ item.aeropuerto }} - {{ `${item.estado.estado} ${item.estado.pais.pais}` }}
               </span>   
            </template>
            
            <template #cell(actions)="{item}">
               <b-button-group size="sm">
                  <b-button :to="{name:'iata.edit',params:{id:item.id}}" variant="primary" v-if="$can('update','iatas')">
                     Editar
                  </b-button>

                     <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete','iatas')">
                        Eliminar
                     </b-button>
               </b-button-group>
            </template>
         </b-table>

         <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" />


         <b-container class="mb-1">
            <b-row>
               <b-col class="px-1">
                  <b-button @click="regresar" size="sm">Regresar</b-button>
               </b-col>
            </b-row>
         </b-container>


      </b-card>
   </b-container>
</template>

<script>

import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BFormInput,
   BInputGroup,
   BInputGroupAppend

} from 'bootstrap-vue'

import useIataList from './useIataList.js'
import store from '@/store'
import { ref, toRefs, computed } from 'vue'

import { regresar } from '@core/utils/utils.js'

export default {

   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BInputGroup,
      BFormInput,
      BInputGroupAppend,
      perPage: () => import('components/PerPage.vue'),
      paginateTable: () => import('components/PaginateTable.vue')

   },

   setup(props) {


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
         items,
         tableColumns,
         eliminar
      } = useIataList();


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
         items,
         tableColumns,
         loading: computed(() => store.state.loading),
         regresar,
         eliminar
      }

   }


}
</script>