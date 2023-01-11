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
                        <b-input-group-append>
                           <b-button variant="dark" size="sm" :to="{ name: 'panel.create' }" v-if="$can('write', 'panels')"
                              class="d-flex">
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
               :sort-by.sync="sortBy" empty-text="No se encontró ningún Panel" :sort-desc.sync="isSortDirDesc"
               sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">
      
      
               <template #cell(panel)="{ item }">
                  <span class="text-nowrap font-weight-bolder">
                     {{ item.panel }} 
                  </span>
               </template>
      
               <template #cell(actions)="{ item }">
                  
                  <b-button-group size="sm">

                     <b-button :to="{ name: 'panel.edit', params: { id: item.id } }" variant="primary" v-if="$can('update', 'panles')">
                        Editar
                     </b-button>
      
                     <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete', 'panels')">
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

import usePanelList from './usePanelList.js'
import store from '@/store'

import {toRefs,ref,computed,onMounted} from '@vue/composition-api'

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BButtonGroup,
   BButton,
   BTable,
   BFormInput,
   BInputGroup,
   BInputGroupAppend
} from 'bootstrap-vue'

import { regresar } from '@core/utils/utils'
export default {
   
   
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BTable,
      BFormInput,
      BInputGroup,
      BInputGroupAppend,
      PerPage:() => import('components/PerPage.vue'),
      PaginateTable:() => import('components/PaginateTable.vue')
   },


   setup(props){

      const {
         tableColumns,
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
         eliminar
      } = usePanelList();


      return {
         loading:computed(() => store.state.loading),
         refTable,
         eliminar,
         tableColumns,
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         total,
         dataMeta,
         refetchData,
         fetchData,
         regresar
         
      }

   }
}
</script>