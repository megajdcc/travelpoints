<template>
  <section>
    <b-card no-body class="px-1 py-1" no-header header-class="mt-0 mb-0 py-1 px-0 " footer-class="px-0">
        <template #header>
            <b-button-group size="sm">

              <b-button variant="primary" @click="guardar()" v-loading="loading" :disabled="loading">
                <font-awesome-icon icon="fas fa-save" class="mr-1"/>
                Guardar
              </b-button>

              <b-button variant="danger" @click="showAgregarFila = !showAgregarFila" v-loading="loading" :disabled="loading">
                Agregar Fila
              </b-button>

            </b-button-group>

          </template>
           <!-- Agregar un filtro de búsqueda -->
        

         


        <b-container fluid class="px-0 py-0 my-0">
          <b-row class="my-0 py-0">
            <b-col cols="12" class="table-traducciones py-0 my-0" >

              <b-input-group size="sm" class="mb-1 ">
                <b-form-input v-model="searchQuery" @input="applySearchFilter" type="search" placeholder="Buscar..." />
                <b-input-group-append >
                  <b-button size="sm" @click="refetchData()" :title="$t('Recargar')">
                      <font-awesome-icon  icon="fas fa-rotate-right"/>
                  </b-button>
                  <slot name="btn-action"></slot>
                </b-input-group-append>
            </b-input-group>

              <b-table ref="refTable" :items="filteredData" :fields="tableColumns" primary-key="id" :sort-by="sortBy"
              :empty-text="$t('No se encontró ningúna traducción')" :sort-desc="true" sticky-header
              :no-border-collapse="false" :busy="loading" :perPage="perPage" showEmpty small stacked="md" hover @row-selected="fileSelected" select-mode="multi" selectable
              selected-variant="primary"  thead-class="fixed" table-class=""  >

                <template #cell(shortLang)="{item}">
                  <b style="max-width:450px;" class="d-block d-flex">{{ item.shortLang }}</b>
                </template>
                <template #cell(valor)="{item, selectRow , rowSelected }">
                    <b v-if="!rowSelected">{{ item.valor }}</b>
                    <b-input-group v-else>
                        <!-- v-if="item.valor.length < 80" -->
                        
                          
                            <b-form-input v-model="item.valor" :name="item.shortLang" size="sm"   @focus="selectRow()" v-if="!item.valor || item.valor.length < 80"></b-form-input>
                            <b-form-textarea v-model="item.valor" :name="item.shortLang"  size="sm" v-else @focus="selectRow()"></b-form-textarea>
                        
                          <template #append>
                            <b-button variant="danger" size="sm" :tabindex="-1" @click="quitar(item.shortLang)">
                              <font-awesome-icon icon="fas fa-trash" />
                            </b-button>
                          </template>
                    </b-input-group>
                </template>
              </b-table>
              <!-- <table class="table table-hover table-sm " >
                <thead>
                  <th>En español</th>
                  <th>En {{ idioma.languaje }}</th>
                 
                </thead>

                <tbody >
                  <tr v-for="(k,i) in Object.keys(data_json)" :key="i">
                      <td class="w-auto">
                        <b>{{ k }}</b>
                      </td>
                      <td class="w-50">
                       
                        
                      </td>

                     

                  </tr>
                </tbody>
              </table> -->
            </b-col>
          </b-row>

        
        </b-container>

        <template #footer>
          <b-button-group size="sm">
            <b-button variant="primary" @click="guardar()" v-loading="loading" :disabled="loading">
              <font-awesome-icon icon="fas fa-save" class="mr-1"/>
              Guardar
            </b-button>

            <b-button variant="danger" @click="showAgregarFila = !showAgregarFila" v-loading="loading" :disabled="loading">
              Agregar Fila
            </b-button>

          </b-button-group>
        </template>
    </b-card>
    <b-sidebar v-model="showAgregarFila" @hide="limpiarFila()" >
      <template #title>
        Agregar Fila
      </template>

      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(agregarFila)">

          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Llave">
                  <validation-provider name="llave" rules="required" #default="{valid,errors}">
                    <b-form-textarea v-model="fila.llave" :rows="1" :state="valid"></b-form-textarea>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                  
                </b-form-group>

                <b-form-group label="Traducción">

                  <validation-provider name="traduccion" rules="required" #default="{ valid, errors }">
                      <b-form-textarea v-model="fila.traduccion" :rows="1" :state="valid"></b-form-textarea>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                </b-form-group>

                <b-button-group size="sm">
                  <b-button variant="primary" type="submit">
                    Agregar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
      


    </b-sidebar>
    </section>
</template>

<script>

import {toRefs,computed,ref, watch,onMounted } from 'vue'
import store from '@/store'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  BForm,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BSidebar,
  BFormTextarea,
  BInputGroup,
  BInputGroupAppend,
  BTable

} from 'bootstrap-vue'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate';

import {required } from '@validations'

