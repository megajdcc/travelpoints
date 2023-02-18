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
                     <vue-hover-zoom :imageUrl="`/storage/productos/${getImagenSeleccionada().imagen}`"  class="img-central d-flex justify-content-center" :alt="producto.nombre" style="width:100%;height:100%;position:relative; object-fit:contain; "></vue-hover-zoom>
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
                            {{ producto.disponibles > 1 ? `${producto.disponibles} productos disponible` : `${producto.disponibles} producto disponible` }}
                        </b-badge>

                        <b-card-title>
                            <h3>{{ producto.nombre  }}</h3> 
                        </b-card-title>

                        <b-card-text class="item-company mb-0">
                        <span>{{ $t('Tienda') }}</span>

                        <b-link class="company-name">
                           {{  `${producto.tienda.nombre}` }}
                        </b-link>
                        </b-card-text>

                        <!-- Price And Ratings -->
                        <div class="ecommerce-details-price d-flex flex-wrap mt-1">
                          <h1 class="item-price mr-1">
                            <strong>
                                {{ producto.precio  | currency(producto.tienda.divisa.iso)}}
                            </strong>
                            
                          </h1>

                        
                        
                        </div>

                       
                        <template v-if="producto.envio">

                          <el-divider content-position="left">
                            Información sobre envíos
                          </el-divider>

                          <section class="d-flex flex-column">
                            <h3>Precio:  <strong class="text-primary">{{ producto.envio.precio | currency(producto.tienda.divisa.iso) }}</strong> </h3>
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
                          <b-button @click="comprar()" variant="success">
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

                <b-col cols="12" v-if="producto.tienda.fisica">
                  <!-- ubicación -->
                  <b-card-title>
                      <h1>{{ $t('Ubicación de la tienda') }}</h1> 
                  </b-card-title>
                <table class="table table-sm table-hover ">
                  <tr>
                    <td>Pais:</td><td> {{ producto.tienda.estado.pais.pais }}</td>
                  </tr>

                  <tr>
                    <td>Estado:</td>
                    <td> {{ producto.tienda.estado.estado }}</td>
                  </tr>

                  <tr>
                    <td>Ciudad:</td>
                    <td> {{ producto.tienda.ciudad ? producto.tienda.ciudad.ciudad : 'Sin definir' }}</td>
                  </tr>

                  <tr>
                    <td>Dirección:</td>
                    <td> {{ producto.tienda.direccion }}</td>
                  </tr>

                  <tr>
                    <td>Iata:</td>
                    <td> {{ producto.tienda.iata ? `${producto.tienda.iata.codigo} - ${producto.tienda.iata.aeropuerto}` : 'Sin definir' }}</td>
                  </tr>

                  <tr>
                    <td colspan="2">
                        <GmapMap :center="{ lat: Number(producto.tienda.lat), lng: Number(producto.tienda.lng) }" :zoom="17" map-type-id="terrain"
                          style="width: 100%; height: 300px">
                        
                          <GmapMarker :key="0" :position="{
                            lat: Number(producto.tienda.lat),
                            lng: Number(producto.tienda.lng)
                          }" :visible="true" :draggable="false" :clickable="false">
                        
                            <GmapInfoWindow :options="optionsPlace(producto.tienda)">
                            </GmapInfoWindow>
                        
                          </GmapMarker>
                        
                        </GmapMap>
                    </td>
                  </tr>


                </table>
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


     <b-modal v-model="isCompra" size="sm" centered  no-close-on-backdrop hide-backdrop lazy @hide="showPaypal = false" >
      
      <template #modal-title>
        Realizar Compra de {{ producto.nombre }}
      </template>

      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <b-form-group label="¿Cuantos quieres?" v-for="(produc,i) in formulario.productos" :key="i">
              <validation-provider name="cantidad" rules="required" #default="{errors,valid}">
                <b-form-spinbutton v-model="produc.cantidad" :state="valid" :min="0" :max="producto.disponibles" @change="cantidadCambiada(i,$event)"/>

                <b-form-invalid-feedback :state="valid">
                  {{ errors[0]  }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <section class="d-flex flex-column">
              <strong>Total a pagar: <span class="text-primary">{{ formulario.total | currency(producto.tienda ? producto.tienda.divisa.iso : 'MXN') }}</span></strong> 
            </section>

            <section class="d-flex flex-column">
                  <strong>Su saldo disponible: <span class="text-primary">Tps{{  usuario.cuenta.saldo | currency  }}</span></strong> 
            </section>

             <section class="d-flex flex-column">
                    <strong>Su saldo despues de comprar: <span class="text-primary">Tps{{ (usuario.cuenta.saldo - formulario.total) | currency }}</span></strong> 
              </section>

              <section class="d-flex flex-column" v-if="usuario.cuenta.saldo < formulario.total">
                  <strong class="text-justify">
                    Te faltan Tps{{ montoPaypal | currency }} en Travel Points. Puedes cancelar la diferencia con Paypal o esperar a ganar más.
                  </strong> 
              </section>

              <section class="d-flex flex-column">
                <strong class="text-danger">
                  Nota: <br> <small>Si su saldo es insuficiente , puede cancelar la diferencia o el total con Paypal. </small>
                </strong>
              </section>
          </b-col>
        </b-row>
      </b-container>


       <template #modal-footer="{hide}">

         <section class="d-flex align-items-center justify-content-between w-100">
           <PayPal 
              v-if="showPaypal"
              :amount="montoPaypal" 
              :currency="producto.tienda.divisa.iso == 'Tp' ? 'USD' : producto.tienda.divisa.iso" 
              :client="credentialPaypal" 
              :env="sistema.production_paypal ? 'live' : 'sandbox'" @payment-completed="pagoCompletadoPaypal">
              </PayPal>

          <b-button-group size="sm" >
            
            <b-button variant="primary" @click="realizarCompra()" :disabled="loading || formulario.productos[0].cantidad < 1 || saldoInsuficiente" v-loading="loading" title="Realizar Compra" >
              <font-awesome-icon icon="fas fa-paper-plane"/>
              Comprar
            </b-button>

              <b-button variant="dark" @click="hide" :disabled="loading" v-loading="loading" title="Cerrar, no comprar" >
                <font-awesome-icon icon="fas fa-times"/>
                Cerrar
              </b-button>

          </b-button-group>
         </section>
          
      </template>


    </b-modal>

  </section>
</template>

<script>

import { useRouter } from '@core/utils/utils'

import store from '@/store'
import { ref,toRefs,onMounted,onActivated,computed,watch,nextTick,inject} from '@vue/composition-api'

import {
  ValidationProvider
} from 'vee-validate'

import {required} from '@validations'

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
  BFormInvalidFeedback
  
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
    PayPal
  },

  setup(props,{emit}) {
  
    const { id } = toRefs(props)
    const isCompra = ref(false)
    const { producto,productos } =toRefs(store.state.producto)
    const { usuario } = toRefs(store.state.usuario)
    const { is_loggin } = useAuth(); 
    const { sistema } = toRefs(store.state.sistema)
    const { consumo:formulario } = toRefs(store.state.consumo)
    const showPaypal = ref(false)
    const swal = inject('swal')

    const montoPaypal = computed(() => {
      return String(usuario.value.cuenta.saldo - formulario.value.total).slice(1)
    })
    
    const realizarCompra = () => {
    
      formulario.value.cliente_id = usuario.value.id
      formulario.value.divisa_id = producto.value.tienda.divisa_id;
      formulario.value.productos[0].producto_id = producto.value.id

      store.dispatch('consumo/guardar',formulario.value).then(({result,consumo:consum}) => {
        if(result){
         swal({
            icon: 'success',
            title: 'Su pago de ha sido procesado con éxito!',
            text:producto.value.tipo_producto == 2 ? 'Su Producto digital fué enviado a su correo Electrónico, vaya a su bandeja de entrada, si no lo consigues, puedes contactarnos' : 'Puedes retirar tu producto en una de nuestras tiendas, en horario de Oficina',
            cancelButtonText: 'Ok',
            showCancelButton: false,
            showConfirmButton: false,
            color: '#1e9ad7',

          })

          cargarForm();

          if(usuario.value.id === consum.cliente.id){
            store.commit('usuario/updatePerfil',consum.cliente)
          }
          
          // store.commit('consumo/clear')
          showPaypal.value = false
          isCompra.value = false


        }else{
          toast('Su compra no pudo ser procesada, intente de nuevo',{position:'bottom-right'})
        }
      }).catch(e => {
        console.log(e)

      })

    }

    const comprar = () => {

      if(!is_loggin.value){
        router.push({name:'login'})
      }

      setTimeout(() => {
          showPaypal.value = true
      }, 500);

      isCompra.value = true;


    }

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

      formulario.value.divisa_id = computed(() => producto.value.tienda.divisa_id)
      
      if(producto.value.id){
        formulario.value.total = producto.value.precio
      }

      formulario.value.productos = [
       {
          cantidad: 0,
          producto_id: 0,
          monto: producto.value.precio
       }
    ]

   }

   cargarForm()
   
   watch([producto],(val) => {
    if(val.id){
      formulario.value.productos[0].monto = producto.value.precio
    } 
   })

   watch([id,productos],() => cargarForm())

   const cantidadCambiada = (idx,cant) => {
    formulario.value.productos[idx].monto = producto.value.precio * cant
    formulario.value.total = producto.value.precio * cant
   }

   const pagoCompletadoPaypal = (data) => {
      const { state, payer } = data;

      if(state == 'approved'){
        formulario.value.paypal_id = payer.payer_info.payer_id
        formulario.value.paypal = data

        realizarCompra();

      }else{
        swal({
          icon: 'info',
          title: 'Su pago no fué procesado por el procesador de pago paypal',
          cancelButtonText: 'Ok',
          showCancelButton: false,
          showConfirmButton: false
        })
      }
      
   }

   return {
      producto,
      usuario,
      seleccionarFoto,
      loading:computed(() => store.state.loading),
      getImagenSeleccionada,
      promedioCalificacion: computed(() => store.getters['producto/promedioCalificacion'](producto.value)),
      porcentajeOpinions: (cal) => store.getters['producto/porcentajeOpinions'](cal),
      comprar,
      isCompra,
      realizarCompra,
      required,
      formulario,
      cantidadCambiada,
      sistema,
      montoPaypal,
      credentialPaypal:computed(() => store.getters['sistema/credentialPaypal']),
      pagoCompletadoPaypal,
      showPaypal,
      saldoInsuficiente:computed(() => usuario.value.cuenta.saldo < formulario.value.total),
      optionsPlace: (tienda) => ({ content: `<strong>${tienda.nombre}</strong>` })

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

</style>

