

import store from '@/store'
import { toRefs, ref, watch, onMounted, computed } from '@vue/composition-api'
import useFilterTable from '@core/utils/useFilterTable'

export default function useVentasList(negocio) {

   const items = ref([])

   const tableColumns = ref([
      {key:'id',label:'#',sortBy:'id'},
      {key:'monto', label:'Monto',sortable:true},
      {key:'actions',label:'Actions',sortBy:'id', sortKey:'id'}
   ]);

   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
   } = useFilterTable();

   const fetchData = (ctx,next) => {

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

   return {
      fetchData,
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      eliminar,
      items,
      tableColumns

   }


}
