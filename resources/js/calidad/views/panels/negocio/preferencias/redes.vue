<template>
      <b-card>
         <b-container fluid>
            
            <b-row>
               <b-col cols="12">
                  <b-button-group size="sm">
                     <b-button size="sm" variant="primary" title="Agregar" @click="agregar"> 
                        <feather-icon icon="PlushIcon"/>
                        Agregar 
                     </b-button>

                     <b-button size="sm" variant="danger" title="Quitar Todos" @click="quitarTodos">
                        <feather-icon icon="TrashIcon" />
                        Quitar Todos
                     </b-button>
                  </b-button-group>
               </b-col>

               <b-col cols="12" class="mt-1">
                  
                  <validation-observer ref="formValidate" #default="{handleSubmit,valid:validForm}">
                  
                 
                     <table class="table table-hover table-borderless table-sm" >
                        <thead>
                           <th>Red Social</th>
                           <th>Url</th>
                           <th>Icono</th>
                           <th></th>
                        </thead>

                        <tbody>
                           <tr v-for="(red,i) in formulario.redes" :key="i">
                              <td>

                                 <validation-provider name="nombre" rules="required" #default="{valid,errors}">

                                    <b-form-input v-model="red.nombre" :state="valid" placeholder="Facebook, ..." />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0]  }}
                                    </b-form-invalid-feedback>

                                 </validation-provider>
                              
                              </td>

                              <td>
                              
                                 <validation-provider name="url" rules="required|url" #default="{valid,errors}">
                              
                                    <b-form-input v-model="red.url" :state="valid" placeholder="https://facebook.com/myfacebook" />
                              
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                              
                                 </validation-provider>
                              
                              </td>

                              <td>
                              
                                 <validation-provider name="icono"  #default="{valid,errors}">
                              
                                    <v-select v-model="red.icono" :options="icons" >
                                       
                                       <template #option="{label}">
                                             <font-awesome-icon :icon="['fab',label]" /> {{ label.substring(2)  }}
                                       </template>

                                       <template #selected-option="{label}">
                                          <font-awesome-icon :icon="['fab',label]" /> {{ label.substring(2) }}
                                       </template>
                                       
                                    </v-select>
                              
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                              
                                 </validation-provider>
                              
                              </td>

                              <td>
                              
                              <b-button-group >

                                    <b-button @click="agregarRed(red)" title="Guardar red" v-loading="loading" :disabled="loading || !validForm" variant="primary" >
                                       Guardar Red
                                    </b-button>

                                    <b-button @click="quitarRed(red,i)" title="Quitar" v-loading="loading" :disabled="loading" variant="danger">
                                       <feather-icon icon="TrashIcon"/>
                                       Quitar
                                    </b-button>
                                 
                                 </b-button-group>
                              
                              </td>
                           </tr>
                        </tbody>

                     </table>

                  </validation-observer>
               </b-col>
            </b-row>
         
         </b-container>
      </b-card>
</template>
<script>

import {
   ValidationObserver,
   ValidationProvider
} from 'vee-validate'
import {required} from '@validations'

import {
   BForm,
   BContainer,
   BRow,
   BCol,
   BCard,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton
} from 'bootstrap-vue'

import store from '@/store'
import {toRefs,ref,computed,onMounted} from '@vue/composition-api'
import vSelect from 'vue-select'
import { fab } from '@fortawesome/free-brands-svg-icons'

export default {
      components:{
         BForm,
         BContainer,
         BRow,
         BCol,
         BCard,
         BFormGroup,
         BFormInput,
         BFormInvalidFeedback,
         BButtonGroup,
         BButton,

         ValidationObserver,
         ValidationProvider,
         vSelect

      },


      setup(){

         const {negocio:formulario} = toRefs(store.state.negocio)


         const agregar = () => {
            store.commit('negocio/agregarRed')
         }
         const agregarRed = (red) => {
            
            store.dispatch('negocio/agregarRed',red).then(({result}) => {

               if(result){
                  toast.success('Se ha guardado con éxito la Red Social',{position:'bottom-right'})
               }else{
                  toast.info('No se pudo guardar la Red Social, inténtelo de nuevo',{position:'bottom-right'})
               }

            })

         }

         const quitarTodos = () => {
            store.dispatch('negocio/quitarAllRedes').then(({result}) => {

               if (result) {
                  toast.success('Se han quitado con éxito todas las redes', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudieron quitar las Redes ', { position: 'bottom-right' })
               }
            })

         }  

         const quitarRed = (red,i) => {

            if(red.id){
               store.dispatch('negocio/quitarRed',red.id).then(({result}) => {
                  
                  if(result) {
                     toast.success('Se ha quitado con éxito la Red Social',{position:'bottom-right'})
                  }else{
                     toast.info('No se pudo quitar la red social',{position:'bottom-right'})
                  }

               })
            }else{
               store.commit('negocio/quitarRed',i)
            }
         }


         
         return {

            formulario,
            loading:computed(() => store.state.loading),
            required,
            agregar,
            agregarRed,
            quitarTodos,
            quitarRed,
            icons: Object.keys(fab).map(val => _.kebabCase(val)),


         }
      }

}
</script>