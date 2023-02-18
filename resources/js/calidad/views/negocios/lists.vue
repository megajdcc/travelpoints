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
                     <!-- <b-input-group-append>
                        <b-button variant="dark" size="sm" :to="{ name: 'negocio.create' }"
                           v-if="$can('write', 'negocios')" class="d-flex">
                           <span class="d-flex align-items-center py-0">
                              Agregar Negocio
                           </span>
                        </b-button>
                     </b-input-group-append> -->
                  </b-input-group>
               </b-col>

            </b-row>

         </div>

         </b-card>

         <section class="w-100 d-flex justify-content-center py-3" v-if="loading" >
            <b-spinner >
            </b-spinner>
         </section>
       
         <b-container fluid v-else >
            <b-row>
               <b-col cols="12" md="4" v-for="(negocio,i) in items" :key="i" class="px-0">

                  <b-card class="my-2" :class="{'ml-2' : i > 0}" header-class="py-0 px-1">
                  
                     <template #header>
                        <b-img :src="`/storage/negocios/logos/${negocio.logo}`" thumbnails class="logotipos cursor-pointer" style="border-radius:10px 10px 0px 0px" @click="irEditar(negocio)" />
                     </template>
         
                     <h4 v-b-popover.hover="negocio.breve" :title="negocio.nombre" class="mt-1">
                        {{ negocio.nombre }}
                     </h4>

                     <em class="line-height-1 font-weight-bolder" v-b-popover.hover="negocio.breve" :title="negocio.nombre">
                        {{ negocio.nombre }}
                     </em>
                     
                     
                     <p class="text-justify" v-b-popover.hover="negocio.breve" :title="negocio.nombre" style="max-height:40px">
                        {{ negocio.breve }}
                     </p>
         
                     <template #footer>
                        <b-button-group size="sm">
         
                           <b-button :to="{name:'negocio.edit',params:{id:negocio.id}}" v-if="$can('update','negocios')"
                              variant="primary">
                              <feather-icon icon="EditIcon" />
                           </b-button>
         
                           <b-button @click="eliminar(negocio.id)" v-if="$can('delete','negocios')" variant="danger">
                              <feather-icon icon="TrashIcon" />
                           </b-button>
         
                        </b-button-group>
                     </template>
                  </b-card>
               </b-col>
            </b-row>
         </b-container>

         <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total"  class="mt-1"/>

         <b-card class="mt-1">

        
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
   BInputGroupAppend,
   BCarousel,
   BCarouselSlide,
   BImg,
   VBPopover,
   BSpinner

} from 'bootstrap-vue'

import useNegocioList from './useNegocioList.js'
import store from '@/store'
import router from '@/router'

import { ref, toRefs, computed, onActivated } from '@vue/composition-api'

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

   setup(props) {


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
      } = useNegocioList();

      onActivated(() => refetchData())

      return {
         items,
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
         loading: computed(() => store.state.loading),
         regresar,
         eliminar,
         irEditar: (negocio) => router.push({ name: 'negocio.edit', params: { id: negocio.id } })
      }

   }


}
</script>

<style lang="scss" scoped>
   .logotipos{
      width: 100% !important;
      height: auto;
      object-fit: cover;
   }
</style>