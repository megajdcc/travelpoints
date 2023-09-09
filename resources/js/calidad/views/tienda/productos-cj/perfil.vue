<template>
   <section class="app-ecommerce-details">

    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="!producto">
      <h4 class="alert-heading">
        {{ $t('Error Capturando producto') }}
      </h4>
      <div class="alert-body">
        {{ $t('No hemos podido capturar el producto, puedes volver al listado') }}
        <b-link class="alert-link" :to="{ name: isStore ? 'tienda.travel': 'producto.cj.list'}" >
          {{ $t('Productos') }}
        </b-link>
        {{ $t('y volver a seleccionar el Producto.') }}
      </div>
    </b-alert>

    <!-- Content -->
    <b-card v-if="producto" no-body >
      <b-card-body>
        <b-row class="my-2">

          <b-col cols="12" md="8" class="d-flex  justify-content-center mb-2 mb-md-0" >
            <!-- Miniaturas -->
            <b-row class="w-100">
         
               <b-col cols="12" md="2" class="px-0 h-md-100">
                     <ul style="overflow-y: auto; padding-left: 5px; overflow-x: auto" class="d-flex d-md-block miniaturas-content">
                        
                        <li v-for="(imagen,i ) in producto.productImageSet" :key="i" :class="{'img-active' : imagen.active}" style="max-height: 80px; margin:5px 0px; height:80px;padding:.5px; border:.5px solid rgba(0,0,0,.3); border-radius: 3px;"  >

                           <img :src="imagen.image"  @click="seleccionarFoto(imagen)" @mouseover="seleccionarFoto(imagen)"  :alt="imagen.image" class="img-miniatura" style="object-fit:contain; height:100%; width:100%;">

                        </li>

                     </ul>
               </b-col>

               <b-col cols="12" md="10"  class="d-flex justify-content-center align-items-center">

                  <!-- <article class="img-central"> -->
                     <vue-hover-zoom :imageUrl="`${getImagenSeleccionada().image}`"  class="img-central d-flex justify-content-center" :alt="producto.productNameEn" style="width:100%;height:100%;position:relative; object-fit:contain; ">
                    
                    </vue-hover-zoom>
                  <!-- </article> -->

               </b-col>

            </b-row>

          </b-col>

          <!-- Right: Producto Detalles -->
          <b-col cols="12" md="4" class="content-right p-1">

             <b-container fluid class="px-0 mx-0" style="overflow-x:hidden">
                <b-row>
                   <b-col cols="12">

                       <!-- Condicion de la publicacion -->
                        <b-badge variant="primary" class="mb-1 text-wrap" v-b-tooltip.hover="producto.categoryName">
                          {{ producto.categoryName }}
                        </b-badge>

                        <b-card-title>
                            <h3>{{ producto.productNameEn  }}</h3> 
                        </b-card-title>

                        <b-card-text class="item-company mb-0">
                        <span>{{ $t('Despacho') }}</span>
                       
                        </b-card-text>

                        <!-- Price And Ratings -->
                        <div class="ecommerce-details-price d-flex flex-wrap mt-1">
                          <h1 class="item-price mr-1">
                            <strong>
                                Costo USD: {{ producto.sellPrice  | currency }} 
                            </strong>
                          </h1>

                          <table border="0" class="table table-sm table-borderless">

                             <tr>
                                <td>Color y Tamaño:</td>
                                <td>
                                 <!-- <b-form-radio-group v-model="formulario.vid" buttons size="sm" :options="variantColor" @change="variantSelect" class="flex-wrap" value-field="vid" text-field="variantNameEn">
                                    
                                  <b-form-radio v-for="(variant,i) in variantColor" :key="i" v-model="formulario.vid" :value="variant.vid" size="sm" class="flex-wrap" button :name="variant.variantNameEn" >
                                      <b-img style="width:30px; height:30px" :src="variant.variantImage" :title="variant.variantNameEn" v-b-tooltip:hover />
                                  </b-form-radio>

                                 </b-form-radio-group> -->

                                 <v-select v-model="formulario.vid"  :filter="filtrarVariant" :options="variantColor" style="width:230px" label="variantKey" @input="variantSelect">

                                    <template #selected-option="{ variantImage, variantNameEn,variantKey }">
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
                                </td>
                              </tr>

                              <tr>
                                <td>Cantidad:</td>
                                <td>
                                  <el-input-number v-model="formulario.cantidad" size="small" :min="1" :max="10"></el-input-number>
                                </td>
                              </tr>

                               <tr>
                                  <td>SPU:</td>
                                  <td>
                                    <p>{{ skuVariant }}</p>
                                  </td>
                                </tr>

                              <tr>
                                <td>Atributos:</td>
                                <td>
                                  <!-- <b-form-radio-group v-model="formulario.propiedad" :options="propiedadesProducto" size="sm" buttons>
                                  </b-form-radio-group> -->

                                  {{ producto.productProEnSet.toString() }}
                                </td>
                              </tr>

                               <tr>
                                  <td>Material:</td>
                                  <td>
                                    {{ producto.materialNameEnSet.toString() }}
                                  </td>
                                </tr>
                          </table>
                        
                        </div>

                       
                        <!-- <template v-if="producto.addMarkStatus">

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
                        </template> -->

                        <!-- <template v-if="producto">
                           <hr>

                            <el-divider content-position="left">Características</el-divider>

                            <table class="table table-hover table-borderless w-auto" >
                              <tr v-for="(product, i) in Object.keys(producto)" :key="i">
                                <td class="pl-0 pr-1">
                                  <font-awesome-icon icon="fas fa-check"/>
                                  {{ producto }}
                                </td>

                                <td class="px-1">
                                  {{ producto[product] }}
                                </td>
                              </tr>
                            </table>
                        </template> -->

                        <hr>

                      <div class="d-flex flex-column pt-1">
                        
                       
                        <b-button-group size="md" class="w-100" >
                          
                          <b-button  @click="agregarToTravel" variant="primary" v-loading="loading">
                            Agregar a productos Travel
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
              <b-card-title>
                <h1>{{ $t('Descripción') }}</h1> 
              </b-card-title>
              <div v-html="producto.description"></div>
             </b-col>

          </b-row>
       
      </b-card-body>
    </b-card>

  </section>
