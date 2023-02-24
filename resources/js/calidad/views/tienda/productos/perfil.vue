<template>
   <section class="app-ecommerce-details">

    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="!producto.id">
      <h4 class="alert-heading">
        {{ $t('Error Capturando producto') }}
      </h4>
      <div class="alert-body">
        {{ $t('No hemos podido capturar el producto, puedes volver al listado') }}
        <b-link class="alert-link" :to="{ name: isStore ? 'tienda.travel': 'producto.list'}" >
          {{ $t('Productos') }}
        </b-link>
        {{ $t('y volver a seleccionar el Producto.') }}
      </div>
    </b-alert>

    <!-- Content -->
    <b-card v-if="producto.id" no-body >
      <b-card-body>
        <b-row class="my-2">

          <b-col cols="12" md="8" class="d-flex  justify-content-center mb-2 mb-md-0" >
            <!-- Miniaturas -->
            <b-row class="w-100">
         
               <b-col cols="12" md="2" class="px-0 h-md-100">
                     <ul style="overflow-y: auto; padding-left: 5px; overflow-x: auto" class="d-flex d-md-block miniaturas-content">
                        
                        <li v-for="(imagen,i ) in producto.imagenes" :key="i" :class="{'img-active' : imagen.active}" style="max-height: 80px; margin:5px 0px; height:80px;padding:.5px; border:.5px solid rgba(0,0,0,.3); border-radius: 3px;"  >

                           <img :src="`/storage/productos/${imagen.imagen}`"  @click="seleccionarFoto(imagen)" @mouseover="seleccionarFoto(imagen)"  :alt="imagen.imagen" class="img-miniatura" style="object-fit:contain; height:100%; width:100%;">

                        </li>

                     </ul>
               </b-col>

               <b-col cols="12" md="10"  class="d-flex justify-content-center align-items-center">

                  <!-- <article class="img-central"> -->
                     <vue-hover-zoom :imageUrl="`/storage/productos/${getImagenSeleccionada().imagen}`"  class="img-central d-flex justify-content-center" :alt="producto.nombre" style="width:100%;height:100%;position:relative; object-fit:contain; ">
                    
                    </vue-hover-zoom>
                  <!-- </article> -->

               </b-col>

            </b-row>

          </b-col>

          <!-- Right: Producto Detalles -->
          <b-col cols="12" md="4" class="content-right p-1">

             <b-container fluid class="px-0 mx-0">
                <b-row>
                   <b-col cols="12">

                       <!-- Condicion de la publicacion -->
                        <b-badge variant="primary" class="mb-1" v-b-tooltip.hover="producto.categoria.descripcion">
                          {{ producto.categoria.nombre }}
                        </b-badge>

                        <b-badge class="" varaint="success">
                            {{ disponibles > 1 ? `${disponibles} productos disponible` : `${disponibles} producto disponible` }}
                        </b-badge>

                        <b-card-title>
                            <h3>{{ producto.nombre  }}</h3> 
                        </b-card-title>

                        <b-card-text class="item-company mb-0">
                        <span>{{ $t('Tienda') }}</span>

                       
                        </b-card-text>

                        <!-- Price And Ratings -->
                        <div class="ecommerce-details-price d-flex flex-wrap mt-1">
                          <h1 class="item-price mr-1">
                            <strong>
                                {{ producto.precio  | currency(producto.divisa.iso)}}
                            </strong>
                            
                          </h1>
                        
                        </div>

                       
                        <template v-if="producto.envio">

                          <el-divider content-position="left">
                            Información sobre envíos
                          </el-divider>

                          <section class="d-flex flex-column">
                            <h3>Precio:  <strong class="text-primary">{{ producto.envio.precio | currency(producto.divisa.iso) }}</strong> </h3>
                            <strong class="">Condiciones que aplican </strong>
                            <p class="text-justify">
                              {{ producto.envio.condiciones }}
                            </p>

                          </section>
                        </template>

                        <template v-if="producto.caracteristicas.length">
                           <hr>

                            <el-divider content-position="left">Características</el-divider>

                            <table class="table table-hover table-borderless w-auto" >
                              <tr v-for="({ nombre, valor }, i) in producto.caracteristicas" :key="i">
                                <td class="pl-0 pr-1">
                                  <font-awesome-icon icon="fas fa-check"/>
                                  {{ nombre }}
                                </td>

                                <td class="px-1">
                                  {{ valor }}
                                </td>
                              </tr>
                            </table>
                        </template>

                        <hr>

                      <div class="d-flex flex-column pt-1">
                        
                       
                        <b-button-group size="sm" class="w-100" v-if="!isStore">
                            <b-button variant="outline-secondary" class="btn-wishlist" v-if="$can('update','productos')" :to="{name:'producto.edit',params:{id:producto.id}}">
                            <feather-icon icon="Edit2Icon" class="mr-50"/>
                            <span>{{ $t('Editar') }}</span>
                          </b-button>
                          
                            <b-button variant="outline-danger" class="btn-wishlist " v-if="$can('delete','productos')" @click="eliminar(producto.id)">
                            <feather-icon icon="TrashIcon" class="mr-50"/>
                            <span>{{ $t('Eliminar') }}</span>
                          </b-button>

                        </b-button-group>

                        <b-button-group size="lg" v-else>
                          <b-button @click="agregarCarrito" variant="success">
                            <font-awesome-icon icon="fas fa-paper-plane"/>
                            Comprar
                          </b-button>
                        </b-button-group>

                        <section class="w-100 mt-1">
                          <strong class="text-danger">Nota:</strong>
                          <span class="text-justify">
                            Todos los productos fisicos se recogen en tienda; Los productos Digitales son enviados vía correo electrónico.
                          </span>

                        </section>
                      </div>

                   </b-col>

                </b-row>
             </b-container>

            
          </b-col>

        </b-row>

        <b-row>

           <b-col cols="12">

            <b-container fluid class="px-0 mx-0">
              <b-row>

                <b-col cols="12" v-if="producto.tiendas.length">
                  <!-- ubicación -->
                  <b-card-title>
                      <h1>{{ $t('Disponibilidad en tiendas') }}</h1> 
                  </b-card-title>
 
                  <GmapMap :center="{ lat: promedioLatitud, lng: promedioLongitud}" :zoom="3" map-type-id="terrain"
                    style="width: 100%; height: 300px" :options="{styles:stylos}" ref="mapa">
                  
                    <GmapMarker :visible="true" :draggable="false" :icon="iconMap" :clickable="true" v-for="(tienda,i) in producto.tiendas.filter(val => val.fisica)" :key="i" :position="{
                      lat: Number(tienda.lat),
                      lng: Number(tienda.lng)
                    }">
                  
                      <GmapInfoWindow :options="optionsPlace(tienda)">
                      </GmapInfoWindow>
                  
                    </GmapMarker>
                  
                  </GmapMap>

                </b-col>

              </b-row>

            </b-container>
            <hr>
            <b-card-title>
              <h1>{{ $t('Descripción') }}</h1> 
            </b-card-title>

            <div v-html="producto.descripcion"></div>

           </b-col>

           <b-col cols="12">

              <b-card-title>
                   <h1>{{ $t('Opiniones') }}</h1> 
              </b-card-title>

              <reviews-opinion 
                :promedioCalificacion="promedioCalificacion" 
                :cantidad="producto.opinions.length" 
                :porcentajeOpinions="porcentajeOpinions" 
                :model="{...producto,...{model_type:'App\\Models\\Producto',model_id:producto.id}}"></reviews-opinion>
           </b-col>



        </b-row>
      </b-card-body>
    </b-card>



    <b-sidebar v-model="addCarrito" no-header-close >
                  <template #title>
                    <h3>Elija la cantidad</h3>
                  </template>

                  <b-container fluid >
                    <b-row>
                      <b-col>
                          <b-card class="ecommerce-card" no-body>
        
                              <div class="item-img text-center py-0">
                                <b-link :to="{
                                  name: !isStore ? 'producto.show' : 'tienda.travel.show.producto',
                                  params: { id: producto.id }
                                }" style="height:100%">
                                  <b-img :alt="producto.nombre" fluid class="card-img-top img-fluid" v-if="producto.imagenes.length"
                                    :src="getImagenPrincipal(producto)" />
                                </b-link>
                              </div>
                    
                              <b-card-body>
                                <div class="item-wrapper">
                    
                                  <div>
                                    <h2 class="item-price">
                                      {{ producto.precio | currency(producto.id ? producto.divisa.iso : 'MXN') }}
                                    </h2>

                                    <b-badge variant="primary">{{ producto.id ? producto.categoria.nombre : '' }}</b-badge>
                                  </div>
                                </div>
                              
                                <h6 class="item-name">
                                  <b-link class="text-body" :to="{
                                    name: !isStore ? 'producto.show' : 'tienda.travel.show.producto',
                                    params: { id: producto.id }
                                  }">
                                    {{ producto.nombre }}
                                  </b-link>
                          
                                </h6>

                              </b-card-body>

                          </b-card>

                          <b-form-group>
                            <template #label>
                              Tienda en la que va a retirar
                            </template>

                            <validation-provider name="tienda_id" rules="required" #default="{ valid, errors }">

                              <v-select v-model="formulario.tienda_id" :options="producto.tiendas" :reduce="option => option.id" label="nombre">
                              </v-select>

                              <b-form-invalid-feedback :state="valid">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                            </validation-provider>


                          </b-form-group>

                            <b-form-group v-if="formulario.tienda_id">
                              <template #label>
                                Cantidad de productos
                              </template>

                              <validation-provider name="tienda_id" rules="required" #default="{ valid, errors }">
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
                              Comprar
                        </b-button>

                        <b-button variant="dark" @click="hide">
                          <font-awesome-icon icon="fas fa-times"/>
                          Cerrar
                        </b-button>

                      
                    </b-button-group>
                  </template>

              </b-sidebar>

  </section>
