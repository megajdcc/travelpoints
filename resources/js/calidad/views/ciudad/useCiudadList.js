

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useCiudadList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'ciudad', sortable: true, label: "Municipio" },
      { key: 'estado', sortable: true, label: "Estado", sortBy: 'ciudad', sortKey: "id"},
      { key: 'pais', sortable: true, label: "Pais", sortBy: 'id', sortKey: "id", },
      { key: 'actions', sortKey: "id", sortable: true, },
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

      

      store.dispatch('ciudad/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,

      }).then((data) => {
         total.value = Number(data.total)
         next(data.ciudades)

      }).catch(e => {
         console.log(e)
         toast.error('Error trayendo data ')
      })

   }

   const eliminar = (id) => {

      store.dispatch('ciudad/eliminar',id).then(({result}) => {

         if(result){
            toast.info('Se ha eliminado con éxito la ciudad')

            refetchData();
         }else{
            toast.info('No se pudo eliminar la ciudad, inténtelo de nuevo')
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