<template>
   <b-container fluid class="px-0 mx-0">
    
    <!-- Titulo -->
    <b-row>
      <b-col cols="12">
          <slot name="titulo" :total="total">
            
          </slot>
      </b-col>
    </b-row>

    <!-- Contenido -->
    <b-row>
      
      <!-- Filtro Producto -->

      <b-col cols="12" md="3">
        <b-card>
            <!-- Price Slider -->
            <div class="price-slider">
              
              <h6 class="filter-title">
                {{ $t('Rango de precios') }}
              </h6>

              <vue-slider :value="precios" @change="precios = $event" lazy :min="precio_minimo" :max="precio_maximo"
                 :tooltipFormatter="(val) => `$ ${val}`" silent :interval=".2">
                 
                </vue-slider>

            </div>

            <!-- Categorias -->

           <b-form-group label="Categorías">
            <b-form-checkbox-group v-model="categoria_id" :options="categorias" text-field="nombre" value-field="id" stacked >
            
            </b-form-checkbox-group>

           </b-form-group>
        </b-card>
      </b-col>

      <b-col cols="12" md="9">
        <b-container fluid>
          <b-row>
            
            <b-col cols="12">
              <section id="ecommerce-header">
                <div class="ecommerce-header-items d-flex justify-content-between align-items-center flex-wrap">
              
                  <div class="result-toggler">

                    <div class="search-results">
                      {{ total }} {{ $t('Productos encontrados') }}
                    </div>
              
                  </div>
              
                  <div class="view-options d-flex flex-wrap">
              
                    <!-- ordenar por -->
                    <v-select v-model="sortBy" :options="sortByOptions" label="text" :reduce="option => option.value" style="min-width: 150px;">
                    </v-select>
              
                    <!-- Tipos de vistas a listar  -->
                    <b-form-radio-group v-model="itemView" class="ml-1 ml-md-1 list item-view-radio-group" buttons size="sm"
                      button-variant="outline-primary">
                      <b-form-radio v-for="option in itemViewOptions" :key="option.value" :value="option.value">
                        <feather-icon :icon="option.icon" size="18" />
                      </b-form-radio>
                    </b-form-radio-group>
              
                    <slot name="btn-action">
                      
                    </slot>

                  </div>
                </div>
              
              </section>

            </b-col>

            <b-col cols="12" class="mt-1">

              <b-input-group class="input-group-merge">
                <b-form-input v-model="searchQuery" placeholder="Buscar Productos" class="search-product" />
                <b-input-group-append is-text>
                  <feather-icon icon="SearchIcon" class="text-muted" />
                </b-input-group-append>
              </b-input-group>

            </b-col>

             <b-col cols="12">
              <section  class="w-100 mt-1" style="min-height:100px">
                <slot name="contenido" :items="items" :eliminar="eliminar" :fetchData="fetchData" 
                  :sortB="sortBy" :isSortDirDesc="isSortDirDesc" :perPage="perPage" :itemView="itemView">

                </slot>
              </section>
             </b-col>
             <b-col cols="12">
                <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" class="mt-1" />
             </b-col>
          </b-row>
        </b-container>
      </b-col>


    </b-row>

   </b-container>
</template>

<script>

import {
  BContainer,
  BCard,
  BRow,
  BCol,
  BButton,
  BButtonGroup,
  BTable,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BCarousel,
  BCarouselSlide,
  BImg,
  VBPopover,
  BSpinner,
  BFormCheckboxGroup,
  BFormGroup,
  BDropdown,
  BDropdownItem,
  BFormRadio,
  BFormRadioGroup

} from 'bootstrap-vue'

import store from '@/store'
import router from '@/router'
import Ripple from 'vue-ripple-directive'

import { ref, toRefs, computed, onActivated,onMounted,watch } from 'vue'
import VueSlider from 'vue-slider-component'
import vSelect from 'vue-select'
import { regresar } from '@core/utils/utils.js'

export default {

  components: {
    BContainer,
    BCard,
    BRow,
    BCol,
    BButton,
    BButtonGroup,
    BTable,
    BInputGroup,
    BFormInput,
    BCarousel,
    BCarouselSlide,
    BInputGroupAppend,
    BImg,
    perPage: () => import('components/PerPage.vue'),
    paginateTable: () => import('components/PaginateTable.vue'),
    BSpinner,
    VueSlider,
    BFormCheckboxGroup,
    BFormGroup,
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    vSelect

  },

  directives: {
    'b-popover': VBPopover,
    Ripple,
  },


  props: {
    actions: Object | Function,
    isTable: Boolean,
    hideFooter: Boolean,
    hideHeader: Boolean
  },


  setup(props,{emit}) {

    const { actions } = toRefs(props)
    let range_precio = ref([0, 20000]);

    const itemView = ref('grid-view')

    const itemViewOptions = ref([
      { icon: 'GridIcon', value: 'grid-view' },
      { icon: 'ListIcon', value: 'list-view' },
    ]);

    itemView.value = localStorage.getItem('disposicion_producto') || 'grid-view';

    watch(itemView , (v) => {
        localStorage.setItem('disposicion_producto',v)
        refetchData()
    })


    const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      fetchData,
      eliminar,
      items,
      categorias,
      categoria_id,
      precios,
      sortByOptions
    } = actions.value;

    onActivated(() => refetchData())


    const cargar_rango_precio = () => {


      axios.get('/api/productos/rango/precios').then(({ data }) => {
       
        range_precio.value = data
         precios.value = data
      })

    }

    onMounted(() => {
      cargar_rango_precio()
    })

   

    return {
      loading:computed(() => store.state.loading),

      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      fetchData,
      eliminar,
      items,
      categorias,
      categoria_id,
      precios,

      range_precio,
      itemView,
      itemViewOptions,
      sortByOptions,
      precio_minimo:computed(() => range_precio.value[0]),
      precio_maximo: computed(() => range_precio.value[1]),

    }

  }


}
</script>

<style lang="scss" scoped>
.logotipos {
   width: 100% !important;
   height: auto;
   object-fit: cover;
}
</style>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-slider.scss';
</style>



<style lang="scss">
   @import "~@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}

.img-fluid {
    max-width: 100%;
    height: auto;
}


.ecommerce-application .grid-view {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
}

@media (max-width: 575.98px){
   .ecommerce-application .grid-view {
      grid-template-columns: 1fr !important;
   }

}


@media (max-width: 991.98px){
   .ecommerce-application .grid-view {
      grid-template-columns: 1fr 1fr;
   }
}


.img-fluid {
    height: 100%;
    object-fit: cover;
    object-position: top center;
}


.content-drag{
   border: 1px dotted rgba(255,255,255,0.3);
   border-radius: 10px;
   padding: 0.3rem;
   min-height: 55px;
}



</style>


