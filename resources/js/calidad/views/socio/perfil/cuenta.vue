<template>
      <b-container fluid class="px-0 mx-0">
      
         <!-- Table Container Card -->
         <b-card no-body class="mb-0">
      
            <div class="m-2">
               <!-- Table Top -->

               <b-row>
                  <b-col>
                     <h3>Movimientos de Cuentas</h3>
                  </b-col>
               </b-row>
               <b-row>
                  <!-- Per Page -->
                  <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                     <per-page v-model="perPage" :perPageOptions="perPageOptions"></per-page>
                  </b-col>
      
                  <b-col md="6">
                     <div class="d-flex align-items-center justify-content-end">
      
                        <b-input-group size="sm">
      
                           <b-form-input v-model="searchQuery" type="search" placeholder="..." />
      
                      
                        </b-input-group>
      
      
                     </div>
                  </b-col>
      
               </b-row>
      
            </div>
      
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
               :sort-by.sync="sortBy" empty-text="No se encontró ningún movimiento" :sort-desc.sync="isSortDirDesc"
               sticky-header="700px" :no-border-collapse="false" borderless outlined small>

               <template #cell(created_at)="{item}">
                     {{ item.created_at | fecha('LLL') }}
               </template>

               <template #cell(monto)="{item}">
                  <span style="color:black" class="font-weight-bolder">
                  {{ item.tipo_movimiento == 1 ? '+' : '-' }} {{ item.cuenta.divisa.iso.toUpperCase() }}{{ item.monto | currency({symbol:item.cuenta.divisa.simbolo}) }}
                  </span>
               </template>

               <template #cell(balance)="{item}">
                  <span style="color:black" class="font-weight-bolder">
                     {{ item.tipo_movimiento == 1 ? '+' : '-' }}{{ item.cuenta.divisa.iso.toUpperCase() }}{{ item.balance | currency({symbol:item.cuenta.divisa.simbolo}) }}
                  </span>
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

} from 'bootstrap-vue'

import useCuentaList from './useCuentaList.js'
import store from '@/store'
import {ref,toRefs,computed} from '@vue/composition-api'

import {regresar} from '@core/utils/utils.js'

export default {
   
   components:{
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
   BInputGroup,
      BFormInput,
      perPage:() => import('components/PerPage.vue'),
      paginateTable:() => import('components/PaginateTable.vue')

   },

   setup(props){

      const { usuario } = toRefs(store.state.usuario)
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
         tableColumns
      } = useCuentaList({
         model_id:computed(() => usuario.value.id),
         model_type:'User'
      });


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
         loading:computed(() => store.state.loading),
         regresar
      }

   }


}
</script>