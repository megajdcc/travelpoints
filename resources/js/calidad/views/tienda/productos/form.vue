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
              </b-col>


              <b-col cols="12" md="6">
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
              </b-col>

              <b-col cols="12" md="6">
                <b-form-group description="La tienda a la que estará asociado el producto"> 
                  <template #label>
                    Tienda : <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="tienda_id" rules="required" #default="{errors,valid}">

                   <v-select v-model="formulario.tienda_id" :options="tiendas" :reduce="(option) => option.id" label="nombre"></v-select>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>
              </b-col>

               <b-col cols="12" md="6">
                <b-form-group > 
                  <template #label>
                    Precio : <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="precio" rules="required" #default="{errors,valid}">

                    <currency-input v-model="formulario.precio" :options="{ ...optionsCurrency ,...{currency:getCurrencyTienda}}" class="form-control"></currency-input>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>
              </b-col>

               <b-col cols="12" md="6">
                <b-form-group > 
                  <template #label>
                    Disponibles : <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="disponibles" rules="required" #default="{errors,valid}">
                      <b-form-spinbutton id="demo-sb" v-model="formulario.disponibles" min="1" max="1000" :state="valid" />
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

                <b-form-radio-group v-model="enviable" :options="[{text:'Sí',value:true},{text:'No',value:false}]" @change="$store.commit('producto/toggleEnvio',$event)">

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
                        <validation-provider name="precio" rules="required" #default="{errors,valid}">
                          <currency-input v-model="formulario.envio.precio" :options="{ ...optionsCurrency ,...{currency:getCurrencyTienda}}"
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
  BFormTextarea
} from 'bootstrap-vue';

import { toRefs, computed, ref,watch } from '@vue/composition-api';
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

    ValidationObserver,
    ValidationProvider,
    vSelect,
    Editor,
    CurrencyInput:() => import('components/CurrencyInput.vue')
  },


  setup(props,{emit}){
    const {producto:formulario} = toRefs(store.state.producto)
    const formValidate = ref(null)
    const {categorias} = toRefs(store.state.categoriaProducto)
    const { tiendas } = toRefs(store.state.tienda)
    const enviable = ref(false)

    const cargarForm = () => {
        if(!categorias.value.length){
          store.dispatch('categoriaProducto/getCategorias')
        }

      if (!tiendas.value.length) {
        store.dispatch('tienda/getTiendas')
      }

    }

    cargarForm();


    const guardar = () => {
        emit('save',formulario.value, formValidate.value)
    } 

    const quitarCaracteristica = (car_i) => {
      store.commit('producto/quitarCaracteristica',car_i)
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
      getCurrencyTienda:computed(() => {
        if(formulario.value.tienda_id){
          return store.getters['tienda/getCurrency'](formulario.value.tienda_id) || 'MXN'
        }

        return 'MXN';

      })
    }
  }
}
</script>