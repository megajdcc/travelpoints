
import useFilterTable from '@core/utils/useFilterTable';

import store from '@/store'
import {ref} from 'vue'


export default function useCoordinadoresList(){

 const tableColumns = [
      {key: 'id',sortable:true,label:'#'},
      { key: 'username', sortable: true,label:'Usuario' },
      { key: 'activo',label:'Estado',sortable:true},
      { key: 'email', sortable: true,label:"Email" },
      { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
      { key: 'status', sortable: true,label:'Status',sortKey:'username' },
      { key: 'actions',sortable:true, sortKey:'id',sortBy:'id' },
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
  } = useFilterTable()

  const fetchData = (ctx,next) => {

   store.dispatch('usuario/fetchCoordinadores',{
    page:currentPage.value,
    perPage:perPage.value,
    sortBy:sortBy.value,
    isSortDirDesc:isSortDirDesc.value,
    q:searchQuery.value,
   }).then(({total:all,coordinadores}) => {

    total.value = all
    next(coordinadores)
   }).catch(e => {
    toast.info('Error trayendo Data...')
   })
  }
  const eliminar = (coordinador_id) => {

    store.dispatch('usuario/eliminar',coordinador_id).then(({result}) => {

      if(result){
        toast.success('Se eliminado con éxito al coordinador')
        refetchData();
      }else{
        toast.info('NO se pudo eliminar, inténtelo de nuevo mas tarde')
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
      refetchData,
      tableColumns,
      fetchData,
      eliminar,
  }



} 