<template>
    <listado :actions="actions" hideFooter hideHeader>
        <template #titulo>
          <h3>Productos en Caja</h3>
        </template>


          <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc, perPage, items }">
            <b-card>
               <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
                :sort-by.sync="sortBy" empty-text="No se encontró ningún producto en Caja" :sort-desc.sync="isSortDirDesc"
                sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
                showEmpty small stacked="md" >

                  <template #cell(nombre)="{ item }">
                    <span class="text-nowrap">
                      {{ item.producto.nombre }}
                    </span>
                  </template>

                  <template #cell(precio_unitario)="{ item }">
                      <span class="text-nowrap">
                        {{ item.precio_unitario | currency(item.producto.divisa.iso) }}
                      </span>
                  </template>
            
                  <template #cell(cantidad)="{ item }">
                     <span class="text-nowrap">
                          {{ item.cantidad > 1 ? `${item.cantidad} Pzas` : `${item.cantidad} Pza` }}
                      </span>
                  </template>
              
                  <template #cell(monto)="{ item }">
                     <strong class="text-nowrap">
                          {{ item.monto | currency(item.producto.divisa.iso) }}
                      </strong>
                  </template>

           

                </b-table>
            </b-card>

          </template>
       

        <template #prePaginate="{items}">
          <section class="w-100 d-flex flex-column align-items-end">
            <b-card style="width:300px">
               <table class="table table-hover table-sm " >
                  <tr>
                    <td>
                      Total a Pagar:
                    </td>
                    <td>
                     <strong>
                       {{ totalPagar | currency }}
                     </strong>
                    </td>
                  </tr>

                   <tr>
                    <td>
                      Tps Disponibles:
                    </td>
                    <td>
                      <strong class=""> Tp{{ usuario.cuenta.saldo | currency }} </strong>
                    </td>
                  </tr>

                    <tr>
                    
                      <td>
                        Tps pos compra:
                      </td>

                      <td>
                        <strong :class="{'text-danger' : (usuario.cuenta.saldo - totalPagar) < 0 }">
                          Tp{{ usuario.cuenta.saldo - totalPagar | currency }}
                        </strong> 
                      </td>
                    
                    </tr>

              </table>

              <small v-if="(usuario.cuenta.saldo - totalPagar) < 0">
                <span class="text-danger">Nota:</span> 
                Su saldo en su cuenta es insuficiente, puede pagar el resto usando Paypal o esperar a ganar mas Tps (TravelPoints).
              </small>
            </b-card>
           

             <PayPal 
                v-if="(usuario.cuenta.saldo - totalPagar) < 0"
                :amount="montoPaypal" 
                currency="USD" 
                :client="credentialPaypal" 
                :env="sistema.production_paypal ? 'live' : 'sandbox'" @payment-completed="pagoCompletadoPaypal">
                </PayPal>
            <b-button-group>
              
              <b-button variant="success" title="pagar" size="md" @click="realizarCompra()" v-loading="loading" 
              :disabled="(usuario.cuenta.saldo - totalPagar) < 0 || !items.length" >
                {{  (usuario.cuenta.saldo - totalPagar) < 0 ? 'Saldo insuficiente, pagar con Paypal' : 'Pagar'  }}
              </b-button>

            </b-button-group>
           
          </section>
            
        </template>

    </listado>



</template>


<script>
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import PayPal from 'vue-paypal-checkout'

import {
  BCard,
  BForm,
  BFormGroup,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BFormInvalidFeedback,
  BCardTitle,
  BLink,
  BImg,
  BCardBody,
  BBadge, 
  BTable,

  BCardText

} from 'bootstrap-vue'

import {
  required
} from '@validations'

import store from '@/store'
import {computed,toRefs,ref,watch,onMounted,inject} from 'vue'
import useListCaja from './useListCaja.js'
import router from '@/router'

export default {

  components:{
    BCard,
    BForm,
    BFormGroup,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BFormInvalidFeedback,
    BCardTitle,
    BLink,
    BImg,
    BCardBody,
    BBadge,
    BTable,
    BCardText,
    Listado:() => import('components/Listado.vue'),
    PayPal
  },

  
  setup(props){

    const {usuario} = toRefs(store.state.usuario);
    const {carrito} = toRefs(store.state.carrito);
    const {sistema} = toRefs(store.state.sistema)
    const { consumo: formulario } = toRefs(store.state.consumo)

    const actions = useListCaja();
    const totalPagar = computed(() => actions.items.value.map(val => val.monto).reduce((a, b) => a + b, 0))
    const swal = inject('swal')

    const cargarForm = () => {
      if(usuario.value.id){
        store.dispatch('carrito/getCarrito', usuario.value.id)
      }

    }

    watch([usuario],() => cargarForm())

    cargarForm();

    onMounted(() => {
      setTimeout(() => {
          actions.refetchData()
      }, 400);
    });
    
    const realizarCompra = () => {

      formulario.value.cliente_id = usuario.value.id
      formulario.value.productos = actions.items.value
      formulario.value.total = totalPagar.value
      formulario.value.tps = usuario.value.cuenta.saldo 

      store.dispatch('consumo/guardar', formulario.value).then(({ result, consumo: consum }) => {
        if (result) {
          swal({
            icon: 'success',
            title: 'Su pago ha sido procesado con éxito!',
            text: formulario.value.productos[0].tipo_producto == 2 ? 'Su Producto digital fué enviado a su correo Electrónico, vaya a su bandeja de entrada, si no lo consigues, puedes contactarnos' : `Puedes retirar ${formulario.value.productos.length > 1 ? 'tus productos' : 'tu producto'} en la Tienda en Horario de Oficina`,
            cancelButtonText: 'Ok',
            showCancelButton: false,
            showConfirmButton: false,
            color: '#1e9ad7',

          })

          cargarForm();

          if (usuario.value.id === consum.cliente.id) {
            store.commit('usuario/updatePerfil', consum.cliente)
          }

          actions.refetchData()

          router.push({name:'tienda.travel'})



        } else {
          toast('Su compra no pudo ser procesada, intente de nuevo', { position: 'bottom-right' })
        }

      }).catch(e => {
        console.log(e)

      })


    }

    const pagoCompletadoPaypal = (data) => {
        const { state, payer } = data;

        if (state == 'approved') {
          formulario.value.paypal_id = payer.payer_info.payer_id
          formulario.value.paypal = data

          realizarCompra();

        } else {
          swal({
            icon: 'info',
            title: 'Su pago no fué procesado por el procesador de pago paypal',
            cancelButtonText: 'Ok',
            showCancelButton: false,
            showConfirmButton: false
          })
        }

    }

    const montoPaypal = computed(() => {
      return String(usuario.value.cuenta.saldo - totalPagar.value).slice(1)
    })

    return {
      carrito,
      usuario,
      required,
      refTable:actions.refTable,
      actions,
      sistema,
      montoPaypal,
      pagoCompletadoPaypal,
      totalPagar,
      realizarCompra,
      credentialPaypal: computed(() => store.getters['sistema/credentialPaypal']),

      loading:computed(() => store.state.loading),

      getImagenPrincipal: (produc) => {

        const imagen_principal = produc.imagenes.find(val => val.portada)

        if (imagen_principal) {
          return `/storage/productos/${imagen_principal.imagen}`
        }
        return `/storage/productos/${produc.imagenes[0].imagen}`
      }

    }

  }

}
</script>