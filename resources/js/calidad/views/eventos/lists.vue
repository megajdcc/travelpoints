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
                        <b-button variant="dark" size="sm" :to="{ name: 'create.evento' }"
                           v-if="$can('write', 'eventos')" class="d-flex">
                           <span class="d-flex align-items-center py-0">
                              Agregar Evento
                           </span>
                        </b-button>
                     </b-input-group-append>
                  </b-input-group>
               </b-col>

            </b-row>

         </div>

         <b-container fluid>
            <b-row>
               <b-col cols="12" md="4" v-for="(evento, i) in items" :key="i">
                  <b-card>
                     <template #header>
                        <b-carousel :id="`carousel-${i}`" indicators controls background="#ababab" :intervals="3000">
                           <b-carousel-slide v-for="(imagen, e) in evento.imagenes" :key="e" img-width="320px"
                              img-height="auto" :img-src="`/storage/eventos/imagenes/${imagen.imagen}`"
                              style="max-height:182px; height:182px; object-fit:cover">

                           </b-carousel-slide>

                        </b-carousel>
                     </template>

                     <b-badge :variant="getStatus(evento.status).variant">
                        {{ getStatus(evento.status).status }}
                     </b-badge>
                     
                     <br>

                     <small>
                        Del {{ evento.fecha_inicio | fecha('LL') }} al {{ evento.fecha_fin | fecha('LL') }}
                     </small>

                     <h4 :title="evento.titulo">
                        {{ evento.titulo }}
                     </h4>
                 

                     <p class="text-justify"  :title="evento.titulo" v-html="`${evento.contenido.substring(0, 80)}...`">
                       
                     </p>

                     <template #footer>
                        <b-button-group size="sm">

                           <b-button :to="{ name: 'edit.evento', params: { id: evento.id } }" v-if="$can('update', 'eventos')"
                              variant="primary">
                              <feather-icon icon="EditIcon" />
                           </b-button>

                           <b-button @click="eliminar(evento.id)" v-if="$can('delete', 'eventos')" variant="danger">
                              <feather-icon icon="TrashIcon" />
                           </b-button>

                           <b-button :to="{ name: 'evento.imagenes', params: { id: evento.id } }"
                              v-if="$can('update', 'eventos')" variant="dark">
                              <feather-icon icon="ImageIcon" />
                              Imagenes
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
   VBPopover,
   BBadge

} from 'bootstrap-vue'

import useEventosList from './useEventosList.js'
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
      paginateTable: () => import('components/PaginateTable.vue'),
      BBadge


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
      } = useEventosList();

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
         getStatus: (estado) => {
            let status = {
               variant:'info',
               status:'Sin definir'
            };
            switch (estado) {
               case 1:
                  status = {
                     variant:'success',
                     status:'Activo'
                  };
                  break;

               case 2:
                  status = {
                     variant: 'danger',
                     status: 'Vencido'
                  };
                  break;

               case 3:
                  status = {
                     variant: 'warning',
                     status: 'A Destiempo'
                  };
                  break;
            
            }

            return status;
         }

      }

   }


}
</script>
