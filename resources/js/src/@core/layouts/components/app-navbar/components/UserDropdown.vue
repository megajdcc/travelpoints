<template>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <div class="d-sm-flex d-none user-nav" v-if="is_loggin">
        <p class="user-name font-weight-bolder mb-0">
          {{ usuario.nombre || usuario.username }}
        </p>
        <span class="user-status">{{ usuario.rol.nombre }}</span>
      </div>

      <b-avatar size="40" :src=" is_loggin ? usuario.avatar : '/storage/img-perfil/default.jpg'" variant="light-primary"
        badge class="badge-minimal" :badge-variant="is_loggin ? 'success' : 'danger'"
        :text="avatarText(usuario.nombre+' '+usuario.apellido)">
        <feather-icon v-if="!is_loggin" icon="UserIcon" size="22" />
      </b-avatar>

    </template>

    <b-dropdown-item :to="{ name: 'home' }" link-class="d-flex align-items-center" v-if="is_loggin && $can('read','home')">
      <feather-icon size="16" icon="HomeIcon" class="mr-50" />
      <span>Panel Travel</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'negocio.home' }" link-class="d-flex align-items-center" v-if="is_loggin && isNegocios">
      <font-awesome-icon icon="fas fa-store" class="mr-50 fa-2xl" />
      <span>Panel Negocio</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'miperfil' }" link-class="d-flex align-items-center" v-if="is_loggin">
      <feather-icon size="16" icon="SettingsIcon" class="mr-50" />
      <span>Mi Perfil</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'faqs' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="HelpCircleIcon" class="mr-50" />
      <span>Faq</span>
    </b-dropdown-item>

    <b-dropdown-item link-class="d-flex align-items-center" @click="logout" v-loading="loading" v-if="is_loggin">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Cerrar sesión</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'login' }" link-class="d-flex align-items-center" v-if="!is_loggin">
      <feather-icon size="16" icon="LogInIcon" class="mr-50" />
      <span>Login</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'

import { avatarText } from '@core/utils/filter'
import { computed } from '@vue/composition-api';
import store from '@/store';

import useAuth from '@core/utils/useAuth'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },

  setup(props){
    const usuario = computed(() => store.state.usuario.usuario)

    const {
      logout,
      is_loggin,
      isNegocios
    } = useAuth();

    return {
      usuario,
      loading:computed(() => store.state.loading),
      avatarText,
      logout,
      isNegocios,
      is_loggin
    };
  },


}
</script>
