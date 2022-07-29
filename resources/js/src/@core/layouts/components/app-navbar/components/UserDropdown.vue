<template>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ usuario.nombre || usuario.apellido }}
        </p>
        <span class="user-status">{{ usuario.rol.nombre }}</span>
      </div>
      <b-avatar size="40" :src="usuario.avatar" variant="light-primary" badge class="badge-minimal"
        badge-variant="success" :text="avatarText(usuario.nombre+' '+usuario.apellido)">
        <feather-icon v-if="!usuario.nombre" icon="UserIcon" size="22" />
      </b-avatar>
    </template>

    <b-dropdown-item :to="{ name: 'miperfil' }" link-class="d-flex align-items-center">
      <!-- <feather-icon size="16" icon="SettingsIcon" class="mr-50" /> -->
      <span>Mi Perfil</span>
    </b-dropdown-item>

    <!-- <b-dropdown-item
      :to="{ name: 'pages-faq' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="HelpCircleIcon"
        class="mr-50"
      />
      <span>FAQ</span>
    </b-dropdown-item> -->
    <b-dropdown-item link-class="d-flex align-items-center" @click="logout" v-loading="loading">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Cerrar sesión</span>
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
      logout 
    } = useAuth();

    return {
      usuario,
      loading:computed(() => store.state.loading),
      avatarText,
      logout
    };
  },


}
</script>
