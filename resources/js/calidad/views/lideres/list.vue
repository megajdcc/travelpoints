
<template>
  <section>
    <listado hideFooter :actions="actions" isTable>

       <template #header-table="{ total }">
          <b-container fluid >
            <b-row>
               <b-col cols="12" md="4">
                  <statistic-card-horizontal icon="fa-people-group" statisticTitle="Lidere s a cargo"
                        color="primary" colorIcon="white" colorText="text-white" :statistic="total">
                        <template #btn-card>
                          <b-button variant="danger" size="sm" @click="agregarUsuario('lider')" class="mt-1 d-block" v-if="$can('write', 'Gestion de coordinador') && ['Coordinador', 'Desarrollador'].includes(usuario.rol ? usuario.rol.nombre : '')" >
                           Agregar Lider
                          </b-button>
                        </template>
                  </statistic-card-horizontal>
               </b-col>
            </b-row>
          </b-container>
        </template>
      <template #btn-action>

        <b-button variant="primary" @click="agregarUsuario('lider')" v-if="$can('write', 'Gestion de coordinador') && ['Coordinador','Desarrollador'].includes(usuario.rol ? usuario.rol.nombre : '')"
          class="d-flex flex-column justify-content-center">
          Agregar Lider
        </b-button>

      </template>

      <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">
        <b-card class="mt-1">
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
            empty-text="No se encontró ningún Lider" :sort-desc="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small
            stacked="md">

            <template #cell(ranking)="{ index }">
              {{ index + 1 }}
            </template>


            <!-- Column: User -->
            <template #cell(username)="{ item }">
              <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
                <template #aside>
                  <b-avatar size="32" :src="item.avatar" :text="avatarText(`${item.nombre} ${item.apellido}`)"
                    :variant="`light-${resolveUserRoleVariant(item.rol.nombre)}`"
                    @click="mostrarAboutUsuario(item)"  />
                </template>
                <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
                  class="font-weight-bold d-block text-nowrap p-0">
                  {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre' }}
                </b-button>
                <small class="text-muted" v-if="item.username">{{ item.username }}</small>
              </b-media>
            </template>


            <template #cell(activo)="{ item }">
              <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)" v-if="['Desarrollador', 'Administrador','Coordinador'].includes(usuario.rol.nombre)"  >
                {{ item.activo ? 'Activo' : 'Desactivado' }}
              </b-form-checkbox>
              <span v-else>
                  {{ item.activo ? 'Activo' : 'Desactivado' }}
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

             <template #cell(coordinador_id)="{ item }">
              <b-media vertical-align="center" v-if="item.coordinador" @click="mostrarAboutUsuario(item.coordinador)">
                <template #aside>
                  <b-avatar size="32" :src="item.avatar"
                    :text="avatarText(`${item.coordinador ? item.coordinador.nombre : ''} ${item.coordinador ? item.coordinador.apellido : ''}`)"
                    variant="light-primary"
                    class="cursor-pointer"
                     />
                </template>
               <b-button @click="mostrarAboutUsuario(item.coordinador)" variant="outline-text" size="sm"
                    class="font-weight-bold d-block text-nowrap p-0">
                    {{ item.coordinador ? `${item.coordinador.nombre} ${item.coordinador.apellido}` : 'Sin definir nombre' }}
                  </b-button>
                <small class="text-muted" v-if="item.coordinador">{{ item.coordinador.username }}</small>
               
              </b-media>

             <b-button v-else variant="primary" title="Asignar Coordinador" @click="asignarCoordinador(item.id)" v-loading="loading"
                size="sm">
                Sin coordinador (¿Asignar?)
              </b-button> 

            </template>



            <template #cell(status)="{ item }">
              <span class="text-nowrap">
                {{ getStatusLegendLider(item.status) }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="{item}">

              <b-button-group size="sm">
                  
                  <b-button variant="dark" title="Ver Ficha" :to="{name:'lider.ficha',params:{id:item.id}}" v-loading="loading"
                      size="sm" class="text-nowrap" v-if="$can('read','lideres')">
                      <font-awesome-icon icon="fas fa-id-card-clip" />
                      Ver Ficha
                  </b-button>

                  <b-button variant="danger" title="Quitar Coordinador" @click="quitarCoordinador(item.id)" v-loading="loading"
                    size="sm" class="text-nowrap" v-if="item.coordinador_id">
                    <font-awesome-icon icon="fas fa-trash" />
                    Quitar Coordinador
                  </b-button>

                  
                  <b-button variant="warning" :to="{name:'promotores.list',params:{liderId:item.id}}" title="Ver sus Promotores" v-if="$can('write', 'promotores')" class="text-nowrap">
                    <font-awesome-icon icon="fas fa-list"/>
                    Promotores
                  </b-button>

                  <b-button variant="outline-primary" @click="editarLider(item)" title="Editar Lider">
                    <font-awesome-icon icon="fas fa-edit"/>
                  </b-button>

              </b-button-group>
        
            </template>


          </b-table>
        </b-card>

      </template>

    </listado>

    <b-sidebar v-model="showUsersCoordinador" title="Asignar Coordinador a Lider" @shown="cargarUsers" lazy backdrop >
      <validation-observer ref="formValidate" #default="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(guardarAsignacion)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <b-form-group description="Seleccione un coordinador">
                  <template #label>
                    Coordinador: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="coordinador_id" rules="required" #default="{ errors, valid }">

                    <v-select v-model="formulario.coordinador_id" :state="valid" :options="coordinadores"
                      :reduce="option => option.id" label="nombre">

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
                <b-button-group size="sm">
                  <b-button variant="primary" type="submit" title="Guardar" v-loading="loading" :disabled="loading">
                    Asignar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>

    <b-sidebar v-model="showFormularioAdd" :title="`Agregar ${tipo == 1 ? 'Lider' : 'Promotor'}`" backdrop lazy  @hidden="clearForm">
      <validation-observer ref="formValidateLider" #default="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(guardarUsuario)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">


                <b-form-group label="Username" label-for="username">
                  <validation-provider #default="{ errors, valid }" name="username" rules="required">
                    <b-form-input id="username" v-model="form.username" autofocus :state="valid" trim placeholder="" />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>




                <b-form-group label="Nombre" label-for="nombre">
                  <validation-provider #default="{ errors, valid }" name="nombre" rules="required">
                    <b-form-input id="nombre" v-model="form.nombre" autofocus :state="valid" trim placeholder="" />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>



                <b-form-group label="Apellido" label-for="apellido">

                  <validation-provider #default="{ errors, valid }" name="apellido" rules="required">
                    <b-form-input id="apellido" v-model="form.apellido" autofocus :state="valid" trim
                      placeholder="Crespo" />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>


                <!-- Email -->

                <b-form-group label="Email" label-for="email">
                  <validation-provider #default="{ errors, valid }" name="email" rules="required|email">
                    <b-form-input id="email" v-model="form.email" :state="valid" trim />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>

                <!-- Divisa -->
                 <b-form-group label-for="divisa" description="Divisa en la que va a recibir la comisión este lider">
                        
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
                <!-- Lider Business -->
                <b-form-group description="Los lideres business, pueden gestionar cuanto cobrarán sus promotores asignados" v-if="form.tipo_usuario == 1" >
                  <template #label>
                    ¿ Lider Business ? 
                  </template>

                  <validation-provider name="lider_business" #default="{errors,valid}" rules="required">
                    <b-form-radio-group v-model="form.lider_business" :options="[{text:'Sí',value:true},{text:'No',value:false}]" >
                    </b-form-radio-group>
                    
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
                    <font-awesome-icon icon="fas fa-save" />
                    Guardar
                  </b-button>
                </b-button-group>
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
import { computed, toRefs, ref, onMounted, watch,onActivated ,inject} from 'vue'
import { avatarText } from '@core/utils/filter'

import useLideresList from './useLideresList.js'

import { resolveUserRoleVariant, resolveUserRoleIcon } from '@core/utils/utils'
import { required, email } from '@validations'

import { getStatusLegendLider} from '@core/utils/utils'

import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

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
  BButtonGroup,
  BFormRadioGroup

} from 'bootstrap-vue';

