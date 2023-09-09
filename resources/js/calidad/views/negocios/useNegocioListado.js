
import store from '@/store'
import { ref, computed, onMounted, watch } from 'vue'

export default function useNegocioListado(destino_id,is_reserva = false) {

  const items = ref([])
   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(100)
   const currentPage = ref(1)
   const total = ref(0);

   const perPageOptions = ref([
      {
         label: '10',
         value: 10,
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

      const localItemsCount = items.value.length;
      
      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      fetchData((negocios) => items.value = negocios)
   }

   watch([currentPage, perPage, searchQuery], () => {
      refetchData()
   })
   

   const fetchData = (next) => {

      store.dispatch('negocio/fetchData', {
         perPage: perPage.value,
         currentPage: currentPage.value,
         sortBy: sortBy.value,
         q: searchQuery.value,
         isSortDirDesc: isSortDirDesc.value,
         destinoId:destino_id.value ? destino_id.value : null,
         isReserva:is_reserva
      }).then(({ total: all, negocios }) => {

         total.value = all
         next(negocios)

      }).catch(e => {
         toast.info('Error trayendo Data', { position: 'bottom-right' })
      })

   }



   return {
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
   }

}
