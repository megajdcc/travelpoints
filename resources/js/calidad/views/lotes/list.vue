<template>

  <section>
  <listado :actions="actions" isTable hideFooter>
    <template #btn-action>

      <b-button variant="primary" :to="{ name: 'lotes.create' }" v-if="$can('write', 'lotes')"
        class="d-flex flex-column justify-content-center">
        Agregar Lote
      </b-button>

    </template>

    <template #contenido="{ fetchData, perPage,sortBy, isSortDirDesc, tableColumns, eliminar }">
      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningún lote" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">


          <template #cell(id)="{ item, detailsShowing, toggleDetails }">
            <b-button @click="toggleDetails" variant="primary" size="sm">
              # {{ item.id }}
              <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" />
            </b-button>
          </template>

          <template #row-details="{ item }">
            <tarjetas :lote="item.id" />
          </template>


          <template #cell(fecha_llegada)="{ item }">
            <span class="text-nowrap">
              {{ item.fecha_llegada | fecha('LL') }}
            </span>
          </template>

          <template #cell(monto)="{ item }">
            <span class="text-nowrap">
              {{ item.monto | currency(item.divisa.iso) }}
            </span>
          </template>

            <template #cell(tps)="{ item }">
              <span class="text-nowrap">
                TPS{{ item.tps | currency() }}
              </span>
            </template>

            <template #cell(numero_inicial)="{ item }">
                <span class="text-nowrap">
                  {{ `${item.codigo_lada}${item.numero_inicial}`}}
                </span>
            </template>
            <template #cell(numero_final)="{ item }">
              <span class="text-nowrap">
                {{ `${item.codigo_lada}${item.numero_final}` }}
              </span>
            </template>

            <template #cell(usuario_id)="{item}">
               <b-media vertical-align="center" v-if="item.usuario_id ? true : false">
                  <template #aside>
                    <b-avatar size="32" :src="item.usuario.avatar" :text="avatarText(`${item.usuario.nombre} ${item.usuario.apellido}`)"
                      :variant="`light-primary`" disabled />
                  </template>
                  <b-link disabled
                    class="font-weight-bold d-block text-nowrap">
                    {{ `${item.usuario.nombre} ${item.usuario.apellido}` }}
                  </b-link>
                  <small class="text-muted" v-if="item.usuario.username">{{ item.usuario.username }}</small>
                </b-media>

                <b-button variant="primary" v-else class="text-danger" size="sm" @click="asignarLote(item.id)">
                  Lote sin asignar ¿ asignar ?
                </b-button>
            </template>

          <!-- Column: Actions -->
          <template #cell(actions)="{ item }">
            <b-button-group size="sm">

              <b-button variant="primary" :to="{ name: 'lotes.edit', params: { id: item.id } }" v-if="$can('update', 'lotes')">
                <font-awesome-icon icon="fas fa-pen" />
              </b-button>

              <b-button variant="danger" @click="eliminar(item.id)" v-if="$can('delete', 'lotes')">
                <font-awesome-icon icon="fas fa-trash" />
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-card>

    </template>
  </listado>
    <b-modal v-model="showAsignacion" centered size="lg" hide-footer no-close-on-backdrop>

      <template #modal-title>
        <h3 > Asignar Lote</h3>
      </template>

      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(asociar)">
          <b-form-group label="Usuario" description="Asocie el lote con un promotor,lider o coordinador ">
            <validation-provider rules="required" name="usuario_id" #default="{valid,errors}">
               <select-usuario v-model="formulario.usuario_id" :filterRol="['Promotor', 'Lider', 'Coordinador']" />

                <b-form-invalid-feedback :state="valid">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
            </validation-provider>
           
          </b-form-group>

          <b-button-group size="sm">
            <b-button variant="primary" title="asociar" type="submit">
              Asociar
            </b-button>
          </b-button-group>
           
        </b-form>
       

      </validation-observer>
      

    </b-modal>
  </section>
</template>

<script>

import store from '@/store';
import { onMounted, ref, computed,toRefs } from 'vue';
import useLoteList from './useLoteList.js'
import { avatarText } from '@core/utils/filter'

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import {required} from '@validations';

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
  BModal,
} from 'bootstrap-vue';
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
    BButtonGroup, 
    BModal,
    Tarjetas:() => import('views/tarjetas/list.vue'),
    SelectUsuario:() => import('components/SelectUsuario.vue'),
    ValidationObserver,
    ValidationProvider

  },

  setup(props) {

    const actions = useLoteList();
    const showAsignacion = ref(false)
    const {lote:formulario} = toRefs(store.state.lote)
    const formValidate =ref(null)
    onMounted(() => {
      setTimeout(() => {
        actions.refetchData();
      }, 1000);
    })  

    const asignarLote = (lote_id) => {

      store.dispatch('lote/fetch',lote_id).then((lot) => {
        showAsignacion.value = true
      })

    }

    const asociar = () => {
      
      store.dispatch('lote/asociarLote',formulario.value).then(({lote,result}) => {
        if(result){
          toast.success('Se ha asociado con éxito el lote')
          store.commit('lote/clear')
          showAsignacion.value = false
          actions.refetchData();
        }else{
          toast.info('No se pudo asociar con éxito el lote')

        }

      }).catch(e => {
        
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }
        

      })

    }

    return {
      actions: actions,
      refTable: actions.refTable,
      avatarText,
      asignarLote,
      showAsignacion,
      loading: computed(() => store.state.loading),
      formulario,
      required,
      asociar,
      formValidate
    }

  }
}
</script>