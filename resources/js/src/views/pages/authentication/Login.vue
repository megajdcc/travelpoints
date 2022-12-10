<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <logo :url="{name:'inicio'}"/>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
            Bienvenido a {{ appName }} 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Inicie sesión en su cuenta y comience la aventura
          </b-card-text>

          <b-alert variant="primary" show>
          </b-alert>

          <!-- form -->
          <validation-observer ref="formValidate" #default="{invalid,handleSubmit}">
            <b-form class="auth-login-form mt-2" @submit.prevent="handleSubmit(iniciar)">
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                  <b-form-input id="login-email" v-model="formulario.email" :state="errors.length > 0 ? false:null"
                    name="login-email" placeholder="david@example.com" autocomplete="username" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Contraseña</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>Olvidaste la contraseña?</small>
                  </b-link>
                </div>
                <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                    <b-form-input id="login-password" v-model="formulario.password"
                      :state="errors.length > 0 ? false:null" class="form-control-merge" :type="passwordFieldType"
                      name="login-password" placeholder="Password" autocomplete="current-password" />
                    <b-input-group-append is-text>
                      <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility" />
                    </b-input-group-append>
                  </b-input-group>
                  <b-form-invalid-feedback>
                    {{errors[0]}}
                  </b-form-invalid-feedback>

                </validation-provider>

                <small class="text-danger" v-if="auth.message" v-text="auth.message"></small>

              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox id="remember-me" v-model="formulario.remember" name="checkbox-1">
                  Recordarme
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block :disabled="invalid" v-loading="loading">
                Iniciar
              </b-button>
<!-- 
              <b-button @click="authGoogle" variant="primary" block :disabled="invalid" v-loading="loading">
                Google Auth
              </b-button> -->
              
            </b-form>
          </validation-observer>

          <!-- <b-card-text class="text-center mt-2">
            <span>No tienes cuenta? </span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;Crear cuenta</span>
            </b-link>
          </b-card-text> -->

        </b-col>
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
import {computed,toRefs} from '@vue/composition-api';
import useAuth from '@core/utils/useAuth'

import '@core/scss/vue/libs/toastification.scss'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
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
    Logo:() => import('components/Logo')
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      sideImg: require('@/assets/images/pages/login-v2.svg'),
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },

    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },


  setup(props){
    
    const usuario = computed(() => store.state.usuario.usuario)
    const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app

    const {
      login,
      formValidate,
      formulario
    } = useAuth();


    const iniciar  = ()  => {

      store.commit('toggleLoading')

      login().then((result) => {

        if(result){

          router.replace(getHomeRouteForLoggedInUser(usuario.value.rol.nombre)).then(
            () => {
            toast({
                 component: ToastificationContent,
                 props: {
                    title: `Bienvenido ${ usuario.value.nombre || usuario.value.username}`,
                    icon: 'CoffeeIcon',
                    variant: 'success',
                    text: `Ha iniciado sesión correctamente como ${usuario.value.rol.nombre}. ¡Ahora puedes empezar a explorar!`,
                 },
              }, {
                 position: 'bottom-right',
                 timeout: 4000
              })
            })

        }else{

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
        console.log(e)

      })

      .then(() => store.commit('toggleLoading'))


    }

    const authGoogle = () => {

      axios.get(`/api/auth/google/redirect`).then(response => {
        console.log(response)
      }).catch(e => {
        console.log(e)
      })

    }


    return{
      login,
      required,
      loading:computed(() => store.state.loading),
      auth:computed(() => store.state.auth),
      formValidate,
      formulario,
      iniciar,
      authGoogle,
      appName,
     

    }
  }

  
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';

.brand-logo img{
  width: auto;
  height: auto;
}

</style>
