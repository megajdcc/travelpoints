
import useFilterTable from "@core/utils/useFilterTable";
import store from '@/store'
import {ref,watch,computed} from 'vue'

export default function useNegociosList(pais,destino){
  
  const tableColumns = computed(() => {
    if(pais.value){
      return [
          {key:'destino',label:'Destino',sortable:true},
          {key:'negocios',label:'Cant de Negocios',sortable:true},
          {key:'pais',label:'Pais',sortable:true},
      ]
    }else if(destino.value){
      return [
              {key:'negocio',label:'Negocio',sortable:true},
              {key:'direccion',label:'Dirección',sortable:true},
              {key:'destino',label:'Destino',sortable:true},
              {key:'pais',label:'Pais',sortable:true},
            ]
    }
    return [
      {key:'pais',label:'Pais',sortable:true},
      {key:'negocios',label:'Cant negocios',sortable:true},
      {key:'activos',label:'Negocios Activos',sortable:false},
      {key:'desactivados',label:'Negocios Desactivados',sortable:false},
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
  

  watch([mes,pais,destino], () => refetchData())

  const fetchData = (ctx,n) => {

    store.dispatch('negocio/reportFetchNegocios',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value,
      destino:destino.value
    }).then(({total:all,negocios}) => {
      total.value = all
      n(negocios)
    })

  } 


  const descargar = () =>{
    store.dispatch('negocio/reportFetchNegocioDescargar',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value,
      destino:destino.value

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