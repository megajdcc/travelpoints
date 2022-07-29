<template>
   <b-card title="Desactivar Cuenta">
      <span>
         Al desactivar tu cuenta, se desactivará tu perfil y se borrará tu nombre y tu foto de la mayor parte de
         TravelPoints.
      </span>

      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(desactivar)">
            <b-form-group>

               <template #label>
                  Nos intersa saber por qué nos dejas <span class="text-danger">*</span>
               </template>
               <validation-provider name="mensaje" rules="required" #default="{errors}">
                  <b-form-textarea v-model="formulario.mensaje" :state="errors.length ? false : null" :rows="3"
                     placeholder="Un breve mensaje.." />

                  <b-form-invalid-feedback>
                     {{ errors[0] }}
                  </b-form-invalid-feedback>
               </validation-provider>

            </b-form-group>

            <b-form-group>

               <template #label>
                  Contraseña actual: <span class="text-danger">*</span>
               </template>

               <validation-provider name="contrasena" rules="required" #default="{errors}">
                  <el-input type="password" v-model="formulario.contrasena" class="w-100" show-password />

                  <b-form-invalid-feedback :state="errors.length ? false : null">
                     {{ errors[0] }}
                  </b-form-invalid-feedback>
               </validation-provider>

            </b-form-group>

            <span>Los campos marcados con <strong class="text-danger">*</strong> son obligatorios.</span>

            <hr>

            <b-button variant="primary"  type="submit" v-loading="loading" title="Desactivar cuenta">
               Desactivar cuenta
            </b-button>

         </b-form>
      </validation-observer>



   </b-card>

</template>

<script>

import {
   BContainer,
   BRow,
   BCol,
   BForm,
   BFormGroup,
   BFormTextarea,
   BFormInvalidFeedback,
   BCard,
   BButton
} from 'bootstrap-vue'

import { ValidationObserver,ValidationProvider } from 'vee-validate'

import store from '@/store'

import { required } from '@validations'

import {ref,computed} from '@vue/composition-api'
import useAuth from '@core/utils/useAuth'

export default {

   components:{
      BContainer,
      BRow,
      BCol,
      BForm,
      BFormGroup,
      BFormTextarea,
      BFormInvalidFeedback,
      BCard,
      ValidationObserver,
      ValidationProvider,
      BButton

   },


   setup() {

      const formValidate = ref(null)

      const formulario = ref({
         mensaje:'',
         contrasena:null

      })
      
      const {
         logout
      } = useAuth()
      
      const desactivar = () => {

         store.dispatch('usuario/desactivarCuenta',formulario.value).then(({result}) => {
            
            if(result){
               toast.info('Su cuenta ha sido desactivada, si vuelves a entrar al sistema, tu cuenta se activará automáticamente...')
               logout()
            }else{
               toast.info('No pudimos desactivar tú cuenta, inténtelo de nuevo mas tarde')
            }

         }).catch(e => {
            console.log(e)
            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }
            
         })

      }

      return {
         required,
         formValidate,
         desactivar,
         formulario,
         loading:computed(() => store.state.loading)
      }
   },
}
</script>