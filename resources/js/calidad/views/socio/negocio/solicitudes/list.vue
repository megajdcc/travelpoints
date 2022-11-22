<template>

   <b-container fluid class="px-0">
      <b-row>
         <b-col cols="12">
            <h1>Solicitudes enviadas</h1>
         </b-col>
      </b-row>
      <b-row>
         <b-col cols="12">
            <b-card>
               <b-container fluid class="px-0">
                  <b-row class="mb-1">
                     <b-col cols="12" md="6">
                        <per-page v-model="perPage" :perPageOptions="perPageOptions" />
                     </b-col>

                     <b-col cols="12" md="6">
                        <b-form-input type="search" v-model="searchQuery" placeholder="Buscar solicitudes..."
                           size="sm" />
                     </b-col>
                  </b-row>
                  <b-row>
                     <b-col cols="12">
                        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
                           :sort-by.sync="sortBy" empty-text="No se encontró ningúna solicitud"
                           :sort-desc.sync="isSortDirDesc" sticky-header="700px" :no-border-collapse="false" borderless
                           outlined small>

                           <template #cell(id)="{ item, toggleDetails, detailsShowing }">
                              <b-button variant="primary" @click="toggleDetails" class="mx-auto text-nowrap" size="sm">
                                 <span class="mr-1 fas" :class="detailsShowing ? 'fa-angle-up' : 'fa-angle-down'" />
                                # - {{ item.id }}
                              </b-button>
                           </template>

                           <template #row-details="{item}">
                                 <edit :id="item.id"></edit>
                           </template>


                           <template #cell(nombre)="{item}">
                              <strong class="text-nowrap">{{ item.nombre }}</strong>
                           </template>

                           <template #cell(created_at)="{item}">
                              {{ item.created_at | fecha('LLL') }}
                           </template>

                           <template #cell(updated_at)="{item}">
                              {{ item.updated_at | fecha('LLL') }}
                           </template>

                           <template #cell(situacion)="{item}">
                              <span class="text-nowrap">
                                 <b-badge :variant="getSituacionSolicitud(item.situacion).variant">{{
                                    getSituacionSolicitud(item.situacion).text }}</b-badge>
                              </span>
                           </template>

                           <!-- Column: Actions -->
                           <template #cell(actions)="{item}">

                              <b-button-group size="sm">

                                 <b-button :to="{ name:'socio.negocio.solicitudes.edit',params:{id:item.id}}"
                                    variant="primary" title="Ver Detalles" v-if="$can('update','negocios')">
                                    <feather-icon icon="EyeIcon" />
                                    Ver detalles

                                 </b-button>


                              </b-button-group>

                           </template>

                        </b-table>
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col cols="12">
                        <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :total="total"
                           :perPage="perPage" />
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col cols="12">
                        <b-button variant="primary" :to="{name:'socio.negocio.afiliar'}" size="sm">
                           <feather-icon icon="PlusCircleIcon" />
                           Afiliar Negocio
                        </b-button>
                     </b-col>
                  </b-row>
               </b-container>

            </b-card>
         </b-col>
      </b-row>

   </b-container>


</template>

<script>

import {
   BContainer,
   BTable,
   BRow,
   BCol,
   BButton,
   BCard,
   BButtonGroup,
   BFormInput,
   BBadge

} from 'bootstrap-vue';

import useSolicitudesList from './useSolicitudesList.js';
import {getSituacionSolicitud}  from '@core/utils/utils'

export default {
   components:{
      BContainer,
      BTable,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BCard,
      BFormInput,
      BBadge,
      PaginateTable:() => import('components/PaginateTable'),
      PerPage:() => import('components/PerPage'),
      edit: () => import('views/socio/negocio/solicitudes/edit'),
   },

   setup() {
   
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
         tableColumns,
         fetchData
      } = useSolicitudesList();


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
         tableColumns,
         fetchData, getSituacionSolicitud
      }

   },
}
</script>