import store from '@/store'
import {ref} from 'vue'
import useFilterTable from '@core/utils/useFilterTable'

export default function useRetirosList(){

  const tableColumns = ref([
    {key:'id',label:'#',sortable:true},
    {key:'monto',label:'Monto',sortable:true},
    {key:'status',label:'Status',sortable:true},
    {key:'usuario_id',label:'Usuario',sortable:true,sortKey:'id'},
    {key:'actions',label:'Actions',sortable:false,sortKey:'id'}
  ])  

  const getStatus = (status) => {
    let statuses = [
      'Solicitado',
      'En Proceso',
      'Procesado',
      'Rechazado'
    ];


    return statuses[status - 1];

  }

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

    store.dispatch('retiro/fetchData',{
      page:currentPage.value,
      perPage:perPage.value,
      q:searchQuery.value,
      isSortDirDesc:isSortDirDesc.value,
      sortBy:sortBy.value
    }).then(({total:all,retiros}) => {

      total.value = all
      next(retiros)

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
      getStatus,
      fetchData
  }
} 