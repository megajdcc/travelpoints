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
                      
                      <b-form-input v-model="formulario.nombre" :state="valid" 
                      placeholder="Nombre de la sucursal..." />

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

          <b-container fluid>

            <el-divider content-position="left">
              Números Teléfonicos
            </el-divider>

            <b-row>
              <b-col cols="12">
                <b-button-group size="sm">
                  <b-button variant="primary" title="Agregar Teléfono" 
                  @click="$store.commit('sucursal/agregarTelefono')">
                    Agregar
                  </b-button>
                </b-button-group>

                <table class="table table-sm table-hover w-100 mt-1">
                  <thead>
                  
                    <th>Teléfonos</th>
                    <th>¿ Principal ?</th>
                    <th>¿ Whatsapp ?</th>
                    <th></th>
                  </thead>
                   <tbody>
                      <tr v-for="(telefono, i) in formulario.telefonos" :key="i" >
                        <td>
                            <validation-provider name="telefono" rules="required"  #default="{ valid, errors }">
                              <b-form-input v-model="telefono.telefono" :state="valid"  v-mask="'+#############'" />

                              <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                              </b-form-invalid-feedback>

                            </validation-provider>
                        </td>
                        <td>
                            <validation-provider name="principal" #default="{ valid, errors }" >
                                  <b-form-checkbox v-model="telefono.principal" switch />

                                  <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                            </validation-provider> 
                      
                        </td>

                        <td>
                            <validation-provider name="is_whatsapp" #default="{ valid, errors }" >
                                  <b-form-checkbox v-model="telefono.is_whatsapp" switch />

                                  <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                            </validation-provider> 
                      
                        </td>

                        <td>
                            <b-button @click="quitarTelefono(telefono,i)" size="sm" variant="danger">
                              <feather-icon icon="TrashIcon"/>
                            </b-button>
                        </td>

                      </tr>
                    </tbody>
                </table>
              </b-col>
            </b-row>

          </b-container>


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
  BFormInvalidFeedback,
  BFormCheckbox
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
      BFormCheckbox,
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
        // if(formulario.value.id){
        //   formulario
        // }
    }

    const quitarTelefono = (telefono,i) => {
      if(telefono.id){
        store.dispatch('sucursal/quitarTelefono',telefono.id).then(({result}) => {
          if(result){
            store.commit('sucursal/quitarTelefono',i)
          }
        })
      }else{
        store.commit('sucursal/quitarTelefono',i)
      }
    }

    return {  
      loading:computed(() => store.state.loading),
      required,
      formulario,
      formValidate,
      guardar,
      quitarTelefono

    }
  }
}
</script>