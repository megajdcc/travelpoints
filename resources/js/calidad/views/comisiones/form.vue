<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
        <b-card>

          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group >
                  <template #label>
                    Rol: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="rol_id" rules="required" #default="{valid,errors}">
                    <v-select v-model="formulario.rol_id" :options="roles" :selectable="selectableRole" :reduce="option => option.id" label="nombre" 
                      :state="valid" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                  <b-form-group >
                    <template #label>
                      Comisión: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="comision" rules="required|min:1" #default="{ valid, errors }">
                      <b-form-spinbutton v-model="formulario.comision" :min="0"  :step="1" :max="comisionLibre" />

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
              <b-button type="submit" variant="primary" v-loading="loading" :disabled="loading">
                <font-awesome-icon icon="fas fa-paper-plane"/>
                Guardar
              </b-button>

                <b-button  variant="info" v-loading="loading" :disabled="loading" :to="{name:'comision.create'}" v-if="formulario.id">
                  Nueva Comisión
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
import {required,min} from '@validations'

import {
  BForm,
  BContainer,
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSpinbutton,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback

} from 'bootstrap-vue'

import {toRefs,ref,computed,onMounted} from 'vue'

import store from '@/store'
import vSelect from 'vue-select'

export default {
  
  components:{
    BForm,
    BContainer,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSpinbutton,
    ValidationObserver,
    ValidationProvider,
    BButtonGroup,
    BButton,
    vSelect,
    BFormInvalidFeedback



  },

  setup(props,{emit}){
    const {comision:formulario,comisiones} = toRefs(store.state.comision)
    const formValidate = ref(null)
    const {roles} = toRefs(store.state.rol)


    const cargarForm = () => {
      
      if(!roles.value.length){
        store.dispatch('rol/cargarRoles')
      }

    }

    const guardar = () => {
      emit('save',formulario.value,formValidate.value)
    }

    onMounted(() => cargarForm())

    return {  
      loading:computed(() => store.state.loading),
      formulario,
      comisiones,
      formValidate,
      guardar,
      required,
      min,
      roles,
      comisionLibre:computed(() => store.getters['comision/porcentajeLibre']),
      selectableRole:(option) => !comisiones.value.map(val => val.rol_id).includes(option.id)
    }

  }
}
</script>