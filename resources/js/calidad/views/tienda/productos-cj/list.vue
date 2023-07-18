<template>
      <listado-productos :actions.sync="actions" class="ecommerce-application" hideSliderPrices cjDropShipping placeholderSearch="Buscar por categoría(palabra clave),SKU del producto, ID del producto">

        <template #contenido="{ items, itemView }">
          <section :class="itemView">
              <b-card v-for="producto in items" :key="producto.pid" class="ecommerce-card" no-body>
            
                <div class="item-img text-center py-0">
                  <b-link :to="{ name: 'producto.show.cj', params: { id: producto.pid } }" style="height:100%">
                    <b-img :alt="producto.productNameEn" fluid class="card-img-top img-fluid"
                      :src="producto.productImage" />
                  </b-link>
                </div>
            
                <b-card-body>
                  <div class="item-wrapper">
            
                    <div>
                      <h2 class="item-price">
                        <!-- <template v-if="producto.divisa.iso.toUpperCase() == 'TP'">
                          Tp{{ producto.precio | currency }}
                        </template> -->
                        <!-- <template v-else> -->
                          {{ producto.sellPrice | currency }}
                        <!-- </template> -->
                        
                      </h2>

                      <b-badge variant="primary">{{ producto.categoryName }}</b-badge>
                    </div>
                  </div>
                  <h6 class="item-name">
                    <b-link class="text-body" :to="{ name: 'producto.show.cj', params: { id: producto.pid } }">
                      {{ producto.productNameEn }}
                    </b-link>
                  
                  </h6>
                  <!-- <b-card-text class="item-description" style="max-width:320px" >
                    {{ producto.breve }}
                  </b-card-text> -->

                </b-card-body>
            
                <div class="item-options text-center">
                  <div class="item-wrapper">
                    <div class="item-cost">
            
                      <h4 class="item-price">
                        {{ producto.sellPrice | currency() }}
                      </h4>
            
                    </div>
                  </div>
            
                  <b-button-group size="sm" class="w-100">
            
                  </b-button-group>
            
                </div>
              </b-card>

            
          </section>      

      </template>

    </listado-productos>

</template>

<script>

import { toRefs, ref, computed, onMounted,inject } from 'vue'

import useProductosList from './useProductosList.js'
import store from '@/store'
import vSelect from 'vue-select'

import {
  BCard,
  BButtonGroup,
  BButton,
  BTable,
  BMedia,
  BContainer,
  BRow,
  BCol,
  BCarousel,
  BCarouselSlide,
  BLink,
  BAvatar,
  BCardText,
  BCardBody,
  BImg,
  BBadge,
  BSidebar,
  BModal,
  VBTooltip,
  BFormInvalidFeedback,
  BFormGroup,
  BFormSpinbutton,

} from 'bootstrap-vue'

import useAuth from '@core/utils/useAuth'

import {ValidationProvider} from 'vee-validate'
import {required}  from '@validations'
export default {

  props:{
    isStore:Boolean
  },

  directives:{
    'b-tooltip':VBTooltip
  },

  
  components: {
    ListadoProductos: () => import('components/ListadoProductos.vue'),
    BCard,
    BButtonGroup,
    BButton,
    BTable,
    BMedia,
    BContainer,
    BRow,
    BCol,
    BCarousel,
    BCarouselSlide,
    BLink,
    BAvatar,
    BCardText,
    BCardBody,
    BImg,
    BBadge,
    BSidebar,
    BModal,
    BFormInvalidFeedback,
    BFormGroup,
    BFormSpinbutton,
    ValidationProvider,
    vSelect
  },

  setup() {
    const actions = useProductosList();

    const swal = inject('swal')

    const {
      is_loggin
    } = useAuth();

    onMounted(() => {
      setTimeout(() => {
        actions.refetchData()
      }, 500);
    });
  
    return {
      is_loggin,
      loading: computed(() => store.state.loading),
      actions,
      refTable: actions.refTable,
      required,
   
      getImagenPrincipal: (produc) => {

        const imagen_principal = produc.imagenes.find(val => val.portada)

        if (imagen_principal) {
          return `/storage/productos/${imagen_principal.imagen}`
        }
        return `/storage/productos/${produc.imagenes[0].imagen}`
      }

    }

  }
}
</script>


<style lang="scss">
@import "@core/scss/base/pages/app-ecommerce.scss";

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



<style lang="scss">
  .card-product {

    .media-aside{
      width:220px;
    }
    

  }
</style>

