import {ref} from 'vue'
import useFilterTable from '@core/utils/useFilterTable'
import store from '@/store'

export default function useVonageList(){

  const tableColumns = ref([
    {key:'id',label:'#',sortable:true},
    {key:'msisdn',label:'msisdn',sortable:true,sortKey:'numero'},
    {key:'to',label:'Para',sortable:true},
    {key:'text',label:'mensaje',sortable:true},
    {key:'type',label:'Tipo',sortable:true},
    {key:'actions',label:'Actions',sortable:true},

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

    store.dispatch('vonage/fetchData',{
      page:currentPage.value,
      q:searchQuery.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
    }).then(({total:all,mensajes}) => {

      total.value = all
      next(mensajes)
    }).catch((e) => {
      toast.info('Error trayendo data')
    })


  } 

  const eliminar = (mensaje_id) => {
    
    store.dispatch('vonage/eliminar',mensaje_id).then(({result}) => {

      if(result){
        toast.success('Mensaje eliminado con éxito')
        refetchData()
      }else{
        toast.info('No se pudo eliminar el mensaje, inténtelo de nuevo')
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