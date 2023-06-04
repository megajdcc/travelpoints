<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
        <b-card>
          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group description="Nombre del producto"> 
                  <template #label>
                    Nombre: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                    <b-form-input :state="valid" v-model="formulario.nombre" />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>

                <b-form-group > 
                  <template #label>
                    Divisa : <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="precio" rules="required" #default="{errors,valid}">

                    <v-select v-model="formulario.divisa_id" :options="divisas" :reduce="option => option.id" label="nombre"/>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>

                <b-form-group > 

                    <template #label>
                      Precio : <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="precio" rules="required" #default="{ errors, valid }">

                      <currency-input v-model="formulario.precio" :options="{
                        ...optionsCurrency, ...{
                          currency: getCurrency == 'Tp' ? 'USD' : getCurrency,
                          currencyDisplay: getCurrency == 'Tp' ? 'symbol' : 'hidden'
                        }}" class="form-control"></currency-input>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>

                  </b-form-group>

              </b-col>

               <b-col cols="12" md="6">

                 <b-form-group description="Breve del producto"> 
                  <template #label>
                    Breve : 
                  </template>

                  <validation-provider name="categoria_id"  #default="{errors,valid}">
                    <b-form-textarea v-model="formulario.breve" :rows="1" :state="valid">
                    </b-form-textarea>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>


                 <b-form-group description="Categoría del producto"> 
                  <template #label>
                    Categoría : <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="categoria_id" rules="required" #default="{errors,valid}">
                   <v-select v-model="formulario.categoria_id" :options="categorias" :reduce="(option) => option.id" label="nombre"></v-select>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>

                  <b-form-group > 
                    <template #label>
                      Tipo de Producto : <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="tipo_producto" rules="required" #default="{ errors, valid }">
                      
                      <b-form-radio-group buttons v-model="formulario.tipo_producto" :options="[{text:'Físico',value:1,},{text:'Digital',value:2}]" :state="valid"></b-form-radio-group>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>

                  </b-form-group>
                </b-col>


              <b-col cols="12" md="6" v-if="formulario.tipo_producto == 2">
                <b-form-group > 
                  <template #label>
                    Archivo : 
                  </template>

                  <validation-provider name="archivo" #default="{errors,valid}">
                    <b-form-file v-model="formulario.archivo" :state="valid" browse-text="Cargue el archivo a entregar" />
                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>
              </b-col>

            </b-row>

             <b-row>
            <b-col cols="12">
              <b-form-group>
          
                <template #label>
                  Descripción:
                </template>
          
                <validation-provider name="descripcion" #default="{ errors,valid }">
          
                  <editor output-format="html" :value="formulario.descripcion" @input="formulario.descripcion = $event"
                    api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
          
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
          
                </validation-provider>
          
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <b-button-group size="sm" class="mb-1">
                <b-button size="sm" variant="primary" @click="$store.commit('producto/agregarCaracteristica')"> Agregar Características</b-button>

                  <b-button size="sm" variant="danger" @click="$store.commit('producto/quitarCaracteristicas')"> Quitar
                    Características</b-button>
              </b-button-group>

              <section v-if="formulario.caracteristicas.length">
                <table class="table table-sm table-hover w-100">
                  <thead>
                    <th>Nombre de la característica</th>
                    <th>Valor de la característica</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(cara,i) in formulario.caracteristicas" :key="i">
                      <td>
                        <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                          <b-form-input v-model="cara.nombre" placeholder="Nombre... Example Modelo,Marca..." />
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </td>

                      <td>
                        <validation-provider name="valor" rules="required" #default="{errors,valid}">
                          <b-form-input v-model="cara.valor" placeholder="Valor... Example Land Cruise, toyota..."/>
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </td>
                      <td>
                        <b-button variant="danger" @click="quitarCaracteristica(i)">
                          <feather-icon icon="TrashIcon" />

                        </b-button>
                      </td>

                    </tr>
                  </tbody>
                </table>
              </section>
            </b-col>
          </b-row>

          <el-divider content-position="left">Datos de Envío</el-divider>
          
          <b-row>
            <b-col cols="12">
              <b-form-group label="¿ vas a realizar envíos ?">

                <b-form-radio-group v-model="formulario.enviable" :options="[{text:'Sí',value:true},{text:'No',value:false}]" @change="$store.commit('producto/toggleEnvio',$event)">

                </b-form-radio-group>

              </b-form-group>

              <section class="mt-1" v-if="formulario.envio">

                <b-container fluid>
                  <b-row>
                    <b-col cols="12" md="6">
                      <b-form-group>
                        
                        <template #label>
                          Precio: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="envio.precio" rules="required" #default="{errors,valid}">

                          <currency-input v-model="formulario.envio.precio" :options="{ ...optionsCurrency ,...{
                            currency:getCurrency == 'Tp' ? 'USD' : getCurrency, 
                            currencyDisplay:getCurrency == 'Tp' ? 'name' : 'code' }}"
                            class="form-control"></currency-input>

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">

                       <b-form-group description="Explique las condiciones de envíos">
                        
                        <template #label>
                          Condiciones : <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="condiciones" rules="required" #default="{errors,valid}">
                         <b-form-textarea v-model="formulario.envio.condiciones" :rows="3">
                        </b-form-textarea>

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                        </validation-provider>
                      </b-form-group>

                    </b-col>
                  </b-row>
                </b-container>
              </section>
              
            </b-col>
          </b-row>

           <el-divider content-position="left">Tiendas en la que habrá este Producto</el-divider>

           <b-row>
            <b-col cols="12" >
                <b-button-group size="sm" class="mb-1">
                  <b-button size="sm" variant="primary" @click="$store.commit('producto/agregarTienda')">Agregar Tienda</b-button>
                </b-button-group>


                <section v-if="formulario.tiendas.length">
                  <table class="table table-sm table-hover w-100">
                    <thead>
                      <th>Tienda</th>
                      <th>Cantidad</th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in formulario.tiendas" :key="i">
                        <td>
                          <validation-provider name="tienda_id" rules="required" #default="{ errors, valid }">
                            <v-select v-model="item.tienda_id" :reduce="option => option.id" label="nombre" :options="tiendas"
                              :selectable="(option) => formulario.tiendas.find(val => val.tienda_id === option.id) ? false : true ">
                            </v-select>
                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </td>

                        <td>
                          <validation-provider name="cantidad" rules="required" #default="{ errors, valid }">
                            <b-form-spinbutton v-model="item.cantidad" :state="valid" min="1" />
                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </td>
                        <td>
                          <b-button variant="danger" @click="quitarTienda(i)">
                            <feather-icon icon="TrashIcon" />

                          </b-button>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </section>
            </b-col>
           </b-row>


           <template v-if="!formulario.id">
              <el-divider content-position="left">Asociar imagenes al producto</el-divider>
             <b-row>
              <b-col cols="12">
                <multimedia hideVideos seleccionable />

              </b-col>
             </b-row>
          </template>
         



          </b-container>
          
          <template #footer>
            <b-button-group size="sm">
             
              <b-button size="sm" type="submit" variant="primary" title=" Guardar" v-loading="loading" :disabled="loading">
                <font-awesome-icon icon="fas fa-save"/>
                Guardar
              </b-button>

              <b-button variant="dark" :to="{name:'producto.list'}" title="Regresar">
                <font-awesome-icon icon="fas fa-arrow-left" />
                Regresar
              </b-button>

              <b-button variant="success" :to="{name:'producto.create'}" title="nuevo producto" v-if="formulario.id">
                Nuevo producto
              </b-button>

            </b-button-group>
          </template>
        </b-card>
      </b-form>
    </validation-observer>
