<template>
   <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">

         <!-- Register v1 -->
         <b-card class="mb-0">
            <logo url="/"></logo>

            <b-card-title class="mb-1">
               Unete al club 🚀
            </b-card-title>
            <b-card-text class="mb-2">
               No mas de 2 minutos te tomará registrarte.
            </b-card-text>

            <!-- form -->
            <validation-observer ref="formValidate" #default="{handleSubmit}">
               <b-form class="auth-register-form mt-2" @submit.prevent="handleSubmit(guardar)">
                  <!-- username -->
                  <b-form-group label="Username" label-for="username">
                     <validation-provider #default="{ errors }" name="username" rules="required">
                        <b-form-input id="username" v-model="formulario.username"
                           :state="errors.length > 0 ? false : null" name="register-username"
                           placeholder="mariosacramento" />
                        <small class="text-danger">{{ errors[0] }}</small>
                     </validation-provider>
                  </b-form-group>

                  <!-- email -->
                  <b-form-group label="Email" label-for="email">
                     <validation-provider #default="{ errors }" name="email" rules="required|email">
                        <b-form-input id="email" v-model="formulario.email" :state="errors.length > 0 ? false : null"
                           name="register-email" placeholder="mario@example.com" />
                        <small class="text-danger">{{ errors[0] }}</small>
                     </validation-provider>
                  </b-form-group>

                  <!-- password -->
                  <b-form-group label="Password" label-for="password">
                     <validation-provider #default="{ errors }" name="password" rules="required|password">
                        <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                           <b-form-input id="password" v-model="formulario.password" :type="passwordFieldType"
                              :state="errors.length > 0 ? false : null" class="form-control-merge"
                              name="register-password" placeholder="············" />
                           <b-input-group-append is-text>
                              <feather-icon :icon="passwordToggleIcon" class="cursor-pointer"
                                 @click="togglePasswordVisibility" />
                           </b-input-group-append>
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                     </validation-provider>
                  </b-form-group>

                  <!-- retype password -->
                  <b-form-group label="Password" label-for="password">
                     <validation-provider #default="{ errors }" name="retypePassword" rules="required|password">
                        <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                           <b-form-input id="password" v-model="formulario.retypePassword" :type="passwordFieldType"
                              :state="errors.length > 0 ? false : null" class="form-control-merge"
                              name="register-password" placeholder="············" />
                           <b-input-group-append is-text>
                              <feather-icon :icon="passwordToggleIcon" class="cursor-pointer"
                                 @click="togglePasswordVisibility" />
                           </b-input-group-append>
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                     </validation-provider>
                  </b-form-group>


                  <!-- checkbox -->
                  <b-form-group>
                     <b-form-checkbox id="register-privacy-policy" v-model="formulario.condiciones" name="checkbox-1">
                        Acepto los
                        <b-link :to="{name:'terminos-condiciones'}">Terminos y condiciones</b-link>
                     </b-form-checkbox>
                  </b-form-group>

                  <!-- submit button -->
                  <b-button variant="primary" block type="submit" :disabled="!formulario.condiciones">
                     !Hazme Socio!
                  </b-button>
               </b-form>
            </validation-observer>

            <b-card-text class="text-center mt-2">
               <span>Ya tienes cuenta en TravelPoints? </span>
               <b-link :to="{ name: 'login' }">
                  <span>ir a Login</span>
               </b-link>
            </b-card-text>

            <div class="divider my-2">
               <div class="divider-text">
                  o
               </div>
            </div>

            <!-- social buttons -->
            <div class="auth-footer-btn d-flex justify-content-center">
               <b-button variant="google" href="javascript:void(0)">
                  <feather-icon icon="MailIcon" />
                  Google
               </b-button>
            </div>
         </b-card>
         <!-- /Register v1 -->
      </div>
   </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
   BCard,
   BLink,
   BCardTitle,
   BCardText,
   BForm,
   BButton,
   BFormInput,
   BFormGroup,
   BInputGroup,
   BInputGroupAppend,
   BFormCheckbox,
} from 'bootstrap-vue'
import { required, email,password } from '@validations'
import useTogglePassword from '@core/utils/useTogglePassword';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { ref, computed, toRefs, onMounted, watch } from 'vue'
import router from '@/router'
import store from '@/store'


export default {

   components: {
      // BSV
      BCard,
      BLink,
      BCardTitle,
      BCardText,
      BForm,
      BButton,
      BFormInput,
      BFormGroup,
      BInputGroup,
      BInputGroupAppend,
      BFormCheckbox,
      // validations
      ValidationProvider,
      ValidationObserver,
      Logo:() => import('components/Logo')
   },

   props:{
      codigo:{
         type:String,
         required:false
      }
   },

   setup(props,{emit}){

      const {codigo } = toRefs(props)

      const formulario = ref({
         username      : null,
         email         : null,
         password      : null,
         retypePassword: null,
         condiciones   : false,
         referidor     : codigo.value
      })

      const formValidate = ref(null)

      const {
         passwordFieldType,
         togglePasswordVisibility
      } = useTogglePassword();

      const guardar = () => {
         
         store.dispatch('usuario/nuevoUsuario',formulario.value).then(({result}) => {
            
            if(result){
               toast.success('Tú cuenta ha sido creada con éxito')
               router.push({name:'login'})
            }else{
               toast.info('La cuenta no pudo ser creada, inténtelo de nuevo mas tarde')
            }


         }).catch(e => {
            
            console.log(e)
            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }

         })

      } 

      const cargarForm =() => {
         if (codigo.value) {
            store.dispatch('usuario/verificarCodigoReferido', codigo.value).then(({ result }) => {

               if (result) {
                  toast.success('Código de referidor cargado')
               } else {
                  toast.info('El código no se ha podido cargar')
                  router.push('/register')
               }

            })
         }

      }

      onMounted(() => cargarForm())

      watch(codigo,() => cargarForm())

      
      return {
         formulario,
         formValidate,
         loading:computed(() => store.state.loading),
         required,
         email,
         password,
         passwordFieldType,
         togglePasswordVisibility,
         passwordToggleIcon:computed(() => {
            return passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'
         }),
       
        
         guardar

      }
   }

}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
