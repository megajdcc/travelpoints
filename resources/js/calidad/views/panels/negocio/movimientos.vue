<template>

  <listado isTable :actions="actions">
      
    <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc , perPage }">
        <b-card class="mt-1">

          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
            empty-text="No se encontró ningún movimiento" :sort-desc="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md" >

                <template #cell(concepto)="{item}">
                  
                  <div class="text-wrap text-justify" style="max-width:320px !important">
                    {{ item.concepto  }}
                  </div>

                </template>
                
                <template #cell(created_at)="{item}">
                  {{ item.created_at | fecha('LLL') }}
                </template>
                
                <template #cell(monto)="{item}">
                  <span style="color:black" class="font-weight-bolder text-nowrap" >
                    {{ item.tipo_movimiento == 1 ? '' : '-' }}{{ item.monto |
                    currency({symbol:item.cuenta.divisa.simbolo}) }} {{ item.cuenta.divisa.iso.toUpperCase() }}
                  </span>
                </template>
                
                <template #cell(balance)="{item}">
                  <span style="color:black" class="font-weight-bolder text-nowrap">
                    {{ item.tipo_movimiento == 1 ? '' : '' }}{{ item.balance |
                    currency({symbol:item.cuenta.divisa.simbolo}) }} {{ item.cuenta.divisa.iso.toUpperCase() }}
                  </span>
                </template>

          </b-table>
        </b-card>
    </template>

    <template #botonera-footer>
      <b-button variant="primary" @click="recargarPaypal" title="Recargar Saldo con Paypal">
        <font-awesome-icon :icon="['fab','fa-paypal']" />
        Recargar Saldo
      </b-button>

      <b-button variant="secondary" title="Consignar Saldo" @click="consignarSaldo" v-if="isAdmin">
        Consignar o Remover saldo
      </b-button>
    </template>

    <template #otros>
        <b-sidebar v-model="showRecarga" >

          <template #header>
            <h3>Recargar Saldo </h3>

          </template>

          <b-container fluid>

            <b-row>
              <b-col cols="12">


                <b-form-group label="Monto a recargar">
                  
                  <validation-provider name="monto" rules="required" #default="{valid,errors}">
                    <currency-input v-model="monto" :options="optionsCurrency"  InputClass="form-control" />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>

              </b-col>

              <b-col cols="12"  v-if="sistema.id">

                <PayPal :amount="monto" :currency="iso" :client="credentials" :env="sistema.production_paypal ? 'live' : 'sandbox'" @payment-completed="pagoCompletadoPaypal">
                </PayPal>

              </b-col>
            </b-row>
          </b-container>

          <template #footer="{hide}">
            <b-container fluid class="mb-1">
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button-group size="sm">
                    <b-button @click="hide" title="Cerrar" variant="danger">
                      Cerrar
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </b-container>
           
          </template>
        </b-sidebar>

         <b-sidebar v-model="showConsignacion" >

            <template #header>
              <h3>Consignar o remover saldo</h3>

            </template>

            <b-container fluid>

              <b-row>
                <b-col cols="12">

                  <b-form-group label="¿Quitar o Asignar Saldo?">
                  
                      <validation-provider name="formulario.tipo" rules="required" #default="{ valid, errors }">
                        <b-form-radio-group v-model="formulario.tipo" :options="[
                          {text:'Consignar',value:1},
                          { text: 'Remover', value: 2 },
                        ]" :state="valid"></b-form-radio-group>

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                  </b-form-group>
                  <b-form-group label="Monto ">
                  
                    <validation-provider name="formulario.monto" rules="required" #default="{ valid, errors }">
                      <currency-input v-model="formulario.monto" :options="optionsCurrency"  InputClass="form-control" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>

                  <b-form-group label="Concepto" description="Este concepto aparecerá en los movimientos de cuenta de este Negocio">
                  
                      <validation-provider name="formulario.concepto" rules="required" #default="{ valid, errors }">
                        <b-form-textarea v-model="formulario.concepto" :rows="2" :state="valid">
                        </b-form-textarea>

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>

                </b-col>

                <b-col cols="12" >
                  <b-button variant="primary" title="Enviar" @click="enviarSolicitud">
                    <font-awesome-icon icon=" fas fa-paper-plane" />
                    {{ formulario.tipo == 1 ? 'Consignar' : 'Remover' }}
                  </b-button>
                </b-col>
              </b-row>
            </b-container>

            <template #footer="{ hide }">
              <b-container fluid class="mb-1">
                <b-row>
                  <b-col cols="12" class="d-flex justify-content-end">
                    <b-button-group size="sm">
                      <b-button @click="hide" title="Cerrar" variant="danger">
                        Cerrar
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-container>
           
            </template>
          </b-sidebar>
    </template>
  
  </listado>

