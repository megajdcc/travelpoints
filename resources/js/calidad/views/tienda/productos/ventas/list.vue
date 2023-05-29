<template>
 
  <section>
     <listado :actions="actions" hideFooter>
           <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc, perPage }">
              <b-card class="mt-1">
        
                <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
                  empty-text="No se encontró ninguna venta" :sort-desc="isSortDirDesc" sticky-header="700px"
                  :no-border-collapse="false"  borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">
            
                  <template #cell(id)="{ item, toggleDetails, detailsShowing }">
              
                    <b-button size="sm" variant="primary" @click="toggleDetails">
                      {{ item.id }} 
                      <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-arrow-up' : 'fa-arrow-down']" class="ml-1" />
                    </b-button>
              
                  </template>


                  <template #row-details="{ item }">
                    <h4>Productos</h4>
                    <table class="w-100 table table-hover table-sm">
                      <thead>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Monto</th>
                      </thead>
                      <tbody>
                        <tr v-for="(producto, i) in item.productos" :key="i">
                          <td>
                            {{ producto.nombre }}
                          </td>
                          <td>
                            {{ producto.pivot.cantidad }}
                          </td>
                          <td>
                            {{ producto.pivot.monto | currency(item.divisa ? item.divisa.iso : 'MXN') }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>

                  <template #cell(total)="{ item }">
        
                    <div class="text-wrap text-justify">
                      {{ item.total | currency(item.divisa ? item.divisa.iso : 'MXN') }}
                    </div>
        
                  </template>

                  <template #cell(cliente_id)="{ item }">
        
                    <b-media vertical-align="center">
                      <template #aside>
                        <b-avatar size="32" :src="item.cliente.avatar" :text="avatarText(`${item.cliente.nombre} ${item.cliente.apellido}`)"
                          :variant="`light-primary`"
                          :to="{ name: 'mostrar.usuario', params: { id: item.cliente.id } }" disabled />
                      </template>
                      <b-link :to="{ name: 'mostrar.usuario', params: { id: item.cliente.id } }" disabled
                        class="font-weight-bold d-block text-nowrap"> 
                        {{ `${item.cliente.nombre} ${item.cliente.apellido}` }}
                      </b-link>
                      <small class="text-muted" v-if="item.cliente.username">{{ item.cliente.username }}</small>
                    </b-media>
        
                  </template>


                  <template #cell(empleado_id)="{ item }">
        
                      <b-media vertical-align="center" v-if="item.empleado_id">
                        <template #aside>
                          <b-avatar size="32" :src="item.empleado.avatar" :text="avatarText(`${item.empleado.nombre} ${item.empleado.apellido}`)"
                            :variant="`light-primary`"
                            :to="{ name: 'mostrar', params: { id: item.empleado.id } }" disabled />
                        </template>
                        <b-link :to="{ name: 'mostrar', params: { id: item.empleado.id } }" disabled
                          class="font-weight-bold d-block text-nowrap"> 
                          {{ `${item.empleado.nombre} ${item.empleado.apellido}` }}
                        </b-link>
                        <small class="text-muted" v-if="item.empleado.username">{{ item.empleado.username }}</small>
                      </b-media>

                    <span class="text-nowrap" v-else>
                      No Aplica
                    </span>
        
                  </template>

                  <template #cell(actions)="{item}">
                    <b-button-group size="sm">
                        <b-button v-if="item.ordencj" @click="verDetailsOrden(item)" variant="primary">
                          Ver Detalles de la Orden
                        </b-button>
                      </b-button-group>
                  </template>

          
                </b-table>
              </b-card>
            </template>
    </listado>
        <b-modal size="lg" centered v-model="isDetailsShow" title="Detalles de la Orden" >
          <table class="table table-sm table-hover">
            <tbody>
              <tr v-for="(title, i) in Object.keys(orden).filter(val => !(['productList'].includes(val)))" :key="i" >
                <td>
                  {{ convertirCamelCase(title) }}
                </td>

                <td>
                  {{ orden[title] }}
                </td>
              </tr>
            </tbody>
          </table>

          <template #modal-footer>
            <b-button-group size="sm">
              <b-button variant="primary" v-if="['CREATED', 'IN_CART'].includes(orden.orderStatus)" @click="confirmarOrden" v-loading="loading">
                Confirmar Orden
              </b-button>

              <b-button variant="danger" @click="eliminarOrden" v-if="['CREATED','IN_CART'].includes(orden.orderStatus)" v-loading="loading">
                Cancelar Orden
              </b-button>

              <b-button variant="success" @click="pagarOrden" v-if="orden.orderStatus == 'UNPAID'" v-loading="loading">
                Pagar Orden
              </b-button>
            </b-button-group>
          </template>
        </b-modal>
  </section>
    
</template>

<script>

import useVentasList from './useVentasList.js';
import store from '@/store'
import {ref,toRefs,computed,onMounted,watch} from 'vue'
import { avatarText } from '@core/utils/filter'

import {
  BCard,
  BButtonGroup,
  BTable,
  BButton,
  BMedia,
  BAvatar,
  BLink,
  BModal
} from 'bootstrap-vue'

export default {
  
  components:{
    Listado:() => import('components/Listado.vue'),

    BCard,
    BButtonGroup,
    BTable,
    BButton,
    BMedia,
    BAvatar,
    BLink,
    BModal

  },

  setup(props){
    const usuario = ref()
    const actions  = useVentasList(usuario);
    const isDetailsShow = ref(false)
    const orden = ref({})
    const consumo = ref(null)
    onMounted(() => {
      setTimeout(() => {
          actions.refetchData()
      }, 1500);
    })


    const verDetailsOrden = (consu) => {
      consumo.value = consu 
      store.dispatch('consumo/getOrdenDetailsCj',consumo.value.ordencj).then(({orden:ordenDetails}) => {
          orden.value = ordenDetails
          isDetailsShow.value = true
      })
      
    }

    const convertirCamelCase = (cadena) => {
      var resultado = cadena.replace(/([A-Z])/g, ' $1').toUpperCase();
      return resultado;
    }

    const confirmarOrden = () => {
      
      store.dispatch('consumo/confirmarOrdenCj',orden.value.orderId).then(({result,data}) => {
        if(result){
          toast.success('Se ha confirmado con éxito la orden')
          verDetailsOrden(consumo.value)
          actions.refetchData();
        }else{
          toast.info('La orden no pudo ser confirmada');
        }
      })

    }

    const pagarOrden = () => {
        store.dispatch('consumo/pagarOrdenCj', orden.value.orderId).then(({ result, data }) => {
        if (result) {
          toast.success('Se ha pagado con éxito la orden')
          verDetailsOrden(consumo.value)
          actions.refetchData();
        } else {
          toast.info('La orden no pudo ser pagada, verifique que tengas fondos suficientes en la plataforma.');
        }
      })
    }

    const eliminarOrden = () => {

      if(orden.value.orderId){
         store.dispatch('consumo/eliminarOrdenCj', {consumo:consumo.value.id,orden:orden.value.orderId }).then(({ result }) => {

          if (result) {
            toast.success('Se ha eliminado con éxito la orden de compra')
            verDetailsOrden(consumo.value)
            actions.refetchData();
          } else {
            toast.info('No se pudo eliminar la orden de compra, inténtelo de nuevo mas tarde.')
          }

        })
      }
     

    }


    return {
      actions,
      eliminarOrden,
      refTable: actions.refTable,
      avatarText,
      loading:computed(() => store.state.loading),
      isDetailsShow,
      verDetailsOrden,
      orden,
      convertirCamelCase,
      confirmarOrden,
      pagarOrden
    }
  }
}
</script>