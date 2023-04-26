<template>

  <section>
  <listado :actions="actions" isTable hideFooter>

    <template #btn-action>
      <b-button type="variant" :to="{ name: 'retiro.create' }" v-if="$can('write', 'retiros')"
        class="d-flex flex-column justify-content-center">
        Generar Solicitud
      </b-button>
    </template>

    <template #contenido="{ eliminar, fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">

      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningún Retiro" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">

          <template #cell(id)="{item,detailsShowing, toggleDetails }">
            <b-button variant="primary" @click="toggleDetails" size="sm" class="text-nowrap">
              #-{{ item.id }}
              <font-awesome-icon :icon="['fas' , detailsShowing ? 'angle-up' : 'angle-down']" class="ml-1" />
            </b-button>
          </template>

          <template #row-details="{item}">
            <el-divider content-position="left">Nota del Retiro</el-divider>
            <p class="text-justify">
              {{ item.nota }}
            </p>
          </template>



          <template #cell(monto)="{ item }">
            <span class="text-nowrap">
              {{ item.monto | currency({
                currency:item.usuario.cuenta.divisa.iso
              }) }}
            </span>

          </template>

          <template #cell(fecha)="{ item }">
            <span class="text-nowrap">
              {{ `${item.created_at}` | fecha('YYYY-MM-DD hh:mm A') }}
            </span>

          </template>

          <template #cell(usuario_id)="{ item }">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar size="32" :src="item.usuario.avatar"
                  :text="avatarText(`${item.usuario.nombre} ${item.usuario.apellido}`)" :variant="`light-primary`"
                  @click="verDatosCuenta(item.id)" />
              </template>
              <b-link @click="verDatosCuenta(item.id)"
                class="font-weight-bold d-block text-nowrap">
                {{ `${item.usuario.nombre} ${item.usuario.apellido}` }}
              </b-link>
              <small class="text-muted" v-if="item.usuario.username">{{ item.usuario.username }}</small>
            </b-media>
          </template>

          <template #cell(status)="{ item }">
            <b-button size="sm" variant="primary" @click="addStatus(item.id)" title="Agregar Status" v-if="[1,2].includes(item.status)" >
                 <span class="text-nowrap">{{ getStatus(item.status) }}</span>
            </b-button>
               <span class="text-nowrap" v-else>{{ getStatus(item.status) }}</span>
          </template>


          <template #cell(actions)="{ item }">

            <b-button-group size="sm">

              <b-button :to="{ name: 'retiro.edit', params: { id: item.id } }" variant="primary"
                v-if="$can('update', 'retiros') && item.status == 1">
                Editar
              </b-button>

              <b-button @click="eliminar(item.id)" variant="danger" 
              v-if="$can('delete','retiros') && item.status == 1">
                Eliminar
              </b-button>

               <b-button download variant="info" :href="`/storage/comprobantes/retiros/${item.comprobante}`"
                v-if="item.comprobante" target="_blank" title="Descargar comprobante">
                <font-awesome-icon icon="fas fa-download" />
                  Descargar 
              </b-button>

            </b-button-group>
          </template>

        </b-table>
      </b-card>


    </template>
    
  </listado>

  <b-sidebar v-model="showDialogStatus" title="Cambiar el Status de la solicitud"  sidebar-class="status-sidebar">
        <validation-observer ref="formValidate" #default="{ handleSubmit}">
          <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>

              <b-row>
                <b-col cols="12">
                  <b-form-group label="Estado de la solicitud" description="Cambie el estado de solicitud de retiro">
                    <validation-provider name="status" rules="required" #default="{errors,valid}">
                      <b-form-radio-group v-model="formulario.status" :options="statuses" :state="valid" buttons>
                      </b-form-radio-group>
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>


                  <b-form-group labe="Comprobante" description="Si ya ha pagado está solicitud, cargue un comprobante de pago">
                    <validation-provider name="comprobante" #default="{ valid, errors }">
                      <b-form-file v-model="formulario.comprobante" :state="valid" browse-text="Cargar comprobante" />

                      <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider> 
                  </b-form-group>

                    <b-form-group label="Nota" description="Puede cambiar o agregar algo a la Nota...">
                    <validation-provider name="nota" #default="{ valid, errors }">
                      <b-form-textarea v-model="formulario.nota" :rows="3" :state="valid"></b-form-textarea>

                      <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                  </b-form-group>

                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-button variant="primary" size="sm" type="submit" v-loading="loading" :disabled="loading">
                    <font-awesome-icon icon="fas fa-paper-plane"/>
                    Guardar Status
                  </b-button>
                </b-col>
              </b-row>

            </b-container>
          </b-form>
        </validation-observer>
  </b-sidebar>
    <b-modal v-model="showDatosCuenta" title="Datos para el pago"  size="lg" hide-footer>
      <b-container fluid v-if="formulario.usuario">
        <b-row>
          <b-col>
            <table class="table table-sm table-hover" v-if="formulario.usuario.datos_pago">
              <tbody>
                <tr v-for="(dato,i)  in Object.keys(formulario.usuario.datos_pago)" :key="i" >
                  <template v-if="!['id', 'created_at', 'updated_at','divisa_id','pais_id','ciudad_id','usuario_id','ciudad','pais','usuario','divisa','FICHERO_ACREDITATIVO_CUENTA'.toLowerCase()].includes(dato)">
                     <td >
                       {{ dato.toUpperCase() }}:
                      </td>
                       <td v-if="dato == 'metodo_pago'">
                          
                        {{ getMetodoPago(formulario.usuario.datos_pago[dato]) }}
                      </td>

                      <td v-else>
                        {{ formulario.usuario.datos_pago[dato] }}
                      </td>
                  </template>
                </tr>
                <tr>
                  <td>
                    Pais:
                  </td>
                  <td>
                    {{ formulario.usuario.datos_pago.pais ? formulario.usuario.datos_pago.pais.pais : 'Sin definir'  }}
                  </td>
                  </tr>
                  <tr>
                   <td>
                      Ciudad:
                    </td>
                    <td>
                      {{ formulario.usuario.datos_pago.ciudad ? formulario.usuario.datos_pago.ciudad.ciudad : 'Sin definir' }}
                    </td>
                  
                </tr>
                  
              </tbody>
            </table>

            <span v-else class="text-danger">
              Este usuario no ha cargado sus datos de pago
            </span>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </section>
