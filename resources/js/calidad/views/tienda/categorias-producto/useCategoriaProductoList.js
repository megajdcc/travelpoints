import useFilterTable from "@core/utils/useFilterTable"
import {ref,computed} from 'vue'
import store from '@/store'

export default function useCategoriaProductoList(){

  const tableColumns = ref([
    {key:"id",label:'#',sortable:true,},
    { key: "nombre", label: 'Nombre', sortable: true, },
    { key: "actions", label: 'Actions', sortable: false, sortKey:'id', sortBy:'id' },
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


  const fetchData =( ctx, next) => {

    store.dispatch('categoriaProducto/fetchData',{
      perPage: perPage.value,
      currentPage: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
    }).then(({total:all,categorias}) => {
      total.value = all
      next(categorias)
    }).catch(e => {
      toast.info('Error trayendo Data')
    })

  }

  const eliminar = (categoria_id) => {
    store.dispatch('categoriaProducto/eliminar',categoria_id).then(({result}) => {

      if(result){
        toast.success('Se ha eliminado con éxito la categoría del producto')

        refetchData()
      }else{
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