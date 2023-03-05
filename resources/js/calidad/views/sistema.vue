<template>

  <validation-observer ref="formValidate" #default="{handleSubmit}">
    <b-form @submit.prevent="handleSubmit(guardar)">

      <b-card>
        <b-container fluid>

          <b-row v-if="!sistema.cuenta">
            <b-col cols="12">
              <b-alert show variant="secondary" class="p-1">
                El sistema no tiene asociada una cuenta todavía; <b-link variant="primary" @click="crearCuentaSistema">¿ Crear cuenta del sistema?</b-link>
              </b-alert>

            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group>
                <template #label>
                  Nombre del sistema: <span class="text-danger">*</span>
                </template>
        
                <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                  <b-form-input v-model="formulario.nombre" :state="valid" />
        
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
        
                </validation-provider>
              </b-form-group>

              <b-form-group description="Divisa con la que va a operar Travelpoints, ¿ en que divisa vamos a reflejar las ganancias del sistema?">
                <template #label>
                  Divisa: <span class="text-danger">*</span>
                </template>
        
                <validation-provider name="divisa_id" rules="required" #default="{errors,valid}">
                  
                  <v-select v-model="formulario.divisa_id" :options="divisas" label="nombre" :reduce="(option) => option.id"></v-select>
        
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
        
                </validation-provider>
              </b-form-group>

            </b-col>

            <b-col cols="12" md="6">
              <b-form-group description="Descripción del sistema breve ...">
                <template #label>
                  Descripción:
                </template>
            
                <validation-provider name="descripcion"  #default="{errors,valid}">
                  <b-form-textarea v-model="formulario.descripcion" :rows="1" placeholder="Descripción del sistema ..." :state="valid">
                  
                  </b-form-textarea>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
              </b-form-group>

              <b-form-group label="¿Es una empresa Digital?">
                <validation-provider name="empresa_digital" rules="required" #default="{errors,valid}">
                    <b-form-radio-group v-model="formulario.empresa_digital" :state="valid" 
                    :options="[{ text: 'Sí', value: true }, { text: 'No', value: false },]">
                    </b-form-radio-group>
                     <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
            </b-col>

            
          </b-row>

          <b-row>
            <b-col cols="12">
              <b-form-group>
          
                <template #label>
                  Términos y condiciones:
                </template>
          
                <validation-provider name="terminos" #default="{ errors,valid }">
          
                  <editor output-format="html" :value="formulario.terminos" @input="formulario.terminos = $event"
                    api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
          
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
          
                </validation-provider>
          
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="¿ Paypal ?" description="Vas a integrar Paypal como metodo de pago ">
                
                <validation-provider name="paypal" rules="required" #default="{valid,errors}">
                  
                  <b-form-radio-group v-model="formulario.paypal"  button-variant="primary" :options="[{text:'Sí',value:true},{text:'No',value:false}]" :state="valid">
                  
                  </b-form-radio-group>

                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>

                </validation-provider>

              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" v-if="formulario.paypal">
              <b-form-group label="Producción o prueba ? " >
            
                <validation-provider name="production_paypal" rules="required" #default="{valid,errors}">
            
                  <b-form-radio-group v-model="formulario.production_paypal" button-variant="primary"
                    :options="[{text:'Producción',value:true},{text:'Prueba',value:false}]" :state="valid">
            
                  </b-form-radio-group>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
            
              </b-form-group>
            </b-col>
            


            <b-col cols="12" md="6" v-if="formulario.paypal">
              <b-form-group label="Paypal Id">
            
                <validation-provider name="paypal_id" rules="required" #default="{valid,errors}">
            
                  <b-form-input v-model="formulario.paypal_id" :state="valid" ></b-form-input>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
            
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" v-if="formulario.paypal">
              <b-form-group label="Paypal Secrect">
            
                <validation-provider name="paypal_secrect" rules="required" #default="{valid,errors}">
            
                  <b-form-input v-model="formulario.paypal_secrect" :state="valid" ></b-form-input>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
            
              </b-form-group>
            </b-col>


          </b-row>

          <el-divider content-position="left">Banner Principal</el-divider>
          <b-row>
            <b-col cols="12">
                <section class="banner-principal-img" :style="{
                  'background-image':`url('/storage/${formulario.banner_principal}')`
                }" @click="refBanner.$el.click()"> 

                </section>

                <b-form-file ref="refBanner" v-model="banner_principal" plain class="d-none" accept="image/*" @input="updateBanner">

                </b-form-file>

                <small>
                  <strong class="text-danger">Nota:</strong>
                  Clics sobre la imagen para actualizarla, cargue una imagen ultra wide preferiblemente de este tamaño, 1300 x 300 PX. Esta imagen es mostrada en los principales Banner de las paginas Publicas.
                </small>
            </b-col>
          </b-row>

          <el-divider content-position="left">
            Redes Sociales
          </el-divider>

          <b-row>
            <b-col cols="12">
              <b-button-group size="sm">
                <b-button variant="primary" title="Agregar Red Social" @click="$store.commit('sistema/agregarRedSocial')">
                  Agregar
                </b-button>
              </b-button-group>

              <table class="table table-sm table-hover w-100 mt-1">
                <thead>
                  
                  <th>Red Social</th>
                  <th>Url</th>
                  <th>Icono de la Red Social</th>
                  <th></th>
                </thead>
                <tbody>
                  <tr v-for="(red_social,i) in formulario.redes" :key="i">
                      <td>
                        <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                          <b-form-input v-model="red_social.nombre" :state="valid" placeholder="Facebook, Twitter ..." />
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[i] }}
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </td>

                       <td>
                          <validation-provider name="url" rules="required|url" #default="{ valid, errors }">
                            <b-form-input v-model="red_social.url" :state="valid" placeholder="https://facebook.com/travelpoints" />
                            <b-form-invalid-feedback :state="valid">
                              {{ errors[i] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </td>

                      <td>
                          <validation-provider name="redes.icono" rules="required" #default="{ valid, errors }">
                            <v-select v-model="red_social.icono" :options="marcasFontAwesome" :reduce="option => option" :filterBy="filtradoIcon">
                                  <template #option="{label}">
                                    <font-awesome-icon :icon="['fab',label]" class="mr-1"/>
                                    {{ label }}
                                  </template>

                                  <template #selected-option="{label}">
                                      <font-awesome-icon :icon="['fab',label]" class="mr-1"/>
                                      {{ label }}
                                  </template>
                            </v-select>
                            <b-form-invalid-feedback :state="valid">
                              {{ errors[i] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </td>

                        <td>
                          <b-button variant="danger"  title="eliminar" @click="eliminarRedSocial(red_social,i)">
                            <font-awesome-icon icon="fas fa-trash"/>
                          </b-button>
                        </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>

          <el-divider content-position="left">
             Sucursales
          </el-divider>

          <b-row>
            <b-col cols="12">
               
            </b-col>  
          </b-row>

        </b-container>

        <template #footer>
            <b-button-group size="sm">

              <b-button type="submit" v-loading="loading" :disabled="loading" variant="primary">
                <feather-icon icon="SaveIcon" />
                Guardar
              </b-button>

              <b-button @click="regresar" variant="dark" title="Regresar">
                <feather-icon icon="ArrowLeftIcon" />
                Regresar
              </b-button>

            </b-button-group>
        </template>
      
      </b-card>
       
    </b-form>
  </validation-observer>
    
</template>

<script>

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import store from '@/store'

import { regresar,optionsEditor } from '@core/utils/utils';

import {required,url} from '@validations'
import Editor from '@tinymce/tinymce-vue'

import {
  BCard,
  BForm,
  BFormInput,
  BFormGroup,
  BFormFile,
  BImg,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormTextarea,
  BContainer,
  BRow,
  BCol,
  BFormRadioGroup,
  BAlert,
  BLink
} from 'bootstrap-vue'

import {computed,toRefs,ref,onMounted} from '@vue/composition-api'
import vSelect from 'vue-select'
import {  marcasFontAwesome } from '@core/utils/utils';

export default {
  
  components:{
    BCard,
    BForm,
    BFormInput,
    BFormGroup,
    BFormFile,
    BImg,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    BFormTextarea,

    ValidationObserver,
    ValidationProvider,

    BContainer,
    BRow,
    BCol,
    Editor,
    BFormRadioGroup,
    BAlert,
    BLink,
    vSelect

  },


  setup(){

    const formValidate = ref(null)

    const {sistema:formulario} = toRefs(store.state.sistema)
    const urlLogo1 = ref(null)
    const urlLogo2 = ref(null)
    const banner_principal = ref(null)
    const refBanner = ref(null)

    const {sistema} = toRefs(store.state.sistema)
    const {divisas} = toRefs(store.state.divisa)

    if(!divisas.value.length){
      store.dispatch('divisa/getDivisas')
    }

    const logoSeleccionado = ( tipo_logo = 1) => {

    }   

    onMounted(() => {
    })

    const guardar  = () => {

      store.dispatch('sistema/guardar',formulario.value).then(({result,sistema:sistem}) => {

        if(result){
          formulario.value.banner_principal = sistem.banner_principal
          toast.success('Se ha guardado con éxito',{position:'bottom-right'})
        }else{
          toast.info('No se pudo guardar, inténte de nuevo', { position: 'bottom-right' })

        }
      })
    }

    const crearCuentaSistema = () => {

        
      store.dispatch('sistema/crearCuenta').then(({result}) => {

        if(result){
          toast.success('Se ha creado con éxito la cuenta',{position:'bottom-right'})
        }else{
          toast.info('La cuenta no pudo ser creada, inténte con de nuevo', { position: 'bottom-right' })
        }
      });


    } 

    const updateBanner = (file) => {


      store.dispatch('sistema/updateBanner',{banner_principal:file}).then(({result}) => {

        if(result){
          toast.success('Se ha cargado con éxito la nueva imagen',{position:'bottom-right'})
        }else{
          toast.info('No se pudo cargar la imagen, inténtelo de nuevo', { position: 'bottom-right'})

        }
      })
    }
    const eliminarRedSocial = (red,i) => {

      if(!red.id){
        store.commit('sistema/eliminarRed',i)
      }else{
        
        store.dispatch('sistema/eliminarRed',red.id).then(({result}) => {
          if(result){
            toast.success('Se Ha eliminado con éxito la Red Social',{position:'bottom-right'})
          }else{
            toast.info('No se pudo Eliminar la red social, inténtelo de nuevo...', { position: 'bottom-right' })
          }
        })

      }
    }
    return {
      loading:computed(() => store.state.loading),
      formulario,
      formValidate,
      urlLogo1,
      urlLogo2,

      guardar,

      logoSeleccionado,

      regresar,
      required,
      url,
      optionsEditor,
      crearCuentaSistema,
      sistema,
      divisas,
      refBanner,
      banner_principal,
      updateBanner,
      marcasFontAwesome,
      filtradoIcon:(option,label,search) => {
         return (label || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      },
      eliminarRedSocial


    }

  }
}
</script>

<style lang="scss">
  .banner-principal-img{
    width: 100%;
    height: 350px;
    border: 3px dotted rgba(0,0,0,.5);
    border-radius: 20px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>