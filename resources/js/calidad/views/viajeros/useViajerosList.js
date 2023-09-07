
import useFilterTable from "@core/utils/useFilterTable";
import {ref} from 'vue'
import store from '@/store'

export default function useViajerosList(){

  const tableColumns = ref([
    {key:'#',label:'#',sortable:false,sortKey:'id'},
    {key:'username',label:'Viajero'},
    {key:'email',label:'Email'},
    {key:'telefono',label:'Teléfono'},
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
      page:ctx.currentPage,
      sortBy:ctx.sortBy,
      perPage:ctx.perPage,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value
    }).then(({viajeros,total:all}) => {
      total.value = all
      next(viajeros)
    }).catch(e => {
      toast.error('No se pudo cargar los viajeros, inténtelo de nuevo mas tarde')
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