</template>

<script>

import { useRouter } from '@core/utils/utils'

import store from '@/store'
import { ref,toRefs,onMounted,onActivated,computed,watch,nextTick,inject,h} from 'vue'

import {
  ValidationProvider
} from 'vee-validate'
import vSelect from 'vue-select'

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
  BFormInvalidFeedback,
  BSidebar,
  BFormRadioGroup,
  BFormRadio,


  
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
import iconMapa from '@images/icons/icon_map.png'

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
    BModal,
    ValidationProvider,
    BFormGroup,
    BFormSpinbutton,
    BFormInvalidFeedback,
    PayPal,
    vSelect,
    BSidebar,
    BFormRadioGroup,
    BFormRadio
  },

  setup(props,{emit}) {
  
    const { id } = toRefs(props)
    const { usuario } = toRefs(store.state.usuario)
    const producto = ref(null)
    const { is_loggin } = useAuth(); 
    const { sistema } = toRefs(store.state.sistema)
    const swal = inject('swal')
    const formulario = ref({
      cantidad:1,
      variantSku:null,
      vid:null,
    })
    const seleccionarFoto = (imagen) => {

      producto.value.productImageSet.forEach((foto) => {
        if (foto.active) {
          foto.active = false;
        }
      });

      var i = producto.value.productImageSet.findIndex(foto => foto.image == imagen.image);

      if(i != -1){
         producto.value.productImageSet[i].active = true;
      }
     

    }

    const getImagenSeleccionada = () => {
        

        let foto = producto.value.productImageSet.find(val => val.active);

        if(foto){
          return foto;
        }else{
          return producto.value.productImageSet.length ? producto.value.productImageSet[0] : {}
        }
        
    }

    const cargarForm = () => {

        store.dispatch('producto/productoDetailsCj',id.value).then(({producto:product}) => {
          producto.value = product
          
          producto.value.productImageSet = producto.value.productImageSet.map((val,i) => {
            if(i == 0){
              return {
                active:true,
                image:val
              }
            }else{
              return {
                active: false,
                image: val
              }
            }
          })

          // formulario.value.vid = producto.value.variants[0].vid

        }).catch(e => console.log(e))


    }

   cargarForm()
   

   watch([id],() => cargarForm())

    
   const variantSelect = (vid) => {

    let variant = producto.value.variants.find(val => val.vid == vid)

    if(variant != undefined){

      let img = producto.value.productImageSet.find(value => value.image == variant.variantImage);
      
      if(img != undefined){
        
        seleccionarFoto(img);
      }

    }
  

   }

   const variantColor = computed(() => {
      // return producto.value.variants.filter((variation, index, self) => {
      //     return self.findIndex((v) => v.vid === variation.vid) === index;
      //   })

     return  producto.value.variants;
   })

   const agregarToTravel = () => {
    
    store.dispatch('producto/agregarToTravel',producto.value.pid).then(({result,mensaje}) => {
      
      if(result){
        toast.info(mensaje)
        router.push({name:'producto.list'})
      }else{
        toast.info(mensaje)
      }

    }).catch(e => console.log(e))


   }

   return {
      producto,
      agregarToTravel,
      usuario,
      formulario,
      seleccionarFoto,
      loading:computed(() => store.state.loading),
      getImagenSeleccionada,
      required,
      sistema,
      variantSelect,
      variantColor,
      filtrarVariant: ({ variantKey, variantImage, vid }, label, search) => {
        return (variantKey || variantImage || vid || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      },
      skuVariant:computed(() => {
        
        if(formulario.value.vid){
          let variant_select =  producto.value.variants.find(val => val.vid = formulario.value.vid)
          return variant_select ? variant_select.variantSku : producto.value.productSku
        }

        return producto.value.productSku
      }),

      getImagenPrincipal: (produc) => {
        return produc.productImage;
      },

      propiedadesProducto:computed(() => {

        return producto.value.productProEnSet.map(val => ({
          value:val,
          text:val
        }))

      })

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

@import "@/assets/scss/variables/variables.scss";
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


<style lang="scss" scoped>
@import "@/assets/scss/variables/variables.scss";

.img-central{
  max-height:470px !important;
}

.btn-sm, 
.btn-group-sm > .btn {
    padding: 0.2rem 0.2rem;
    border-radius: 0.358rem;
}

.btn-secondary.active {
    background-color: $primary !important;
}


</style>

