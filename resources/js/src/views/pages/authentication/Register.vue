<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-link class="brand-logo">
         <img src="/storage/logotipo.png" alt="Logo" />
      </b-link>
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title class="mb-1">
            {{ $t('La aventura comienza aquí') }} 🚀
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('Empieza por registrarte, como usuario (Invitado)...') }}
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="register"
            >
              <!-- username -->
              <b-form-group
                :label="$t('Nombre')"
                label-for="register-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="register-username"
                    v-model="username"
                    name="register-username"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Jhonatan Deivyth"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>


              <b-form-group
                label="Apellido"
                label-for="register-apellido"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Apellido"
                  vid="apellido"
                  rules="required"
                >
                  <b-form-input
                    id="register-apellido"
                    v-model="apellido"
                    name="register-apellido"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Crespo Colmenarez"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>


              <!-- email -->
              <b-form-group
                label="Email"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                label="Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                {{ $t('estoy de acuerdo con') }}
                  <b-link :to="pageTermino" target="_blank">{{ $t('política y términos de privacidad') }}</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                {{ $t('Inscribirse') }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>{{ $t('Ya tienes una cuenta?') }}</span>
            <b-link :to="{name:'auth-login'}">
              <span>&nbsp;{{ $t('Iniciar sesión en su lugar') }}</span>
            </b-link>
          </p>

         
        </b-col>
      </b-col>
    <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {toRefs,computed} from 'vue'

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      username: '',
      apellido: '',
      userEmail: '',
      password: '',
      sideImg: require('@/assets/images/pages/register-v2.svg'),
      // validation
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    register() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          this.$http.post('/api/auth/register', {
            nombre: this.username,
            apellido:this.apellido,
            email: this.userEmail,
            password: this.password,
            c_password: this.password
          }).then(response => {



               this.$toast({
                          component: ToastificationContent,
                          position: 'top-right',
                          
                        
                            props: {
                            title: `Gracias por registrarte, puedes iniciar cuando lo desee`,
                            icon: 'CoffeeIcon',
                            variant: 'success',
                            text: ``,
                          },
                        })

                this.$router.push('/login')


           

            
           
          })
          .catch(error => {
            this.$refs.registerForm.setErrors(error.response.data.error)
          })

          
        }
      })
    },
  },

  setup(props){
    const { paginas } = toRefs(store.state.pagina)


    const cargarForm = () => {
      
      if(!paginas.value.lenth){
        store.dispatch('pagina/getPaginas')
      }

    }

    cargarForm();

    return {
      pageTermino: computed(() => store.getters['pagina/pageTermino']),
    }

  }
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.brand-logo img{
  width: auto;
  height: auto;
}
</style>
