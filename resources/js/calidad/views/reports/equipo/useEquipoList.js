
import useFilterTable from "@core/utils/useFilterTable";
import store from '@/store'
import {ref,watch,computed} from 'vue'

export default function useEquipoList(pais){
  
  const tableColumns = computed(() => {
    if(pais.value){
      return [
          {key:'destino',label:'Destino',sortable:true},
          {key:'coordinadores',label:'Total Coordinadores',sortable:true},
          {key:'lideres',label:'Total líderes',sortable:true},
          {key:'promotores',label:'Total Promotores',sortable:true},

      ]
    }
    return [
      {key:'pais',label:'Pais',sortable:true},
      {key:'coordinadores',label:'Total Coordinadores',sortable:true},
      {key:'lideres',label:'Total Líderes',sortable:false},
      {key:'promotores',label:'Total Promotores',sortable:false},
    ]
  })


  const mes = ref(null)
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
      items,
  } = useFilterTable('pais',false);
  

  watch([mes,pais], () => refetchData())

  const fetchData = (ctx,n) => {

    store.dispatch('usuario/reportFetchDataEquipo',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value,
    }).then(({total:all,equipo}) => {
      total.value = all
      n(equipo)
    })

  } 


  const descargar = () =>{
    store.dispatch('usuario/reportFetchDataEquipoDescargar',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value,
    }).then(({url,filename}) => {

          // Crea un enlace (link) para descargar el archivo
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename); // Establece el nombre de descarga
          document.body.appendChild(link);

          // Haz clic en el enlace para iniciar la descarga
          link.click();

          // Limpia el objeto URL y el enlace
          document.body.removeChild(link);
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
      items,
      tableColumns,
      fetchData,
      descargar,
      mes,
  }
}