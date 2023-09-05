
import useFilterTable from '@core/utils/useFilterTable';

import store from '@/store'
import {ref,watch} from 'vue'


export default function useLideresList(coordinador){

 const tableColumns = [
      {key: 'id',sortable:true,label:'#'},
      { key: 'username', sortable: true,label:'Usuario' },
      { key: 'activo',label:'Estado',sortable:true},
      { key: 'email', sortable: true,label:"Email" },
      { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
      { key: 'coordinador_id', sortable: true,label:'Coordinador',sortKey:'lider_id' },
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

  watch([coordinador], () => refetchData())
  const fetchData = (ctx,next) => {

    store.dispatch('usuario/fetchLideres',{
      page:ctx.currentPage,
      perPage:ctx.perPage,
      sortBy:ctx.sortBy,
      isSortDirDesc:ctx.sortDesc,
      q:searchQuery.value,
      coordinador:coordinador.value ? coordinador.value.id : null
    }).then(({total:all,lideres}) => {

      total.value = all
      next(lideres)
    }).catch(e => {
      toast.info('Error trayendo Data...')
    })

   return null
  }


  const eliminar = (promotor_id) => {

    store.dispatch('usuario/eliminar',promotor_id).then(({result}) => {

      if(result){
        toast.success('Se eliminado con éxito al lider')
        refetchData();
      }else{
        toast.info('NO se pudo eliminar, inténtelo de nuevo mas tarde')
      }
    })
  } 
  

  const quitarCoordinador = (lider_id) => {

    store.dispatch('usuario/quitarCoordinador',lider_id).then(({result}) => {
      if(result){

        refetchData();
        toast.info('Se ha removido al coordinador del lider')
      }else{
        toast.info('NO se pudo remover al coordinador del lider')
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
      quitarCoordinador
  }



} 