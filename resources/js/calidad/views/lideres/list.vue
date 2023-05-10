
<template>
  <section>
    <listado hideFooter :actions="actions" isTable>

      <template #btn-action>

        <b-button variant="primary" @click="agregarUsuario('lider')" v-if="$can('write', 'Gestion de coordinador')"
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

            <template #cell(coordinador_id)="{ item }">
              <b-media vertical-align="center" v-if="item.coordinador">
                <template #aside>
                  <b-avatar size="32" :src="item.avatar"
                    :text="avatarText(`${item.coordinador ? item.coordinador.nombre : ''} ${item.coordinador ? item.coordinador.apellido : ''}`)"
                    :variant="`light-${resolveUserRoleVariant(item.coordinador ? item.coordinador.rol.nombre : '')}`"
                    :to="{ name: 'mostrar.usuario', params: { id: item.coordinador ? item.coordinador.id : null } }" disabled />
                </template>
                <b-link :to="{ name: 'mostrar.usuario', params: { id: item.coordinador ? item.coordinador.id : null } }" disabled
                  class="font-weight-bold d-block text-nowrap">
                  {{ `${item.coordinador ? item.coordinador.nombre : ''} ${item.coordinador ? item.coordinador.apellido : ''}` }}
                </b-link>
                <small class="text-muted" v-if="item.coordinador">{{ item.coordinador.username }}</small>
                <b-button variant="danger" title="Quitar Coordinador" @click="quitarCoordinador(item.id)" v-loading="loading"
                  size="sm">
                  <font-awesome-icon icon="fas fa-trash" />
                  Quitar Coordinador
                </b-button>
              </b-media>

             <b-button v-else variant="primary" title="Asignar Coordinador" @click="asignarCoordinador(item.id)" v-loading="loading"
                size="sm">
                Sin coordinador (¿Asignar?)
              </b-button> 

            </template>


            <template #cell(activo)="{ item }">
              <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)">
                {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
              </b-form-checkbox>
            </template>

            <template #cell(id)="{ item, detailsShowing, toggleDetails }">
                  <b-button @click="toggleDetails" variant="primary" size="sm" >
                      # {{ item.id }}
                      <font-awesome-icon :icon="['fas' , detailsShowing ? 'fa-angle-up' : 'fa-angle-down']"/>
                  </b-button>
            </template>

             <template #row-details="{ item }">

               <el-divider content-position="left">Promotores</el-divider>
                <b-container fluid>
                  <b-row>
                    <b-col>
                        <promotores :liderId="item.id" />
                    </b-col>
                  </b-row>
                </b-container>

            </template>

            <!-- Column: Rol -->
            <template #cell(rol)="{ item }">
              <div class="text-nowrap">
                <feather-icon :icon="resolveUserRoleIcon(item.rol ? item.rol.nombre : '')" size="18" class="mr-50"
                  :class="`text-${resolveUserRoleVariant(item.rol ? item.rol.nombre : '')}`" />
                <span class="align-text-top text-capitalize">{{ item.rol ? item.rol.nombre : '' }}</span>
              </div>
            </template>


            <template #cell(status)="{ item }">
              <span class="text-nowrap">
                {{ getStatusLegendLider(item.status) }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="{item}">
              <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
                <template #button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                </template>

                <b-dropdown-item @click="agregarUsuario('promotor',item.id)" title="Asignar Promotor" v-if="$can('write','Gestion de coordinador')">
                  <font-awesome-icon icon="fas fa-user-plus"/>
                  Asignar promotor
                </b-dropdown-item>

              </b-dropdown>
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
import { computed, toRefs, ref, onMounted, watch } from 'vue'
import { avatarText } from '@core/utils/filter'

import useLideresList from './useLideresList.js'

import { resolveUserRoleVariant, resolveUserRoleIcon } from '@core/utils/utils'
import { required, email } from '@validations'

import { getStatusLegendLider} from '@core/utils/utils'

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
    Promotores:() => import('views/promotores/list.vue')


  },

  setup(props, { emit }) {

    const { usuario } = toRefs(store.state.usuario)
    const lideres = ref([])
    const coordinadores = ref([])

    const actions = useLideresList(usuario);
    const showUsersCoordinador = ref(false)
    const formValidate = ref(null)
    const formValidateLider = ref(null)

    const showFormularioAdd = ref(false)
    const tipo  =ref(1) // 1 lider  2 => promotor

    const form = ref({
      username: '',
      nombre: '',
      apellido: null,
      email: '',
      lider_id: null,
      coordinador_id:null,
      tipo_usuario:1, // 1 => Lider , 2 => Promotor
    })

    const formulario = ref({
      lider_id: null,
      promotor_id: null,
      coordinador_id:null
    })

    const cargarForm = () => {

      setTimeout(() => actions.refetchData(), 1500)
      store.dispatch('usuario/cargarLideres').then((data)  => lideres.value = data)
      store.dispatch('usuario/cargarCoordinadores').then((data) => coordinadores.value = data)
      

    }


    onMounted(() => cargarForm())

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

    const agregarUsuario = (tip = 'lider',lider_id = nul) => {
    
      if(tip == 'promotor'){
        tipo.value = 2

        if(lider_id){
           form.value.lider_id = lider_id
           form.value.tipo_usuario = 2
           showFormularioAdd.value = true;
        }
       
      }else{
        form.value.coordinador_id = usuario.value.id
        form.value.tipo_usuario = 1
        tipo.value = 1
        showFormularioAdd.value = true;
      }

    }


    const guardarUsuario = () => {

      if (['Coordinador'].includes(usuario.value.rol ? usuario.value.rol.nombre : '') && form.value.tipo_usuario == 1){
        form.value.coordinador_id = usuario.value.id
      }
      let url_dispatch = 'usuario/guardarLider';

      if(form.value.tipo_usuario == 2){
        url_dispatch = 'usuario/guardarPromotor'
      }

      store.dispatch(url_dispatch, form.value).then(({ result }) => {

        if (result) {
          toast.success(`Se ha agregado con éxito al ${tipo.value == 1 ? 'Lider' : 'Promotor'}`)
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
      form.value = {
        username: '',
        nombre: '',
        apellido: null,
        email: '',
        lider_id: null,
        coordinador_id: null,
        tipo_usuario: 1, // 1 => Lider , 2 => Promotor

      }
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
      clearForm
    }

  }

}
</script>