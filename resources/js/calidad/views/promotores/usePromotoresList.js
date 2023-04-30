
import useFilterTable from '@core/utils/useFilterTable';

import store from '@/store'
import {ref} from 'vue'


export default function usePromotoresList(lider){

 const tableColumns = [
      { key: 'username', sortable: true,label:'Usuario' },
      { key: 'activo',label:'Estado',sortable:true},
      { key: 'email', sortable: true,label:"Email" },
      { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
      { key: 'lider_id', sortable: true,label:'Lider',sortKey:'lider_id' },
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

   store.dispatch('usuario/fetchPromotores',{
    page:currentPage.value,
    perPage:perPage.value,
    sortBy:sortBy.value,
    isSortDirDesc:isSortDirDesc.value,
    q:searchQuery.value,
    lider:lider.value ? lider.value.id : null
   }).then(({total:all,promotores}) => {

    total.value = all
    next(promotores)
   }).catch(e => {
    toast.info('Error trayendo Data...')
   })
  }


  const eliminar = (promotor_id) => {

    store.dispatch('usuario/eliminar',promotor_id).then(({result}) => {

      if(result){
        toast.success('Se eliminado con éxito al promotor')
        refetchData();
      }else{
        toast.info('NO se pudo eliminar, inténtelo de nuevo mas tarde')
      }
    })
  } 
  

  const quitarLider = (promotor_id) => {

    store.dispatch('usuario/quitarLider',promotor_id).then(({result}) => {
      if(result){

        refetchData();
        toast.info('Se ha removido al lider del promotor')
      }else{
        toast.info('NO se pudo remover al lider del promotor')
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
      quitarLider
  }



} 