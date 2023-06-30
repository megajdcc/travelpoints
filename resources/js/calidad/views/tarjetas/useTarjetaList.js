import {ref} from 'vue'
import useFilterTable from '@core/utils/useFilterTable'
import store from '@/store'

export default function useTarjetaList(lote){

  const tableColumns = ref([
    {key:'id',label:'#',sortable:true},
    {key:'numero',label:'Número de la tarjeta',sortable:true,sortKey:'numero'},
    {key:'monto',label:'Monto de Venta',sortable:true},
    {key:'tps',label:'TPS a adjudicar',sortable:true},
    {key:'validada',label:'¿Validada por el vendedor?',sortable:true},
    {key:'aplicada',label:'Aplicada',sortable:true},
    {key:'usuario',label:'Viajero Asociado',sortable:true},
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

    store.dispatch('tarjeta/fetchData',{
      page:currentPage.value,
      q:searchQuery.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
      lote:lote.value ? lote.value : null
    }).then(({total:all,tarjetas}) => {

      total.value = all
      next(tarjetas)
    }).catch((e) => {
      toast.info('Error trayendo data')
    })


  } 

  const eliminar = (tarjeta_id) => {
    store.dispatch('tarjeta/eliminar',tarjeta_id).then(({result}) => {
        if(result){
          refetchData();
        }
    })
  }

  const toggleValidar = (tarjeta_id) => {

      store.dispatch('tarjeta/toggleValidacion',tarjeta_id).then(({result}) => {
        if(result){
          toast.success('Se ha validado con éxito, la tarjeta ya puede ser asociada por el viajero')

          refetchData();

        }else{
          toast.info('No se pudo asociar la tarjeta, inténtelo de nuevo mas tarde')
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
      tableColumns,
      refetchData,
      fetchData,
      eliminar,
      toggleValidar
  }
}