</template>

<script>

import { useRouter } from '@core/utils/utils'

import store from '@/store'
import { ref,toRefs,onMounted,onActivated,computed,watch,nextTick,inject,h} from '@vue/composition-api'

import {
  ValidationProvider
} from 'vee-validate'
import vSelect from 'vue-select'

import {required} from '@validations'
import * as VueGoogleMaps from 'vue2-google-maps'
import {
  BCard, BCardBody, BRow, BCol, BImg, BCardText, BLink, BButton, BDropdown, BDropdownItem, BAlert,
  BCarousel,
  BCarouselSlide,
  BCardTitle,
  VBToggle,
  BCollapse,
  BButtonGroup,
  BCardHeader,
  BAvatar,
  BCardFooter,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BForm,
  VBTooltip,
  BTabs,
  BTab,
  BAvatarGroup,
  BContainer,
  BBadge,
  BModal,
  BFormGroup,
  BFormSpinbutton,
  BFormInvalidFeedback,
    BSidebar

  
} from 'bootstrap-vue'
import PayPal from 'vue-paypal-checkout'
import Ripple from 'vue-ripple-directive'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {Notification} from 'element-ui';
import	i18n from '@/libs/i18n'

import  VueHoverZoom  from  'vue-hover-zoom'
import Swal from 'sweetalert2'
import router from '@/router'

