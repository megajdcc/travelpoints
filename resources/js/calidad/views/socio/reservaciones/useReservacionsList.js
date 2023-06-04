
import useFilterTable from "@core/utils/useFilterTable";

import store from '@/store'

import { ref } from 'vue'

export default function useReservacionsList(usuario){

  const tableColumns = ref([
    { key: 'id', label: '#' },
    { key: 'usuario_id', label: 'Usuario', sortable: true },
    { key: 'negocio_id', label: 'Negocio', sortable: true },
    { key: 'fecha', label: 'Fecha', sortable: true },
    { key: 'personas', label: 'Personas', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false, sortKey: 'id', sortBy: 'id' },
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

    store.dispatch('reservacion/reservacionesUser', {
      perPage: perPage.value,
      currentPage: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
      usuario: usuario.value ? usuario.value.id : null
    }).then(({ total: all, reservaciones }) => {

      total.value = all
      next(reservaciones)
    }).catch(e => {
      toast.info('Error trayendo Data', { position: 'bottom-right' })
    })
  }

  const cancelarReserva = (reserva_id) => {
    store.dispatch('reservacion/cancelar',reserva_id).then(({result}) => {

      if(result){
        toast.info('Se ha cancelado con éxito la reservación',{position:'bottom-right'})
        refetchData();
      }else{
        toast.info('No se pudo cancelar la Reserva', { position: 'bottom-right' })

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
    fetchData,
    cancelarReserva,
    tableColumns
  }
}