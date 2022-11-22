<template>
   <b-container fluid class="px-0">

      <!-- Filtros -->
      <b-row>
         <b-col cols="12">
            <b-card>

               <b-container fluid>
                  <b-row>
                     <b-col cols="12" sm="6" md="4" lg="3" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">

                        <per-page v-model="perPage" :perPageOptions="perPageOptions"/>

                     </b-col>

                     <b-col sm="6" md="8" lg="9" class="d-flex align-items-center justify-content-end">
                        <b-button-group size="sm">

                           <b-button variant="dark" :to="{name:'create.plantilla'}" v-if="$can('write','plantillas')">
                              <feather-icon size="16" icon="PlusSquareIcon" />
                              Agregar
                           </b-button>

                        </b-button-group>
                     </b-col>
                  </b-row>
               </b-container>


            </b-card>
         </b-col>
      </b-row>

      <!-- Table -->
      <b-row>

         <b-col>
            <b-card>

               <b-table ref="refTable" :items="fetchPlantillas" responsive :fields="tableColumns" primary-key="id"
                  :sort-by.sync="sortBy" empty-text="No se encontró ningúna plantilla" :sort-desc.sync="isSortDirDesc"
                  sticky-header="700px" :no-border-collapse="false">

                  <template #cell(created_at)="{item}">
                     {{ getFecha(item.created_at) }}
                  </template>

                  <template #cell(updated_at)="{item}">
                     {{ getFecha(item.updated_at) }}
                  </template>

                  <template #cell(disparador)="{item}">
                     {{ getNombreDisparador(item.disparador) }}
                  </template>

                  <template #cell(actions)="{item}">
                     <b-button-group size="sm">
                        <b-button variant="primary" :to="{name:'edit.plantilla',params:{id:item.id}}"
                           v-if="$can('update','plantillas')" title="Editar">
                           <feather-icon icon="EditIcon" />
                        </b-button>

                        <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete','plantillas')"
                           title="Eliminar">
                           <feather-icon icon="TrashIcon" />
                        </b-button>

                     </b-button-group>
                  </template>

               </b-table>

               <paginate-table :currentPage.sync="currentPage" :perPage="perPage" :dataMeta="dataMeta" :total="total" />
            </b-card>

         </b-col>


      </b-row>

   </b-container>
</template>
<script>

import {ref,toRefs,onMounted,computed} from '@vue/composition-api'

import usePlantillasList from './usePlantillasList'

import { getFecha } from '@core/utils/utils'
import store from '@/store'

import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BTable,
   BFormGroup,
   BInputGroup,
   BInputGroupAppend,
   BButtonGroup,
   BButton,
   BFormSelect


} from 'bootstrap-vue';

import vSelect from 'vue-select'

import { Notification } from 'element-ui';

export default {


   components:{
      BContainer,
      BCard,
      BRow,
      BCol,
      BTable,
      BFormGroup,
      BInputGroup,
      BInputGroupAppend,
      BButtonGroup,
      BButton,
      BFormSelect,
      PerPage:() => import('components/PerPage'),
      PaginateTable:() => import('components/PaginateTable'),
      vSelect
   },


   setup() {
      

      const {
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         tableColumns,
         refTable,
         total,
         dataMeta,
         refetchData,
         fetchPlantillas
      } = usePlantillasList();


      const eliminar = (plantilla_id) => {

         store.dispatch('plantilla/eliminar',plantilla_id).then(({data}) => {

            if(data.result) {
               refetchData();
               Notification.info({
                  message:'Plantilla eliminada',
                  position:'bottom_right'
               })
            }else{
               Notification.info({
                  message: 'La plantilla no se pudo eliminar, inténtelo de nuevo mas tarde',
                  position: 'bottom_right'
               })
            }

         })

      } 


      return {
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         tableColumns,
         refTable,
         total,
         dataMeta,
         refetchData,
         fetchPlantillas,
         eliminar,
         getFecha,
         getNombreDisparador:computed({
            get: () => store.getters['plantilla/getNombreDisparador'],
            set:(val => store.getters['plantilla/getNombreDisparador'])
         })
      }

   },
}
</script>