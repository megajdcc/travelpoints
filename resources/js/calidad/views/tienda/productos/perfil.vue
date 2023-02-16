<template>
   <section class="app-ecommerce-details">

    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="!producto.id">
      <h4 class="alert-heading">
        {{ $t('Error Capturando producto') }}
      </h4>
      <div class="alert-body">
        {{ $t('No hemos podido capturar el producto, puedes volver al listado') }}
        <b-link class="alert-link" :to="{ name: 'producto.list'}" >
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

             <b-container fluid>
                <b-row>
                   <b-col cols="12">

                       <!-- Condicion de la publicacion -->
                        <b-badge variant="primary" class="mb-1" v-b-tooltip.hover="producto.categoria.descripcion">
                          {{ producto.categoria.nombre }}
                        </b-badge>

                          <b-badge class="" varaint="success">
                              {{ producto.disponibles > 1 ? `${producto.disponibles} productos disponible` : `${producto.disponibles} producto disponible` }}
                          </b-badge>
                        <h4>{{ producto.nombre }}</h4>

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

                        <hr>

                        <div class="d-flex flex-column flex-sm-row pt-1">
                        
                        
                        <b-button-group size="sm" class="w-100">
                            <b-button variant="outline-secondary" class="btn-wishlist" v-if="$can('update','productos')" :to="{name:'producto.edit',params:{id:producto.id}}">
                            <feather-icon icon="Edit2Icon" class="mr-50"/>
                            <span>{{ $t('Editar') }}</span>
                          </b-button>
                          
                            <b-button variant="outline-danger" class="btn-wishlist " v-if="$can('delete','productos')" @click="eliminar(producto.id)">
                            <feather-icon icon="TrashIcon" class="mr-50"/>
                            <span>{{ $t('Eliminar') }}</span>
                          </b-button>

                        </b-button-group>
                     
                        </div>

                   </b-col>

                </b-row>
             </b-container>

            
          </b-col>

        </b-row>

        <b-row>
           <b-col cols="12">


             <div v-if="producto.caracteristicas.length">
                 
                  <b-card-title>
                   <h1>{{ $t('Características') }}</h1> 
                 </b-card-title>

                  <table class="table table-hover table-borderless w-auto" >
                    <tr v-for="({nombre,valor},i) in producto.caracteristicas" :key="i">
                      <td class="pl-0 pr-1">
                        <font-awesome-icon icon="fas fa-check"/>
                        {{ nombre }}
                      </td>

                      <td class="px-1">
                        {{ valor }}
                      </td>
                    </tr>
                  </table>
                           
              </div>


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
  </section>
</template>

<script>

import { useRouter } from '@core/utils/utils'

import store from '@/store'
import { ref,toRefs,onMounted,onActivated,computed,watch,nextTick} from '@vue/composition-api'

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
  BBadge
  
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {Notification} from 'element-ui';
import	i18n from '@/libs/i18n'

import  VueHoverZoom  from  'vue-hover-zoom'
import Swal from 'sweetalert2'
export default {

   directives: {
       Ripple,
       'b-toggle':VBToggle,
       'b-tooltip':VBTooltip
   },

  props:['id'],


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
    




  },

  setup(props,{emit}) {
  
    const {id} = toRefs(props)

   const {producto,productos} =toRefs(store.state.producto)
   const {usuario} = toRefs(store.state.usuario)

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

   watch([id,productos],() => cargarForm())


   return {
      producto,
      usuario,
      seleccionarFoto,
      loading:computed(() => store.state.loading),
      getImagenSeleccionada,
      promedioCalificacion: computed(() => store.getters['producto/promedioCalificacion'](producto.value)),
      porcentajeOpinions: (cal) => store.getters['producto/porcentajeOpinions'](cal),
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

