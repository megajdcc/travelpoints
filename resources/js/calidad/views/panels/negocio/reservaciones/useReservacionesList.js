import useFilterTable from "@core/utils/useFilterTable";

import store from '@/store'

import {ref} from '@vue/composition-api'

export default function useReservacionesList(negocio){

  const tableColumns = ref([
    { key:'id',label:'#' },
    { key:'usuario_id',label:'Usuario',sortable:true},
    { key: 'operador_id', label: 'Operador', sortable: true },
    { key: 'negocio_id', label: 'Negocio', sortable: true },
    { key: 'fecha', label: 'Fecha', sortable: true },
    { key: 'personas', label: 'Personas', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false,sortKey:'id', sortBy:'id' },
  ]);

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

    store.dispatch('reservacion/fetchData',{
      perPage: perPage.value,
      currentPage: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
      negocio_id: negocio.value ? negocio.value.id : null,
    }).then(({total:all,reservaciones}) => {
      total.value = all
      next(reservaciones)
    }).catch(e => {

      toast.info('Error trayendo Data')
    })
  } 

  

  const eliminar = (reservacion_id) => {

    store.dispatch('reservacion/eliminar',reservacion_id).then(({result}) => {

      if(result){
        toast.success('Se ha eliminado con éxito la reservación',{position:'bottom-right'})
        refetchData();
      }else{
        toast.info('No se pudo eliminar la Reservación , inténte de nuevo mas tarde', { position: 'bottom-right' })

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