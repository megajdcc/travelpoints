
import store from '@/store'

import { ref, computed, onMounted, watch } from '@vue/composition-api'


export default function useEventosList() {

   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(12)
   const currentPage = ref(1)
   const total = ref(0);
   const items = ref([]);
   const perPageOptions = ref([
      {
         label: '12',
         value: 12,
      },
      {
         label: '25',
         value: 25,
      },
      {
         label: '50',
         value: 50,
      },
      {
         label: '100',
         value: 100,
      },
      {
         label: 'Todas',
         value: 0,
      },

   ])

   const dataMeta = computed(() => {

      const localItemsCount = items.value ? items.value.length : 0

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })


   const refetchData = () => fetchData((destinos) => items.value = destinos)

   watch([currentPage, perPage, searchQuery], () => {
      refetchData()
   })

   onMounted(() => refetchData())



   const fetchData = (next) => {

      store.dispatch('evento/fetchData', {
         perPage: perPage.value,
         currentPage: currentPage.value,
         sortBy: sortBy.value,
         q: searchQuery.value,
         isSortDirDesc: isSortDirDesc.value
      }).then(({ total: all, eventos }) => {

         total.value = all
         next(eventos)
      }).catch(e => {
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
      eliminar
   }

}