import useAuth from '@core/utils/useAuth'

export default {

   directives: {
       Ripple,
       'b-toggle':VBToggle,
       'b-tooltip':VBTooltip
   },

  props:{
    id:Number|String,
    isStore:Boolean
  },


  components: {
    // BSV\
    BContainer,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BImg,
    BCardText,
    BLink,
    BButton,
    BDropdown,
    BDropdownItem,
    BAlert,
    BCarousel,
    BCarouselSlide,
    BCardTitle,
    BCollapse,
    BButtonGroup,
    BCardHeader,
    BAvatar,
    VuePerfectScrollbar,
    BCardFooter,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BForm,
    BTabs,
    BTab,
    VueHoverZoom,
    BAvatarGroup,
    BBadge,
    ReviewsOpinion: () => import('components/ReviewsOpinion.vue'),
    BModal,
    ValidationProvider,
    BFormGroup,
    BFormSpinbutton,
    BFormInvalidFeedback,
    PayPal,
    vSelect,
    BSidebar
  },

  setup(props,{emit}) {
  
    const { id } = toRefs(props)
    const { producto,productos } =toRefs(store.state.producto)
    const { usuario } = toRefs(store.state.usuario)
    const { is_loggin } = useAuth(); 
    const { sistema } = toRefs(store.state.sistema)
    const mapa = ref(null)
    const addCarrito = ref(false);
    const { formulario,carrito } = toRefs(store.state.carrito)
    const swal = inject('swal')

    


    const seleccionarFoto = (imagen) => {

          producto.value.imagenes.forEach((foto) => {
                if(foto.portada){
                    foto.portada = false;
                }
          });

          var i = producto.value.imagenes.findIndex(foto => foto.id == imagen.id);

          producto.value.imagenes[i].portada = true;

    }

    const getImagenSeleccionada = () => {
          let foto = producto.value.imagenes.find(val => val.portada);
          return foto;
    }

   const cargarForm = () => {

      if(!productos.value.length){
        store.dispatch('producto/fetch',id.value)
      }else{
        store.commit('producto/capturar',id.value)
      }

      

   }

   cargarForm()
   
   watch([producto],(val) => {
    
   })

   watch([id,productos],() => cargarForm())

 



   const iconMap =  ref({
      path: "M531.6 103.8L474.3 13.1C469.2 5 460.1 0 450.4 0H93.6C83.9 0 74.8 5 69.7 13.1L12.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM483.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H112V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H432c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z",
      fillColor: "#e01283",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: .1,
    })

    onMounted(() => {

      // console.log(mapa.value)
      
      // infoWindow.addListener('closeclick', () => {
        // Handle focus manually.
      // });

    

      // iconMap.value.anchor = new google.maps.Point(15, 30);

     


    })

    const agregarCarrito = (produc) => {
      store.commit('producto/capturar', produc)
      addCarrito.value = true;
    }

    const verificarTiendas = () => {

      if (carrito.value.length) {

        return carrito.value.filter(val => val.pivot.tienda_id != formulario.value.tienda_id).length > 0 ? false : true

      } else {
        return true;
      }

    }

    const guardarCarrito = () => {

      if(verificarTiendas()){
        formulario.value.producto_id = producto.value.id
        formulario.value.precio_unitario = producto.value.precio
        formulario.value.monto = producto.value.precio * formulario.value.cantidad


        store.dispatch('carrito/agregarCarrito', formulario.value).then(({ result }) => {

          if (result) {
            addCarrito.value = false
            // swal({
            //   title: "Este producto se ha agregado al carrito de forma Automática.",
            //   text: "Tiene 2 horas para finalizar la compra, de lo contrario, su carrito se vaciará de forma automática",
            //   icon: "success",
            //   confirmButtonText: 'Ok!',
            //   showCancelButton: false,
            // });
            router.push({ name: 'caja' });

          } else {
            toast.info('No se pudo agregar al carrito el producto, inténte de nuevo .', { position: 'bottom-right' })
          }
        }).catch(e => {
          console.log(e)
        })
      }else{
        swal({
          title: "En el carrito de compra ya hay productos de otra Tienda",
          text: "Finaliza la compra de tus productos que tienes en tu carrito primero",
          icon: "info",
          confirmButtonText: 'Ok!',
          showCancelButton: false,
        });
      }
      
    }

    
   return {
    addCarrito,
      producto,
      usuario,
      seleccionarFoto,
      loading:computed(() => store.state.loading),
      getImagenSeleccionada,
      promedioCalificacion: computed(() => store.getters['producto/promedioCalificacion'](producto.value)),
      porcentajeOpinions: (cal) => store.getters['producto/porcentajeOpinions'](cal),
      required,
      formulario,
      sistema,
      iconMap,
      agregarCarrito,
      guardarCarrito,
      disponibles:computed(() => {
        if(producto.value.tiendas.length){
           return producto.value.tiendas.map(val => val.pivot.cantidad)
           .reduce((a, b) => a + b, 0);
        }else{
          return 0;
        }
       
      }),

      optionsPlace: (tienda) => ({ content: `<strong>${tienda.nombre} <br> Disponibilidad: ${tienda.pivot.cantidad} Producto </strong>` }),

      promedioLatitud:computed(() => {

        let sum = 0;

        producto.value.tiendas.filter(val => val.fisica).forEach(val => {
            sum = sum + Number(val.lat)
        })


        let result = sum / producto.value.tiendas.filter(val => val.fisica).length


        return result
      }),

      getMaxCantidad: computed(() => {
        return producto.value.tiendas.find(val => val.id === formulario.value.tienda_id).pivot.cantidad || 0
      }),

      getImagenPrincipal: (produc) => {

        const imagen_principal = produc.imagenes.find(val => val.portada)

        if (imagen_principal) {
          return `/storage/productos/${imagen_principal.imagen}`
        }
        return `/storage/productos/${produc.imagenes[0].imagen}`
      },


      promedioLongitud: computed(() => {
          let sum = 0;

          producto.value.tiendas.forEach(val => {
            sum += val.fisica ? Number(val.lng) : 0

          })

          let result = sum / producto.value.tiendas.filter(val => val.fisica).length
          // console.log(result)

          return  result

      }),

      stylos: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ] ,
      mapa

    }
  },
}
</script>

