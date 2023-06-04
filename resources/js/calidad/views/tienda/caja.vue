<template>
    <listado :actions="actions" hideFooter hideHeader>
        <template #titulo>
          <h3>Productos en Caja</h3>
        </template>

          <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc, perPage }">
            <b-card>
               <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
                :sort-by="sortBy" empty-text="No se encontró ningún producto en Caja" :sort-desc="isSortDirDesc"
                sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
                showEmpty small stacked="md" >

                  <template #cell(producto_id)="{item, detailsShowing, toggleDetails }">
                    <b-button @click="toggleDetails" size="sm" variant="primary">
                      # {{ item.producto_id }} - 
                      <font-awesome-icon :icon="['fas',detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" class="ml-1"/>
                    </b-button>
                  </template>

                  <template #row-details="{item}">
                      <b-card no-body class="overflow-hidden w-100" v-if="item.vid">
                        <b-row no-gutters>
                          <b-col md="3">
                            <b-card-img :src="item.variant.variantImage" :alt="item.variant.variantNameEn" class="rounded-0"></b-card-img>
                          </b-col>
                          <b-col md="9">
                            <b-card-body :title="item.variant.variantNameEn">
                             <el-divider content-position="left">Características</el-divider>

                            <table class="table table-hover table-borderless w-auto" >
                              <tr v-for="({ nombre, valor }, i) in item.producto.caracteristicas" :key="i">
                                <td class="pl-0 pr-1">
                                  <font-awesome-icon icon="fas fa-check"/>
                                  {{ nombre }}
                                </td>

                                <td class="px-1">
                                  {{ valor }}
                                </td>
                              </tr>
                              <tr>
                                <td class="pl-0 pr-1"><font-awesome-icon icon="fas fa-check"/> Peso de la Variante</td>
                                <td>{{ item.variant.variantWeight }} G (Gramos)</td>
                              </tr>
                              <tr>
                                  <td class="pl-0 pr-1"><font-awesome-icon icon="fas fa-check"/> Medidas</td>
                                  <td>{{ item.variant.variantStandard }}</td>
                              </tr>
                            </table>
                            </b-card-body>
                          </b-col>
                        </b-row>
                      </b-card>
                  </template>

                  <template #cell(nombre)="{ item }">
                    <span class="">
                      {{ item.producto.nombre }}
                    </span>
                  </template>

                  <template #cell(precio_unitario)="{ item }">
                      <span class="text-nowrap">
                        {{ item.precio_unitario | currency(item.producto.divisa.iso) }}
                      </span>
                  </template>
            
                  <template #cell(cantidad)="{ item }">
                     <span class="text-nowrap">
                          {{ item.cantidad > 1 ? `${item.cantidad} Pzas` : `${item.cantidad} Pza` }}
                      </span>
                  </template>
              
                  <template #cell(monto)="{ item }">
                      <strong class="text-nowrap">
                          {{ item.monto | currency(item.producto.divisa.iso) }}
                      </strong>
                  </template>

           

                </b-table>
            </b-card>
          </template>
       

        <template #prePaginate="{items}">
          <section class="w-100 d-flex flex-column align-items-end">
            
            <section class="w-100 d-flex flex-wrap  flex-md-nowrap justify-content-between">

              <b-card class="mr-md-1 flex-grow-1" title="Datos para el envío">
                    <validation-observer ref="formValidate" #default="{ handleSubmit }">
                        <b-form @submit.prevent="handleSubmit(guardarDatosEnvio)">
                              <b-container fluid>

                                <b-row>
                                  <b-col md="6">
                                      <b-form-group>
                                            <template #label>
                                               Nombre: <span class="text-danger">*</span>
                                            </template>
                                       
                                            <validation-provider name="nombre" rules="required" #default="{ errors }">
                                               <b-form-input v-model="form.nombre" :state="errors.length ? false : null" />
                                       
                                               <b-form-invalid-feedback>
                                                  {{ errors[0] }}
                                               </b-form-invalid-feedback>
                                            </validation-provider>
                                         </b-form-group>
                                      </b-col>

                                      <b-col md="6">
                                        <b-form-group>
                                          <template #label>
                                              Apellido: <span class="text-danger">*</span>
                                          </template>
                                    
                                          <validation-provider name="apellido" rules="required" #default="{ errors }">
                                              <b-form-input v-model="form.apellido" :state="errors.length ? false : null" />
                                    
                                              <b-form-invalid-feedback>
                                                {{ errors[0] }}
                                              </b-form-invalid-feedback>
                                          </validation-provider>
                                        </b-form-group>
                                      </b-col>
                                </b-row>

                                <b-row>
                                         <b-col cols="12">
                                          <el-divider content-position="left">Télefonos de contacto</el-divider>
                                               <section class="d-flex justify-content-between">
                                                  <b-button-group size="sm">
                                                     <b-button variant="primary" @click="agregarTelefono" :disabled="form.telefonos.length >= 5">
                                                        <feather-icon icon="PlusIcon" />
                                                        Agregar
                                                     </b-button>
                                                  </b-button-group>
                                               </section>
                                             
                                               <table class="table table-sm table-hover table-bordeless mt-1 table-responsive">
                                                  <thead>
                                                     <th>
                                                        Número:
                                                     </th>
                                                     <th>
                                                        ¿ Con whatsapp ?
                                                     </th>
                                                     <th>
                                                        ¿ Es el principal ?
                                                     </th>
                                                     <th>
                                             
                                                     </th>
                                                  </thead>
                                                  <tbody>
                                                     <tr v-for="(telefono, i) in form.telefonos" :key="i">
                                                        <td>
                                                           <validation-provider name="telefono" rules="required" #default="{ valid, errors }">
                                                              <b-form-input v-mask="'+#############'" v-model="telefono.telefono" :state="valid" style="min-width:150px" />
                                             
                                                              <b-form-invalid-feedback :state="valid">
                                                                 {{ errors[0] }}
                                                              </b-form-invalid-feedback>
                                                           </validation-provider>
                                             
                                                        </td>
                                             
                                                        <td class="vertical-aling-center">
                                                           <b-form-checkbox switch button-variant="success" v-model="telefono.is_whatsapp" :value="true"
                                                              :unchecked-value="false">
                                                           </b-form-checkbox>
                                                        </td>
                                             
                                                        <td class=" vertical-align-center">
                                                           <b-form-checkbox switch button-variant="warning" v-model="telefono.principal" :value="true"
                                                              :unchecked-value="false">
                                                           </b-form-checkbox>
                                                        </td>
                                             
                                                        <td class="vertical-align-center">
                                                           <b-button variant="danger" @click="quitarTelefono(telefono, i)" size="sm">
                                                              <feather-icon icon="TrashIcon" />
                                                           </b-button>
                                             
                                                           <b-button variant="success" @click="guardarTelefono(telefono)" size="sm" v-loading="loading"
                                                              :disabled="!telefono.length >= 8">
                                                              <feather-icon icon="CheckIcon" />
                                                           </b-button>
                                             
                                                        </td>
                                             
                                                     </tr>
                                                  </tbody>
                                               </table>
                                         </b-col>
                                </b-row>

                                <b-row>
                                  <!-- Direccion -->
                                  <b-col cols="12">
                                      <b-form-group label-for="bio-domicilio">
                                      <template #label>
                                        Dirección: <span class="text-danger">*</span>
                                      </template>

                                      <validation-provider name="direccion" rules="required" #default="{errors,valid}">
                                          <b-form-textarea id="bio-domicilio" v-model="form.direccion" rows="4"
                                              placeholder="Dirección de domicilio" :state="valid" />

                                            <b-form-invalid-feedback :state="valid">
                                              {{ errors[0]  }}
                                            </b-form-invalid-feedback>
                                      </validation-provider>
                                        
                                      </b-form-group>
                                  </b-col>
                              
                                </b-row>
                                 
                                <b-row>
                                  <b-col cols="12" md="4">
                                      <b-form-group label="Pais">
                                      <template #label>
                                        Pais: <span class="text-danger">*</span>
                                      </template>

                                      <validation-provider name="pais_id" rules="required" #default="{ errors, valid }">
                                        <el-select v-model="pais_id" placeholder="Seleccione" class="w-100" filterable clearable>
                                              <el-option v-for="(pais, i) in paises" :key="i" :value="pais.id" :label="pais.pais">
                                              </el-option>
                                          </el-select>

                                            <b-form-invalid-feedback :state="valid">
                                                {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                    </validation-provider>
                                        
                                      </b-form-group>
                                  </b-col>
                                  <b-col cols="12" md="4">
                              
                                      <b-form-group>
                                        <template #label>
                                          Estado: <span class="text-danger">*</span>
                                        </template>
                                          <validation-provider name="estado_id" rules="required" #default="{ errors, valid }">
                                            <el-select v-model="estado_id" placeholder="Seleccione" class="w-100" filterable clearable>
                                              <el-option v-for="(estado, i) in estados" :key="i" :value="estado.id" :label="estado.estado">
                                              </el-option>
                                          </el-select>

                                            <b-form-invalid-feedback :state="valid">
                                                  {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                        </validation-provider>
                                        
                                      </b-form-group>
                              
                                  </b-col>
                                  <b-col cols="12" md="4">
                              
                                      <b-form-group >

                                        <template #label>
                                          Ciudad: <span class="text-danger">*</span>
                                        </template>

                                        <validation-provider name="estado_id" rules="required" #default="{ errors, valid }">
                                            <el-select v-model="form.ciudad_id" placeholder="Seleccione" class="w-100" filterable clearable>
                                                <el-option v-for="(ciudad, i) in ciudades" :key="i" :value="ciudad.id" :label="ciudad.ciudad">
                                                </el-option>
                                            </el-select>
                                          <b-form-invalid-feedback :state="valid">
                                                {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                        </validation-provider>
                                      
                                      </b-form-group>
                              
                                  </b-col>
                              
                                  <b-col cols="12" md="4">
                                      <b-form-group label="Código Postal">
                                        <validation-provider name="codigo_postal" #default="{ errors }">
                                            <b-form-input v-model="form.codigo_postal" :state="errors.length ? false : null" />
                              
                                            <b-form-invalid-feedback :state="errors.length ? false : null">
                                              {{ errors[0] }}
                                            </b-form-invalid-feedback>
                              
                                        </validation-provider>
                                      </b-form-group>
                                  </b-col>
                              
                                </b-row>
                                </b-container>

                          <b-button-group size="sm">
                            <b-button variant="outline-warning" @click="calcularEnvio" title="Calcular Envío">
                              Calcular Envío
                            </b-button>

                            <b-button variant="primary" type="submit" title="Guardar">
                              Guardar datos de envío
                            </b-button>

                          </b-button-group>
                        </b-form>
                    </validation-observer>
              </b-card>

              <b-card class="flex-grow-0">
                 <table class="table table-hover table-sm " >

                    <tr>
                        <td>
                          Costo del envío:
                        </td>
                        <td>
                         <strong>
                           {{ formulario.monto_envio | currency }}
                         </strong>
                        </td>
                    </tr>
                    <tr>
                      <td>
                        Total a Pagar:
                      </td>
                      <td>
                       <strong>
                         {{ totalPagar | currency }}
                       </strong>
                      </td>
                    </tr>

                     <tr>
                      <td>
                        Tps Disponibles:
                      </td>
                      <td>
                        <strong class=""> Tp{{ usuario.cuenta.saldo | currency }} </strong>
                      </td>
                    </tr>

                      <tr>
                    
                        <td>
                          Tps pos compra:
                        </td>

                        <td>
                          <strong :class="{ 'text-danger': (usuario.cuenta.saldo - totalPagar) < 0 }">
                            Tp{{ usuario.cuenta.saldo - totalPagar | currency }}
                          </strong> 
                        </td>
                    
                      </tr>

                       <tr>
                    
                          <td>
                            Total a debitar por Paypal:
                          </td>

                          <td>
                            <strong>
                              {{ (montoPaypal) | currency }}
                            </strong> 
                          </td>
                    
                        </tr>

                </table>

                <p v-if="(usuario.cuenta.saldo - totalPagar) < 0">
                  <span class="text-danger">Nota:</span> 
                  Su saldo en su cuenta es insuficiente, puede pagar el resto usando Paypal o esperar a ganar mas Tps (TravelPoints).
                </p>

                <p class="text-justify">
                    <span class="text-danger">Nota:</span> 
                    Para proceder con la compra, primero calcule el costo del envío. Si le hace falta un dato importante como nombre o dirección, por favor proceda a rellenar los datos y darle a guardar antes de proceder.
                    <br>
                    El monto del envío siempre se paga por paypal. 
                </p>


                <PayPal 
                  v-if="(montoPaypal > 0) && calculado && isEnviable"
                  :amount="montoPaypal" 
                  currency="USD" 
                  :client="credentialPaypal" 
                  :env="sistema.production_paypal ? 'live' : 'sandbox'" @payment-completed="pagoCompletadoPaypal" >
                  </PayPal>

                <b-button-group>
                
                  <b-button variant="success" title="pagar" size="md" @click="realizarCompra()" v-loading="loading" 
                  v-if="!(((montoPaypal > 0) || !calculado || !isEnviable) || !items.length)" >
                    {{ (usuario.cuenta.saldo - totalPagar) < 0 ? 'Saldo insuficiente, pagar con Paypal' : 'Pagar' }}
                  </b-button>

                </b-button-group>
           
                
              </b-card>

            </section>
            

              
          </section>
            
        </template>

    </listado>



</template>


<script>
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import PayPal from 'vue-paypal-checkout'
import vSelect from 'vue-select'
import {
  BCard,
  BForm,
  BFormGroup,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BFormInvalidFeedback,
  BCardTitle,
  BLink,
  BImg,
  BCardBody,
  BBadge, 
  BTable,
  BCardImg,
  BCardText,
  BFormTextarea,
  BFormInput,
  BFormCheckbox

} from 'bootstrap-vue'

import {
  required
} from '@validations'

import store from '@/store'
import {computed,toRefs,toRef,ref,watch,onMounted,inject} from 'vue'
import useListCaja from './useListCaja.js'
import router from '@/router'
import useDireccion from '@core/utils/useDireccion'
export default {

  components:{
    BCard,
    BForm,
    BFormGroup,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BFormInvalidFeedback,
    BCardTitle,
    BLink,
    BImg,
    BCardBody,
    BBadge,
    BTable,
    BCardText,
    Listado:() => import('components/Listado.vue'),
    PayPal,
    BCardImg,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    BFormTextarea,
    BFormInput,
    BFormCheckbox
  },

  
  setup(props){

    const {usuario} = toRefs(store.state.usuario);
    const form = computed(() => store.getters['usuario/draftUsuario'])
    const {carrito} = toRefs(store.state.carrito);
    const {sistema} = toRefs(store.state.sistema)
    const { consumo: formulario } = toRefs(store.state.consumo)
    const formValidate = ref(null)
    const formValidate1 = ref(null)

    const actions = useListCaja();
    const calculado = ref(false)
    const isEnviable = ref(false);

    const swal = inject('swal')
    const totalPagar = computed(() => actions.items.value.map(val => val.monto).reduce((a, b) => a + b, 0))
    
    // const form = ref({
    //   pais_id:null,
    // })

    const cargarForm = () => {

      if(usuario.value.id){
        store.dispatch('carrito/getCarrito', usuario.value.id)
      }

      if (form.value.ciudad_id) {
        pais_id.value = form.value.ciudad.estado.pais_id;
        estado_id.value = form.value.ciudad.estado_id;
      }

      setTimeout(() => {
        formValidate.value.validate().then((result) => {
          if (result) {
            isEnviable.value = true
          }
        })
      }, 2000);
     

    }

    
    const {
      paises,
      ciudades,
      estados,
      pais_id,
      estado_id
    } = useDireccion();
  
    watch([usuario],() => cargarForm())

    cargarForm();

    onMounted(() => {
      setTimeout(() => {
          actions.refetchData()
      }, 1000);
    });
    
    const realizarCompra = () => {

      formulario.value.cliente_id = usuario.value.id
      formulario.value.productos = actions.items.value
      formulario.value.total = totalPagar.value
      formulario.value.tps = usuario.value.cuenta.saldo

      store.dispatch('consumo/guardar', formulario.value).then(({ result, consumo: consum }) => {

        if (result) {

          var  message = 'Su Producto digital fué enviado a su correo Electrónico, vaya a su bandeja de entrada, si no lo consigues, puedes contactarnos';

          if(formulario.value.productos[0].producto.tipo_producto == 1 && formulario.value.productos[0].isChino){
          
            message = 'Los productos serán enviado a su dirección de envío registrados en la caja';
          
          }else if(formulario.value.productos[0].producto.tipo_producto == 1 && !formulario.value.productos[0].isChino){

            message = `Puedes retirar ${formulario.value.productos.length > 1 ? 'tus productos' : 'tu producto'} en la Tienda en Horario de Oficina`
          
          }
          
          swal({
            icon: 'success',
            title: 'Su pago ha sido procesado con éxito!',
            text: message,
            cancelButtonText: 'Ok',
            showCancelButton: false,
            showConfirmButton: false,
            color: '#1e9ad7',
          })

          cargarForm();

          if (usuario.value.id === consum.cliente.id) {
            store.commit('usuario/updatePerfil', consum.cliente)
          }

          actions.refetchData()

          router.push({name:'tienda.travel'})



        } else {
          toast('Su compra no pudo ser procesada, intente de nuevo', { position: 'bottom-right' })
        }

      }).catch(e => {
        console.log(e)

      })


    }

    const pagoCompletadoPaypal = (data) => {

        const { state, payer } = data;

        if (state == 'approved') {
          formulario.value.paypal_id = payer.payer_info.payer_id
          formulario.value.paypal = data

          realizarCompra();

        } else {
          swal({
            icon: 'info',
            title: 'Su pago no fué procesado por el procesador de pago paypal',
            cancelButtonText: 'Ok',
            showCancelButton: false,
            showConfirmButton: false
          })
        }

    }

    const montoPaypal = computed(() => {

      let monto_pagar = formulario.value.monto_envio;

      if(usuario.value.cuenta.saldo < totalPagar.value){
        monto_pagar +=  totalPagar.value - usuario.value.cuenta.saldo 
      }
       
       monto_pagar = redondeo(monto_pagar, 2);
      return monto_pagar < 0  ? String(monto_pagar).slice(1) : String(monto_pagar);

    })

    const calcularEnvio = () => {

      if(pais_id.value){

        store.dispatch('carrito/calcularEnvio', {pais_id:pais_id.value}).then(({ result, mensaje, monto }) => {
          if (result) {
            toast.success('Se ha calculado el precio del envío de sus productos, ya puede proceder a pagar el mismo')
            formulario.value.monto_envio = monto
            calculado.value = true
          } else {
            swal({
              icon: 'info',
              title: 'NO se pudo calcular el envío',
              text: mensaje,
              cancelButtonText: 'Ok',
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        }).catch(e => {
          console.log(e)
        })

      }else{
        toat.info('Necesita seleccionar un Pais destino, para luego proceder a realizar la petición de costo de envío')
      }
      
    }

    const guardarDatosEnvio = () => {

      store.dispatch('usuario/guardarUsuario',form.value).then(({result}) => {

        if(result){
          isEnviable.value = true
          toast.success('Información de envío guardada con éxito')
        }

      }).catch(e => {
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }
      })

    }

    const agregarTelefono = () => {
      store.commit('usuario/agregarTelefono', 'usuario')
    }


    const quitarTelefono = (telefono, i) => {


      if (telefono.id) {


        store.dispatch('usuario/quitarTelefono', telefono).then(({ result }) => {

          if (result) {
            store.commit('usuario/removerTelefono', i)
            store.commit('usuario/updateUsuario', form.value)
          }

        })

      }else{
        store.commit('usuario/removerTelefono', i)
      }

    }

    const guardarTelefono = (telefono) => {

      store.dispatch('usuario/guardarTelefono', { usuario: form.value.id, telefono: telefono }).then(({ result }) => {

        if (result) {
          toast.success('Se ha guardado con éxito el teléfono', { position: 'bottom-right' })

        } else {
          toast.info('No se pudo guardar el teléfono, inténtelo de nuevo', { position: 'bottom-right' })
        }

      }).catch(e => {

        if (e.response.status === 422) {
          formValidate.value.setErrors(e.response.data.errors)
        }

        console.log(e)

      })
    }

    return {
      guardarDatosEnvio,
      guardarTelefono,
      quitarTelefono,
      agregarTelefono,
      isEnviable,
      carrito,
      usuario,
      required,
      paises,
      form,
      formulario,
      refTable:actions.refTable,
      actions,
      sistema,
      montoPaypal,
      pagoCompletadoPaypal,
      totalPagar,
      realizarCompra,
      formValidate,
      calcularEnvio,
      calculado,
      formValidate1,
      ciudades,
      estados,
      pais_id,
      estado_id,
      credentialPaypal: computed(() => store.getters['sistema/credentialPaypal']),

      loading:computed(() => store.state.loading),

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