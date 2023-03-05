import store from '@/store'
import useFilterTable from '@core/utils/useFilterTable'
import {ref} from '@vue/composition-api'

export default function  useSucursalesList(){

  const tableColumns = ref([
    {key:'id', label:'#',sortable:true,},
    {key:'nombre', label:'Nombre',sortable:true,},
    {key:'direccion', label:'Dirección',sortable:true,},
    {key:'actions', label:'actions',sortable:false,sortKey:'id'},
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
    store.dispatch('sucursal/fetchData',{
        perPage: perPage.value,
        currentPage: currentPage.value,
        sortBy: sortBy.value,
        q: searchQuery.value,
        isSortDirDesc: isSortDirDesc.value,
    }).then(({total:all,sucursales}) => {

      total.value = all;
      next(sucursales)

    }).catch(e => {
      toast.info('No se pudo cargar la data, inténtelo de nuevo',{position:'bottom-right'})
    })
  }

  const eliminar = (sucursal_id) => {

    store.dispatch('sucursal/eliminar',sucursal_id).then(({result}) => {
      if(result){
        toast.success('Se ha eliminado con éxito la sucursal',{position:'bottom-right'})
        refetchData();
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
    eliminar,
    tableColumns
  } 

}