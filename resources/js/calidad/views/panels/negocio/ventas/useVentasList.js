

import store from '@/store'
import { toRefs, ref, watch, onMounted, computed } from '@vue/composition-api'

export default function useVentasList(negocio) {

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

      const localItemsCount =  items.value.length

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      fetchData((ventas) => {
         items.value = ventas
      })
   }
   

   watch([currentPage, perPage, searchQuery], () => {
      refetchData()
   })


   const fetchData = (next) => {

      store.dispatch('venta/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         isSortDirDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,
         negocio_id: negocio.value ? negocio.value.id : null,
         model_type:'App\\Models\\Negocio\\Negocio',
      }).then(({ ventas, total: all }) => {

         total.value = all
         items.value = ventas
         next(ventas)
      })

   }

   const eliminar = (venta_id) => {

      store.dispatch('venta/eliminar', venta_id).then(({ result }) => {

         if (result) {
            toast.success('Se ha quitado con éxito la venta')
            refetchData()
         } else {
            toast.info('No se pudo quitar la venta')
         }


      })

   }

   onMounted(() => refetchData())

   return {
      fetchData,
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      total,
      dataMeta,
      refetchData,
      eliminar,
      items,

   }


}
