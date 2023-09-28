import store from '@/store'
import {ref,computed} from 'vue'

import useFilterTable from '@core/utils/useFilterTable'

export default function useIdiomaList(){

  const tableColumns = computed(() => {

    return [
      {key:'#',label:'id',sortable:true},
      {key:'languaje',label:'Idioma',sortable:true},
      {key:'shortLang',label:'ISO',sortable:true},
      {key:'default',label:'¿Es el predeterminado?',sortable:true},
      {key:'actions',label:'Actions',sortable:false,sortKey:'id'}
    ]
  })

  
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


  const fetchData = (ctx,n) => {

    store.dispatch('idioma/fetchData',{
      page:ctx.currentPage,
      sortBy:ctx.sortBy,
      perPage:ctx.perPage,
      q:searchQuery.value,
      isSortDirDesc:ctx.sortDesc
    }).then(({total:all,idiomas}) => {
      total.value = all
      n(idiomas)
    })

  }

  const eliminar = (idioma_id) => {
    store.dispatch('idioma/eliminar',idioma_id).then(({result}) => refetchData()).catch(e => console.log(e))
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
    fetchData,
    eliminar,
    tableColumns
  }
}
