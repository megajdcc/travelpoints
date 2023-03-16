<template>
   <b-container fluid class="px-0 mx-0">

      <slot name="titulo" :total="total">
         
      </slot>
      <!-- Table Container Card -->
      <b-card no-body class="mb-0" v-if="!hideHeader">

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
                        <slot name="btn-action"></slot>
                     </b-input-group-append>
                  </b-input-group>
               </b-col>

            </b-row>

         </div>

      </b-card>

      <!-- <section class="w-100 d-flex justify-content-center py-3" v-if="!isTable && loading"  >
         <b-spinner>
         </b-spinner>
      </section> -->

      <section v-loading="loading" class="w-100 mt-1" style="min-height:100px">
         <slot name="contenido" :items="items" :eliminar="eliminar" :fetchData="fetchData" :tableColumns="tableColumns"
            :sortB="sortBy" :isSortDirDesc="isSortDirDesc" :perPage="perPage" :refTable="refTable">
            </slot>
      </section>

      <slot name="prePaginate" :items="items">
         
      </slot>

      <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total"
         class="mt-1" />

      <b-card class="mt-1" v-if="!hideFooter">


         <b-container class="mb-1">
            <b-row>
               <b-col class="px-1">
                  <b-button-group size="sm">

                     <slot name="botonera-footer">

                     </slot>
                     
                     <b-button @click="regresar" size="sm">Regresar</b-button>
                  </b-button-group>
                 
               </b-col>
            </b-row>
         </b-container>


      </b-card>
      <slot name="otros"></slot>

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
   BInputGroupAppend,
   BCarousel,
   BCarouselSlide,
   BImg,
   VBPopover,
   BSpinner

} from 'bootstrap-vue'

import store from '@/store'
import router from '@/router'

import { ref, toRefs, computed, onActivated } from 'vue'

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
      BCarousel,
      BCarouselSlide,
      BInputGroupAppend,
      BImg,
      perPage: () => import('components/PerPage.vue'),
      paginateTable: () => import('components/PaginateTable.vue'),
      BSpinner
   },

   directives: {
      'b-popover': VBPopover
   },


   props:{
      actions:Object|Function,
      isTable:Boolean,
      hideFooter:Boolean,
      hideHeader:Boolean
   },


   setup(props) {

      const { actions } = toRefs(props)

      const {
         isSortDirDesc,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         items,
         perPageOptions,
         dataMeta,
         refetchData,
         fetchData,
         eliminar,
         tableColumns = [],
         refTable = null,
      } = actions.value;

      onActivated(() => refetchData())

      return {
         items,
         isSortDirDesc,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         perPageOptions,
         dataMeta,
         refetchData,
         fetchData,
         loading: computed(() => store.state.loading),
         regresar,
         eliminar,
         tableColumns,
         refTable,
         irEditar: (negocio) => router.push({ name: 'negocio.edit', params: { id: negocio.id } })
      }

   }


}
</script>

<style lang="scss" scoped>
.logotipos {
   width: 100% !important;
   height: auto;
   object-fit: cover;
}
</style>