export default{

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BForm,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    BSidebar,
    BFormTextarea,
    ValidationObserver,
    ValidationProvider,
    BInputGroup,
    BInputGroupAppend,
    BTable
  },

  props:{
    lang:String
  },


  setup(props){
    const {lang} = toRefs(props)
    const {idioma} = toRefs(store.state.idioma)
    const data_json = ref([]);
    const showAgregarFila = ref(false)
    const sortBy = ref('shortLang')
    const refTable = ref(null)
    const isSortDirDesc = ref(true)
    const searchQuery = ref('')
    const perPage = ref(10000)
    const currentPage = ref(1)
    const total = ref(0);
    const filteredData = ref([]);
    const items = ref([])
    const tableColumns = ref([
      {
          key:'shortLang',
          label: 'En español',
          sortable:true
      },
      {
        key: 'valor',
        label: computed(() => `En ${idioma.value.languaje}`),
        sortable: false,
        sortKey:'shortLang',
        class:'w-50'
      }
    ]);

    const fila = ref({llave:'',traduccion:''})
    // Método para aplicar el filtro de búsqueda
    const applySearchFilter = () => {
      const search = searchQuery.value.toLowerCase();
      if (search === '') {
        // Si no hay nada escrito, muestra todos los datos
        filteredData.value = items.value;
      } else {
        // Filtra los datos en función del término de búsqueda
        filteredData.value = items.value.filter((item) => {
          return item.shortLang.toLowerCase().includes(search);
        });
      }
    };

    const guardar = () => {
    
      const json = refTable.value.localItems.reduce((resultado, objeto) => {
        resultado[objeto.shortLang] = objeto.valor;
        return resultado;
      }, {});
      
      const data = {...data_json.value,...json};

      store.dispatch('idioma/guardarJson',{idioma:idioma.value.id,json:data }).then(({result,json}) => {
        if(result){
          toast.success('Se ha guardado con éxito los cambios')
          data_json.value  = json

        }else{
          toast.info('NO se pudo guardar con éxito los cambios')
        }
      })
    }

    const agregarFila = () => {
      filteredData.value.push({
        shortLang: fila.value.llave,
        valor:fila.value.traduccion
      })

      items.value.push({
        shortLang: fila.value.llave,
        valor: fila.value.traduccion
      })
      data_json.value[fila.value.llave] = fila.value.traduccion
      limpiarFila()
      showAgregarFila.value =false

    }


    const limpiarFila = () => {
      fila.value = { llave: '', traduccion: '' }
    }
    
    const quitar = (short) => {
      delete data_json.value[short]
      data_json.value = {...data_json.value}


      let i = items.value.findIndex(v => v.shortLang === short)

      if(i != -1 ){
         items.value.splice(i, 1)
      }
      
      i = filteredData.value.findIndex(v => v.shortLang === short)

      if (i != -1) {
       filteredData.value.splice(i, 1)
      }
     

    }

    const cargarJson = () => {
      store.dispatch('idioma/fetchForShortLang', lang.value).then(({ json }) => {
        data_json.value = json
        
         items.value = Object.keys(data_json.value).map((clave) => ({
          shortLang: clave,
          valor: data_json.value[clave],
        }))
        total.value = items.value.length
        filteredData.value = items.value
        
      })
    }

    const fetchData = (ctx,n) => {
           const datos =  Object.keys(data_json.value).map((clave) => ({
            shortLang: clave,
            valor: data_json.value[clave],
          }))
          
          n(datos)
    } 

    const refetchData = () => {

      if (refTable.value) {
        refTable.value.refresh()
      }
    }

    watch([currentPage, perPage, data_json], () => {
      refetchData()
    })  


    const fileSelected = (ct) => {

    }



    // const selectNextRow = () => {
    //   const table = refTable.value;

    //   if (!table.isRowSelected()) {
        
    //     // Si no hay fila seleccionada, selecciona la primera fila
    //     if (table.localItems.length > 0) {
    //       refTable.value.selectRow(0);

    //        console.log(table);
    //     }
    //   } else{
    //     console.log(table.selectedRowIndex)
    //     // Si hay una fila seleccionada, selecciona la siguiente fila
    //     table.clearSelected();
    //     table.selectRow(table.selectedRowIndex + 1);
    //   }
    // };

    cargarJson();


  

    return {
      loading:computed(() => store.state.loading),
      idioma,
      data_json,
      guardar,
      showAgregarFila,
      fila,
      required,
      agregarFila,
      limpiarFila,
      quitar,


      tableColumns,
      sortBy,
      perPage,
      fetchData,
      refTable,
      isSortDirDesc,
      total,
      fileSelected,
      applySearchFilter,
      filteredData,
      searchQuery,
      items,
      refetchData   
    }
  }

}
</script>

<style lang="scss">
    .table-traducciones{
      max-height: 600px;
      overflow-y: auto;
    }
</style>