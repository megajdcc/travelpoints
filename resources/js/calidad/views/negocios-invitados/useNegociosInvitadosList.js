import store from '@/store'

import useFilterTable from '@core/utils/useFilterTable'
import {ref,watch} from 'vue'
export default function useNegocioInvitadosList(usuario){

  const tableColumns = ref([
    {key:"id",label:'#'},
    {key:'email',label:'Email'},
    {key:'status',label:'Estatus'},
    {key:'actions',label:'Actions',sortby:'id',sortable:false}
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
      items,
  } = useFilterTable();

  watch(usuario, () => refetchData())

  const fetchData = (ctx,next) => {

    store.dispatch('invitacion/fetchData',{
      page:ctx.currentPage,
      perPage:ctx.perPage,
      sortBy:ctx.sortBy,
      isSortDirDesc:ctx.sortDesc,
      q:searchQuery.value,
      usuario:usuario.value.id ? usuario.value.id : null
    }).then(({total:all,invitaciones}) => {

      total.value = all
      next(invitaciones)

    }).catch(e => {
        toast.info('No se pudo cargar las invitaciones...')
    })

  } 

  const reenviarInvitacion = (invitacion_id) => {

    store.dispatch('invitacion/recordarInvitacion',invitacion_id).then(({result}) => {

      if(result) {
        toast.success('Invitación Reeenviada')
      }

    }).catch(e => {
      toast.error('La invitación no fué reenviada')
    })
  }

  const eliminar = (inv_id) => {

    store.dispatch('invitacion/eliminar',inv_id).then(({result}) => {
      if(result){
        toast.success("La invitación ha sido eliminada")
        refetchData();
      }
    }).catch(e => {
      toast.info('NO se pudo eliminar')
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
      fetchData,
      tableColumns,
      reenviarInvitacion,
      eliminar
  }


}