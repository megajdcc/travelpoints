
import store from '@/store'
import {ref,watch} from 'vue'

import useFilterTable from '@core/utils/useFilterTable'
export default function useViajerosList(){

  const tableColumns = ref([
    {key:'username',label:"Viajero",sortable:true},
    { key: 'promotor', sortable: false,label:"Promotor" },
    { key: 'email', sortable: true,label:'Email' },
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
      items,
  } = useFilterTable();

  const fetchData = (ctx,next) => {

    store.dispatch('usuario/fetchViajeros',{
      page:currentPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
      q:searchQuery.value

    }).then(({total:all,viajeros}) => {
      total.value = all
      next(viajeros)
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
      items,
      tableColumns,
      fetchData

  }
}