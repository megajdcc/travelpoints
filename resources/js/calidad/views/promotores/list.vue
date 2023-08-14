
<template>
  <section>
    <listado hideFooter :actions="actions" isTable>
    
      <template #btn-action>
        <b-button type="variant" @click="agregarPromotor" v-if="$can('write', 'promotores')"
          class="d-flex flex-column justify-content-center">
          Agregar Promotor
        </b-button>
      </template>

      <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">
        <b-card class="mt-1">
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
              empty-text="No se encontró ningún Promotor" :sort-desc="isSortDirDesc" sticky-header="700px"
              :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">

            <!-- Column: User -->
            <template #cell(username)="{ item }">
              <b-media vertical-align="center">
                <template #aside>
                  <b-avatar size="32" :src="item.avatar" :text="avatarText(`${item.nombre} ${item.apellido}`)"
                    :variant="`light-${resolveUserRoleVariant(item.rol ? item.rol.nombre : '')}`"
                    :to="{ name: 'mostrar.usuario', params: { id: item.id } }" disabled />
                </template>
                <b-link :to="{ name: 'mostrar.usuario', params: { id: item.id } }" disabled
                  class="font-weight-bold d-block text-nowrap"> 
                  {{ `${item.nombre} ${item.apellido}` }}
                </b-link>
                <small class="text-muted" v-if="item.username">{{ item.username }}</small>
              </b-media>
            </template>

             <template #cell(lider_id)="{ item }">
                <b-media vertical-align="center" v-if="item.lider">
                  <template #aside>
                    <b-avatar size="32" :src="item.avatar" :text="avatarText(`${item.lider ? item.lider.nombre : ''} ${item.lider ? item.lider.apellido : ''}`)"
                      :variant="`light-${resolveUserRoleVariant(item.lider ? item.lider.rol.nombre : '')}`"
                      :to="{ name: 'mostrar.usuario', params: { id: item.lider ? item.lider.id : null } }" disabled />
                  </template>
                  <b-link :to="{ name: 'mostrar.usuario', params: { id: item.lider ? item.lider.id : null } }" disabled
                    class="font-weight-bold d-block text-nowrap"> 
                    {{ `${item.lider ? item.lider.nombre : ''} ${item.lider ? item.lider.apellido : ''}` }}
                  </b-link>
                  <small class="text-muted" v-if="item.lider">{{ item.lider.username }}</small>
                   <b-button variant="danger" title="Quitar Lider" @click="quitarLider(item.id)" v-loading="loading" size="sm">
                    <font-awesome-icon icon="fas fa-trash"/>
                    Quitar Lider
                  </b-button>
                </b-media>

                <b-button v-else variant="primary" title="Asignar Lider" @click="asignarLider(item.id)" v-loading="loading" size="sm">
                  Sin lider (¿Asignar?)
                </b-button>

              </template>
        
        
            <template #cell(activo)="{ item }">
              <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)" v-if="['Desarrollador', 'Administrador'].includes(usuario ? usuario.rol.nombre : '')">
                {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
              </b-form-checkbox>

              <span v-else>
                  {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
              </span>

            </template>

            <!-- Column: Rol -->
            <template #cell(rol)="{ item }">
              <div class="text-nowrap">
                <feather-icon :icon="resolveUserRoleIcon(item.rol ? item.rol.nombre : '')" size="18" class="mr-50"
                  :class="`text-${resolveUserRoleVariant(item.rol ? item.rol.nombre : '')}`" />
                <span class="align-text-top text-capitalize">{{ item.rol ? item.rol.nombre : '' }}</span>
              </div>
            </template>


            <template #cell(status)="{item}">
              <span class="text-nowrap">
                {{ getStatusLegendPromotor(item.status) }}
              </span>
            </template>

            <template #cell(destino_id)="{ item }">

              <b-button @click="showDestino(item)" variant="primary" size="sm" >
                {{ item.destino_id ? item.destino ? item.destino.nombre : '' : 'Sin destino, ¿Asociar?' }}
               </b-button>
            
             
            </template>
            
            <!-- Column: Actions -->
            <template #cell(actions)="{item}">
              <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                <template #button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                </template>

                <b-dropdown-item :to="{name:'edit.usuario',params:{id:item.id}}" v-if="$can('update','usuarios')">
                  <font-awesome-icon icon="fas fa-edit"/>
                  Editar
                </b-dropdown-item>
             
              </b-dropdown>
            </template>
           

            </b-table>
          </b-card>

      </template>

    </listado>

    <b-sidebar v-model="showUsersLiders" title="Asignar Lider a Promotor" @shown="cargarUsers">
      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardarAsignacion)">
          <b-container fluid>
            <b-row>
              <b-col cols="12"  >
                <b-form-group>
                  <template #label>
                    Lider: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="lider_id" rules="required" #default="{errors,valid}">
                    
                    <v-select v-model="formulario.lider_id" :state="valid" :options="lideres" :reduce="option => option.id" label="nombre">

                    </v-select>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <b-button-group size="sm">
                  <b-button variant="primary" type="submit" title="Guardar" v-loading="loading">
                    Asignar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>

    <b-sidebar v-model="showFormularioPromotor" title="Agregar Promotor">
      <validation-observer ref="formValidatePromotor" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardarPromotor)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
               

                  <b-form-group label="Username" label-for="username">
                     <validation-provider #default="{ errors, valid }" name="username" rules="required">
                        <b-form-input id="username" v-model="form.username" autofocus
                          :state="valid" trim placeholder="" />

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                       </validation-provider>
                  </b-form-group>

               

               
                  <b-form-group label="Nombre" label-for="nombre">
                     <validation-provider #default="{ errors,valid }" name="nombre" rules="required">
                      <b-form-input id="nombre" v-model="form.nombre" autofocus
                        :state="valid" trim placeholder="" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                       </validation-provider>
                  </b-form-group>


                
                    <b-form-group label="Apellido" label-for="apellido">

                       <validation-provider #default="{ errors,valid }" name="apellido" rules="required">
                        <b-form-input id="apellido" v-model="form.apellido" autofocus
                          :state="valid" trim placeholder="Crespo" />

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                        </validation-provider>
                    </b-form-group>
                 

                   <!-- Email -->
                 
                    <b-form-group label="Email" label-for="email">
                       <validation-provider #default="{ errors,valid }" name="email" rules="required|email">
                          <b-form-input id="email" v-model="form.email"
                            :state="valid" trim />

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                          </validation-provider>
                    </b-form-group>

                    <b-form-group label-for="divisa" description="Divisa en la que va a recibir la comisión este promotor">
                        
                      <template #label>
                          Divisa: <span class="text-danger">*</span>
                        </template>

                        <validation-provider #default="{ errors, valid }" name="divisa_id" rules="required">
                          <v-select v-model="form.divisa_id" :reduce="option => option.id" label="nombre" :options="divisas.filter(val => val.iso != 'Tp')"></v-select>
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
                  <b-button variant="primary" type="submit" title="Guardar Promotor" v-loading="loading">
                    <font-awesome-icon icon="fas fa-save"/>
                    Guardar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>

    <b-sidebar v-model="isShowDestino" title="Destino">
      <validation-observer ref="formValidateUser" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(asociarDestino)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Destino" description="Seleccione un destino">
                  <validation-provider name="destino_id" rules="required" #default="{valid,errors}">
                    <v-select v-model="formUser.destino_id" :options="destinos" label="nombre" :reduce="(option) => option.id"></v-select>

                    <b-form-invalid-feedback :state="valid">
                      {{  errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-button variant="primary" size="sm" v-loading="loading" type="submit" :disabled="loading">
                  <font-awesome-icon icon="fas fa-save"/>
                  {{ $t('Guardar') }}
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>
 
  </section>

</template>


<script>

import store from '@/store'
import {computed,toRefs,ref,onMounted,watch} from 'vue'
import { avatarText } from '@core/utils/filter'

import usePromotoresList from './usePromotoresList.js'

import {resolveUserRoleVariant, resolveUserRoleIcon } from '@core/utils/utils'
import {required,email} from '@validations'

import { getStatusLegendPromotor } from '@core/utils/utils'

import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BPagination,
  BFormCheckbox,
  BSidebar,
  BContainer,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BButtonGroup

} from 'bootstrap-vue';


import { ValidationObserver,ValidationProvider } from 'vee-validate'

import vSelect from 'vue-select'
export default {

  components:{
    Listado:() => import('components/Listado.vue'),
    BCard,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BDropdownItemButton,
    BPagination,
    BFormCheckbox,
    BSidebar,
    BContainer,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    BButtonGroup


  },


  props:{
    'liderId':{
      type:Number|String,
      required:false
    },
    id:Number|String
  },


  setup(props,{emit}){
    
    const {usuario,usuarios} = toRefs(store.state.usuario)
    const { liderId:lider_id } = toRefs(props)
    const isShowDestino  = ref(false)
    const formUser = ref({})
    const lider = ref({
      id:computed(() => lider_id.value)
    })  

    const {destinos} = toRefs(store.state.destino)
    const {divisas} = toRefs(store.state.divisa)

    const actions = usePromotoresList(lider.value.id ? lider : usuario);
    
    const showUsersLiders = ref(false)
    const formValidate =ref(null)
    const formValidatePromotor = ref(null)
    const formValidateUser =ref(null)

    const showFormularioPromotor = ref(false)

    const form = ref({
      username:'',
      nombre:'',
      apellido:null,
      email:'',
      lider_id:null,
      divisa_id:null
    })

    const formulario = ref({
      lider_id:null,
      promotor_id:null
    })

    const cargarForm = () => {
       setTimeout(() => actions.refetchData(), 1000)

       if(!usuarios.value.length){
        store.dispatch('usuario/cargarLideres')
       }

       if(!divisas.value.length){
        store.dispatch('divisa/getDivisas')
       }

    }

    
    onMounted(() => cargarForm())

    watch(lider_id,() => actions.reftchData())

    const cambiarEstado = (user_id) => {

      store.dispatch('usuario/cambiarEstado',user_id).then(({result}) => {

        if(result){
          toast.success('Se ha cambiado con éxito el estado del promotor')
          actions.refetchData()
          emit('change')
        }else{
          toast.info('No se pudo cambiar el Estado del promotor')
          actions.refetchData();
          emit('change')

        }
      }).catch(e => console.log(e))
      
    }

    const asignarLider = (promotor_id)  => {
      formulario.value.promotor_id = promotor_id
      showUsersLiders.value = true;
    }
    const guardarAsignacion = () => {
      store.dispatch('usuario/asignarLiderPromotor',formulario.value).then(({result}) => {

        if(result){

          toast.success('Se ha asignado con éxito al lider')
          actions.refetchData();
          emit('change')


          formulario.value = {
              lider_id: null,
              promotor_id: null
          }

          showUsersLiders.value = false;


        }else{
          toast.info('No se pudo asignar al lider')

        }
      }).catch(e => {
        
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }

      })
    } 

    const agregarPromotor = () => {
      showFormularioPromotor.value = true;

    }


    const guardarPromotor = () => {

      if(['Lider'].includes(usuario.value.rol ? usuario.value.rol.nombre : '')){
        form.value.lider_id  = usuario.value.id
      }

      store.dispatch('usuario/guardarPromotor',form.value).then(({result}) => {

        if(result){
          toast.success('Se ha agregado con éxito al promotor')
          actions.refetchData();
          emit('change')

          form.value = {
            username: '',
            nombre: '',
            apellido: null,
            email: '',
            lider_id: null
          }
        showFormularioPromotor.value = false;
        }else{
           toast.info('No se pudo guardar, al promotor, inténtelo de nuevo mas tarde.')

        }
      }).catch(e => {

        if(e.response.status === 422){
          formValidatePromotor.value.setErrors(e.response.data.errors)
        }

        console.log(e)

      })
    }

    const cargarUsers = () => {
      store.dispatch('usuario/cargarLideres')
    }

    const showDestino = (user) => {

      if(!destinos.value.length){
        store.dispatch('destino/getDestinos')
      }

      formUser.value = user
      isShowDestino.value = true

    }

    const asociarDestino = () => {

      store.dispatch('usuario/guardar',formUser.value).then(({result}) => {

        if(result){
          toast.success('Se ha asociado con éxito destino al promotor')
          isShowDestino.value = false
          formUser.value = {}
          actions.refetchData()

        }else{
          toast.info('No se pudo asociar el destino, inténte de nuevo')
        }
      }).catch(e => {

        if(e.response.status === 422){
          formValidateUser.value.setErrors(e.response.data.errors)
        }else{
          console.log(e)
        }
      })
    }


    return {
      loading:computed(() => store.state.loading),
      actions,
      destinos,
      formValidateUser,
      formUser,
      refTable:actions.refTable,
      avatarText,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      divisas,
      cambiarEstado,
      asignarLider,
      showUsersLiders,
      showDestino,
      isShowDestino,
      formulario,
      formValidate,
      guardarAsignacion,
      lideres:computed(() => usuarios.value.filter((val) => ['Lider'].includes(val.rol ? val.rol.nombre : ''))),
      required,
      email,
      quitarLider:actions.quitarLider,
      agregarPromotor,
      form,
      showFormularioPromotor,
      guardarPromotor,
      formValidatePromotor,
      cargarUsers,
      getStatusLegendPromotor,
      asociarDestino,
      usuario
    }
  }

}
</script>