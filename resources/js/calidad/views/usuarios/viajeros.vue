<template>
  <listado :actions="actions" hideFooter>
    <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">
        <b-card class="mt-1">
              <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
                empty-text="No se encontró ningún Viajeros" :sort-desc="isSortDirDesc" sticky-header="700px"
                :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">

            
              <!-- Column: User -->
              <template #cell(username)="{ item }">
               <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
                <template #aside>
                  <b-avatar size="32" :src="`/storage/img-perfil/${item.imagen}`" :text="avatarText(`${item.nombre} ${item.apellido}`)"
                    :variant="`light-primary`"
                    @click="mostrarAboutUsuario(item)"  />
                </template>
                <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
                  class="font-weight-bold d-block text-nowrap p-0">
                  {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre' }}
                </b-button>
                <small class="text-muted" v-if="item.username">{{ item.username }}</small>
              </b-media>
              </template>

              <template #cell(promotor)="{ item }">
                <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item.referidor[0])">
                  <template #aside>
                    <b-avatar size="32" :src="`/storage/img-perfil/${item.referidor[0].imagen}`" :text="avatarText(`${item.referidor[0].nombre} ${item.referidor[0].apellido}`)"
                      :variant="`light-primary`"
                      @click="mostrarAboutUsuario(item.referidor[0])"  />
                  </template>
                  <b-button @click="mostrarAboutUsuario(item.referidor[0])" variant="outline-text" size="sm"
                    class="font-weight-bold d-block text-nowrap p-0">
                    {{ item.referidor[0].nombre ? `${item.referidor[0].nombre} ${item.referidor[0].apellido}` : 'Sin definir nombre' }}
                  </b-button>
                  <small class="text-muted" v-if="item.referidor[0].username">{{ item.referidor[0].username }}</small>
                </b-media>
              </template>
              </b-table>
            </b-card>
    </template>
  </listado>
</template>

<script>

import useViajerosList from './useViajerosList.js'
import store from '@/store'

import {toRefs,ref,computed,watch, inject } from 'vue'

import {
  BCard,
  BTable,
  BButton,
  BButtonGroup,
  BMedia,
  BAvatar
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default{

  components:{
    Listado:() => import('components/Listado.vue'),

    BCard,
    BTable,
    BButton,
    BButtonGroup,
    BMedia,
    BAvatar
  },

  setup(props){
    
    const userAbout = inject('userAbout')
    const showAboutProfile = inject('showAboutProfile')
    const actions = useViajerosList();
    
    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }


    return {
      loading:computed(() => store.state.loading),
      actions,
      refTable : actions.refTable,
      mostrarAboutUsuario,
      avatarText
    }

  }
}


</script>