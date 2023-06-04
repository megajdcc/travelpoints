import {ref} from 'vue'
import useFilterTable from '@core/utils/useFilterTable'
import store from '@/store'

export default function usePaginaList(){

  const tableColumns = ref([
    {key:'id',label:'#',sortable:true},
    {key:'nombre',label:'Nombre',sortable:true},
    {key:'ruta',label:'Ruta',sortable:true},
    {key:'activo',label:'Pagina activa?',sortable:true},
    {key:'is_termino',label:'Pagina de terminos?',sortable:true},
    {key:'is_contacto',label:'Pagina de contacto?',sortable:true},
    {key:'is_politica',label:'Pagina de politicas?',sortable:true},
    {key:'actions',label:'Actions',sortable:false,sortKey:'id'},
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

    store.dispatch('pagina/fetchData',{
      page:currentPage.value,
      q:searchQuery.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
    }).then(({total:all,paginas}) => {

      total.value = all
      next(paginas)
    }).catch((e) => {
      toast.info('Error trayendo data')
    })


  } 

  const eliminar = (pagina_id) => {
    store.dispatch('pagina/eliminar',pagina_id).then(({result}) => {
        if(result){
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
      tableColumns,
      refetchData,
      fetchData,
      eliminar
  }
}