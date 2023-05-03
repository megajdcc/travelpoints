

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function usePaisList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'pais', sortable: true, label: "Pais" },
      { key: 'codigo', sortable: true, label: "Código" },
      { key: 'lada', sortable: true, label: "Lada" },
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

      

      store.dispatch('pais/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,

      }).then((data) => {
         total.value = Number(data.total)
         next(data.paises)

      }).catch(e => {
         console.log(e)
         toast.error('Error trayendo data ')
      })

   }

   const eliminar = (id) => {

      store.dispatch('pais/eliminar',id).then(({result}) => {

         if(result){
            toast.info('Se ha eliminado con éxito al Pais')

            refetchData();
         }else{
            toast.info('No se pudo eliminar al Pais, inténtelo de nuevo')
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