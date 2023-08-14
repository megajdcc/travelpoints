import { ref, watch, computed,onMounted } from 'vue'
import store from '@/store'
import { title } from '@core/utils/filter'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useFilterTable from '@core/utils/useFilterTable';
import {toRefs} from 'vue'

export default function useActivacionesList() {

   const refUserListTable = ref(null)
   const {usuario} = toRefs(store.state.usuario)
    const activaciones = ref([{data:[]}])
   // Table Handlers
   let tableColumns = [
      { key: 'username', sortable: true,label:'Usuario' },
      { key:'created_at',label:'Creado',sortable:true,class:'text-nowrap'},
      { key: 'email', sortable: true,label:"Email" },
      { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
   ]

   
   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      total
   } = useFilterTable();


   const roleFilter = ref(null)


   const dataMeta = computed(() => {
      const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      refUserListTable.value.refresh()
   }

   watch([currentPage, perPage, searchQuery, roleFilter], () => {
      refetchData()
   })
   
 


   const fetchData = (ctx, callback) => {
      store
         .dispatch('usuario/misInvitados', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
            role: roleFilter.value,
         })
         .then(({total:all,invitados,activaciones:act}) => {

            total.value = all
            activaciones.value = act
            callback(invitados)

         })
         .catch(() => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo usuarios',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }

   // *===============================================---*
   // *--------- UI ---------------------------------------*
   // *===============================================---*

   const resolveUserRoleVariant = role => {
      if (role === 'Administrador') return 'primary'
      if (role === 'Super administrador') return 'warning'
      if (role === 'Desarrollador') return 'warning'
      if (role === 'Invitado') return 'success'
      if (role === 'Coordinador') return 'danger'
      return 'primary'
   }

   const resolveUserRoleIcon = role => {
      if (role === 'Administrador') return 'ServerIcon'
      if (role === 'Super administrador') return 'ServerIcon'
      if (role === 'Desarrollador') return 'ServerIcon'
      if (role === 'Invitado') return 'UserIcon'
      return 'UserIcon'
   }

   return {
      fetchData,
      tableColumns,
      perPage,
      currentPage,
      total,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
      refetchData,

      // Extra Filters
      roleFilter,
      activaciones
   }
}
