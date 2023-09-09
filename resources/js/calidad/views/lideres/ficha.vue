<template>
  <section>
    <b-sidebar v-model="showSidebar" no-header backdrop>
      <about-profile :aboutData="dataLider" showEditActive
        @toggleActivePromotor="toggleActiveLider"></about-profile>
    </b-sidebar>

    <b-card no-body header-class="py-0 pt-1 mb-0">

      <template #header>
        <h3>Lider: {{ `${lider.nombre} ${lider.apellido}` }}</h3>
      </template>
      <b-container fluid class="px-0">
        <b-row>
          <b-col cols="12">
            <b-card no-body class="py-1">

              <b-tabs justified>

                <template #tabs-start>
                  <b-button variant="outline-text" @click="toggleAccount">
                    <font-awesome-icon icon="fas fa-bars" />
                    Ficha
                  </b-button>
                </template>

                <b-tab title="Panel Travel">
                  <dashboard-lider :lider="lider"></dashboard-lider>
                </b-tab>

                <b-tab title="Datos de contacto">
                  <edit-user :id="id"></edit-user>
                </b-tab>

                <b-tab title="Estado de Cuenta">
                  <cuenta :id="id" hideTitle></cuenta>
                </b-tab>
                
              </b-tabs>
            </b-card>

          </b-col>

        </b-row>

      </b-container>
    </b-card>

  </section>
</template>

<script>

import { toRefs, ref, computed } from 'vue'
import store from '@/store'
import { getFecha } from '@core/utils/utils'



import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BTabs,
  BTab,
  BSidebar,
  BButton
} from 'bootstrap-vue'

export default {

  props: {
    id: Number | String
  },


  components: {
    BCard,
    BButton,
    BSidebar,
    BContainer,
    BRow,
    BCol,
    AboutProfile: () => import('components/profile/ProfileAbout.vue'),
    BTabs,
    BTab,
    cuenta: () => import('views/socio/perfil/cuenta.vue'),
    dashboardLider: () => import('views/dashboard/dashboardLider.vue'),
    EditUser: () => import('views/usuarios/edit.vue')
  },


  setup(props) {

    const { id } = toRefs(props)
    const { user: lider } = toRefs(store.state.usuario)
    const showSidebar = ref(false)

    const cargarForm = () => {
      store.dispatch('usuario/fetchUser', id.value)
    }

    cargarForm();

    const toggleActiveLider = (val) => {
      store.dispatch('usuario/cambiarEstado', id.value).then(({ result, usuario }) => {

        if (result) {
          toast.info('Estado cambiado con éxito')
          store.commit('usuario/setUsuario', usuario)
        } else {
          toast.error('No se pudo cambiar el estado del usuario, inténte mas tarde')
        }

      })
    }

    const toggleAccount = () => {
      showSidebar.value = true
    }

    const dataLider = computed(() => {
      if (lider.value.nombre) {
        return {
          nombre: lider.value.nombre ? lider.value.nombre + " " + lider.value.apellido : lider.value.username,
          portada: lider.value.portada || '/storage/img-portada/banner-travel.jpg',
          avatar: lider.value.avatar,
          direccion: lider.value.direccion,
          rol: lider.value.rol ? lider.value.rol.nombre : '',
          pais: lider.value.ciudad ? lider.value.ciudad.estado.pais.pais : '',
          'teléfono': lider.value.telefonos && lider.value.telefonos.length ? `<a href="tel:${lider.value.telefonos && lider.value.telefonos.length ? lider.value.telefonos[0].telefono : ''}">${lider.value.telefonos && lider.value.telefonos.length ? lider.value.telefonos[0].telefono : ''}</a>` : null,
          'Registrado desde': getFecha(lider.value.created_at),
          'Sitio web': lider.value.website ? `<a href="${lider.value.website}" target="_blank">${lider.value.website}</a>` : null,
          email: `<a href="mailto:${lider.value.email}" target="_blank">${lider.value.email}</a>`,
          'Acerca': lider.value.bio,
          'activo': lider.value.activo
        }
      } else {
        return {}
      }
    })

    return {
      loading: computed(() => store.state.loading),
      dataLider,
      lider,
      toggleActiveLider,
      toggleAccount,
      showSidebar

    }
  }
}

</script>