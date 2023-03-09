
import store from '@/store'
import { ref, computed, onMounted, watch } from '@vue/composition-api'

import useFilterTable from '@core/utils/useFilterTable'
export default function useNegociolist() {

   const tableColumns = ref([
      {key:'id',label:'#',sortable:true},
      {key:'nombre',sortable:true,label:'Nombre',},
      {key:'comision',sortable:true,label:'Comisión'},
      {key:'saldo',sortable:false,label:'Saldo',sortKey:'id'},
      {key:'origen',sortable:false,label:'Origen',sortKey:'id'},
      {key:'created_at',sortable:true,label:'Registrado',sortKey:'id'},
      {key:'actions',sortable:false,label:'Actions',sortKey:'id'},

   ]) 

   const items = ref([]);

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

      store.dispatch('negocio/fetchData', {
         perPage: perPage.value,
         currentPage: currentPage.value,
         sortBy: sortBy.value,
         q: searchQuery.value,
         isSortDirDesc: isSortDirDesc.value
      }).then(({ total: all, negocios }) => {

         total.value = all
         next(negocios)

      }).catch(e => {
         toast.info('Error trayendo Data', { position: 'bottom-right' })
      })

   }

   const eliminar = (negocio_id) => {


      store.dispatch(`negocio/eliminar`, negocio_id).then(({ result }) => {
         if (result) {
            toast.success('Se ha eliminado con éxito el negocio', { position: 'bottom-right' })
            refetchData();
         }
      })

   }

   return {
      isSortDirDesc,
      sortBy,
      searchQuery,
      perPage,
      currentPage,
      total,
      items,
      perPageOptions,
      dataMeta,
      refetchData,
      fetchData,
      refTable,
      eliminar,
      tableColumns
   }

}
