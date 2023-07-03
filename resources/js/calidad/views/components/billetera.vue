<template>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <font-awesome-icon icon="fas fa-money-bill" />

    </template>

    <b-dropdown-item :to="{ name: 'micuenta' }" link-class="d-flex align-items-center"
      v-if="is_loggin && $can('read', 'micuenta')">
      <feather-icon size="16" icon="DollarSign" class="mr-50" />
      <span>
        Tp{{ usuario.cuenta.saldo | currency }}
      </span>
    </b-dropdown-item>

  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'

import { avatarText } from '@core/utils/filter'
import { computed, toRefs } from 'vue';
import store from '@/store';
import useAuth from '@core/utils/useAuth'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },

  props: {

    panel: {
      type: String,
      default: 'travel',
    },

    negocioId: {
      type: Number,
      required: false
    }

  },


  setup(props) {
    const usuario = computed(() => store.state.usuario.usuario)
    const { panel, negocioId } = toRefs(props)

    const { negocio } = toRefs(store.state.negocio)

    const {
      logout,
      is_loggin,
      isNegocios
    } = useAuth();

    const getRolPanel = computed(() => {

      if (panel.value === 'negocio') {

        const neg = usuario.value.negocios.find(val => val.id === negocioId.value);

        if (neg) {
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

      return usuario.value.rol.nombre;
    })

    return {
      usuario,
      loading: computed(() => store.state.loading),
      avatarText,
      logout,
      isNegocios,
      is_loggin,
      getRolPanel

    };
  },


}
</script>
