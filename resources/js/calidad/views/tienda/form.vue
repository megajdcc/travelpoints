<template>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardar)">

          <b-card>

            <b-tabs v-if="formulario" pills>
              <b-tab active title="Datos de la tienda">
                <b-container fluid>
                  <b-row>

                    <b-col cols="12" md="4">
                      <b-form-group description="Pongale un nombre a su tienda">
                        <template #label>
                          Nombre: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="nombre" rules="required" #default="{ errors, valid }">
                          <b-form-input v-model="formulario.nombre" :state="valid"/>

                          <b-form-invalid-feedback :state="valid" >
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </b-form-group>
                    </b-col>

                    <b-col cols="12" md="4">
                      <b-form-group description="Divisa en la que va a operar la tienda">
                        <template #label>
                          Divisa: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="divisa_id" rules="required" #default="{ errors, valid }">
                          <v-select v-model="formulario.divisa_id" :reduce="(option) => option.id" :options="divisas" label="nombre"></v-select>

                          <b-form-invalid-feedback :state="valid" >
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
              
                    <b-col cols="12" md="4">
                      <b-form-group >
                        <template #label>
                          ¿ Es fisica la tienda ? <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="fisica" rules="required" #default="{ valid, errors }">
                          <b-form-radio-group v-model="formulario.fisica" :options="[{ text: 'Sí', value: true }, { text: 'No', value: false }]" :state="valid" buttons>
                          </b-form-radio-group>

                            <b-form-invalid-feedback :state="valid" >
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                        </validation-provider>

                      </b-form-group>
                    </b-col>
              
                  </b-row>
                </b-container>

                <form-position-map :formulario="formulario" v-if="formulario.fisica"></form-position-map>
              </b-tab>
              <b-tab v-if="formulario.id" >
                <template #title>
                    <feather-icon icon="PhoneIcon" size="16" class="mr-0 mr-sm-50" />
                    <span class="d-none d-sm-inline">Teléfonos</span>
                </template>

                          <b-row>
                             <b-col md="8">
                        
                                <section class="d-flex justify-content-between">
                                   <b-button-group size="sm">
                                      <b-button variant="primary" @click="agregarTelefono" :disabled="formulario.telefonos.length >= 5">
                                         <feather-icon icon="PlusIcon" />
                                         Agregar
                                      </b-button>
                                   </b-button-group>
                                </section>

                                <table class="table table-sm table-hover table-bordeless mt-1">
                                   <thead>
                                      <th>
                                         Número de Télefono: 
                                      </th>
                                      <th>
                                         ¿ Está asociado a whatsapp ? 
                                      </th>
                                      <th>
                                         ¿ Es el número principal ? 
                                      </th>
                                      <th>

                                      </th>
                                   </thead>
                                   <tbody>
                                      <tr  v-for="(telefono, i) in formulario.telefonos" :key="i">
                                         <td>
                                            <validation-provider name="telefono" rules="required" #default="{ valid, errors }">
                                                  <b-form-input v-mask="'+#############'" v-model="telefono.telefono" :state="valid" />

                                                  <b-form-invalid-feedback :state="valid">
                                                     {{ errors[0] }}
                                                  </b-form-invalid-feedback>
                                            </validation-provider>
                                         
                                         </td>

                                         <td class="vertical-aling-center">
                                               <b-form-checkbox switch button-variant="success" v-model="telefono.is_whatsapp" :value="true" :unchecked-value="false">
                                               </b-form-checkbox>
                                         </td>

                                         <td  class=" vertical-align-center">
                                            <b-form-checkbox switch button-variant="warning" v-model="telefono.principal" :value="true" :unchecked-value="false" >
                                            </b-form-checkbox>
                                         </td>

                                         <td  class="vertical-align-center">
                                            <b-button variant="danger" @click="quitarTelefono(telefono, i)" size="sm">
                                               <feather-icon icon="TrashIcon" />
                                            </b-button>

                                              <b-button variant="success" @click="guardarTelefono(telefono)" size="sm" v-loading="loading" :disabled="!telefono.length >= 8">
                                               <feather-icon icon="CheckIcon"  />
                                            </b-button>
                                         </td>
                                     
                                      </tr>
                                   </tbody>
                                </table>
                        
                             </b-col>
                        
                          </b-row>

                          <b-row>
                             <b-col> <span>Para agregar o actualizar un número de teléfono, dar clics en el boton Verde ...</span></b-col>
                          </b-row>
              </b-tab>

              <b-tab title="Horario (Apertura/Cierre)" v-if="formulario.id">
                <form-horario :horarios="formulario.horarios" :actions="actionsHorario" />
              </b-tab>
            </b-tabs>
            

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
  BFormCheckbox,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BFormRadioGroup,
  BTabs,
  BTab

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
      BTabs,
      BTab,
      vSelect,
      BFormCheckbox,
      BFormRadioGroup,
      FormHorario: () => import('components/FormHorario.vue'),
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

      const agregarTelefono = () => {
         store.commit('tienda/agregarTelefono')
      }

      const quitarTelefono = (telefono, i) => {

      if (telefono.id) {
        store.dispatch('tienda/quitarTelefono', telefono).then(({ result }) => {
          if (result) {
            store.commit('tienda/quitarTelefono', i)
          }

        })

      } else {
        store.commit('tienda/quitarTelefono', i)
      }

      }

      const guardarTelefono = (telefono) => {

        store.dispatch('tienda/guardarTelefono', { tienda: formulario.value.id, telefono: telefono }).then(({ result }) => {

          if (result) {
            toast.success('Se ha guardado con éxito el teléfono', { position: 'bottom-right' })
          } else {
            toast.info('No se pudo guardar el teléfono, inténtelo de nuevo', { position: 'bottom-right' })
          }

        }).catch(e => {

          if (e.response.status === 422) {
            formValidate.value.setErrors(e.response.data.errors)
          }

          console.log(e)

        })
      }

      const actionsHorario = () => {

         const aperturarHorario = () => {

            store.dispatch('tienda/aperturarHorario', formulario.value.id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha aperturado el Horario correctamente', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo aperturar el horario, inténte de nuevo')
               }

            });
         }

         const guardarHorario = (horario) => {

            store.dispatch('tienda/guardarHorario', horario).then(({ result }) => {

               if (result) {
                  toast.success('Se ha actualizado el horario', { position: 'bottom-right' })
               } else {
                  toast.info('No se ha actualizado el horario, inténte de nuevo', { position: 'bottom-right' })
               }

            })
         }

         const quitarHorario = () => {

            store.dispatch('tienda/quitarHorario', formulario.value.id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha quitado con éxito el horario', { position: 'bottom-right' })
               } else {

                  toast.info('No se ha quitado el horario, inténte de nuevo', { position: 'bottom-right' })
               }

            })

         }

         return {
            aperturarHorario,
            guardarHorario,
            quitarHorario
         }

      }




      return {
        loading:computed(() => store.state.loading),
        required,
        formValidate,
        formulario,
        guardar,
        divisas,
        agregarTelefono,
        quitarTelefono,
        guardarTelefono,
        actionsHorario

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