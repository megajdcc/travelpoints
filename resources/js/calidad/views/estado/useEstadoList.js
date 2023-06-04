

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useEstadoList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'estado', sortable: true, label: "Estado" },
      { key: 'pais', sortable: true, label: "Pais" },
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

      

      store.dispatch('estado/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,

      }).then((data) => {
         total.value = Number(data.total)
         next(data.estados)

      }).catch(e => {
         console.log(e)
         toast.error('Error trayendo data ')
      })

   }

   const eliminar = (id) => {

      store.dispatch('estado/eliminar',id).then(({result}) => {

         if(result){
            toast.info('Se ha eliminado con éxito al Estado')

            refetchData();
         }else{
            toast.info('No se pudo eliminar al Estado, inténtelo de nuevo')
         }
      }).catch(e => console.log(e))



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