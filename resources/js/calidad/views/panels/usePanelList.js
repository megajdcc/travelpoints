
import store from '@/store'
import useFilterTable from '@core/utils/useFilterTable'
import {ref} from 'vue'

export default function usePanelList(){


   const tableColumns = ref([
      { key: 'id', label: '#', sortable: true },
      { key: 'panel', label: 'Panel', sortable: true },
      { key: 'actions', label: 'Actions', sortable: true, sortBy: 'id', sortKey: 'id' }
   ])

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

      store.dispatch('panel/fetchData',{
         currentPage: currentPage.value,
         q: searchQuery.value,
         isSortDirDesc: isSortDirDesc.value,
         perPage: perPage.value,
         sortBy: sortBy.value
      }).then(({panels,total:all}) => {

         total.value = all
    
         next(panels)

      }).catch(e => {
         console.log(e)

         toast.info('Error Cargando Data',{position:'bottom-right'})
      })

   } 


   const eliminar = (panel_id) => {

      store.dispatch('panel/eliminar',panel_id).then(({result}) => {
         
         if(result){
            toast.success('Se ha eliminado con éxito el panel',{position:'bottom-right'})
            refetchData();
         }else{
            toast.info('No se pudo eliminar el panel, inténte de nuevo', { position: 'bottom-right' })

         }

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