<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(enviar)">
        <b-card>
          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group >
                  <template #label>
                    Email: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="email" rules="required|email" #default="{errors,valid}">
                    <b-form-input v-model="formulario.email" :state="valid" />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                 <b-form-group  description="Destaque en el mensaje que le vas a envíar al destinatario del Negocio">
                    
                    <template #label>
                      Mensaje: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="mensaje" rules="required" #default="{ errors, valid }">
                      <b-form-textarea v-model="formulario.mensaje" :rows="3">
                      </b-form-textarea>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>

                  </b-form-group>
              </b-col>

            </b-row> 
          </b-container>
          <template #footer>
              <b-button variant="primary" v-loading="loading" type="submit" :disabled="loading">
                <font-awesome-icon icon="fas fa-paper-plane"/>
                Envíar
              </b-button>
          </template>
        </b-card>
      </b-form>
    </validation-observer>

</template>


<script>

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BForm,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormInput,
  BFormGroup,
  BFormTextarea
} from 'bootstrap-vue'

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import {required,email} from '@validations'

import store from '@/store'

import {toRefs,ref,computed} from 'vue'


export default {
  
  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BForm,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    ValidationObserver,
    ValidationProvider
  },

  setup(props,{emit}){
    const {invitacion:formulario} = toRefs(store.state.invitacion)
    const usuario = computed(() => store.state.usuario.usuario)
    const formValidate = ref(null)
    const enviar = () => {
      formulario.value.usuario_id = usuario.value.id
      emit('save',formulario.value,formValidate)
    }

    return {
      loading:computed(() => store.state.loading),
      required,
      email,
      enviar,
      formulario,
      formValidate
    }

  }

}
</script>