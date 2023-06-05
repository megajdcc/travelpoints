import store from '@/store'
import {ref,watch} from 'vue'

import useFilterTable from '@core/utils/useFilterTable'
export default function useReservaCuponList(cupon){

  const tableColumns = ref([
    {key: 'id', label:'#',sortable: true},
    {key: 'usuario_id',label:'Viajero',sortable: true},
    {key: 'status',label: 'Status',sortable :true},
    {key:'actions',label:'Actions',sortable:false, sortKey:'id' },
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
  } = useFilterTable();

  const fetchData = (ctx,next) => {

    if(cupon.value.id){
       store.dispatch('cupones/fetchDataReservas',{
        page:currentPage.value,
        perPage:perPage.value,
        q:searchQuery.value,
        sortBy:sortBy.value,
        isSortDirDesc:isSortDirDesc.value,
        cupon:cupon.value ? cupon.value.id : null
      }).then(({total:all,reservas}) => {

        total.value = all
        next(reservas)

      }).catch(e => {
        toast.info('Error Trayendo Data')
      })
    }
   
  }

  watch(cupon,() => refetchData());
  
  const getStatus = (status) => {
    let statuses = [
      'Reservado',
      'Aplicado en venta',
      'cancelado'
    ];

    return statuses[status - 1]
  } 

  const eliminar = (cup,usuario) => {
    
    store.dispatch('cupones/reservaCancelar',{cupon:cup,usuario}).then(({result}) => {
        if(result){
          toast.success('Se ha cancelado con éxito ')
          refetchData();
        }
    })

  }

  return {
      fetchData,
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
      getStatus,
      eliminar,
  }

}