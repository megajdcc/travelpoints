import useFilterTable from "@core/utils/useFilterTable";
import {ref} from '@vue/composition-api'
import store from '@/store';

export default function useIataList() {

   const tableColumns = ref([
      {key:'id',label:'#', sortable:true},
      {key:'codigo' , label:'Código Iata', sortable:true},
      {key:'aeropuerto', label:'Aeropuerto', sortable:true},
      {key:'actions',label:'Actions',sortable:true,sortBy:'id', sortKey:'id'}
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
   }  = useFilterTable();


   const eliminar = (iata_id) => {

      store.dispatch('iata/eliminar',iata_id).then(({result}) => {

         if(result){
            toast.success('Se ha Eliminado con éxito el código IATA')
            refetchData()
         }else{
            toast.info('No se pudo eliminar,inténtelo de nuevo')
         }
      })

   } 

   const fetchData = (ctx,next) => {
      store.dispatch('iata/fetchData',{
         currentPage:currentPage.value,
         q:searchQuery.value,
         isSortDirDesc:isSortDirDesc.value,
         perPage:perPage.value,
         sortBy:sortBy.value
      }).then(({iatas,total:all}) => {
         total.value = all
         next(iatas)
      }).catch(e => {
         toast.info('Error trayendo data')
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
