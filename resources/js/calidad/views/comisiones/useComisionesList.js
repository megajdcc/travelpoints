import useFilterTable from "@core/utils/useFilterTable";

import store from '@/store'
import {ref} from 'vue'

export default function useComisionesList(){

  const tableColumns = ref([
    {key:'id',label:'#',sortable:true},
    {key:'comision',label:'Comisión',sortable:true,sortBy:'comision'},
    {key:'rol_id',label:'Rol',sortable:true,sortBy:'rol_id'},
    {key:'actions',label:'Actions',sortable:false,sortKey:'id'},
  ])

  const  {
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
    store.dispatch('comision/fetchData',{
      currentPage:currentPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
      q:searchQuery.value
    }).then(({total:all,comisiones}) => {
      total.value = all
      next(comisiones)
    }).catch(e => {
      toast.info('Error trayendo Data, inténte de nuevo mas tarde...')
    })
  }

  const eliminar = (comision_id) => {
    store.dispatch('comision/eliminar',comision_id).then(({result}) => {
      if(result){
        toast.success('Se ha eliminado con éxito la comisión')
        refetchData()
      }else{
        toast.info('No se pudo eliminar la comisión, inténte de nuevo mas tarde...')

      }
    })
  }

  return {
      tableColumns,
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
      fetchData,
      eliminar
  }

}