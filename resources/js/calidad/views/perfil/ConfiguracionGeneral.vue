<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            :src="usuario.avatar"
            height="80"
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          Cargar
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept="image/*"
          :hidden="true"
          plain
          @input="cargarImagen"
        />
        <!--/ upload button -->
        <!--/ reset -->
        <b-card-text>Solo se permiten imagen del tipo JPG, GIF o PNG. Max tamaño de 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="Nombre"
            label-for="cuenta-nombre"
          >
            <b-form-input
              v-model="formulario.nombre"
              placeholder="Nombre"
              name="nombre"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Apellido"
            label-for="cuenta-apellido"
          >
            <b-form-input
              v-model="formulario.apellido"
              name="apellido"
              placeholder="Apellido"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="E-mail" label-for="account-e-mail" >
            <b-form-input
              v-model="usuario.email"
              name="formulario.email"
              placeholder="Email"
            />

          </b-form-group>
        </b-col>
       

        <!-- alert -->
        <b-col
          cols="12"
          class="mt-75"
        >
          <!-- <b-alert
            show
            variant="warning"
            class="mb-50"
          >
            <h4 class="alert-heading">
              Your email is not confirmed. Please check your inbox.
            </h4>
            <div class="alert-body">
              <b-link class="alert-link">
                Resend confirmation
              </b-link>
            </div>
          </b-alert> -->
        </b-col>
        <!--/ alert -->

        <b-col cols="12">


          <el-button type="primary" v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="guardar" :loading="loading" icon="el-icon-position"> Guardar cambios</el-button>
          <!-- <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            @click="guardar"
        
          >
           Guardar cambios
          </b-button> -->

          <el-button type="info" @click.prevent="resetForm">Limpiar</el-button>
          <!-- <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            @click.prevent="resetForm"
          >
            Limpiar
          </b-button> -->
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref,computed,toRefs,onMounted } from '@vue/composition-api'

import { Notification } from 'element-ui';
import store from '@/store'

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  directives: {
    Ripple,
  },

  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const profileFile = ref(null)

    const formulario = ref({
      id: null,
      nombre: '',
      apellido: '',
      telefono: '',
      fecha_nacimiento: '',
      imagen: '',
      direccion: '',
      email: '',
      password: '',
      rol: null,
      avatar: '',
      is_dueno: false

    })


    const {usuario} = toRefs(store.state.usuario)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    onMounted(() => {
      formulario.value = clone(usuario.value)

    })

    const cargarImagen  = (file) => {
      
      let form = new FormData();

      form.append('filepond', profileFile.value);
      store.commit('toggleLoading')

      axios.post('api/upload/avatar', form, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=something'
        }
      }).then(respon => {
        store.commit('usuario/updateAvatar',respon.data)

      }).catch(e => {
        console.log(e)
      }).then(() => {
        store.commit('toggleLoading')
      })


    }

    const guardar = () => {

      store.commit('toggleLoading')

      store.dispatch('usuario/guardarUsuario', formulario.value).then(({data}) => {

        if (data.result) {
          store.commit('usuario/updatePerfil',data.usuario)
          
          Notification.success({
            message: 'Se ha guardado con éxito los cambios',
            position:'bottom-right'
          })

        } else {
          Notification.info({
            text: 'Nó se guardarón los cambios,inténtelo de nuevo...',
            position:'bottom-right'
          })

        }

      }).catch(e => {
        console.log(e)
      }).then(() => {
        store.commit('toggleLoading')

      })
    }

    const resetForm = () => {
      formulario.value = clone(usuario.value)
    }

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
      loading:computed(() => store.state.loading),
      usuario,
      formulario,
      profileFile,
      cargarImagen,
      guardar,
      resetForm
      
    }
  }
}
</script>
