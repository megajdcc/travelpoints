<template>

   <div class="app-calendar overflow-hidden border">
       <div class="row no-gutters">
         <!-- Sidebar -->
         <div class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column" 
         :class="{ 'show': isCalendarOverlaySidebarActive }"
         >
           <calendar-sidebar :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive"  v-model="filterOption"/>
         </div>

         <!-- Calendar -->
         <div class="col position-relative">
           <div class="card shadow-none border-0 mb-0 rounded-0">
             <div class="card-body pb-0">
               <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" >
                  <template #eventContent="{event}">
                       <card-event :event="event"  />
                  </template>
               </full-calendar>
             </div>
           </div>
         </div>

         <!-- Sidebar Overlay -->
         <div
           class="body-content-overlay"
           :class="{ 'show': isCalendarOverlaySidebarActive }"
           @click="isCalendarOverlaySidebarActive = false"
         />

       
       </div>


      <b-sidebar v-model="showEvent" :title="evento.titulo.toUpperCase()" :width="getAncho > 720 ? '450px' : '320px'" >
         <template #title>
            <b-link :href="evento.url" target="_blank"> <font-awesome-icon icon="fas fa-hand-pointer"/> {{ evento.titulo.toUpperCase() }}  </b-link>
         </template>
         <b-container fluid>
            <b-row>
               <b-col cols="12" v-if="evento.imagenes.length">
                     <b-carousel :id="`carousel-${evento.id}`" indicators controls background="#ababab" :intervals="3000">
                        <b-carousel-slide v-for="(imagen, e) in evento.imagenes" :key="e" img-width="320px" img-height="auto"
                           :img-src="`/storage/eventos/imagenes/${imagen.imagen}`"
                           style="max-height:182px; height:182px; object-fit:cover">
   
                        </b-carousel-slide>
   
                     </b-carousel>
               </b-col>
            </b-row>

            <b-row>
               
               <b-col cols="12">
                 <strong>Evento de: {{ evento.model ? evento.model.nombre : 'Sin definir' }}</strong>
               </b-col>

               <b-col cols="12">
                     <small class="text-uppercase">
                        Inicia <br> {{ evento.fecha_inicio | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                        <br> <span v-if="evento.fecha_fin">Finaliza <br>  
                           {{ evento.fecha_fin | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                        </span>
                     </small>
                 
               </b-col>

               <b-col cols="12">

                  <b-badge variant="primary">
                     {{ $store.getters['evento/getStatus'](evento) }}
                  </b-badge>

                   <b-badge variant="info" >
                        {{ evento.recurrente ? 'Evento Recurrente' : 'Evento no recurrente' }}
                  </b-badge>

                  <b-badge variant="warning" v-if="evento.recurrente" v-b-tooltip.hover="'Tipo de recurrencia'">
                        {{ $store.getters['evento/getRecurrencia'](evento) }}
                  </b-badge>

               </b-col>

               <b-col cols="12">
                  <el-divider content-position="left">Contenido</el-divider>
                  <div v-html="evento.contenido"></div>
               </b-col>
            </b-row>
         </b-container>

         <template #footer>
            <b-container fluid class="mb-1">
               <b-row>
                  <b-col>
                      <b-button-group size="sm" >
                        <b-button  variant="primary" :to="{ name: 'edit.evento', params: { id: evento.id } }" v-if="$can('update', 'eventos')">
                              <font-awesome-icon icon="fas fa-pen-to-square"/>
                              Editar
                        </b-button>

                        <b-button variant="danger" @click="eliminar(evento.id)" v-if="$can('delete', 'eventos')">
                              <font-awesome-icon icon="fas fa-trash"/>
                              Eliminar
                           </b-button>

                        <b-button variant="info" :to="{ name: 'evento.imagenes', params: { id: evento.id } }" v-if="$can('update', 'eventos')">
                           <font-awesome-icon icon="fas fa-images"/>
                           Imagenes
                        </b-button>
                     </b-button-group>
                  </b-col>
               </b-row>
            </b-container>
           
         </template>
      </b-sidebar>   
        
      
     </div>
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
   BBadge,
   BSidebar,
   VBTooltip,
   BLink

} from 'bootstrap-vue'


import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue'


import useEventosList from './useEventosList.js'
import store from '@/store'

import { ref, toRefs, computed, onActivated, onUnmounted,onMounted } from 'vue'

import { regresar } from '@core/utils/utils.js'
import CardEvent from 'components/CardEvent.vue';

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
      BBadge,
      CardEvent,
      FullCalendar,
      CalendarSidebar:() => import('components/CalendarSidebar.vue'),
      BSidebar,
      BLink


   },

   directives: {
      'b-popover': VBPopover,
      'b-tooltip' : VBTooltip
   },

   setup(props) {

      const {evento} = toRefs(store.state.evento)

 

      const {
         fetchEvents,
         eliminar,
         refCalendar,
         isCalendarOverlaySidebarActive,
         calendarOptions,
         refetchEvents,
         isEventHandlerSidebarActive,
         calendarApi,
         showEvent,
         filterOption,
      } = useEventosList();

      onMounted(() => {
         // refetchEvents()
      })

      // fetchEvents()


      return {
         fetchEvents,
         eliminar,
         refCalendar,
         isCalendarOverlaySidebarActive,
         calendarOptions,
         refetchEvents,
         isEventHandlerSidebarActive,
         loading: computed(() => store.state.loading),
         regresar,
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
         },
         calendarApi,
         showEvent,
         evento,
         getAncho:computed(() => store.state.app.windowWidth),
         filterOption
       

      }

   }


}
</script>


<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";


</style>

