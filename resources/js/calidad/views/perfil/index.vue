<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <configuracion-general/>
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="LockIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Cambiar contraseña</span>
      </template>

      <cambiar-password />
    </b-tab>
    <!--/ change password tab -->

    <!-- info -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="InfoIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Información</span>
      </template>

      <cuenta-informacion-form />
    </b-tab>

  

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import ConfiguracionGeneral from './ConfiguracionGeneral.vue'
import CambiarPassword from './CambiarPassword.vue'
import CuentaInformacionForm from './CuentaInformacionForm.vue'

import {mapState,} from 'vuex';

export default {
  components: {
    BTabs,
    BTab,
    ConfiguracionGeneral,
    CambiarPassword,
    CuentaInformacionForm,
  },
  data() {
    return {
      options: {},
    }
  },

  computed:{
    ...mapState('usuario',['usuario']),

  },
  beforeCreate() {
    // this.$http.get('/account-setting/data').then(res => { this.options = res.data })
  },
}
</script>