<style lang="scss">

.user-chats{
   padding: 1rem 0.5rem;
}

.card-text img{
   max-width:  100% !important;
}

.card-text iframe{
      width: 100%;
    height: 450px !important;
}

.img-active{
	border:1.5px solid #00aeff !important;
	padding:1px;
	border-radius:3px !important; 
}

.img-miniatura{
	cursor:pointer;
}


.img-central div{
	background-size:contain !important;
}

.img-central img{
	// max-height:350px !important;
   max-height: 470px !important;
   width: auto !important;
}




.miniaturas-content{
   max-height: auto;
}

@media(min-width:762px){
	.miniaturas-content{
      max-height: 400px;
   }

}

@media(min-width:768px){
	.content-imagenes{
		max-height:450px;
		min-height: 450px;
	}

}



</style>

<style lang="scss">

@import "@core/scss/base/pages/app-ecommerce-details.scss";
.carousel-item img{
   // min-height: 290px;
   max-height: 450px;
   object-fit: contain;
   object-position: center center;

}

.content-right{
   border: 0.1rem solid rgba(0,0,0,0.3);
   border-radius: 10px;
}

.table-right tr td {
    padding-top: 0.3rem !important;
    padding-bottom: 0.3rem !important;
}

.hover-zoom-image img {
    width: 100% !important;
    margin-bottom: -4px;
    transition: all .3s linear;
    object-fit: contain;
    background-color: black;
}


</style>

