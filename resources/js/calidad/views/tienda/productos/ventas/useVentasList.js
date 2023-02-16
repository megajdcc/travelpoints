
import useFilterTable from "@core/utils/useFilterTable";
import {ref,toRefs} from '@vue/composition-api'
import store from '@/store'


export default function useVentasList(){

  const tableColumns = ref([
    { key:'id',  label:'#',sortable:true,},
    { key: 'monto', label: 'Monto', sortable: true, },
    { key: 'cliente_id', label: 'Cliente', sortable: true, },
    { key: 'empleado_id', label: 'Empleado', sortable: true, },
    { key: 'model_id', label: 'Producto', sortable: true, },

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

      store.dispatch('venta/fetchData',{
        perPage: perPage.value,
        currentPage: currentPage.value,
        sortBy: sortBy.value,
        q: searchQuery.value,
        isSortDirDesc: isSortDirDesc.value,
        model_type:'App\\Models\\Producto',
      }).then(({total:all,ventas}) => {

        total.value = all

        next(ventas)
      }).catch(e => {
        toast.info('Error trayendo data')
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
    fetchData
  }


}