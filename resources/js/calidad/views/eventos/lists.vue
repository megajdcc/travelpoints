<template>

   <div class="app-calendar overflow-hidden border">
       <div class="row no-gutters">
         <!-- Sidebar -->
         <div class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column" 
         :class="{ 'show': isCalendarOverlaySidebarActive }"
         >
           <calendar-sidebar :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive" />
         </div>

         <!-- Calendar -->
         <div class="col position-relative">
           <div class="card shadow-none border-0 mb-0 rounded-0">
             <div class="card-body pb-0">
               <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" >
                  <template #eventContent="{event}">
                       <b>{{ event.title }}</b>
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
   BBadge

} from 'bootstrap-vue'


import FullCalendar from '@fullcalendar/vue'


import useEventosList from './useEventosList.js'
import store from '@/store'

import { ref, toRefs, computed, onActivated, onUnmounted,onMounted } from '@vue/composition-api'

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
      BBadge,

      FullCalendar,
      CalendarSidebar:() => import('components/CalendarSidebar.vue'),


   },

   directives: {
      'b-popover': VBPopover
   },

   setup(props) {

      const {
         fetchEvents,
         eliminar,
         refCalendar,
         isCalendarOverlaySidebarActive,
         calendarOptions,
         refetchEvents,
         isEventHandlerSidebarActive,
         calendarApi
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
         calendarApi

      }

   }


}
</script>


<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>

