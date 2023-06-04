<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">

        <b-card>
            <b-container fluid>
              <b-row>
                <b-col cols="12">
            
                  <b-form-group>
                    <template #label>
                      Nombre : <span class="text-danger">*</span>
                    </template>
            
                    <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                      <b-form-input v-model="formulario.nombre" :state="valid" />
            
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
            
                  </b-form-group>
                </b-col>

                <b-col cols="12">
            
                  <b-form-group>
                    <template #label>
                      Descripción : 
                    </template>
            
                    <validation-provider name="descripcion" #default="{valid,errors}">
                     <b-form-textarea v-model="formulario.descripcion" :state="valid" :rows="3"></b-form-textarea>
            
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
            
                  </b-form-group>
                </b-col>

              </b-row>
            
            </b-container>

            <template #footer>
              <b-button-group size="sm">
                <b-button type="submit" variant="primary" title="guardar" v-loading="loading" :disabled="loading">
                  <font-awesome-icon icon="fas fa-paper-plane" />
                  Guardar
                </b-button>
                <b-button @click="regresar" variant="dark" title="regresar">
                  <font-awesome-icon icon="fas fa-arrow-left" />
                  Regresar
                </b-button>

              
              </b-button-group>

            </template>
        </b-card>
        
      </b-form>
    </validation-observer>
</template>


<script>

import {
  ValidationProvider,
  ValidationObserver,

} from 'vee-validate'

import store from '@/store'

import {regresar} from '@core/utils/utils';

import {required} from '@validations'
import {computed,toRefs,ref} from 'vue';

import {
  BCard,
  BForm,
  BButtonGroup,
  BButton,
  BFormInput,
  BFormTextarea,
  BFormInvalidFeedback,
  BContainer,
  BRow,
  BCol,
  BFormGroup,

} from 'bootstrap-vue';


export default {
  
  components:{
    BCard,
    BForm,
    BButtonGroup,
    BButton,
    BFormInput,
    BFormTextarea,
    BFormInvalidFeedback,
    BContainer,
    BRow,
    BCol,
    BFormGroup,

    ValidationProvider,
    ValidationObserver,


  },

  
  setup(props,{emit}){
    const {categoria : formulario} = toRefs(store.state.categoriaProducto)
    const formValidate = ref(null)


    const guardar = () => {

      emit('save',formulario.value,formValidate.value)
    }
    return {  
      loading:computed(() => store.state.loading),
      formulario,
      guardar,
      formValidate,
      regresar,
      required
    }
  }
}
</script>