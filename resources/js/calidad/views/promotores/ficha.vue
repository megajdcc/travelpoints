<template>
  <section>
    <b-sidebar v-model="showSidebar" no-header backdrop >
      <about-profile :aboutData="dataPromotor" showEditActive @toggleActivePromotor="toggleActivePromotor"></about-profile>
    </b-sidebar>

    <b-card no-body>
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
                  <dashboard-promotor :promotor="promotor"></dashboard-promotor>
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

import {toRefs,ref,computed,watch} from 'vue'
import store from '@/store'
import {getFecha} from '@core/utils/utils'



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

export default{

  props:{
    id:Number|String
  },


  components:{
    BCard,
    BButton,
    BSidebar,
    BContainer,
    BRow,
    BCol,
    AboutProfile:() => import('components/profile/ProfileAbout.vue'),
    BTabs,
    BTab,
    cuenta:() => import('views/socio/perfil/cuenta.vue'),
    dashboardPromotor: () => import('views/dashboard/dashboardPromotor.vue'),
    EditUser:() => import('views/usuarios/edit.vue')
  },


  setup(props){

    const {id} = toRefs(props)
    const {user:promotor} = toRefs(store.state.usuario)
    const showSidebar = ref(false)


    const cargarForm = () => {
      store.dispatch('usuario/fetchUser',id.value)
    }

    cargarForm();

    const toggleActivePromotor = (val) => {
      store.dispatch('usuario/cambiarEstado',id.value).then(({result,usuario}) => {
        
        if(result){
          toast.info('Estado cambiado con éxito')
          store.commit('usuario/setUsuario',usuario)
        }else{
          toast.error('No se pudo cambiar el estado del usuario, inténte mas tarde')
        }

      })
    } 
    
    const toggleAccount = () => {
      showSidebar.value = true
    }

    const dataPromotor = computed(()  => {
      if (promotor.value.nombre) {
        return {
          nombre: promotor.value.nombre ? promotor.value.nombre + " " + promotor.value.apellido : promotor.value.username,
          portada: promotor.value.portada || '/storage/img-portada/banner-travel.jpg',
          avatar: promotor.value.avatar,
          direccion: promotor.value.direccion,
          rol: promotor.value.rol ? promotor.value.rol.nombre : '',
          pais: promotor.value.ciudad ? promotor.value.ciudad.estado.pais.pais : '',
          'teléfono': promotor.value.telefonos && promotor.value.telefonos.length ? `<a href="tel:${promotor.value.telefonos && promotor.value.telefonos.length ? promotor.value.telefonos[0].telefono : ''}">${promotor.value.telefonos && promotor.value.telefonos.length ? promotor.value.telefonos[0].telefono : ''}</a>` : null,
          'Registrado desde': getFecha(promotor.value.created_at),
          'Sitio web': promotor.value.website ? `<a href="${promotor.value.website}" target="_blank">${promotor.value.website}</a>` : null,
          email: `<a href="mailto:${promotor.value.email}" target="_blank">${promotor.value.email}</a>`,
          'Acerca': promotor.value.bio,
          'activo': promotor.value.activo
        }
      } else {
        return {}
      }
    })

    return {
      loading:computed(() => store.state.loading),
      dataPromotor,
      promotor,
      toggleActivePromotor,
      toggleAccount,
      showSidebar

    }
  }
}

</script>