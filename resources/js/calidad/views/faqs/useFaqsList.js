import {ref,onMounted,watch} from '@vue/composition-api'
import store from '@/store'

import useFilterTable from '@core/utils/useFilterTable'

export default function useFaqsList(){

   // Table Handlers
   const tableColumns = [
      { key: 'id', sortable          : true, label: '#' },
      { key: 'pregunta', sortable    : true, label: "pregunta" },
      { key: 'categoria_id', sortable: true, label: 'Categoría' },
      { key: 'usuario_id', sortable  : true, label: 'Creador' },
      { key: 'actions', sortable     : false },
   ]

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

   const eliminar = (id) => {

      
      store.dispatch('faq/eliminarFaq',id).then(({result}) => {

         if(result){
            
            toast.success('Se ha eliminado con éxito la pregunta')
            refetchData();
         
         }else{

            toast.error('No se pudo, eliminar la pregunta, inténtelo de nuevo mas tarde..')

         }

      })


   }

   
   const fetchData = (ctx,next) => {

      store.dispatch('faq/fetchFaqs',{
         perPage    : perPage.value,
         currentPage: currentPage.value,
         q          : searchQuery.value,
         sortBy     : sortBy.value,
         sortDirDesc: isSortDirDesc.value
      }).then(({total:all,faqs}) => {
         total.value = all
         next(faqs)
      }).catch(e => {
         toast.error('NO se pudo cargar la data')
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
      tableColumns,
      fetchData,
      eliminar

   }


}