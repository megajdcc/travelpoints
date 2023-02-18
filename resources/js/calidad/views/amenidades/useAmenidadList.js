
import { ref, watch } from '@vue/composition-api'

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useAmenidadList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Amenidad" },
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

      store.dispatch('amenidad/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         isSortDirDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,

      }).then(({amenidades,total:all}) => {

         next(amenidades)
         total.value = Number(all)

      }).catch(e => {
         toast.error('Error trayendo data ')
      })

   }

   const eliminar = (id) => {

      store.dispatch('amenidad/eliminar', id).then(({ result }) => {

         if (result) {
            toast.success('Amenidad Eliminada con éxito.')
            refetchData();
         } else {
            toast.error('La amenidad no se pudo eliminar, inténtelo de nuevo mas tarde')
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