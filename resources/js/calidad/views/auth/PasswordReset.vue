<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Reset Password v1 -->
      <b-card class="mb-0">

         <!-- Brand logo-->
         <b-link class="brand-logo">
         
            <img src="/storage/logotipo.png" alt="Logo" />
         <!-- <h2 class="brand-text text-primary ml-1">
            Boda y Playa
         </h2> -->
         </b-link>
         <!-- /Brand logo-->
        <b-card-title class="mb-1">
         Restablecer la contraseña 🔒
        </b-card-title>
        <b-card-text class="mb-2">
         Su nueva contraseña debe ser diferente de las contraseñas utilizadas anteriormente
        </b-card-text>

        <!-- form -->
        <validation-observer ref="simpleRules">
          <b-form
            method="POST"
            class="auth-reset-password-form mt-2"
            @submit.prevent="validationForm"
          >

            <!-- password -->
            <b-form-group
              label="Nueva contraseña"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="Password"
                rules="required|password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="password"
                    :type="password1FieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="reset-password-new"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password1ToggleIcon"
                      @click="togglePassword1Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- confirm password -->
            <b-form-group
              label-for="reset-password-confirm"
              label="Confirmar Contraseña"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirm Password"
                rules="required|confirmed:Password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="cPassword"
                    :type="password2FieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="reset-password-confirm"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password2ToggleIcon"
                      @click="togglePassword2Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              type="submit"
              variant="primary"
            >
              Establecer nueva contraseña
            </b-button>
          </b-form>
        </validation-observer>

        <p class="text-center mt-2">
          <b-link :to="{name:'login'}">
            <feather-icon icon="ChevronLeftIcon" /> Volver al login
          </b-link>
        </p>

      </b-card>
    <!-- /Reset Password v1 -->
    </div>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BCard,
  BCardTitle,
  BCardText,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    VuexyLogo,
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },

  props:{
     token:{
        type:String,
        required:true,
     },

     email:{
        type:String,
        required:false,
        
     }
  },
  data() {
    return {
      userEmail: '',
      cPassword: '',
      password: '',
      // validation
      required,

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },
  computed: {
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
         
           axios.post('/api/auth/reset-password',{
              token:this.token,
              email:this.email,
              password:this.password,
              password_confirmation:this.cPassword
           }).then(respon => {


              if(respon.data.result){

                 this.$router.push('/login')
                 this.$notify.success('La contraseña se ha reestablecido exitosamente.')
              }else{
               this.$notify.info({
                  title:'No se pudo reestablecer la contraseña',
                  message:(respon.data.status == 'passwords.token') ? 'EL token ya no es valido, vuelve a enviar el link de reestablecimiento' : respon.data.status
               })

               if(respon.data.status == 'passwords.token'){
                  
                  this.$router.push({
                     name:'auth-forgot-password'
                  });

               }


              }
            

           }).catch(e => {
              console.log(e)
           })

        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
