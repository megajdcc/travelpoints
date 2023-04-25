<template>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <div class="d-sm-flex d-none user-nav" v-if="is_loggin">
        <p class="user-name font-weight-bolder mb-0">
          {{ usuario.nombre || usuario.username }}
        </p>
        <span class="user-status">{{ getRolPanel }}</span>
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
import { computed,toRefs } from 'vue';
import store from '@/store';

import useAuth from '@core/utils/useAuth'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  }, 

  props:{
    
    panel:{
      type:String,
      default:'travel',
    },

    negocioId:{
      type:Number,
      required:false
    }

  },


  setup(props){
    const usuario = computed(() => store.state.usuario.usuario)
    const { panel,negocioId } = toRefs(props)

    const {negocio} = toRefs(store.state.negocio)

    const {
      logout,
      is_loggin,
      isNegocios
    } = useAuth();

    const getRolPanel = computed(() => {

      if(panel.value === 'negocio'){
        
        const neg = usuario.value.negocios.find(val => val.id === negocioId.value);

        if(neg){
            const cargo_id = neg.pivot.cargo_id;

            if (cargo_id) {

              const cargo = negocio.value.cargos.find(val => val.id === cargo_id)

              if (cargo) {
                return cargo.cargo;
              }

              return 'Sin definir';

            }

        }

        return 'Sin definir';

      }

      return usuario.value.rol.nombre ;
    })

    return {
      usuario,
      loading:computed(() => store.state.loading),
      avatarText,
      logout,
      isNegocios,
      is_loggin,
      getRolPanel

    };
  },


}
</script>
