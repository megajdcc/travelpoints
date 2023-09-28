<template>
  <listado :actions="actions" hide-footer>
     <template #btn-action>
        <b-button variant="primary" size="sm" :to="{name:'idioma.create'}" v-if="$can('write','idiomas')" class="d-flex align-items-center">
          <font-awesome-icon icon="fas fa-language" class="mr-1" size="lg" />
          <b>Nuevo</b>
        </b-button>
      </template>
      <template #contenido="{ fetchData, tableColumns, isSortDirDesc, sortBy, perPage,eliminar }">
        <b-card>
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
            :empty-text="$t('No se encontró ningún Idioma')" :sort-desc="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false" :busy="loading" :perPage="perPage" showEmpty small stacked="md"
            @sort-changed="sortChange"  @row-selected="fileSelected" hover select-mode="single" selectable
            selected-variant="primary">
            
            <template #cell(#)="{index}">
              {{ index + 1 }}
            </template>

            <template #cell(shortLang)="{item}">
              {{ item.shortLang }}
            </template>

            <template #cell(languaje)="{item}">
              <b-img :src="`/storage/flags/${item.flag}`" :style="{width:'auto',height:'20px'}" />
              <b>{{ item.languaje }}</b>
            </template>

            <template #cell(default)="{item}">
              {{ item.default ? 'Sí' : 'No' }}
            </template>

            <template #cell(actions)="{ item }">

              <b-button-group size="sm">
                <b-button variant="primary" :to="{name:'idioma.edit',params:{id:item.id}}" v-if="$can('update','idiomas')">
                  <font-awesome-icon icon="fas fa-pen" />
                </b-button>

                <b-button variant="danger" @click.stop="eliminar(item.id)" v-if="$can('delete', 'idiomas') && !item.default">
                  <font-awesome-icon icon="fas fa-trash" />
                </b-button>
              </b-button-group>

            </template>


          </b-table>
        </b-card>
      </template>

  </listado>

</template>

<script>
  import useIdiomaList from './useIdiomaList.js'
  import {computed,toRefs,ref} from 'vue'
  import store from '@/store'
  import router from '@/router'
import {
  BCard, BTable, BButton,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BLink,
  BMedia,
  BAvatar,
  BImg,
  BButtonGroup,
} from 'bootstrap-vue'
  export default{

    components:{
      Listado:() => import('components/Listado.vue'),
      BCard, 
      BTable,
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BLink,
      BMedia,
      BAvatar,
      BImg,
    },


    setup(props){

     
       const actions = useIdiomaList();
      const sortChange = (ct) => {
        actions.sortBy.value = ct.sortBy
        actions.isSortDirDesc.value = ct.sortDesc
      } 

      const fileSelected = (f) => {
         if (f.length) {
            router.push({ path: '/idiomas/traduccions', query: { lang: f[0].shortLang ?? '' } })
        } else if (!lang.value) {
          router.push({ path: '/idiomas' })
        }
      }

      return {
        actions,
        loading:computed(() => store.state.loading),
        sortChange,
        refTable:actions.refTable,
        fileSelected
      }
    }
  }

</script>