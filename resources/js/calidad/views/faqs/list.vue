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
                     <b-button :to="{name:'create.faq'}" v-if="$can('write','faqs')" variant="primary"
                        title="Crear Faq" class=" d-flex align-items-center">
                        <feather-icon icon="EditIcon" size="16" />
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
                  empty-text="Sin Data">

                  <template #cell(categoria_id)="{item}">
                     {{ item.categoria.nombre }}
                  </template>

                  <template #cell(usuario_id)="{item}">
<<<<<<< HEAD
                     {{ item.usuario.nombre || 'Sin definir' }}
=======
                     {{ item.usuario ? item.usuario.nombre : 'Sin definir' }}
>>>>>>> vite
                  </template>

                  <template #cell(actions)="{item}">
                     <b-button-group size="sm">

                        <b-button :to="{name:'edit.faq',params:{id:item.id}}" v-if="$can('update','faqs')"
                           variant="primary">
                           <feather-icon icon="EditIcon" />
                        </b-button>

                        <b-button @click="eliminar(item.id)" v-if="$can('delete','faqs')" variant="danger">
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
   BFormInput

} from 'bootstrap-vue'

import useFaqsList from './useFaqsList'

export default {
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      PerPage:() => import('components/PerPage'),
      PaginateTable:() => import('components/PaginateTable'),
      BInputGroup,
      BInputGroupAppend,
      BFormInput
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
         fetchData,
         eliminar
      } = useFaqsList();

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
         eliminar
      }

      
   },
}
</script>