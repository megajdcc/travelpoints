<template>
  <section>
     <listado :actions="actions" hideFooter>
           <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc, perPage, eliminar }">
              <b-card class="mt-1">
          
                <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy"
                  empty-text="No se encontró ninguna compra" :sort-desc.sync="isSortDirDesc" sticky-header="700px"
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
                        <th></th>
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
                          <td>
                            <opinion-form isConsumo isCompra modelType="App\Models\Producto" :modelId="producto.id" @opinionGuardada="opinionGuardada(item.id)" v-if="!item.comentado" />
                            <strong v-else >
                              Producto Comentado
                            </strong>
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

                  <template #cell(actions)="{ item }">
                    <b-button-group size="sm">
                      <b-button v-if="item.ordencj" @click="verDetailsOrden(item.ordencj)" variant="primary">
                        Ver Detalles de la Orden
                      </b-button>
                    </b-button-group>
                  </template>

            
                </b-table>
              </b-card>
            </template>
         
        </listado>

        <b-modal size="lg" centered v-model="isDetailsShow" title="Detalles de la Orden" hide-footer >
          <table class="table table-sm table-hover">
            <tbody>
              <tr v-for="(title,i) in Object.keys(orden).filter(val => !(['productList','orderAmount','productAmount'].includes(val)))" :key="i" >
                <td>
                  {{ convertirCamelCase(title) }}
                </td>

                <td>
                  {{ orden[title] }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-modal>

  </section>
   
</template>

<script>
import useVentasList from 'views/tienda/productos/ventas/useVentasList.js'
import store from '@/store'
import { ref, toRefs, computed, onMounted, watch } from 'vue'
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
      BCard,
      BButtonGroup,
      BTable,
      BButton,
      BMedia,
      BAvatar,
      BLink,
      Listado:() => import('components/Listado.vue'),
      OpinionForm: () => import('views/opinions/form.vue'),
      BModal
  },

  setup(props){

    const {usuario} = toRefs(store.state.usuario)
    const actions = useVentasList(usuario);
    const isDetailsShow = ref(false)
    const orden = ref({})
    onMounted(() => {
      setTimeout(() => {
          actions.refetchData();
      }, 1000);
    })

    const opinionGuardada = (consumo) => {
      store.dispatch('consumo/marcarComentada',consumo).then(({result}) => {
        if(result){
           actions.refetchData()
        }
      })
    }


    const verDetailsOrden = (orden_id) => {

      store.dispatch('consumo/getOrdenDetailsCj',orden_id).then(({orden:ordenDetails}) => {
          orden.value = ordenDetails
          isDetailsShow.value = true
      })
      
    }
    
    const  convertirCamelCase = (cadena)  => {
      var resultado = cadena.replace(/([A-Z])/g, ' $1').toUpperCase();
      return resultado;
    }
    return {
      actions,
      refTable:actions.refTable,
      loading:computed(() => store.state.loading),
      avatarText,
      opinionGuardada,
      verDetailsOrden,
      isDetailsShow,
      orden,
      convertirCamelCase

    }
  }
}
</script>