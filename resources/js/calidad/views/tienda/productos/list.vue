<template>
  <listado-productos :actions.sync="actions" class="ecommerce-application">
    <template #btn-action>
        <b-button size="sm" class="ml-sm-1 mt-1 mt-sm-0 d-flex align-items-center" variant="outline-primary"
          :to="{name:'producto.create'}" v-if="$can('write','productos')">
          {{ $t('Crear') }}
        </b-button>
    </template>
    <template #contenido="{ items, eliminar, itemView }">

        <section :class="itemView">
          <b-card v-for="producto in items" :key="producto.id" class="ecommerce-card" no-body>
        
            <div class="item-img text-center py-0">
              <b-link :to="{ name: 'producto.show', params: { id: producto.id } }" style="height:100%">
                <b-img :alt="producto.nombre" fluid class="card-img-top img-fluid" v-if="producto.imagenes.length"
                  :src="getImagenPrincipal(producto)" />
              </b-link>
            </div>
        
            <b-card-body>
              <div class="item-wrapper">
        
        
                <div>
                  <h2 class="item-price">
                    {{ producto.precio | currency(producto.tienda.divisa.iso) }}
                  </h2>
                </div>
              </div>
              <h6 class="item-name">
                <b-link class="text-body" :to="{ name: 'producto.show', params: { id: producto.id } }">
                  {{ producto.nombre }}
                </b-link>
               
              </h6>
              <b-card-text class="item-description" style="max-width:320px" >
                {{ producto.breve }}
              </b-card-text>

            </b-card-body>
        
            <!-- Product Actions -->
            <div class="item-options text-center">
              <div class="item-wrapper">
                <div class="item-cost">
        
                  <h4 class="item-price">
                    {{ producto.precio | currency(producto.tienda.divisa.iso) }}
                  </h4>
        
                </div>
              </div>
        
              <b-button-group size="sm" class="w-100">
        
                <b-button variant="primary" tag="a" class="btn-cart" :to="{name:'producto.edit',params:{id:producto.id}}"
                  v-if="$can('update','productos')">
                  <feather-icon icon="Edit3Icon" class="mr-50" />
                </b-button>
        
                <b-button variant="danger" tag="a" class="btn-cart" @click="eliminar(producto.id)"
                  v-if="$can('delete','productos')">
                  <feather-icon icon="Trash2Icon" class="mr-50" />
                </b-button>

                <b-button tag="a" class="btn-cart" variant="dark" v-if="$can('write','productos')" title="Imagenes" :to="{name:'producto.imagenes',params:{id:producto.id}}" >
                  <font-awesome-icon icon="fas fa-images"/>
                </b-button>
        
              
        
              </b-button-group>
        
            </div>
          </b-card>
        </section>
    

    </template>
  </listado-productos>
</template>

<script>

import { toRefs, ref, computed, onMounted } from '@vue/composition-api'

import useProductosList from './useProductosList.js'
import store from '@/store'

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
  BImg

} from 'bootstrap-vue'

export default {


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
    

  },

  setup() {

    const actions = useProductosList();

    onMounted(() => {

      setTimeout(() => {
        actions.refetchData()

      }, 500);

    });

    return {
      loading: computed(() => store.state.loading),
      actions,
      refTable: actions.refTable,
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

