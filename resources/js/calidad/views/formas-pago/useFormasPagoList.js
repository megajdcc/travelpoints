
import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useFormasPagoList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Forma de Pago" },
      { key: 'actions', sortKey: "id", sortable: true },
   ];

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

   const fetchData = (context, next) => {

      store.dispatch('formasPago/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         isSortDirDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,

      }).then(({formas,total:all}) => {

         next(formas)
         total.value = Number(all)

      }).catch(e => {
         toast.error('Error trayendo data ')
      })

   }

   const eliminar = (id) => {

      store.dispatch('formasPago/eliminar', id).then(({ result }) => {

         if (result) {
            toast.success('Forma de pago Eliminada con éxito.')
            refetchData();
         } else {
            toast.error('La Forma de Pago no se pudo eliminar, inténtelo de nuevo mas tarde')
         }

      }).catch(e => {
         console.log(e)
      })

   }



   return {
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
      fetchData,
      tableColumns,
      eliminar
   }


}