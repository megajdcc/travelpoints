<template>
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

                <template #cell(actions)="{item}">
                  
                </template>

            
              </b-table>
            </b-card>
          </template>
         
      </listado>
</template>

<script>
import useVentasList from 'views/tienda/productos/ventas/useVentasList.js'
import store from '@/store'
import { ref, toRefs, computed, onMounted, watch } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'

import {
  BCard,
  BButtonGroup,
  BTable,
  BButton,
  BMedia,
  BAvatar,
  BLink
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
  },

  setup(props){

    const {usuario} = toRefs(store.state.usuario)
    const actions = useVentasList(usuario);

    onMounted(() => {
      setTimeout(() => {
          actions.refetchData();
      }, 400);
    })

    const opinionGuardada = (consumo) => {
      store.dispatch('consumo/marcarComentada',consumo).then(({result}) => {
        if(result){
           actions.refetchData()
        }
      })
    }


    return {
      actions,
      refTable:actions.refTable,
      loading:computed(() => store.state.loading),
      avatarText,
      opinionGuardada,

    }
  }
}
</script>