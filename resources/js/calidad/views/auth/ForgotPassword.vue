<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Forgot Password v1 -->
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
          Has olvidado tu contraseña? 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña
        </b-card-text>

        <!-- form -->
        <validation-observer ref="form" #default="{ handleSubmit }">
          <b-form class="auth-forgot-password-form mt-2" @submit.prevent="handleSubmit(validationForm)" >
            <!-- email -->
            <b-form-group
              label="Email"
              label-for="forgot-password-email"
            >
              <validation-provider #default="{ errors }" name="email" rules="required|email">
                <b-form-input id="email" v-model="formulario.email" :state="errors.length > 0 ? false:null" placeholder="Jhonatan@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>

              </validation-provider>
            </b-form-group>

            <!-- submit button -->

            <el-button type="primary" :loading="loading" native-type="submit" icon="el-icon-position" class="w-100">
               Enviar enlace de restablecimiento
            </el-button>



            <!-- <b-button
              variant="primary"
              block
              type="submit"
            >
              Enviar enlace de restablecimiento
            </b-button> -->
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <b-link :to="{name:'login'}">
            <feather-icon icon="ChevronLeftIcon" /> Regresar a login
          </b-link>
        </b-card-text>

      </b-card>
    <!-- /Forgot Password v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { BCard, BLink, BCardText, BCardTitle, BFormGroup, BFormInput, BForm, BButton } from 'bootstrap-vue'
import { required, email } from '@validations'


import {ref,toRefs} from '@vue/composition-api';
import {Notification} from 'element-ui';
import store from 'store';


export default {
  components: {
    VuexyLogo,
    BCard,
    BLink,
    BCardText,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BButton,
    BForm,
    ValidationProvider,
    ValidationObserver,
  },

  setup(props){

    axios.get('/sanctum/csrf-cookie').then(response => {
      // console.log(response)
    });

    let form = ref(null);

    let {loading} = toRefs(store.state)

    let formulario = ref({
      email:null
    })

    // console.log($('meta[name="csrf-token"]').attr('content'));

    let  validationForm = ()  => {
      form.value.validate().then(success => {

        if (success) {
        


          // fetch('/api/auth/recuperar/contrasena',{
          //   method:'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content'),
          //   },
          //   body:JSON.stringify(formulario.value)
          // }).then(response => {

          //   if(response.status == 200) {
          //     Notification.info('¡Hemos enviado su enlace de restablecimiento de contraseña por correo electrónico!')
          //   }else if(response.status == 422){
          //     console.log(response.json())
          //   }else{
          //     console.log(response)
          //   }
          // }).catch(e => {
          //   console.log(e)
          // }).then(() => store.commit('toggleLoading'));
          
          axios.post('/api/auth/recuperar/contrasena',formulario.value).then(respon => {
            console.log(respon)
            Notification.success({
              title:'¡Hemos enviado su enlace de restablecimiento de contraseña por correo electrónico!'
            })
          }).catch(e => {
           
            if(e.response && e.response.status === 422){
              // console.log(e.response.data.errors);
              form.value.setErrors(e.response.data.errors);
            }else{
             console.log(e)
            }
          })

        }
      })
    }



    return {
      form,
      formulario,
      required,
      email,
      validationForm,
      loading
    }

  }
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
