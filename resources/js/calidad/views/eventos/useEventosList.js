
import store from '@/store'

import { ref, computed, onMounted, watch,h } from '@vue/composition-api'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import cardEvent from 'components/cardEvent.vue'
import {BPopover} from 'bootstrap-vue'

export default function useEventosList() {

      const calendarApi = ref(null)
      
cardEvent
      const refCalendar = ref(null)

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
         
         console.log('consultando')
         console.log(calendarApi.value)

         calendarApi.value.refetchEvents()
      }


      const isEventHandlerSidebarActive = ref(false)

      const isCalendarOverlaySidebarActive = ref(false)

  


      onMounted(() => {
            calendarApi.value = refCalendar.value.getApi()
            // calendarApi.value.render()
      })

      const fetchEvents = (info,next,failure) => { 

      if (!info) return

      // console.log(info.end.getDate())

      store.dispatch('evento/fetchEventos',{
         start:info.start.valueOf(),
         end:info.end.valueOf()
      }).then((eventos) => {

         next(eventos.map(val => {

            if(val.recurrente){
               return {
                  title:val.titulo,
                  start:val.fecha_inicio,
                  id:val.id,
                  groupId:val.recurrencia.id_group,
                  daysOfWeek:val.recurrencia.dia_semana,
                  startTime:val.recurrencia.hora_inicio,
                  endTime:val.recurrencia.hora_fin,
                  allDay:val.all_dia,
                  extendedProps:val,
                  backgroundColor:colorRand(),
                  classNames:['text-white','bg-primary',],
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
               id:val.id,
               allDay:val.all_dia,
               backgroundColor:colorRand(),
               classNames:['bg-warning','text-white'],

            }

         }))
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
            refetchData();
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
         end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      },

      events:fetchEvents,

      /*
         Enable dragging and resizing event
         ? Docs: https://fullcalendar.io/docs/editable
      */
      editable: true,

      /*
         Enable resizing event from start
         ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
      */
      eventResizableFromStart: true,

      /*
         Automatically scroll the scroll-containers during event drag-and-drop and date selecting
         ? Docs: https://fullcalendar.io/docs/dragScroll
      */
      dragScroll: true,

      /*
         Max number of events within a given day
         ? Docs: https://fullcalendar.io/docs/dayMaxEvents
      */
      //  dayMaxEvents: 2,

      /*
         Determines if day names and week names are clickable
         ? Docs: https://fullcalendar.io/docs/navLinks
      */
      navLinks: true,

      eventClick({ event: clickedEvent }) {
         isEventHandlerSidebarActive.value = true
         console.log('vento click ', clickedEvent)
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

      /*
         Handle event resize
         ? Docs: https://fullcalendar.io/docs/eventResize
      */
      eventResize({ event: resizedEvent }) {

      },


   eventDidMount: (info)  =>   () => h(cardEvent,{
            target:info.el,
            info
         }),
   //   eventContent: ({event}) => (h('div', { id: 'foo' }, 'hello')),

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
   }

}
