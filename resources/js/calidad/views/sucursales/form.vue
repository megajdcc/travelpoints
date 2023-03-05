<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
        <b-card>
          <b-container fluid> 
              <b-row>
                <b-col cols="12">
                  <b-form-group>
                    <template #label>
                      Nombre: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                      
                      <b-form-input v-model="formulario.nombre" :state="valid" placeholder="Nombre de la sucursal..." />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>


          </b-container>

          <form-position-map :formulario="formulario">

          </form-position-map>

          <template #footer>
            <b-button-group size="sm">
              <b-button variant="primary" type="submit" v-loading="loading" :disabled="loading">
                <font-awesome-icon icon="fas fa-save"/>
                Guardar
              </b-button>
            </b-button-group>
          </template>
        </b-card>
      </b-form>
    </validation-observer>
</template>

<script>

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import store from '@/store'

import {toRefs,ref,computed} from '@vue/composition-api'

import {
  required
 } from '@validations'

 import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BButtonGroup,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback
 } from 'bootstrap-vue'

export default {
  components:{
      BContainer,
      BRow,
      BCol,
      BCard,
      BButtonGroup,
      BButton,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,

      ValidationObserver,
      ValidationProvider,

      formPositionMap:() => import('components/FormPositionMap.vue')
  },

    setup(props,{emit}){
      
    const {sucursal:formulario} = toRefs(store.state.sucursal)
    const formValidate = ref(null)
    
    const guardar = () => {
      emit('save',formulario.value,formValidate.value)
    }

    const cargar = () => {
        if(formulario.value.id){
          formulario
        }
    }


    return {  
      loading:computed(() => store.state.loading),
      required,
      formulario,
      formValidate,
      guardar

    }
  }
}
</script>