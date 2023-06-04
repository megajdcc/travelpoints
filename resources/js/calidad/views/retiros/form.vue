<template>
  <b-card>
    <validation-observer ref="formValidate" #default="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(guardar)">
          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group >
                  <template #label>
                    Usuario: <span class="text-danger">*</span>
                  </template>
                  <validation-provider name="usuario_id" rules="required" #default="{ valid, errors }">
                      <v-select v-model="formulario.usuario_id" :options="users" :reduce="option => option.id" label="nombre" @input="selectDivisa">
                         <template #option="{ nombre, apellido,rol }">
                            <h3 style="margin: 0">{{ `${nombre} ${apellido}` }}</h3>
                            <em>{{ rol.nombre }}</em>
                          </template>

                           <template #selected-option="{ nombre, apellido,  rol }">
                              <div style="display: flex; align-items: baseline">
                                <h3 style="margin: 0">{{ `${nombre} ${apellido}` }}</h3>
                                <em>{{ rol.nombre }}</em>
                              </div>
                            </template>

                      </v-select>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>

                <b-form-group>
                  <template #label>
                    Monto: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="monto" rules="required" #default="{valid,errors}">
                    <currency-input v-model="formulario.monto" :options="{...optionsCurrency,...{
                      currency:getCurrency
                    }}" InputClass="form-control" />

                     <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                      </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                <b-form-group label="Status">
                  <validation-provider name="status" rules="required" #default="{valid,errors}">
                    <v-select v-model="formulario.status" :options="statuses" :reduce="option => option.value"></v-select>

                    <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                    </b-form-invalid-feedback>

                  </validation-provider>
                </b-form-group>

                 <b-form-group label="Nota">
                    <validation-provider name="nota" #default="{ valid, errors }">
                      <b-form-textarea v-model="formulario.nota" :rows="3" :state="valid"></b-form-textarea>

                      <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                  </b-form-group>
              </b-col>
            </b-row>

            <b-row v-if="formulario.id">
              <b-col cols="12" md="6">
                <b-form-group labe="Comprobante" description="Si ya ha pagado está solicitud, cargue un comprobante de pago">
                  <validation-provider name="comprobante" #default="{valid,errors}">
                    <b-form-file v-model="formulario.comprobante" :state="valid" browse-text="Cargar comprobante" />

                    <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                    </b-form-invalid-feedback>

                  </validation-provider> 
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <b-button-group size="sm">
                  <b-button variant="primary" type="submit" v-loading="loading" :disabled="loading" title="Enviar">
                    Guardar Solicitud
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
  </b-card>
    
</template>

<script>

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BForm,
  BFormInput,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormTextarea,
  BFormFile,
} from 'bootstrap-vue'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import {computed,toRefs,onMounted,ref} from 'vue'

import store from '@/store'
import vSelect from 'vue-select'
import {required} from '@validations'
import { optionsCurrency } from '@core/utils/utils'
export default {
  
  components:{
    ValidationObserver,
    ValidationProvider,
    BCard,
    BContainer,
    BRow,
    BForm,
    BFormInput,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    vSelect,
    BCol,
    BFormGroup,
    CurrencyInput:() => import('components/CurrencyInput.vue'),
    BFormTextarea,
  BFormFile,

  },


  setup(props,{emit}){

    const {retiro:formulario} = toRefs(store.state.retiro)
    const {usuarios} = toRefs(store.state.usuario)
    const divisa_cuenta =ref('EUR')

    const cargarForm = () => {

      if(!usuarios.value.length){
        store.dispatch('usuario/cargarUsuarios')
      }

    }

    onMounted(() => cargarForm())


    const formValidate = ref(null)

    const guardar = () => {
      emit('save',formulario.value,formValidate.value)
    }

    const statuses = ref([
      {label:'Solicitar',value:1},
      { label: 'En proceso', value: 2 },
      { label: 'Procesado', value: 3 },
      { label: 'Rechazado', value: 4 },
    ])

    const selectDivisa = (user) => {
      
      let us = usuarios.value.find(val => val.id === user)
      if(us != undefined){
        divisa_cuenta.value = us.cuenta.divisa.iso
      }

    }

    return {
      loading:computed(() => store.state.loading),
      formValidate,
      guardar,
      required,
      formulario,
      usuarios,
      optionsCurrency,
      statuses,
      users:computed(() => {
        
        let users = usuarios.value.filter(val => ['Promotor', 'Coordinador', 'Lider'].includes(val.rol ? val.rol.nombre : ''))
        console.log(users.value)
        return users; 
      }),
      selectDivisa,
      getCurrency:computed(() => divisa_cuenta.value == 'Tp' ? 'EUR' : 'USD' )
     }
  }

}
</script>