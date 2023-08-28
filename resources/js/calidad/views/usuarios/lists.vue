<template>
  <div class="container-fluid w-100 px-0 mx-0">

    <!-- Filters -->
    <users-list-filters :role-filter.sync="roleFilter" :role-options="getRols" v-if="usuario.rol.nombre != 'Promotor'" />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <per-page v-model="perPage" :perPageOptions="perPageOptions" size="sm" />
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="9" class="d-flex align-items-center justify-content-end">
            <b-input-group size="sm">
              <b-form-input v-model="searchQuery" placeholder="Buscar..." />
              <template #append>
                <b-button variant="primary" @click="$router.push({ name: 'create.usuario' })"
                  v-if="$can('write', 'usuarios')">
                  <span class="text-nowrap">{{ legendBtn }}</span>
                </b-button>
              </template>
            </b-input-group>
          </b-col>
        </b-row>
      </div>
      <b-table ref="refUserListTable" responsive class="position-relative" :items="fetchUsers" :fields="tableColumns"
        primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="Usuarios no cargados"
        :sort-desc.sync="isSortDirDesc" stacked="md" :busy="loading">

        <!-- Column: User -->
        <template #cell(username)="{ item }">
          <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
            <template #aside>
              <b-avatar size="32" :src="item.avatar" :text="avatarText(`${item.nombre} ${item.apellido}`)"
                :variant="`light-${resolveUserRoleVariant(item.rol.nombre)}`"
                @click="mostrarAboutUsuario(item)"  />
            </template>
            <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
              class="font-weight-bold d-block text-nowrap p-0">
              {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre'  }}
            </b-button>
            <small class="text-muted" v-if="item.username">{{ item.username }}</small>
          </b-media>
        </template>


        <template #cell(activo)="{ item }">
          <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)" v-if="['Desarrollador','Administrador'].includes(usuario.rol.nombre)">
             {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
          </b-form-checkbox>

          <span v-else>
              {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
          </span>
        </template>

        <!-- Column: Rol -->
        <template #cell(rol)="{ item }">
          <div class="text-nowrap">
            <feather-icon :icon="resolveUserRoleIcon(item.rol ? item.rol.nombre : '')" size="18" class="mr-50"
              :class="`text-${resolveUserRoleVariant(item.rol ? item.rol.nombre : '')}`" />
            <span class="align-text-top text-capitalize">{{ item.rol ? item.rol.nombre : 'Sin definir' }}</span>
          </div>
        </template>


        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>


            <b-dropdown-item :to="{ name: 'edit.usuario', params: { id: data.item.id } }"
              v-if="$can('update', 'usuarios')">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>

            <b-dropdown-item @click="eliminarUsuario(data.item)" v-if="$can('delete', 'usuarios')">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Eliminar</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'movimientos.user', params: { id: data.item.id } }" v-if="['Desarrollador','Administrador'].includes(usuario.rol.nombre)">
              <font-awesome-icon icon="fas fa-money-check" />
              <span class="align-middle ml-50">Movimientos de cuenta</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'promotores.list', params: { id: data.item.id } }" v-if="$can('read', 'promotores')">
              <font-awesome-icon icon="fas fa-user-tie" />
              <span class="align-middle ml-50">Promotores</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="totalUsers" />
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BPagination,
  BFormCheckbox
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted, onMounted, computed } from 'vue'
import { avatarText } from '@core/utils/filter'
import UsersListFilters from './UsersListFilters.vue'
import useUsersList from './useUsersList'

// import UserListAddNew from './UserListAddNew.vue'

import { mapGetters, mapMutations, mapActions } from 'vuex';

import { toRefs,inject } from 'vue'

export default {
  components: {
    UsersListFilters,
    // UserListAddNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BDropdownItemButton,
    BPagination,
    PaginateTable: () => import('components/PaginateTable.vue'),
    vSelect,
    PerPage: () => import('components/PerPage.vue'),
    BInputGroup,
    BFormCheckbox
  },

  computed: {
    ...mapGetters('rol', ['getRols'])
  },

  mounted() {

    this.$eventHub.$on('fetch-user', () => {
      this.refetchData();
    })

  },

  setup() {
    const { usuario } = toRefs(store.state.usuario)

    const userAbout = inject('userAbout')
    const showAboutProfile = inject('showAboutProfile')

     const {
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
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      // resolveUserStatusVariant,

      // Extra Filters
      roleFilter
    } = useUsersList()




    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }


    const cambiarEstado = (user_id) => {

      store.dispatch('usuario/cambiarEstado', user_id).then(({ result }) => {

        if (result) {
          toast.success('Se ha cambiado con éxito el estado del usuario')
          refetchData()
        } else {
          toast.info('No se pudo cambiar el Estado del usuario')
          refetchData();
        }
      }).catch(e => console.log(e))

    }
    
    onMounted(() => {
      setTimeout(() => {
        console.log('cargando')
        refetchData();

      },300)
    })

   

    return {
      loading:computed(() => store.state.loading),
      cambiarEstado,
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
      refetchData,
      mostrarAboutUsuario,
      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,

      // Extra Filters
      roleFilter,
      usuario,
      legendBtn: computed(() => {

        if (!['Lider', 'Coordinador', 'Promotor'].includes(usuario.value.rol ? usuario.value.rol.nombre : '')) {
          return 'Agregar Usuario'
        }

        return 'Agregar Viajero'
      })
    }
  },


  methods: {
    ...mapMutations('app', ['TOGGLE_OVERLAY']),
    ...mapActions('usuario', ['eliminar']),

    eliminarUsuario(item) {

      this.TOGGLE_OVERLAY();

      this.eliminar(item.id).then(respon => {

        if (respon.data.result) {
          this.$notify.info('Cuenta eliminada exitosamente');
          this.refetchData();
        } else {
          this.$notify.info('La cuenta de usuario no se pudo eliminar ');
        }

      }).catch(e => {
        console.log(e)
      }).then(() => {
        this.TOGGLE_OVERLAY()
      })

    }


  }

}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>