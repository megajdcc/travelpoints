
import store from '@/store'

import { ref, computed, onMounted, watch,h } from 'vue'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import { createPopper } from '@popperjs/core';

export default function useEventosList(negocio = null) {

      const calendarApi = ref(null)
      const showEvent = ref(false)
      const refCalendar = ref(null)
      const filterOption = ref([]);
      // ------------------------------------------------
      // (UI) updateEventInCalendar
      // ------------------------------------------------
      const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {

      }

      // ------------------------------------------------
      // (UI) removeEventInCalendar
      // ------------------------------------------------
      const removeEventInCalendar = eventId => {

      }


      const refetchEvents = () => {
         

         calendarApi.value.refetchEvents()
      }


      const isEventHandlerSidebarActive = ref(false)

      const isCalendarOverlaySidebarActive = ref(false)

      watch([filterOption], () => refetchEvents())

      onMounted(() => {
            calendarApi.value = refCalendar.value.getApi()
            // calendarApi.value.render()
      })

      const fetchEvents = (info,next,failure) => { 

      if (!info) return

      // console.log(info.end.getDate())

      store.dispatch('evento/fetchEventos',{
         start:info.start.valueOf(),
         end:info.end.valueOf(),
         filterOption:filterOption.value,
         negocio:negocio ? negocio.value.id: null
      }).then((eventos) => {h

         const events = eventos.map(val => {
            if(val.recurrente){
               return {
                  title:val.titulo,
                  start:val.fecha_inicio,
                  end:val.fecha_fin,
                  id:val.id,
                  groupId:val.recurrencia.id_group,
                  daysOfWeek:val.recurrencia.dia_semana,
                  startTime:val.recurrencia.hora_inicio,
                  endTime:val.recurrencia.hora_fin,
                  allDay:val.all_dia,
                  extendedProps:val,
                  backgroundColor:colorRand(),
                  eventColor:colorRand(),
                  classNames:[`evento-${val.id}`],
                  startRecur:val.fecha_inicio,
                  endRecur:val.fecha_fin ? val.fecha_fin : null,
                  resourceEditable:false,
                  durationEditable:false,
                  startEditable:false, 
                  editable:false,
                  // display: 'background'
               }
            }

            return {
               title:val.titulo,
               start:val.fecha_inicio,
               end:val.fecha_fin,
               id:val.id,
               allDay:val.all_dia,
               backgroundColor:colorRand(),
               eventColor:colorRand(),
               classNames:[`evento-${val.id}`],
               extendedProps:val,
            }
         });

         next(events);
        
      }).catch(e => {
         console.log(e)
         failure(e)
         toast.info('Error trayendo Data', { position: 'bottom-right' })
      })

   }

   const eliminar = (evento_id) => {
      store.dispatch('evento/eliminar', evento_id).then(({ result }) => {
         if (result) {
            toast.success('Se ha eliminado con éxito el evento', { position: 'bottom-right' })
            refetchEvents();
            showEvent.value = false
         }
      })

   }



   const calendarOptions = ref({

      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      locale:esLocale,
      initialView: 'dayGridMonth',
      dayMaxEvents: true, // allow "more" link when too many events
      headerToolbar: {
         start: 'sidebarToggle, prev,next, title',
         end: 'dayGridMonth,timeGridWeek,listMonth',
      },

      events:fetchEvents,
      editable: false,
      eventResizableFromStart: false,
      dragScroll: false,
      dayMaxEvents: 4,

      /*
         Determina si se puede hacer clics en los nombres de dias y semanas
         ? Docs: https://fullcalendar.io/docs/navLinks
      */
      navLinks: false,

      eventClick({ event: clickedEvent }) {
         // isEventHandlerSidebarActive.value = true
         store.commit('evento/setEvento',clickedEvent.extendedProps)
         showEvent.value = true
      },

      customButtons: {
         sidebarToggle: {
            text: 'sidebar',
            click() {
               isCalendarOverlaySidebarActive.value = !isCalendarOverlaySidebarActive.value
            },
         },
      },

      dateClick(info) {
         isEventHandlerSidebarActive.value = true
      },


      eventDrop({ event: droppedEvent }) {

      },

      rerenderDelay: 350,
   })





   return {
      fetchEvents,
      eliminar,
      refCalendar,
      calendarApi,
      isCalendarOverlaySidebarActive,
      calendarOptions,
      refetchEvents,
      isEventHandlerSidebarActive,
      showEvent,
      filterOption
   }

}
