<template>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardar)">

          <b-card>
            <b-container fluid>
              <b-row>

                 <b-col cols="12" md="4">
                  <b-form-group description="Pongale un nombre a su tienda">
                    <template #label>
                      Nombre: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                      <b-form-input v-model="formulario.nombre" :state="valid"/>

                      <b-form-invalid-feedback :state="valid" >
                        {{ errors[0]  }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="4">
                  <b-form-group description="Divisa en la que va a operar la tienda">
                    <template #label>
                      Divisa: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="divisa_id" rules="required" #default="{errors,valid}">
                      <v-select v-model="formulario.divisa_id" :reduce="(option) => option.id" :options="divisas" label="nombre"></v-select>

                      <b-form-invalid-feedback :state="valid" >
                        {{ errors[0]  }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>
            
                <b-col cols="12" md="4">
                  <b-form-group >
                    <template #label>
                      ¿ Es fisica la tienda ? <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="fisica" rules="required" #default="{valid,errors}">
                      <b-form-radio-group v-model="formulario.fisica" :options="[{text:'Sí',value:true},{text:'No',value:false}]" :state="valid" buttons>
                      </b-form-radio-group>

                        <b-form-invalid-feedback :state="valid" >
                        {{ errors[0]  }}
                      </b-form-invalid-feedback>

                    </validation-provider>

                  </b-form-group>
                </b-col>
            
              </b-row>

             
            </b-container>

            <form-position-map :formulario="formulario" v-if="formulario.fisica"></form-position-map>

            <template #footer>
              <b-button-group size="sm">
                  <b-button variant="primary" type="submit" title="Guardar" v-loading="loading" :disabled="loading">
                    <font-awesome-icon icon="fas fa-save" />
                    Guardar
                  </b-button>
                  
                  <b-button v-if="formulario.id" title="Nueva tienda" :to="{name:'tienda.create'}" variant="dark">
                    Nueva tienda
                  </b-button>
                  
                  <b-button title="Regresar" :to="{name:'tienda.list'}" variant="warning">
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
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';


import {required} from '@validations';
import store from '@/store'
import {computed,toRefs,ref} from 'vue'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BFormRadioGroup

} from 'bootstrap-vue'

import vSelect from 'vue-select';


export default {
    components:{
      ValidationObserver,
      ValidationProvider,

      BCard,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      BContainer,
      BRow,
      BCol,
      vSelect,
    BFormRadioGroup,
    FormPositionMap:() => import('components/FormPositionMap.vue')

    },


    setup(_,{emit}){

      const formValidate = ref(null)

      const {tienda:formulario} = toRefs(store.state.tienda)
      const {divisas} = toRefs(store.state.divisa)

      const guardar = () => {
        emit('save',formulario.value,formValidate.value)
      }

      const cargarForm = () => {
        if(!divisas.value.length){
          store.dispatch('divisa/getDivisas')
        }
      }

      cargarForm();



      return {
        loading:computed(() => store.state.loading),
        required,
        formValidate,
        formulario,
        guardar,
        divisas

      }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

    .btn.active{
      background:$primary !important;
    }
</style>