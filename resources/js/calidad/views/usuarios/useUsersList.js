import { ref, watch, computed,onMounted } from 'vue'
import store from '@/store'
import { title } from '@core/utils/filter'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';
import {toRefs} from 'vue'
export default function useUsersList() {

   const refUserListTable = ref(null)
   const {usuario} = toRefs(store.state.usuario)

   // Table Handlers
   let tableColumns = [
      { key: 'username', sortable: true,label:'Viajero' },
      { key: 'email', sortable: true,label:"Email" },
      { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
   ]

   if(['Desarrollador','Administrador'].includes(usuario.value.rol ? usuario.value.rol.nombre : '')){
        tableColumns = [
            { key: 'username', sortable: true,label:'Usuario' },
            { key: 'activo',label:'Estado',sortable:true},
            { key: 'email', sortable: true,label:"Email" },
            { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
            { key: 'actions',sortable:true, sortKey:'id',sortBy:'id' } ,
         ]
   }
 
   const totalUsers = ref(0)
   
   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc
   } = useFilterTable();


   const roleFilter = ref(null)


   const dataMeta = computed(() => {
      const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: totalUsers.value,
      }

   })

   const refetchData = () => {
      
      refUserListTable.value.refresh()
   }

   watch([currentPage, perPage, searchQuery, roleFilter], () => {
      refetchData()
   })
   
 
   watch(refUserListTable,() => {
      refetchData()
   })

   const fetchUsers = (ctx, callback) => {
      store
         .dispatch('usuario/fetchUsers', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
            role: roleFilter.value,
         })
         .then(({total:all,users}) => {
            totalUsers.value = all
            callback(users)
         })
         .catch((e) => {
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
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
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
   }
}