</template>

<script>
import useCuentaList from 'views/socio/perfil/useCuentaList.js'


import store from '@/store'
import PayPal from 'vue-paypal-checkout'
import {toRefs,computed,watch,ref} from '@vue/composition-api'
import {ValidationProvider} from 'vee-validate'
import CurrencyInput from 'components/CurrencyInput.vue'
import {required} from '@validations'

import {
  BTable,
  BCard,
  BButton,
  BButtonGroup,
  BSidebar,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormInvalidFeedback,
  BFormRadioGroup,
  BFormTextarea
} from 'bootstrap-vue'

import { optionsCurrency } from '@core/utils/utils'

export default {
  
  components:{
    Listado:() => import('components/Listado.vue'),
    BTable,
    BCard,
    BButton,
    BButtonGroup,
    BSidebar,
    BContainer,
    BRow,
    BCol,
    CurrencyInput,
    BFormGroup,
    BFormInvalidFeedback,
    ValidationProvider,
    PayPal,
    BFormRadioGroup,
    BFormTextarea
  },

  props:{
    isAdmin:Boolean
  },

  setup(props){
    
    const {isAdmin} = toRefs(props)

    const showRecarga = ref(false)
    const showConsignacion = ref(false)
    const {negocio} = toRefs(store.state.negocio)
    const {sistema} = toRefs(store.state.sistema)
    const monto = ref(0)
    const actions = useCuentaList({model_type:'Negocio',model_id:computed(() => negocio.value.id)})
    
    const formulario = ref({
      tipo:1,
      monto:0,
      concepto:'',
      model_id:computed(() => negocio.value.id),
      model_type:'App\\Models\\Negocio'
    })

    watch(negocio, () => {
     

      setTimeout(() => {
        actions.refetchData()

      }, 300);

    })

    const recargarPaypal = () => {
      console.log('mostrando')
      showRecarga.value = true
    } 

    const consignarSaldo = () => {

      showConsignacion.value = true
    }


    const enviarSolicitud = () => {
      
      store.dispatch('negocio/gestionSaldo',formulario.value).then(({result}) => {
        if(result){
          toast.success('Solicitud realizado con éxito')
          actions.refetchData();
          formulario.value = { 
            ...formulario.value, 
            ...{
              tipo: 1,
              monto: 0,
              concepto: '',
            }
          }

         showConsignacion.value = false


        }else{
          toast.danger('No se pudo realizar la gestión, inténtelo de nuevo')
        }

      })

    }


    const pagoCompletadoPaypal = ({payer,state}) => {
      
        if(state === 'approved'){
          
          store.dispatch('negocio/agregarSaldo',{
              monto:monto.value,
              negocio_id:negocio.value.id,
              concepto:`Recarga de Saldo con Paypal Registrado con el número de referencia : ${payer.payer_info.payer_id}`

          }).then(({result}) => {
              
              if(result){
                toast.success('Recarga realizada con éxito', { position: 'bottom-right' })
                
                showRecarga.value = false
                
                monto.value = 0
              }else{

                toast.info('No pudimos aprobar tu pago, danos 24 horas para verificar tu pago, te estaremos informando',{position:'bottom-right'})
              }
            
          })
              
        }else{
              toast.info('Su pago no fue cargado  ...',{position:'bottom-right'})
        }

    }

    const credentials = ref({
      sandbox: sistema.value.paypal_id || 'ARMAQ0_8KFm9nIJKGSOJUNWBfVWngxhsuu1Vj7N6yL2LVnXBAa_JXIDUeuqkMYU2yONIvpWZZQl-DLiw',
      production: "<production client id>"
    })

    const iso = computed(() => {
      return negocio.value.divisa  ? negocio.value.divisa.iso.toUpperCase() : 'MXN'
    })

    
    return {
      actions,
      refTable: actions.refTable,
      loading:computed(() => store.state.loading),
      showRecarga,
      recargarPaypal,
      optionsCurrency,
      required,
      monto,
      pagoCompletadoPaypal,
      negocio,
      sistema,
      iso,
      credentials,
      consignarSaldo,
      showConsignacion,
      formulario,
      enviarSolicitud
    }

  }


}
</script>