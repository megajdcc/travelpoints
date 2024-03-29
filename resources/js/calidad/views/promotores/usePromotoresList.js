
import useFilterTable from '@core/utils/useFilterTable';

import store from '@/store'
import {ref,computed} from 'vue'


export default function usePromotoresList(lider){

  const tableColumns = ref([
     { key:'ranking', sortable:'sortable',label:'Ranking'},
      { key: 'username', sortable: true,label:'Promotor' },
      { key: 'status',label:'Estatus',sortable:true},
      { key: 'nivel', sortable: true,label:"Nivel" },
      { key: 'comision_mes', sortable: true,label:'Comisiones del mes' },
      { key: 'activaciones', sortable: true,label:'Activaciones',sortKey:'lider_id' },
      { key: 'lider_id', sortable: true,label:'Lider Asignado',sortKey:'lider_id' },
      { key: 'destino_id', sortable: true,label:'Destino Asignado',sortKey:'destino_id' },
      { key: 'actions',label:"Actions", sortable:true, sortKey:'comision',sortBy:'comision' },
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
  } = useFilterTable()

  sortBy.value = 'comision'
  const fetchData = (ctx,next) => {

   store.dispatch('usuario/fetchPromotores',{
    page:currentPage.value,
    perPage:perPage.value,
    sortBy:sortBy.value,
    isSortDirDesc:isSortDirDesc.value,
    q:searchQuery.value,
    lider:lider.value.id
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
      quitarLider,
  }



} 