<template>
      <listado-productos :actions.sync="actions" class="ecommerce-application">

      <template #btn-action v-if="!isStore">
          <b-button size="sm" class="ml-sm-1 mt-1 mt-sm-0 d-flex align-items-center" variant="outline-primary"
            :to="{ name: 'producto.create' }" v-if="$can('write', 'productos')">
            {{ $t('Crear') }}
          </b-button>
      </template>

      <template #contenido="{ items, eliminar, itemView }">

          <section :class="itemView">
              <b-card v-for="producto in items" :key="producto.id" class="ecommerce-card" no-body>
            
                <div class="item-img text-center py-0">
                  <b-link :to="{ name: !isStore ? 'producto.show' : 'tienda.travel.show.producto', params: { id: producto.id } }" style="height:100%">
                    <b-img :alt="producto.nombre" fluid class="card-img-top img-fluid" v-if="producto.imagenes.length"
                      :src="getImagenPrincipal(producto)" />
                  </b-link>
                </div>
            
                <b-card-body>
                  <div class="item-wrapper">
            
                    <div>
                      <h2 class="item-price">
                        <template v-if="producto.divisa.iso.toUpperCase() == 'TP'">
                          Tp{{ producto.precio | currency }}
                        </template>
                        <template v-else>
                          {{ producto.precio | currency(producto.divisa ? producto.divisa.iso : 'MXN') }}
                        </template>
                        
                      </h2>

                      <b-badge variant="primary">{{ producto.categoria.nombre }}</b-badge>
                    </div>
                  </div>
                  <h6 class="item-name">
                    <b-link class="text-body" :to="{ name: !isStore ? 'producto.show' : 'tienda.travel.show.producto', params: { id: producto.id } }">
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
                        {{ producto.precio | currency(producto.divisa ? producto.divisa.iso : 'MXN') }}
                      </h4>
            
                    </div>
                  </div>
            
                  <b-button-group size="sm" class="w-100" v-if="!isStore">
            
                    <b-button variant="primary" tag="a" class="btn-cart" :to="{ name: 'producto.edit', params: { id: producto.id } }"
                      v-if="$can('update', 'productos')">
                      <feather-icon icon="Edit3Icon" class="mr-50" />
                    </b-button>
            
                    <b-button variant="danger" tag="a" class="btn-cart" @click="eliminar(producto.id)"
                      v-if="$can('delete', 'productos')">
                      <feather-icon icon="Trash2Icon" class="mr-50" />
                    </b-button>

                    <b-button tag="a" class="btn-cart" variant="dark" v-if="$can('write', 'productos')" title="Imagenes" :to="{ name: 'producto.imagenes', params: { id: producto.id } }" >
                      <font-awesome-icon icon="fas fa-images"/>
                    </b-button>
            
                  </b-button-group>

                  <b-button-group v-else class="w-100" >
                      <b-button tag="a" class="w-100" variant="primary" title="Agregar al carrito" v-b-tooltip.hover @click="agregarCarrito(producto.id)" v-if="producto.tipo_producto != 2" >
                        <font-awesome-icon icon="fas fa-cart-plus" />
                        Agregar Carrito
                      </b-button>
                  </b-button-group>
                </div>
              </b-card>

            
          </section>

           <b-sidebar v-model="addCarrito" no-header-close >
                <template #title>
                  <h3>Agregar al carrito</h3>
                </template>

                <b-container fluid >
                  <b-row>
                    <b-col cols="12">
                        <b-card class="ecommerce-card" no-body>
        
                            <div class="item-img text-center py-0">
                              <b-link :to="{ name: !isStore ? 'producto.show' : 'tienda.travel.show.producto', 
                              params: { id: product.id } }" style="height:100%">
                                <b-img :alt="product.nombre" fluid class="card-img-top img-fluid" v-if="product.imagenes.length"
                                  :src="getImagenPrincipal(product)" />
                              </b-link>
                            </div>
                    
                            <b-card-body>
                              <div class="item-wrapper">
                    
                                <div>
                                  <h2 class="item-price">
                                    {{ product.precio | currency(product.divisa ? product.divisa.iso : 'MXN') }}
                                  </h2>

                                  <b-badge variant="primary">{{ product.id ? product.categoria.nombre : '' }}</b-badge>
                                </div>
                              </div>
                              
                              <h6 class="item-name">
                                
                                <b-link class="text-body" :to="{ name: !isStore ? 'producto.show' : 'tienda.travel.show.producto', 
                                params: { id: product.id } }">
                                  {{ product.nombre }}
                                </b-link>
                          
                              </h6>

                            </b-card-body>

                        </b-card>

                        <b-form-group v-if="!product.isChino">
                              <template #label>
                                Tienda que ofrece el producto y/o servicio.
                              </template>

                              <validation-provider name="tienda_id" rules="required" #default="{ valid, errors }">

                                <v-select v-model="formulario.tienda_id" :options="product.tiendas" :reduce="option => option.id" label="nombre">
                                </v-select>

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>


                            </b-form-group>


                            <b-form-group v-else description="Puede ser el color y el tamaño, elija el que desee">
                                <template #label>
                                  Elija la variación deseada 
                                </template>

                                <validation-provider name="vid" rules="required" #default="{ errors, valid }">

                                    <v-select v-model="formulario.vid" :reduce="(option) => option.vid" :filter="filtrarVariant" :options="variantColor" style="width:230px" label="variantKey" @input="variantSelect">

                                        <template #selected-option="{ variantImage, variantNameEn, variantKey }">
                                          <b-avatar :src="variantImage" rounded="circle" class="mr-1" size="20pt" />
                                          <small :title="variantNameEn" v-b-tooltip:hover> {{ variantKey }}</small>
                                        </template>   

                                        <template #option="{ variantImage, variantNameEn, variantKey }">
                                          <b-avatar :src="variantImage" rounded="circle" size="20pt" />
                                           <small :title="variantNameEn"> {{ variantKey }}</small>
                                        </template>

                                        <template #no-options>
                                          Sin Variante
                                        </template>

                                    </v-select>

                                    <b-form-invalid-feedback :state="valid">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                </validation-provider>
                            </b-form-group>

                              <b-form-group v-if="formulario.tienda_id || formulario.vid">
                                <template #label>
                                  Cantidad de productos
                                </template>

                                <validation-provider name="cantidad" rules="required" #default="{ valid, errors }">
                                  <b-form-spinbutton v-model="formulario.cantidad" :min="0" :max="getMaxCantidad"></b-form-spinbutton>
                                  <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>


                              </b-form-group>

                        


                  
                    </b-col>
                  </b-row>
                </b-container>


                <template #footer="{ hide }">
                  <b-button-group  class="p-1">

                      <b-button variant="primary" @click="guardarCarrito" v-loading="loading" :disabled="formulario.cantidad < 1 || loading">
                            <font-awesome-icon icon="fas fa-cart-plus"/>
                            Agregar al Carrito
                      </b-button>

                      <b-button variant="dark" @click="hide">
                        <font-awesome-icon icon="fas fa-times"/>
                        Cerrar
                      </b-button>

                      
                  </b-button-group>
                </template>

            </b-sidebar>
      

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
    const addCarrito = ref(false)
    const { producto : product } = toRefs(store.state.producto)
    const stock = ref(0)
    const tasaDivisa = ref(null)
    
    const { formulario,carrito } = toRefs(store.state.carrito)

    const swal = inject('swal')
    const {
      is_loggin
    } = useAuth();

    onMounted(() => {

      setTimeout(() => {
        actions.refetchData()

      }, 500);

    });

    const agregarCarrito =(produc) => {
      store.commit('producto/capturar',produc)
      addCarrito.value = true;
    }

    const verificarTiendas =() => {

        if(carrito.value.length){

          if(formulario.value.isChino){
            return carrito.value.filter(val => !val.isChino).length ? false : true;
          }else{
            return carrito.value.filter(val => val.pivot.tienda_id != formulario.value.tienda_id).length ? false : true;
          }

        }else{
          return true;
        }

    }


    const guardarCarrito = () => {

      if(verificarTiendas()){

        formulario.value.producto_id = product.value.id
        formulario.value.precio_unitario = product.value.precio
        formulario.value.monto = product.value.precio * formulario.value.cantidad
        formulario.value.isChino = product.value.isChino

        store.dispatch('carrito/agregarCarrito', formulario.value).then(({ result }) => {

          if (result) {
            addCarrito.value = false
            actions.refetchData();
            swal({
              title: "Agregado al carrito con éxito",
              text: "Tiene 2 horas para finalizar la compra, de lo contrario, su carrito se vaciará de forma automática",
              icon: "success",
              confirmButtonText: 'Ok!',
              showCancelButton: false,
            });
          } else {
            toast.info('No se pudo agregar al carrito el producto, inténte de nuevo .', { position: 'bottom-right' })
          }
        }).catch(e => {
          console.log(e)
        })
      }else{

         swal({
          title: "En el carrito de compra ya hay productos de otra Tienda o productos que son enviables que no pueden compartir el carrito con otros productos que se retiran en tienda ",
          text: "Finaliza la compra de tus productos que tienes en tu carrito primero",
          icon: "info",
          confirmButtonText: 'Ok!',
          showCancelButton: false,
        });

      }
      
    }

    const variantSelect = (vid) => {

      let variant = product.value.variants.find(val => val.vid == vid)

      if (variant != undefined) {

        let img = product.value.cj.productImageSet.find(value => value.image == variant.variantImage);

        if (img != undefined) {

          seleccionarFoto(img);
        }

      }

      store.dispatch('producto/cjProductStock', formulario.value.vid).then(({ cantidad, tasa }) => {
        stock.value = cantidad
        tasaDivisa.value = tasa
      })
    }

    const variantColor = computed(() => {
      return product.value.variants;
    })

    return {
      is_loggin,
      variantColor,
      variantSelect,
      stock,
      tasaDivisa,
      loading: computed(() => store.state.loading),
      actions,
      refTable: actions.refTable,
      agregarCarrito,
      addCarrito,
      product,
      required,
      formulario,
      guardarCarrito,
      getMaxCantidad: computed(() => {

        if (product.value.isChino) {
          return stock.value;
        }

        return product.value.tiendas.find(val => val.id === formulario.value.tienda_id).pivot.cantidad || 0
      }),
      getImagenPrincipal: (produc) => {

        const imagen_principal = produc.imagenes.find(val => val.portada)

        if (imagen_principal != undefined){
            return `/storage/productos/${imagen_principal.imagen}`
        }
        return `/storage/productos/${produc.imagenes[0].imagen}`

      },

      filtrarVariant: ({ variantKey, variantImage, vid }, label, search) => {
        return (variantKey || variantImage || vid || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      },
        

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

