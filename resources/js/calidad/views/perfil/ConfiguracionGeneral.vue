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
    <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form class="mt-2" @submit.prevent="handleSubmit(guardar)">
        <b-row>
          <b-col sm="6">
            <b-form-group label-for="cuenta-nombre">
              
              <template #label>
                Nombre: <span class="text-danger">*</span>
              </template>

              <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                 <b-form-input v-model="formulario.nombre" placeholder="Nombre" name="nombre" :state="valid"/>

                 <b-form-invalid-feedback :state="valid">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
             
            </b-form-group>
          </b-col>
          <b-col sm="6">
           <b-form-group label-for="cuenta-apellido">
                <template #label>
                  Apellido: <span class="text-danger">*</span>
                </template>

                <validation-provider name="apellido" rules="required" #default="{ errors, valid }">
                   <b-form-input v-model="formulario.apellido" placeholder="Apellido" name="apellido" :state="valid"/>

                   <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
             
              </b-form-group>
          </b-col>

           <b-col sm="6">
            <b-form-group label-for="cuenta-username">
              
                <template #label>
                  Username: <span class="text-danger">*</span>
                </template>

                <validation-provider name="username" rules="required" #default="{ errors, valid }">
                   <b-form-input v-model="formulario.username" placeholder="Email" readonly name="username" :state="valid"/>

                   <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
             
              </b-form-group>
          </b-col>


          <b-col sm="6">
            <b-form-group label-for="cuenta-email">
              
                <template #label>
                  E-mail: <span class="text-danger">*</span>
                </template>

                <validation-provider name="email" rules="required" #default="{ errors, valid }">
                   <b-form-input v-model="formulario.email" placeholder="Email" readonly name="email" :state="valid"/>

                   <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
             
              </b-form-group>
          </b-col>
       

          <!--/ alert -->

          <b-col cols="12">

            <b-button-group size="sm">
              <b-button variant="primary" :disabled="loading" v-loading="loading" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit">
                <font-awesome-icon icon="fas fa-save"/>
                Guardar
              </b-button>

              <b-button @click="resetForm" variant="info">
                  <font-awesome-icon icon="fas fa-trash"/>
                  Limpiar
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
   
  </b-card>
</template>

<script>
import {
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
  BFormInvalidFeedback,
  BButtonGroup
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref,computed,toRefs,onMounted } from 'vue'

import store from '@/store'

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'

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
    ValidationObserver, 
    ValidationProvider,
    BFormInvalidFeedback,
    BButtonGroup
  },
  directives: {
    Ripple,
  },

  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const formValidate = ref(null)
    const profileFile = ref(null)

    const formulario = ref(store.getters['usuario/draftUsuario'])
    const {usuario} = toRefs(store.state.usuario)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)


    const cargarImagen  = (file) => {
      
      let form = new FormData();

      form.append('filepond', profileFile.value);

      axios.post('api/upload/avatar', form, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=something'
        }
      }).then(respon => {
        store.commit('usuario/updateAvatar',respon.data)

      }).catch(e => {
        console.log(e)
      })


    }

    const guardar = () => {


      store.dispatch('usuario/guardarUsuario', formulario.value).then(({result}) => {

        if (result) {
          toast.success('Se ha guardado con éxito los cambios');
        } else {
          toast.info('Nó se guardarón los cambios,inténtelo de nuevo...')
        }

      }).catch(e => {
        console.log(e)
      })
    }

    const resetForm = () => {
      // store.commit('usuario/limpiarUsuario')
      formulario.value = usuario.value
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
      formValidate,
      resetForm,
      required
      
    }
  }
}
</script>
