import {ref} from 'vue'
import useFilterTable from '@core/utils/useFilterTable'
import store from '@/store'

export default function useLoteList(){

  const tableColumns = ref([
    {key:'id',label:'#',sortable:true},
    {key:'fecha_llegada',label:'Fecha llegada',sortable:true},
    {key:'cantidad',label:'Cantidad de tarjetas',sortable:true},
    {key:'monto',label:'Monto de Venta',sortable:true},
    {key:'tps',label:'Tps en la tarjeta',sortable:true},
    {key:'numero_inicial',label:'Número Inicial',sortable:true},
    {key:'numero_final',label:'Número Final',sortable:true},
    {key:'actions',label:'Actions',sortable:false,sortKey:'id'},
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


  const fetchData = (ctx,next) => {

    store.dispatch('lote/fetchData',{
      page:currentPage.value,
      q:searchQuery.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
    }).then(({total:all,lotes}) => {

      total.value = all
      next(lotes)
    }).catch((e) => {
      toast.info('Error trayendo data')
    })


  } 

  const eliminar = (lote_id) => {
    store.dispatch('lote/eliminar',lote_id).then(({result}) => {
        if(result){
          refetchData();
        }
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
      tableColumns,
      refetchData,
      fetchData,
      eliminar
  }
}