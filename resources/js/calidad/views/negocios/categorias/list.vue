<template>
   <b-card>
      <b-container fluid>
         <b-row class="mb-1">
            <b-col cols="12" md="6">
               <per-page v-model="perPage" :perPageOptions="perPageOptions" />
            </b-col>
            <b-col cols="12" md="6">
               <b-input-group size="sm">
                  <b-form-input v-model="searchQuery" type="search" placeholder="Buscar" />
                  <template #append>
                     <b-button :to="{ name: 'negocio.categorias.create' }" v-if="$can('write', 'negocio categorías')"
                        variant="primary" title="Crear Categoría" class=" d-flex align-items-center">
                        <feather-icon icon="PlusIcon" size="16" />
                        Crear
                     </b-button>
                  </template>
               </b-input-group>

            </b-col>

         </b-row>

         <b-row>
            <b-col cols="12">
               <b-table ref="refTable" :fields="tableColumns" :items="fetchData" :sort-by="sortBy"
                  :sort-desc="isSortDirDesc" primary-key="id" hover bordered small striped show-empty
                  empty-text="Sin Data" responsive>

                  <template #cell(id)="{ item, toggleDetails, detailsShowing }">
                     <b-button variant="primary" @click="toggleDetails" class="mx-auto text-nowrap">
                        <span class="mr-1 fas" :class="detailsShowing ? 'fa-angle-up' : 'fa-angle-down'" />
                        {{ item.id }}
                     </b-button>
                  </template>

                  <template #row-details="{item}">
                     <ul>
                        <li class="font-weight-bolder text-warning">Descripción</li>
                        <p>
                           {{ item.descripcion }}
                        </p>
                     </ul>

                  </template>

                  <template #cell(categoria)="{item}">
                     <b-link :to="{name:'negocio.categorias.edit',params:{id:item.id}}" v-if="$can('update','nagocio categorías')">
                        {{ item.categoria }}
                     </b-link>
                     <strong class="text-primary " v-else v-text="item.categoria"></strong>
                  </template>

                  <template #cell(actions)="{ item }">
                     <b-button-group size="sm">

                        <b-button :to="{ name: 'negocio.categorias.edit', params: { id: item.id } }"
                           v-if="$can('update', 'negocio categorías')" variant="primary">
                           <feather-icon icon="EditIcon" />
                        </b-button>

                        <b-button @click="mostrarImagen(item.imagen)" variant="info">
                           <feather-icon icon="EyeIcon" />
                        </b-button>


                        <b-button @click="eliminar(item.id)" v-if="$can('delete', 'negocio categorías')"
                           variant="danger">
                           <feather-icon icon="TrashIcon" />
                        </b-button>

                     </b-button-group>
                  </template>


               </b-table>

            </b-col>
         </b-row>

         <b-row class="mt-1">
            <b-col cols="12">
               <paginate-table :dataMeta="dataMeta" :perPage="perPage" :currentPage.sync="currentPage" :total="total" />
            </b-col>
         </b-row>
      </b-container>

      <show-imagen :showDialog.sync="showImagen" :url="urlImagen" :tipo="ext" />
   </b-card>

</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BInputGroup,
   BInputGroupAppend,
   BFormInput,
   BLink

} from 'bootstrap-vue'

import useNegocioCategoriasList from './useNegocioCategoriasList'
import { getExt } from '@core/utils/utils'

import {ref} from 'vue'

export default {
   components: {
      BCard,
      BContainer,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      PerPage: () => import('components/PerPage'),
      PaginateTable: () => import('components/PaginateTable'),
      BInputGroup,
      BInputGroupAppend,
      BFormInput,
      ShowImagen:() => import('components/ShowImagen'),
      BLink

   },


   setup() {

      const ext = ref(null)
      const urlImagen = ref('')
      const showImagen = ref(false)


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
         fetchData,
         eliminar
      } = useNegocioCategoriasList();

      const mostrarImagen = (file) => {

         ext.value = getExt(file).toLowerCase();
         urlImagen.value = file;
         showImagen.value = true
      
      }

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
         fetchData,
         eliminar,
         mostrarImagen,
         showImagen,
         ext,
         urlImagen
      }


   },
}
</script>