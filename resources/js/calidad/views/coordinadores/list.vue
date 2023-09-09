
<template>
  <section>
    <listado hideFooter :actions="actions" isTable>

      <template #btn-action>

        <b-button variant="primary" @click="agregarUsuario"
          v-if="$can('write', 'coordinadores') && ['Desarrollador','Administrador'].includes(usuario.rol ? usuario.rol.nombre : '')"
          class="d-flex flex-column justify-content-center">
          Agregar Coordinador
        </b-button>

      </template>

      <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">
        <b-card class="mt-1">
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
            empty-text="No se encontró ningún Coordinador" :sort-desc="isSortDirDesc" sticky-header="700px"
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

           

            <template #cell(activo)="{ item }">
              <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)">
                {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
              </b-form-checkbox>
            </template>

            <template #cell(id)="{ item, toggleDetails }">
              <b-button @click="toggleDetails" variant="primary" size="sm">
                # {{ item.id }}
                <!-- <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" /> -->
              </b-button>
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
                {{ getStatusLegendCoordinador(item.status) }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="{ item }">
              <b-button-group size="sm">
                  <b-button :to="{ name: 'edit.usuario', params: { id: item.id } }"
                      v-if="$can('update', 'usuarios')" size="sm" title="Editar" variant="primary">
                      <feather-icon icon="EditIcon" />
                    </b-button>

                    <b-button @click="eliminarUsuario(item)" v-if="$can('delete', 'usuarios')" variant="danger">
                      <feather-icon icon="TrashIcon" />
                    </b-button>

                    <b-button :to="{ name: 'movimientos.user', params: { id: item.id } }" variant="success" v-if="['Desarrollador', 'Administrador'].includes(usuario.rol.nombre)">
                      <font-awesome-icon icon="fas fa-money-check" />
                    </b-button>

                    <b-button :to="{ name: 'promotores.list', params: { id: item.id } }" v-if="$can('read', 'promotores')" title="Promotores">
                      <font-awesome-icon icon="fas fa-user-tie" />
                    </b-button>
              </b-button-group>
              
            </template>


          </b-table>
        </b-card>

      </template>

    </listado>

    <b-sidebar v-model="showFormularioAdd" :title="`Agregar Coordinador`" backdrop lazy
      @hidden="clearForm">
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
                  <b-button variant="primary" type="submit" title="Guardar Coordinador" v-loading="loading">
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

import useCoordinadoresList from './useCoordinadoresList.js'

import { resolveUserRoleVariant, resolveUserRoleIcon } from '@core/utils/utils'
import { required, email } from '@validations'

import { getStatusLegendCoordinador } from '@core/utils/utils'

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


  },

  setup(props, { emit }) {

    const { usuario } = toRefs(store.state.usuario)
    const lideres = ref([])
    const coordinadores = ref([])

    const actions = useCoordinadoresList();
    const formValidate = ref(null)
    const formValidateLider = ref(null)

    const showFormularioAdd = ref(false)

    const form = ref({
      username: '',
      nombre: '',
      apellido: null,
      email: '',
      lider_id: null,
      coordinador_id: null,
      tipo_usuario: 1, // 1 => Lider , 2 => Promotor
    })



    const cargarForm = () => {
      setTimeout(() => actions.refetchData(), 1500)
    }


    onMounted(() => cargarForm())

    const cambiarEstado = (user_id) => {

      store.dispatch('usuario/cambiarEstado', user_id).then(({ result }) => {

        if (result) {
          toast.success('Se ha cambiado con éxito el estado del coordinador')
          actions.refetchData()
          emit('change')
        } else {
          toast.info('No se pudo cambiar el Estado del coordinador')
          actions.refetchData();
          emit('change')
        }

      }).catch(e => console.log(e))

    }


    const agregarUsuario = (l) => {
      showFormularioAdd.value = true;
    }


    const guardarUsuario = () => {


      store.dispatch('usuario/guardarCoordinador', form.value).then(({ result }) => {

        if (result) {
          toast.success(`Se ha agregado con éxito al coordinador`)
          actions.refetchData();
          emit('change')

          clearForm();

          showFormularioAdd.value = false;
        } else {
          toast.info(`No se pudo guardar, al coordinador, inténtelo de nuevo mas tarde.`)

        }
      }).catch(e => {

        if (e.response.status === 422) {
          formValidateLider.value.setErrors(e.response.data.errors)
        }

        console.log(e)

      })
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
      formValidate,
      lideres,
      coordinadores,
      required,
      email,
      agregarUsuario,
      form,
      showFormularioAdd,
      guardarUsuario,
      formValidateLider,
      getStatusLegendCoordinador,
      clearForm,
      usuario

    }

  }

}
</script>