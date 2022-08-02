
import store from '@/store'

import useFilterTable from '@core/utils/useFilterTable'
import { all } from '@ucast/js';

export default function useNegocioCategoriasList(){

   const tableColumns = [
      {key:'id',sortable:true,label:"#", stickyColumn:true,  variant:"primary"},
      { key: 'categoria', sortable: true, label: "Categoría" },
      { key: 'actions', sortable: true, label: "Actions" },
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


   const fetchData = (ctx,next) => {

      store.dispatch('categoriaNegocio/fetchData',{
         currentPage:currentPage.value,
         sortBy:sortBy.value,
         q:searchQuery.value,
         perPage:perPage.value,
         sortDirDesc:isSortDirDesc.value
      }).then(({total:all,categorias}) => {

         total.value = all;
         next(categorias)

      }).catch(e => {
         toast.error("Error cargando data")
      })

   }
   
   const eliminar = (id) => {

      store.dispatch('categoriaNegocio/eliminar',id).then(({result}) => {

         if(result){
            refetchData();
            toast.info('Categoría eliminada con éxito')
         }else{
            toast.error('La categoría no se pudo eliminar')
         }
         
      }).catch(e => {
         toast.error('La categoría no se pudo eliminar')

      })

   }

   return {
      tableColumns,
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
      eliminar
   }

}
