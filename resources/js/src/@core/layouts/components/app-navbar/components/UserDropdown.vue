<template>
  <section>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <div class="d-sm-flex d-none user-nav" v-if="is_loggin">
        <p class="user-name font-weight-bolder mb-0">
          {{ usuario.nombre || usuario.username }}
        </p>
        <span class="user-status">{{ $t(getRolPanel) }}</span>
      </div>

      <b-avatar size="40" :src=" is_loggin ? usuario.avatar : '/storage/img-perfil/default.jpg'" variant="light-primary"
        badge class="badge-minimal" :badge-variant="is_loggin ? 'success' : 'danger'"
        :text="avatarText(usuario.nombre+' '+usuario.apellido)">
        <feather-icon v-if="!is_loggin" icon="UserIcon" size="22" />
      </b-avatar>

    </template>

    <b-dropdown-item :to="{ name: 'home' }" link-class="d-flex align-items-center" v-if="is_loggin && $can('read','home')">
      <feather-icon size="16" icon="HomeIcon" class="mr-50" />
      <span>{{ $t('Panel Travel') }}</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'negocio.home' }" link-class="d-flex align-items-center" v-if="is_loggin && isNegocios">
      <font-awesome-icon icon="fas fa-store" class="mr-50 fa-2xl" />
      <span>{{ $t('Panel Negocio') }}</span>
    </b-dropdown-item>

    <b-dropdown-item :to="getToUrlperfil" link-class="d-flex align-items-center" v-if="is_loggin">
      <feather-icon size="16" icon="SettingsIcon" class="mr-50" />
      <span>{{ $t('Mi Perfil') }}</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'mi.tarjetas' }" link-class="d-flex align-items-center" v-if="is_loggin && $can('read','socio perfil tarjetas')">
      <font-awesome-icon icon="fas fa-credit-card" class="mr-1"/>
      <span>{{ $t('Mis Tarjetas') }}</span>
    </b-dropdown-item>

    <b-dropdown-item @click="mostrarAgenda" link-class="d-flex align-items-center" v-if="is_loggin">
        <font-awesome-icon icon="fas fa-calendar-day" class="mr-1"/>
        <span>{{ $t('Mi Agenda') }}</span>
    </b-dropdown-item>

    <b-dropdown-item @click="mostratAboutUsuario" link-class="d-flex align-items-center" v-if="is_loggin && rolName == 'Promotor' && usuario.lider_id">
        <font-awesome-icon icon="fas fa-user-tie" class="mr-1"/>
        <span>{{ $t('Mi Líder') }}</span>
    </b-dropdown-item>

    <b-dropdown-item @click="mostratAboutUsuario('Lider')" link-class="d-flex align-items-center" v-if="is_loggin && rolName == 'Lider' && usuario.coordinador_id">
        <font-awesome-icon icon="fas fa-user-tie" class="mr-1"/>
        <span>{{ $t('Mi Coordinador') }}</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'faqs' }" link-class="d-flex align-items-center" v-if="rolName != 'Promotor'">
      <feather-icon size="16" icon="HelpCircleIcon" class="mr-50" />
      <span>{{ $t('Faq') }}</span>
    </b-dropdown-item>

    <b-dropdown-item link-class="d-flex align-items-center" @click="logout" v-loading="loading" v-if="is_loggin">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>{{ $t('Cerrar sesión') }}</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'login' }" link-class="d-flex align-items-center" v-if="!is_loggin">
      <feather-icon size="16" icon="LogInIcon" class="mr-50" />
      <span>{{ $t('Login') }}</span>
    </b-dropdown-item>
     <!-- <b-popover target="popover-target-1" triggers="hover" placement="bottomright">
        <profile-about :about-data="datosPerfilLider" />
      </b-popover> -->

  </b-nav-item-dropdown>
   
  </section>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
  BPopover,VBPopover
} from 'bootstrap-vue'

import { avatarText } from '@core/utils/filter'
import { computed,toRefs,ref,inject } from 'vue';
import store from '@/store';
import useAuth from '@core/utils/useAuth'
import ProfileAbout from 'components/profile/ProfileAbout.vue'
import { getFecha } from '@core/utils/utils'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BPopover,
    ProfileAbout,
    MiAgenda:() => import('components/MiAgenda.vue')
  }, 

  directives:{
    'b-popover':VBPopover
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

    const showMiAgenda = inject('showMiAgenda')
    const showAboutProfile = inject('showAboutProfile')
    const userAbout = inject('userAbout')


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
    const lider = computed(() => usuario.value.lider ? usuario.value.lider : {});
    const coordinador = computed(() => usuario.value.coordinador ? usuario.value.coordinador : {});

    const mostrarAgenda  = () => showMiAgenda.value = true
    
    const mostratAboutUsuario = (rol_name = 'Promotor') => {

      if(rol_name == 'Lider'){
        userAbout.value = coordinador.value
      }else{
        userAbout.value = lider.value
      }

      showAboutProfile.value = true


     
    }

   

    const mostrarLider = () => {
      
    } 
    const rolName = computed(() => usuario.value.rol ? usuario.value.rol.nombre : '')

    const getToUrlperfil = computed(() => {
        if(['Desarrollador','Viajero','Administrador'].includes(rolName.value)){
          return { name: 'miperfil' }
        }else{
          return {name:'mi-perfil'}
        }
    })
    
    return {
      usuario,
      loading:computed(() => store.state.loading),
      avatarText,
      logout,
      isNegocios,
      is_loggin,
      getRolPanel,
      getToUrlperfil,
      mostrarAgenda,
      mostratAboutUsuario,
      lider,
      mostrarLider,
      rolName


    };
  },


}
</script>