import { ValidationObserver, ValidationProvider } from 'vee-validate'

import vSelect from 'vue-select'

export default {

  components: {
    Listado: () => import('components/Listado.vue'),
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
    BButtonGroup,
    BFormRadioGroup,
    Promotores:() => import('views/promotores/list.vue'),
    StatisticCardHorizontal

  },

  setup(props, { emit }) {

    const { usuario } = toRefs(store.state.usuario)
    const { divisas } = toRefs(store.state.divisa)

    const lideres = ref([])
    const coordinadores = ref([])

    const actions = useLideresList(usuario);
    const showUsersCoordinador = ref(false)
    const formValidate = ref(null)
    const formValidateLider = ref(null)
    const userAbout = inject('userAbout')
    const showAboutProfile = inject('showAboutProfile')


    const showFormularioAdd = ref(false)
    const tipo  =ref(1) // 1 lider  2 => promotor

    const form = ref({
      id:null,
      username: '',
      nombre: '',
      apellido: null,
      email: '',
      lider_id: null,
      coordinador_id:null,
      tipo_usuario:1, // 1 => Lider , 2 => Promotor
      divisa_id: null,
      lider_business:false,
    })

    const formulario = ref({
      lider_id: null,
      promotor_id: null,
      coordinador_id:null
    })

    const cargarForm = () => {

      store.dispatch('usuario/cargarLideres').then((data)  => lideres.value = data)
      store.dispatch('usuario/cargarCoordinadores').then((data) => coordinadores.value = data)
      store.dispatch('divisa/getDivisas')

    }

    cargarForm()

    const cambiarEstado = (user_id) => {

      store.dispatch('usuario/cambiarEstado', user_id).then(({ result }) => {

        if(result){
          toast.success('Se ha cambiado con éxito el estado del lider')
          actions.refetchData()
          emit('change')
        } else {
          toast.info('No se pudo cambiar el Estado del lider')
          actions.refetchData();
          emit('change')
        }

      }).catch(e => console.log(e))

    }

    const asignarCoordinador = (lider_id) => {
      formulario.value.lider_id = lider_id
      showUsersCoordinador.value = true;
    }

    const guardarAsignacion = () => {

      store.dispatch('usuario/asignarCoordinadorLider', formulario.value).then(({ result }) => {

        if (result) {

          toast.success('Se ha asignado con éxito al coordinador')
          actions.refetchData();
          emit('change')


          formulario.value = {
            lider_id: null,
            coordinador_id: null
          }

          showUsersCoordinador.value = false;


        } else {
          toast.info('No se pudo asignar al coordinador')

        }
      }).catch(e => {

        if (e.response.status === 422) {
          formValidate.value.setErrors(e.response.data.errors)
        }

      })
    }

    const agregarUsuario = (tip = 'lider',lider_id = null) => {
    
      if(tip == 'promotor'){
        tipo.value = 2

        if(lider_id){
           form.value.lider_id = lider_id
           form.value.tipo_usuario = 2
           showFormularioAdd.value = true;
        }
       
      }else{
        form.value.tipo_usuario = 1
        tipo.value = 1
        showFormularioAdd.value = true;
      }

    }


    const guardarUsuario = () => {

      let url_dispatch = 'usuario/guardarLider';


      if (store.getters['usuario/isRol']('Coordinador')) {
        form.value.coordinador_id = usuario.value.id
      }

      if(form.value.tipo_usuario == 2){
        url_dispatch = 'usuario/guardarPromotor'
      }

      store.dispatch(url_dispatch, form.value).then(({ result }) => {

        if (result) {
          toast.success(`Se ha guardado con éxito al ${tipo.value == 1 ? 'Lider' : 'Promotor'}`)
          actions.refetchData();
          emit('change')

          clearForm();

          showFormularioAdd.value = false;
        } else {
          toast.info(`No se pudo guardar, al ${tipo.value == 1 ? 'Lider' : 'Promotor'}, inténtelo de nuevo mas tarde.`)
        }
      }).catch(e => {

        if (e.response.status === 422) {
          formValidateLider.value.setErrors(e.response.data.errors)
        }

        console.log(e)

      })
    }

    const cargarUsers = () => {

      if(!lideres.value.length){
        store.dispatch('usuario/cargarLideres').then((data) => lideres.value = data)
      }

      if(!coordinadores.value.length){
        store.dispatch('usuario/cargarCoordinadores').then((data) => coordinadores.value = data)
      }

    }

    const clearForm = () => {
      Object.keys(form.value).forEach((val) => {

        if (val == 'tipo_usuario') {
         form.value[val] = 1
        }

        if (val == 'lider_business') {
          form.value[val] = false
        }

      })

    } 

    const editarLider = (lid) => {

      Object.keys(form.value).forEach(val => {
        if(val == 'tipo_usuario'){
          form.value[val] = 1
        }else if(val == 'divisa_id'){
          form.value[val] = lid.cuenta.divisa_id
        }else{
            form.value[val] = lid[val]
        }
      })

      showFormularioAdd.value = true


    } 

    onMounted(() => actions.refetchData())

    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }


    return {

      loading: computed(() => store.state.loading),
      actions,
      refTable: actions.refTable,
      avatarText,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      cambiarEstado,
      asignarCoordinador,
      showUsersCoordinador,
      formulario,
      formValidate,
      guardarAsignacion,
      lideres,
      coordinadores,
      required,
      email,
      quitarCoordinador: actions.quitarCoordinador,
      agregarUsuario,
      form,
      showFormularioAdd,
      guardarUsuario,
      formValidateLider,
      cargarUsers,
      getStatusLegendLider,
      tipo,
      clearForm,
      usuario:computed(() => store.state.usuario.usuario),
      divisas,
      editarLider,
      mostrarAboutUsuario
    }

  }

}
</script>