<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <logo :url="{ name: 'inicio' }" />
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <!-- Cambiar a imagen nueva de travelpoints esperando por Mario -->
          <!-- <b-img fluid :src="imgUrl" alt="Login V2" />
           -->
          <section class="video-travel">
            <!-- <video loop muted autoplay controls="false">
                  <source src="/storage/animation_travel.webm" type="video/webm">
                
              </video> -->
          </section>

        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex px-md-3 auth-bg flex-column  justify-content-center">
 
          
          <b-card-title class=" font-weight-bold mt-2 text-center" title-tag="h2">
            {{ $t('Bienvenido a') }} {{ appName }} 👋
          </b-card-title>

           <b-card-title class=" text-primary mb-5 text-center">
            {{ $t('Travel Points una nueva forma de descubrir destinos, registra tu visita y gana regalos.') }}
          </b-card-title>

          <b-card-text class="text-center">
            {{ $t('Inicia sesión y comience la aventura') }}
          </b-card-text>


          <!-- form -->
          <validation-observer ref="formValidate" #default="{ invalid, handleSubmit }" class="">
            <b-form class="auth-login-form " @submit.prevent="handleSubmit(iniciar)">
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                  <b-form-input id="login-email" v-model="formulario.email" :state="errors.length > 0 ? false : null"
                    name="login-email" placeholder="david@example.com" size="lg" autocomplete="username" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">{{ $t('Contraseña') }}</label>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <small>{{ $t('Olvidaste la contraseña?') }}</small>
                  </b-link>
                </div>
                <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input id="login-password" v-model="formulario.password" size="lg"
                      :state="errors.length > 0 ? false : null" class="form-control-merge" :type="passwordFieldType"
                      name="login-password" placeholder="Password" autocomplete="current-password" />
                    <b-input-group-append is-text>
                      <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                    </b-input-group-append>
                  </b-input-group>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>

                </validation-provider>

                <small class="text-danger" v-if="auth.message" v-text="auth.message"></small>

              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox id="remember-me" v-model="formulario.remember" name="checkbox-1" >
                  {{ $t('Recordarme') }}
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block :disabled="invalid" v-loading="loading" class="mt-3">
                {{ $t('Iniciar') }}
              </b-button>

              <b-button @click="authenticarGoogle(optionsAuth)" variant="primary" block v-loading="loading" class="mt-1">
                {{ $t('Google Auth') }}
              </b-button>

              <b-button :to="{ name: 'register' }" variant="warning" v-loading="loading" block class="mt-1">
                {{ $t('Registrate') }}
              </b-button>

            </b-form>
          </validation-observer>

      </b-col>
      <!-- /Login-->
    </b-row>




  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
  BFormInvalidFeedback
} from 'bootstrap-vue'

import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { computed, toRefs, onMounted } from 'vue';
import useAuth from '@core/utils/useAuth'

import '@core/scss/vue/libs/toastification.scss'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import router from '@/router'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    Logo: () => import('components/Logo.vue')
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      sideImg: import('@/assets/images/pages/login-v2.svg'),
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },

    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = import('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },



  setup(props) {

    const usuario = computed(() => store.state.usuario.usuario)
    const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app

    const {
      login,
      formValidate,
      formulario,
      authGoogle,
      authenticarGoogle,
      optionsAuth
    } = useAuth();

    onMounted(() => localStorage.removeItem('destino_id'))

    const iniciar = () => {


      login().then((result) => {

        if (result) {

          router.replace(getHomeRouteForLoggedInUser(usuario.value.rol.nombre)).then(
            () => {
              toast({
                component: ToastificationContent,
                props: {
                  title: `Bienvenido ${usuario.value.nombre || usuario.value.username}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `Ha iniciado sesión correctamente como ${usuario.value.rol.nombre}. ¡Ahora puedes empezar a explorar!`,
                },
              }, {
                position: 'bottom-right',
                timeout: 4000
              })
            })

        } else {

          toast({
            component: ToastificationContent,
            props: {
              title: `No pudimos autenticarte, inténtelo de nuevo`,
              icon: 'HelpCircleIcon',
              variant: 'danger',
            },
          }, {
            position: 'bottom-right',
            timeout: 4000
          })

        }


      }).catch(e => {

        if (e.response.status === 401) {
          if (!e.response.data.result) {
            toast.info(e.response.data.message)
          }

        }

      })
    }

    return {
      login,
      required,
      loading: computed(() => store.state.loading),
      auth: computed(() => store.state.auth),
      formValidate,
      formulario,
      iniciar,
      authGoogle,
      appName,
      authenticarGoogle,
      optionsAuth


    }
  }


}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

.brand-logo img {
  width: auto;
  height: auto;
}

.video-travel {

  width: 100%;
  height: 500px;
  background-image: url('storage/animation_travel.gif');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  video {
    height: 100%;
    width: 100%;
  }
}

video::-webkit-media-controls {
  display: none !important;
}

video::-webkit-media-controls-enclosure {
  display: none !important;
}

video::-webkit-media-controls-panel {
  display: none !important;
}
</style>