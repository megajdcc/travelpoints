<template>
   <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
         <b-card>


            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group >
                        <template #label>
                           Usuario: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="usuario_id" rules="required" #default="{valid,errors}">

                           <v-select v-model="formulario.usuario_id" :filterBy="filtrarUsuario" :reduce="(option) => option.id" :options="usuarios" @option:selected="establecerPermisos" :selectable="isSelected">

                              <template #selected-option="{avatar,nombre,apellido,email}">
                                 <b-avatar :src="avatar" rounded="circle" class="mr-1" size="20pt" />
                                 <strong> {{  `${nombre} ${apellido} - ${email}`  }}</strong>
                              </template>   

                              <template #option="{avatar,nombre,apellido,email}">
                                 <b-avatar :src="avatar" rounded="circle" size="20pt" />
                                 <strong> {{ `${nombre} ${apellido} - ${email}` }}</strong>
                              </template>

                              <template #no-options>
                                 Sin usuarios
                              </template>

                           </v-select>

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Cargo: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="cargo_id" rules="required" #default="{valid,errors}">
                  
                           <v-select v-model="formulario.cargo_id"  :reduce="(option) => option.id"
                              :options="cargos" label="cargo" @option:selected="establecerPermisos">

                              <template #no-options>
                                 Sin Cargos
                              </template>
                  
                           </v-select>
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

               </b-row>

               <b-row>
                  <b-col cols="12">
                     
                     <h3>Permisos</h3>

                     <b-table striped :fields="fieldsTable" small class="mb-0"
                        :items="formulario.permisos">
                        <template #cell(module)="data">
                           {{ data.value }}
                        </template>
                     
                        <template #cell(read)="{ item }">
                           <b-form-checkbox v-model="item.read" />
                        </template>
                     
                        <template #cell(write)="{ item }">
                           <b-form-checkbox v-model="item.write" />
                        </template>
                     
                     
                        <template #cell(update)="{ item }">
                           <b-form-checkbox v-model="item.update" />
                        </template>
                     
                     
                        <template #cell(delete)="{ item }">
                           <b-form-checkbox v-model="item.delete" />
                        </template>
                     
                     </b-table>
                  </b-col>
               </b-row>
            </b-container>

            <template #footer>

               <b-button-group size="sm">
                  <b-button type="submit" title="Guardar" variant="primary" v-loading="loading" :disabled="loading">
                     <feather-icon icon="SaveIcon" />
                     Guardar
                  </b-button>
                  
                  <b-button title="Regresar" @click="regresar" >
                     <feather-icon icon="ArrowLeftIcon" />
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
   ValidationObserver
} from 'vee-validate'

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BForm,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup,
   BAvatar,
   BTable,
   BFormCheckbox
} from 'bootstrap-vue'

import {required} from '@validations'

import { regresar } from '@core/utils/utils'
import {onMounted,toRefs,ref,computed,watch} from 'vue'
import store from '@/store'
import vSelect from 'vue-select'

export default {
   
   components:{
      ValidationProvider,
      ValidationObserver,

      BCard,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BForm,
      BFormInvalidFeedback,
      BButton,
      BButtonGroup,
      vSelect,
      BAvatar,
      BTable,
      BFormCheckbox

   },


   setup(_,{emit}){

      const {empleado:formulario} = toRefs(store.state.empleado)
      const {negocio} = toRefs(store.state.negocio)
      const permisos = computed(() => {

         if (formulario.value.cargo_id) {
            return negocio.value.cargos.some(val => val.id == formulario.value.cargo_id)  ? negocio.value.cargos.find(val => val.id == formulario.value.cargo_id).permisos : []
         }

         return [];

      })

      const {usuarios,usuario} = toRefs(store.state.usuario)

      const cargarForm = () => {

         if(!usuarios.value.length){
            store.dispatch('usuario/cargarUsuarios')
         }

         if(formulario.value.id){
            establecerPermisos();
         }
      }  

      watch([formulario,usuarios],() => cargarForm())

      const formValidate = ref(null)

      const guardar = () => {
         formulario.value.negocio_id = negocio.value.id
         emit('save',formulario.value,formValidate.value)
      }  

      const establecerPermisos = () => {

         if(formulario.value.usuario_id && formulario.value.cargo_id ){
            formulario.value.permisos = clone(store.getters['empleado/permissionsUser']({
               permisos: permisos.value,
               userPermisos: usuarios.value ? usuarios.value.some((val) => formulario.value.usuario_id == val.id) ?
                  usuarios.value.find((val) => formulario.value.usuario_id == val.id).permisos : []
                  : []
            }))
         }  
       
      }

      cargarForm();

      return {
         loading:computed(() => store.state.loading),
         guardar,
         formulario,
         formValidate,
         regresar,
         required,
         usuarios,
         usuario,
         isSelected:(option) => {

            return option.id == usuario.value.id ? false : true
         },
         filtrarUsuario: ({email,nombre,apellido},label,search) =>{
            return (email || nombre ||  apellido || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
         },
         cargos:computed(() => negocio.value.cargos),
         permisos,
         establecerPermisos,
         fieldsTable: [{ key: 'module' }, { key: 'read' }, { key: 'write' }, { key: 'update' }, { key: 'delete' }]


      }

   }

}
</script>