<template>
    <listado :actions="actions" isTable hideFooter>

        <template #btn-action>
          
          <b-button variant="primary" :to="{name:'academia.create'}" v-if="$can('write','academias')" class="d-flex align-items-center">
            <font-awesome-icon icon="fas fa-square-plus" class="mr-1" />
            Nuevo
          </b-button>

        </template>

        <template #contenido="{sortBy,isSortDirDesc,tableColumns,eliminar }">
          <b-card>
             <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
                 :sort-desc="isSortDirDesc" sticky-header="700px"
                 :no-border-collapse="false" small :busy="loading" show-empty>

                    <template #empty>
                       <span class="text-nowrap text-center d-block">
                          No se encontró níngún Vídeo...
                       </span>
                    </template>

                    <template #table-busy>
                       <div class="text-center my-2">
                          <b-spinner class="align-middle" variant="primary"></b-spinner>
                          <strong>Cargando...</strong>
                       </div>
                    </template>

                    <template #cell(id)="{item, toggleDetails, detailsShowing }">

                      <b-button variant="primary" @click="toggleDetails" size="sm">
                        # {{ item.id }}
                        <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'angle-down']"/>
                      </b-button>

                    </template>

                    <template #row-details="{item}">
                      <b-container fluid>
                        <b-row>
                          <b-col cols="12">
                            <h3 class="text-center text-uppercase">{{ item.titulo }}</h3>
                            <section class="d-flex justify-content-center flex-wrap">
                              <video  v-for="(video,i) in item.videos" :key="i"  :src="`/storage/multimedias/${video.url}`"  class="mx-1" width="450" controls >
                              </video>
                            </section>
                            <el-divider content-position="left">Descripción</el-divider>
                          <section v-html="item.descripcion"></section>
                          </b-col>
                        </b-row>
                      </b-container>
                    </template>
                   
                    <template #cell(roles)="{item}">
                      {{ item.roles.map(val => val.nombre).toString() }}
                    </template>

                    <!-- Column: Actions -->
                    <template #cell(actions)="{ item }">

                       <b-button-group size="sm">

                          <b-button :to="{ name: 'academia.edit', params: { id: item.id } }" variant="primary" title="Editar" v-if="$can('update','academias')">
                             <feather-icon icon="EditIcon" />
                          </b-button>

                          <b-button @click="eliminar(item.id)" variant="danger" title="Eliminar" v-if="$can('delete','academias')">
                             <feather-icon icon="TrashIcon" />
                          </b-button>

                       </b-button-group>

                    </template>

              </b-table>
          </b-card>
        </template>

    </listado>
</template>

<script>

import {computed,toRefs,ref,onMounted} from 'vue'
import useVideosList from './useVideosList.js'
import store from '@/store'

import {
  BCard,
  BButton,
  BTable,
  BButtonGroup,
  BRow,
  BContainer,
  BCol,
  BSpinner
} from 'bootstrap-vue'  ;

export default {

  components:{
    Listado:() => import('components/Listado.vue'),
    BCard,
    BButton,
    BTable,
    BButtonGroup,
    BRow,
    BContainer,
    BCol,
    BSpinner,
  },

  setup(props){

    const actions = useVideosList();

    onMounted(() => {
      setTimeout(() => {
          actions.refetchData()
      }, 600);
    })

    return {
      actions,
      refTable:actions.refTable,
      fetchData:actions.fetchData,
      loading:computed(() => store.state.loading)
    }
  }

}
</script>