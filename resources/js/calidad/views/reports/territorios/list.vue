
<template>
  
  <listado :actions="actions" hideFooter>

    <template #header-table="{total}">
        <b-container fluid class="mx-0 px-0">
          <b-row>
            <b-col cols="12" class="d-flex ">

                <section style="flex:0 1 320px" class="">
                    <b class="mb-1 d-block">Dominación Mundial</b>
                    <table class="table table-hover table-sm w-100">
                      <tr>
                        <td style="width:10%; vertical-align: center;" class="">
                          <font-awesome-icon icon="fas fa-chart-line" size="2xl" />
                        </td>
                        <td class="">
                          <span> Total Paises:</span>
                          <h4 class="my-0">{{ totalPaises }} / 195</h4>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:10%; vertical-align: center;" class="">
                          <font-awesome-icon icon="fas fa-percent" size="2xl" />
                        </td>
                        <td class="">
                          <section class="d-flex align-items-center">

                            <h4 class="mr-1 py-0 my-0"> {{ dominacionMundial }}%</h4>de dominación
                          </section>

                        </td>
                      </tr>

                    </table>
                </section>

                <statistic-card-horizontal icon="fa-map-location" statisticTitle="Total Destinos Activos" color="danger"
                          colorIcon="success" colorText="text-white" v-if="$can('read', 'Tablero destinos activos')" :statistic="total" :to="{ name: 'destino.lists' }" 
                          class="ml-md-1" style="flex:0 1 320px">

                          <template #statistic="{ statistic }">
                              {{ statistic }} 
                          </template>

                </statistic-card-horizontal>

            </b-col>
          </b-row>
        </b-container>
    </template>



    <template #btn-action-prepend>
       <el-date-picker
              v-model="mes"
              type="month"
              placeholder="Filtre por mes"
              size="small"
              class="mr-1"
              :picker-options="pickerOption">
        </el-date-picker>
    </template>
    <template #btn-action>

      <b-button variant="dark" size="sm" @click="regresar()" v-if="pais">
          <font-awesome-icon icon="fas fa-arrow-left" size="lg"/>
      </b-button>

      <b-button variant="primary" size="sm" @click="descargar()">
          <font-awesome-icon icon="fas fa-download" size="lg"/>
      </b-button>
    </template>

    <template #contenido="{ fetchData, tableColumns, isSortDirDesc, sortBy, perPage }">
        <b-card>
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
              :sort-by="sortBy" :empty-text="$t('No se encontró ningun destino...')" :sort-desc="isSortDirDesc"
              sticky-header="700px" :no-border-collapse="false"    :busy="loading" :perPage="perPage"
              showEmpty small stacked="md" @sort-changed="sortChange" @row-selected="fileSelected" hover select-mode="single" selectable selected-variant="primary">

              <template #cell(nombre)="{item}">
                <b-link :to="{path:`/destinos`,query:{q:item.nombre}}" target="_blank">
                  {{  item.nombre }}
                </b-link>
              </template>
          </b-table>
        </b-card>
    </template>

  </listado>

</template>
<script>

import {ref,computed,toRefs,watch} from 'vue'
import store from '@/store'
import router from '@/router'
import useDestinoList from './useDestinoList.js'
import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

import {BCard,BTable,BButton,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BLink
} from 'bootstrap-vue'

export default {
  
  components:{
    listado:() => import('components/Listado.vue'),
    BCard,
    BTable,
    BButton,
    BContainer,
    BRow,
    BCol,
    StatisticCardHorizontal,
    BFormGroup,
    BLink

  },

  props:{
    pais:String
  },

  setup(props){
    const { pais } = toRefs(props)
    const actions = useDestinoList(pais);
    

    const sortChange = (ct) => {

      actions.sortBy.value = ct.sortBy
      actions.isSortDirDesc.value = ct.sortDesc
    
    }
    const totalPaises = computed(() => actions.totalPaises.value)

    const pickerOption = ref({
      disabledDate:(fecha) => Date.now() < fecha.getTime() 
    })

    const fileSelected = (item) => {
      if(item.length){
        router.push({path:'/reports/territorios',query:{pais:item[0].pais}})
      }else if(!pais.value){
        router.push({path:'/reports/territorios'})
      }
    } 


    const regresar = () => {

      router.push({ path: '/reports/territorios' })

    }


    return {
      loading:computed(() => store.state.loading),
      actions,
      sortChange,
      refTable:actions.refTable,
      descargar:actions.descargar,
      ano:actions.ano,
      mes: actions.mes,
      totalPaises,
      pickerOption,
      fileSelected,
      regresar,
      dominacionMundial: computed(() => {
        return redondeo(totalPaises.value * 100 / 195, 2)
      }),
    }
  }

}

</script>
