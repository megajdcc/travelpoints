

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useCargosList(negocio) {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'cargo', sortable: true, label: "Cargo" },
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

   const fetchData = (ctx, next) => {  

   
         store.dispatch('cargo/fetchData', {
            perPage: perPage.value,
            sortBy: sortBy.value,
            isSortDirDesc: isSortDirDesc.value,
            q: searchQuery.value,
            page: currentPage.value,
            negocio_id: negocio.value ? negocio.value.id : null
         }).then(({ cargos, total: all }) => {
            total.value = all
            next(cargos)
         }).catch(e => {
            toast.error('Error trayendo data ')
         })


    

   }

   const eliminar = (id) => {

      store.dispatch('cargo/eliminar', id).then(({ result }) => {

         if (result) {
            toast.success('Cargo Eliminado con éxito.')
            refetchData();
         } else {
            toast.error('El Permiso no se pudo eliminar, inténtelo de nuevo mas tarde')
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