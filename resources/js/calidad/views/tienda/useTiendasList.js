import useFilterTable from "@core/utils/useFilterTable"
import { ref, computed } from '@vue/composition-api'
import store from '@/store'

export default function iseTiendasList() {

  const tableColumns = ref([
    { key: "id", label: '#', sortable: true, },
    { key: 'nombre', label:'Nombre', sortable:true },
    { key: "divisa_id", label: 'Divisa', sortable: true },
    { key: "fisica", label: '¿ Es Física la tienda ?', sortable: true, },
    { key: 'productos', label:'Productos',sortkey:'id',sortBy:'id',sortable:false},
    { key: "actions", label: 'Actions', sortable: false, sortKey: 'id', sortBy: 'id' },
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


  const fetchData = (ctx, next) => {

    store.dispatch('tienda/fetchData', {
      perPage: perPage.value,
      currentPage: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
    }).then(({ total: all, tiendas }) => {
      total.value = all
      next(tiendas)
    }).catch(e => {
      toast.info('Error trayendo Data')
    })

  }

  const eliminar = (tienda_id) => {
    store.dispatch('tienda/eliminar', tienda_id).then(({ result }) => {

      if (result) {
        toast.success('Se ha eliminado con éxito la tienda')

        refetchData()
      } else {
        toast.info('No se pudo eliminar , inténtelo de nuevo , mas tarde');

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
    eliminar


  }
}