</template>

<script>

import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'

import {required,min} from '@validations';
import Editor from '@tinymce/tinymce-vue'

import {
  BForm,
  BFormGroup,
  BCard,
  BContainer,
  BRow,
  BCol,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormInput,
  BFormSpinbutton,
  BFormRadioGroup,
  BFormTextarea,
  BFormFile
} from 'bootstrap-vue';

import { toRefs, computed, ref,watch, provide } from 'vue';
import vSelect from 'vue-select'

import store from '@/store'
import { optionsCurrency, optionsEditor } from '@core/utils/utils';
export default {
  components:{
    BForm,
    BFormGroup,
    BCard,
    BContainer,
    BRow,
    BCol,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    BFormInput,
    BFormSpinbutton,
    BFormRadioGroup,
    BFormTextarea,
    BFormFile,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    Editor,
    CurrencyInput:() => import('components/CurrencyInput.vue'),
    multimedia:() => import('views/multimedias/multimedia.vue')
  },


  setup(props,{emit}){
    const {producto:formulario} = toRefs(store.state.producto)
    const formValidate = ref(null)
    const {categorias} = toRefs(store.state.categoriaProducto)
    const { tiendas } = toRefs(store.state.tienda)
    const {divisas} = toRefs(store.state.divisa)
    const seleccionados = ref([])
    const enviable = ref(false)
    
    provide('seleccionados',seleccionados)

    const cargarForm = () => {

      if(!categorias.value.length){
        store.dispatch('categoriaProducto/getCategorias')
      }

      if (!tiendas.value.length) {
        store.dispatch('tienda/getTiendas')
      }

       if (!divisas.value.length) {
        store.dispatch('divisa/getDivisas')
      }

      if(formulario.value.id){
        formulario.value.archivo = null
        formulario.value.tiendas = formulario.value.tiendas.map(val => val.pivot)
      }

    }

    cargarForm();
    watch([formulario],() => cargarForm())

    const guardar = () => {
       if( seleccionados.value.length){
        formulario.value.imagenes = seleccionados.value
       }

       emit('save',formulario.value, formValidate.value)
    } 

    const quitarCaracteristica = (car_i) => {
      store.commit('producto/quitarCaracteristica',car_i)
    }

    const quitarTienda = (i) => {
      store.commit('producto/quitarTienda',i)
    }

    return {
      loading:computed(() => store.state.loading),
      formulario,
      formValidate,
      guardar,
      categorias,
      required,
      min,
      tiendas,
      optionsCurrency,
      optionsEditor,
      quitarCaracteristica,
      enviable,
      divisas,
      seleccionados,
      getCurrency:computed(() => {

        if(formulario.value.divisa_id){

          return divisas.value.find(val => val.id === formulario.value.divisa_id) 
          ?  divisas.value.find(val => val.id === formulario.value.divisa_id).iso == 'Tp' 
                          ? 'USD' : divisas.value.find(val => val.id === formulario.value.divisa_id).iso
          : 'MXN'
        }

        return 'MXN';

      }),

      quitarTienda,
      getTiendas:computed(() => {
        return tiendas.value.filter(
          val => formulario.value.tiendas.find(v =>  v.tienda_id === val.id )  ? false : true
        )
      })
    }
  }
}
</script>