</template>

<script>

import { toRefs, watch, computed, onMounted,ref } from 'vue'


import Listado from 'components/Listado.vue'
import useRetirosList from './useRetirosList.js'
import store from '@/store'
import { avatarText } from '@core/utils/filter'

import {
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BCard,
  BCarouselSlide,
  BCarousel,
  BBadge,
  BImg,
  BTable,
  BMedia,
  BLink,
  BAvatar,
  BSidebar,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BFormInput,
  BFormTextarea,
  BFormRadioGroup,
  BFormFile,
  BModal


} from 'bootstrap-vue'

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required,min} from '@validations'


export default {

  components: {
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BCard,
    Listado,
    BCarouselSlide,
    BCarousel,
    BBadge,
    BImg,
    BTable,
    BMedia,
    BLink,
    BAvatar,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BFormInput,
    BFormTextarea,
    ValidationObserver,
    ValidationProvider,
    BFormRadioGroup,
    BFormFile,
    BModal
  },

  setup() {

    const actions = useRetirosList()
    const formulario = computed(() => store.getters['retiro/draft'])
    const formValidate = ref(null)
    const showDialogStatus = ref(false)
    const showDatosCuenta = ref(false)

    onMounted(() => setTimeout(() => {
      actions.refetchData()
    },
      400))

    const addStatus = (retiro_id) => {
      store.commit('retiro/capturar', retiro_id)
      formulario.value.status = 2
      showDialogStatus.value = true;
    }

    const guardar = () => {

      store.dispatch('retiro/guardar',formulario.value).then(({result}) => {
        
        if(result){
          toast.success('Solicitud actualizada con éxito')
          showDialogStatus.value = false;
          store.commit('retiro/clear')
          actions.refetchData()
        }else{
          toast.info('Solicitud no se pudo guardar, inténtelo de nuevo mas tarde')
        }

      }).catch(e => {
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }

        console.log(e)
      })
    }

    const statuses = ref([
        {text:'En proceso',value:2},
        { text: 'Procesar', value: 3 },
        { text: 'Rechazar', value: 4 },
    ])

    const verDatosCuenta = (retiro_id) => {

      store.commit('retiro/capturar',retiro_id)
      showDatosCuenta.value = true
      console.log('capturador')
    }

    return {
      actions,
      loading: computed(() => store.state.loading),
      refTable: actions.refTable,
      avatarText,
      getStatus:actions.getStatus,
      addStatus,
      showDialogStatus,
      formulario,
      formValidate,
      guardar,
      required,
      min,
      statuses,
      verDatosCuenta,
      showDatosCuenta,
      getMetodoPago:(metodo) => {
        let metodos = ['Transferencia Bancaria','Paypal','Stripe']
        return metodos[metodo - 1];

      }


    }

  }
}
</script>

<style lang="scss" >
@import "@/assets/scss/variables/variables";

  .btn.active{
    background: $primary !important;
    border: $primary;
  }

  .status-sidebar{
    width:320px;
  }

  @media(min-width:720px){
    .status-sidebar{
      width:400px !important;
    }

  }
</style>