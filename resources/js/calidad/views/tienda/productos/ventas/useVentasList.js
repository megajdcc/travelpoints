
import useFilterTable from "@core/utils/useFilterTable";
import {ref,toRefs} from '@vue/composition-api'
import store from '@/store'


export default function useVentasList(){

  const tableColumns = ref([
    { key:'id',  label:'#',sortable:true,},
    { key: 'total', label: 'Monto', sortable: true, },
    { key: 'cliente_id', label: 'Cliente', sortable: true, },
    { key: 'empleado_id', label: 'Empleado', sortable: true, },
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

      store.dispatch('consumo/fetchData',{
        perPage: perPage.value,
        currentPage: currentPage.value,
        sortBy: sortBy.value,
        q: searchQuery.value,
        isSortDirDesc: isSortDirDesc.value,
      }).then(({total:all,consumos}) => {

        total.value = all
        next(consumos)
        
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