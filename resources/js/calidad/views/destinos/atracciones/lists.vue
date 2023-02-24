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
                        <b-button variant="dark" size="sm" :to="{ name: 'create.atraccion',params:{destino:destino} }"
                           v-if="$can('write', 'destino')" class="d-flex">
                           <span class="d-flex align-items-center py-0">
                              Agregar Atracción
                           </span>
                        </b-button>
                     </b-input-group-append>
                  </b-input-group>
               </b-col>

            </b-row>

         </div>

         <b-container fluid>
            <b-row>
               <b-col cols="12" md="4" v-for="(atraccion,i) in items" :key="i">
                  
                  <b-card>

                     <template #header>

                        <b-carousel :id="`carousel-${i}`" indicators controls background="#ababab" :intervals="3000">

                           <b-carousel-slide v-for="(imagen,e) in atraccion.imagenes" :key="e" img-width="320px"
                              img-height="auto" :img-src="`/storage/atracciones/imagenes/${imagen.imagen}`"
                              style="max-height:182px; height:182px; object-fit:cover">

                           </b-carousel-slide>

                        </b-carousel>

                     </template>

                     <h4 v-b-popover.hover="atraccion.descripcion.substring(0,150)" :title="atraccion.nombre">
                        {{ atraccion.nombre }}
                     </h4>

                     <p class="text-justify" v-b-popover.hover="atraccion.descripcion.substring(0,150)" :title="atraccion.nombre">
                        {{ atraccion.descripcion.substring(0, 80) }} ...
                     </p>

                     <template #footer>
                        <b-button-group size="sm">

                           <b-button :to="{name:'edit.atraccion',params:{id:atraccion.id}}" v-if="$can('update','atracciones')"
                              variant="primary">
                              <feather-icon icon="EditIcon" />
                           </b-button>

                           <b-button @click="eliminar(atraccion.id)" v-if="$can('delete','atracciones')" variant="danger">
                              <feather-icon icon="TrashIcon" />
                           </b-button>

                           <b-button :to="{ name:'imagenes.atraccion',params:{id:atraccion.id}}"
                              v-if="$can('update','atracciones')" variant="dark">
                              <feather-icon icon="ImageIcon" />
                           </b-button>

                           <b-button :to="{ name:'atraccion.horarios',params:{id:atraccion.id}}"
                              v-if="$can('update','horarios')" variant="primary">
                              <feather-icon icon="ClockIcon" />
                              Horarios
                           </b-button>


                        </b-button-group>
                     </template>
                  </b-card>
               </b-col>
            </b-row>
         </b-container>


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
   BInputGroupAppend,
   BCarousel,
   BCarouselSlide,
   BImg,
   VBPopover

} from 'bootstrap-vue'

import useAtraccionesList from './useAtraccionesList.js'
import store from '@/store'
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
      paginateTable: () => import('components/PaginateTable.vue')

   },

   directives: {
      'b-popover': VBPopover
   },

   props:['destino'],

   setup(props) {

      const { destino } = toRefs(props)
       
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
      } = useAtraccionesList(destino.value);

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
         eliminar
      }

   }


}
</script>