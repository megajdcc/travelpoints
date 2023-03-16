
import { ref, watch } from 'vue'

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useDivisaList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Divisa" },
      { key: 'iso', sortable: true, label: "Iso" },
      { key: 'simbolo', sortable: true, label: "Simbolo" },
      { key: 'principal', sortable: true, label: "Es la moneda principal del sistema?" },
      { key: 'tasa', sortable: true, label: "Tasa" },
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

      store.dispatch('divisa/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         isSortDirDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,

      }).then((data) => {

         next(data.divisas)
         total.value = Number(data.total)

      }).catch(e => {
         toast.error('Error trayendo data ')
      })

   }

   const eliminar = (id) => {

      store.dispatch('divisa/eliminar', id).then(({ result }) => {

         if (result) {
            toast.success('Divisa Eliminada con éxito.')
            refetchData();
         } else {
            toast.error('La Divisa no se pudo eliminar, inténtelo de nuevo mas tarde')
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