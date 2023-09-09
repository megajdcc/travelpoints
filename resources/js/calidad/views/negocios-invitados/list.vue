<template>
    
    <listado :actions="actions" hideFooter>
      <template #btn-action>
        <b-button variant="primary" :to="{name:'negocios-invitados.create'}" v-if="$can('write','Negocios invitados')" class="d-flex align-items-center">
          <font-awesome-icon icon="fas fa-plus" size="lg"/>
          <b class="ml-1">Invitar</b>
        </b-button>
      </template>


      <template #contenido="{fetchData,tableColumns,sortBy,perPage,isSortDirDesc,eliminar}">
        <b-card no-body>
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
                  empty-text="No se encontró ningúna invitación" :sort-desc="isSortDirDesc" sticky-header="700px"
                  :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md" thead-class="text-nowrap">

                <template #cell(id)="{item, detailsShowing , toggleDetails }">
                  <b-button variant="primary" size="sm" @click="toggleDetails">
                    # {{ item.id }}
                    <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']"  />
                  </b-button>

                </template>

                <template #row-details="{item}">
                  <b-card>
                    <el-divider content-position="left">Mensaje Enviado</el-divider>
                    <p class="text-justify">
                      {{ item.mensaje }}
                    </p>
                  </b-card>
                
                </template>

                <template #cell(status)="{item}">
                  <span>{{ item.status == 1 ? 'Invitación enviada' : 'Invitación Acetada' }}</span>
                </template>
                

                <template #cell(actions)="{item}">

                  <b-button-group size="sm">
                    <b-button variant="primary" @click="reenviarInvitacion(item.id)" v-if="item.status == 1">
                      Recordar Invitación
                    </b-button>
                    <b-button variant="danger" @click="eliminar(item.id)" title="Eliminar" v-if="item.status == 1"> 
                      <font-awesome-icon icon="fas fa-trash" size="lg" />
                    </b-button>

                  </b-button-group>
                </template>

            </b-table>
        </b-card>
       

      </template>
    </listado>
</template>


<script>

import {toRefs,ref,computed} from 'vue'
import store from '@/store'


import useNegociosInvitadosList from './useNegociosInvitadosList.js';

import {
  BCard,
  BTable,
  BButtonGroup,
  BButton
} from 'bootstrap-vue'


export default {
  
  components:{
    BCard,
    BTable,
    BButtonGroup,
    BButton,
    listado:() => import('components/Listado.vue'),
  },

  setup(){
    const {usuario} = toRefs(store.state.usuario)

    const actions = useNegociosInvitadosList(usuario);

    return {
      actions,
      loading:computed(() => store.state.loading),
      refTable:actions.refTable,
      reenviarInvitacion:actions.reenviarInvitacion
    }
  }
}
</script>