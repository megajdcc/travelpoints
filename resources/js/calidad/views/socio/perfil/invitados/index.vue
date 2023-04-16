<template>
   <div>
      <b-card>
         <template #header>
            <header class="d-flex justify-content-between align-items-center w-100">
               <h2 class="font-weight-bolder">Mi código de referidor</h2>
            </header>
         </template>
         <h2>Gana puntos ($Tp) envíando tu código de referidor a tus amigos.</h2>
         <p class="text-justify">Aumenta tus puntos ($Tp) por cada Amigo que se haya registrado con tu código de
            referidor
            y haya consumado una
         reserva. <br> Por cada reserva consumada de tus referidos tu ganarás saldo ($Tp) que luego podrás usar en
            nuestras tiendas de destinos que tenemos para Tí.</p>

         <validation-observer ref="formValidate" #default="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(guardar)">
               <b-form-group label="Comparte tu link">
                  <validation-provider name="codigo_referidor" rules="required" #default="{ errors,valid }">
                     <b-input-group size="sm" class="w-100">
                        <b-input-group-prepend is-text>
                           {{ url }}
                        </b-input-group-prepend>
                        <b-form-input v-model="formulario.codigo_referidor" :state="valid"
                           :disabled="usuario.codigo_referidor ? true : false" />

                        <b-input-group-append>
                           <b-button @click="copiarLink" size="sm" v-if="usuario.codigo_referidor ? true : false">
                              Copiar link
                           </b-button>

                           <b-button variant="primary" type="submit"
                              :disabled="!formulario.codigo_referidor ? true : false" v-else v-loading="loading">
                              Crear Link
                           </b-button>

                        </b-input-group-append>
                     </b-input-group>

                     <b-form-invalid-feedback :state="errors.length ? false : null">
                        {{ errors[0] }}
                     </b-form-invalid-feedback>

                  </validation-provider>
               </b-form-group>

               <b-button-group size="sm" v-if="usuario.codigo_referidor">
                  <b-button @click="compartirFacebook" style="background:#376BC8 !important">
                     <feather-icon icon="FacebookIcon" /> Facebook
                  </b-button>

                  <b-button @click="compartirWhatsapp" style="background:#29ce41 !important">
                     <feather-icon icon="WhatsappIcon" /> WhatsApp
                  </b-button>
               </b-button-group>
            </b-form>
         </validation-observer>

      </b-card>

      <!-- Mis referidos -->

      <referidos class="mt-1"/>
      

   </div>

</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BButtonGroup,
   BButton,
   BInputGroup,
   BInputGroupPrepend,
   BInputGroupAppend,
   BForm,
   BFormInvalidFeedback,
   BLink,



} from 'bootstrap-vue'

import { ref,computed,toRefs} from 'vue'

import store from '@/store'

import { ValidationObserver,ValidationProvider } from 'vee-validate'
import {required} from '@validations'

export default {

   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BButtonGroup,
      BButton,
      BInputGroup,
      BInputGroupPrepend,
      BInputGroupAppend,
      ValidationObserver,
      ValidationProvider,
      BForm,
      BFormInvalidFeedback,
      BLink,
      referidos:() => import('./list.vue')


   },
   
   setup() {
      
    

      const formulario = ref(store.getters['usuario/draftUsuario'])
      const formValidate  = ref(null)
      const usuario = computed(() => store.state.usuario.usuario)
      const url = ref('');
      const url_app = ref(window.location.origin)
      
      const link_referido = computed(() => {
         return `${url_app.value}/register/${formulario.value.codigo_referidor}`;

      })
      const compartirFacebook = () => {
         url.value = `https://www.facebook.com/sharer/sharer.php?u=${link_referido.value}`
         window.open(url.value, '_blank');
      }

      const compartirWhatsapp = () => {
         url.value = `https://wa.me/?text=Registrate en ${url_app.value} y gana puntos $Tp  con TravelPoint. ${link_referido.value}`
         window.open(url.value, '_blank');
      }
      const copiarLink = () => {
         navigator.clipboard.writeText(link_referido.value)
         toast.success("Link Copiado.")
      }

      const guardar = () => {

         store.dispatch('usuario/crearLinkReferido',formulario.value).then(({result}) => {

            if(result){
               toast.success('Su código de referido ha sido creado con éxito...',{position:'bottom-right'})

            }else{
               toast.error('Su código de referido no se pudo crear, inténtelo de nuevo mas tarde...',{position:'bottom-right'})
            }


         }).catch(e => {

            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }
         })

      }

      return {
         loading:computed(() => store.state.loading),
         url:computed(() => `${window.location.origin}/register/`),
         required,
         formulario,
         compartirWhatsapp,
         compartirFacebook,
         copiarLink,
         link_referido,
         guardar,
         usuario,
         formValidate
      }
   }
}
</script>