
import store from '@/store'
import useFilterTable from '@core/utils/useFilterTable'
import {ref,toRefs,computed} from '@vue/composition-api'

export default function useListCaja(){

  const tableColumns = ref([
      { key:'producto_id', label:'#',sortBy:'producto_id',sortable:false},
      { key: 'nombre', label: 'Producto', sortBy: 'nombre', sortable: true },
      { key: 'precio_unitario', label: 'Precion Unit', sortable: false },
      { key: 'cantidad', label: 'Cantidad', sortable: false },
      { key: 'monto', label: 'Total', sortable: false },
  ])
  const items = ref([]);

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
      store.dispatch('carrito/fetchData',{
        usuario_id:store.state.usuario.id,
        perPage: perPage.value,
        currentPage: currentPage.value,
        sortBy: sortBy.value,
        q: searchQuery.value,
        isSortDirDesc: isSortDirDesc.value,

      }).then(({total:all,productos}) => {
        total.value = all
        items.value = productos
        next(productos)

      }).catch(e => {
        toast.info('Error Trayendo Data',{position:'bottom-right'})
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
    items
  }

}