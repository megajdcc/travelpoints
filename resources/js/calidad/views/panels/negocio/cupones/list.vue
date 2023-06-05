<template>
   <section>
         <listado :actions="actions">

         <template #btn-action>
            <b-button type="variant" :to="{ name: 'negocio.cupones.create' }" v-if="$can('write', 'negocio cupones')"
               class="d-flex flex-column justify-content-center">
               Crear
            </b-button>
         </template>

         <template #contenido="{ items, eliminar }">
            <b-container fluid class="mt-1 px-0 mx-0">
               <b-row>
                  <b-col cols="12"  v-for="(cupon, i) in items" :key="i">
                     <b-card no-body class="p-1 d-flex flex-column">

                        <section class="d-flex justify-content-between align-items-md-center flex-wrap flex-column flex-md-row">
                           <section class="d-flex align-items-md-center flex-md-row flex-column">
                              <b-badge :variant="getVariantStatus(cupon)" class="mr-1">
                                 {{ getStatusCupon(cupon) }}
                              </b-badge>
                              <strong class="text-warning">
                                 Inicia: {{ cupon.expide | fecha('LL') }} & Termina: {{ cupon.vence | fecha('LL') }} | Disponibles: {{
                                    cupon.disponibles }} | Valor: {{ cupon.precio | currency(cupon.divisa.iso) }}
                              </strong>

                           </section>
                     
                           <b-button-group size="sm">

                              <b-button variant="warning" @click="reservarCupon(cupon)" title="Reservar Cupón" v-if="cupon.disponibles > 0 && $can('read', 'negocio cupones')">
                                 <font-awesome-icon icon="fas fa-user-check" />
                              </b-button>
                        
                              <b-button :to="{ name: 'negocio.cupon.edit', params: { id: cupon.id } }" v-if="$can('update', 'negocio cupones')"
                                 variant="primary">
                                 <feather-icon icon="EditIcon" />
                              </b-button>
                        
                              <b-button @click="eliminar(cupon.id)" v-if="$can('delete', 'negocio cupones')" variant="danger">
                                 <feather-icon icon="TrashIcon" />
                              </b-button>

                           </b-button-group>

                        </section>
                        <hr>

                        <section class="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">

                           <article class="d-flex justify-content-center flex-grow-0 flex-shrink-1">
                                 <b-img :src="`/storage/negocios/cupones/${cupon.imagen}`" class="img-card"/>
                           </article>

                           <main class="flex-grow-1 flex-chrink-0 mt-1 mt-md-0 ml-1">
                           
                              <h4 :title="cupon.nombre" class="text-warning">
                                 {{ cupon.nombre }}
                              </h4>
                           
                              <p class="text-justify" :title="cupon.nombre" >
                                 {{ cupon.descripcion }}
                              </p>

                              <section class="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                 <article class="d-flex flex-column mr-md-1">
                                    <strong class="text-warning font-weight-bolder">Condiciones</strong>
                                    <p class="text-justify">
                                       {{ cupon.condiciones }}
                                    </p>
                                 </article>

                                 <article class="d-flex flex-column ">
                                    <strong class="text-warning font-weight-bolder ">Restricciones</strong>
                                    <p class="text-break text-justify">
                                       {{ cupon.restricciones }}
                                    </p>
                                 </article>
                             
                              </section>

                        
                           </main>

                        </section>

                     </b-card>
                  </b-col>
               </b-row>
            </b-container>

         </template>

      </listado>

      <b-sidebar v-model="showReserva" title="Reservar Cupón" backdrop :width="sidWidth">
         <b-container fluid>
            <b-row>
               <b-col cols="12">
                  <validation-observer ref="formValidate" #default="{ handleSubmit }">
                     <b-form @submit.prevent="handleSubmit(reservar)">
                        <b-form-group>
                           <template #label>
                              Usuario de la reserva: <span class="text-danger">*</span>
                           </template>
                           <validation-provider name="formulario.usuario_id" rules="required" #default="{ valid, errors }">
                              <select-usuario v-model="formulario.usuario_id" />

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>

                        <b-button-group size="sm">
                           <b-button variant="primary" v-loading="loading" type="submit">
                              Reservar
                           </b-button>
                        </b-button-group>
                     </b-form>
                  </validation-observer>
               </b-col>
            </b-row>
         </b-container>
        
      </b-sidebar>

   </section>

</template>

<script>

import { toRefs, watch,ref,computed } from 'vue'


import Listado from 'components/Listado.vue'
import useCuponesList from './useCuponesList.js'
import store from '@/store'
import {
   ValidationObserver,
   ValidationProvider
} from 'vee-validate'

import {
   BButton,
   BButtonGroup,
   BContainer,
   BRow,
   BCol,
   BCard,
   BCarouselSlide,
   BCarousel,
   BBadge,
   BImg,
   BSidebar,
   BForm,
   BFormGroup,
   BFormInvalidFeedback


} from 'bootstrap-vue'

import {required} from '@validations'

export default {

   components: {
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BCol,
      BCard,
      Listado,
      BCarouselSlide,
      BCarousel,
      BBadge,
      BImg,
      BSidebar,
      ValidationObserver,
      ValidationProvider,
      BForm,
      BFormGroup,
      BFormInvalidFeedback,
      SelectUsuario:() => import('components/SelectUsuario.vue')
   },

   setup() {

      const { negocio } = toRefs(store.state.negocio)
      const actions = useCuponesList(negocio)
      const cupon = ref({})
      const showReserva = ref(false)
      const formValidate = ref(null)
      const {windowWidth} = toRefs(store.state.app)
      const formulario = ref({
         usuario_id:null,
         cupon_id:null
      });

      watch(negocio, () => actions.refetchData())

      const reservarCupon = (cup) => {
         cupon.value = cup
         formulario.value.cupon_id = cup.id
         showReserva.value = true
      } 

      const reservar = () => {
         store.dispatch('cupones/reservar',formulario.value).then(({result}) => {

            if(result){
               toast.success('Se ha reservado el cupón con éxito')
               formulario.value = {
                  usuario_id: null,
                  cupon_id: null
               }
               actions.refetchData();
               showReserva.value = false               
            
            }else{
               toast.info('No se pudo reservar ,inténtelo de nuevo mas tarde')

            }

         }).catch(e => {
            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }else{
               console.log(e)
            }

         })
      } 

      return {
         actions,
         cupon,
         showReserva,
         reservarCupon,
         reservar,
         required,
         formValidate,
         formulario,
         loading:computed(() => store.state.loading),
         getVariantStatus:(cupo) => {
            let fecha_actual = moment();

            let fecha_inicio = moment(cupo.expide);
            let fecha_termina = moment(cupo.vence);

            return fecha_actual.isBetween(fecha_inicio,fecha_termina) ? 'success' : 'danger'

         },
         getStatusCupon: (cupo) => {
            let fecha_actual = moment();

            let fecha_inicio = moment(cupo.expide);
            let fecha_termina = moment(cupo.vence);  

            if(fecha_actual.isAfter(fecha_termina)){
               return 'Expirado';
            }

            return fecha_actual.isBetween(fecha_inicio, fecha_termina) ? 'Activo' : 'No activo'

         },

         sidWidth:computed(() => {
            return windowWidth.value < 550 ? '320px' :'420px';
         })


      }

   }
}
</script>

<style lang="scss">

.img-card{
   width: 310px;
   object-fit: contain;
   height: 100%;
   object-position: center center;
}

</style>