
import useFilterTable from "@core/utils/useFilterTable";
import {ref,toRefs} from 'vue'
import store from '@/store'


export default function useVentasList(usuario = null){

  const tableColumns = ref([
    { key:'id',  label:'#',sortable:true,},
    { key: 'total', label: 'Monto', sortable: true, },
    { key: 'cliente_id', label: 'Cliente', sortable: true, },
    { key: 'empleado_id', label: 'Empleado', sortable: true, },
    { key:'actions', label:'Actions',sortKey:'id',sortBy:'id',sortable:true }
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
        usuario_id:usuario.value ? usuario.value.id : null
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