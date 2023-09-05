
<template>
  <section>


    <listado hideFooter :actions="actions" isTable>
      
      <template #header-table="{total}">
        <b-container fluid >
          <b-row>
             <b-col cols="12" md="4">
                <statistic-card-horizontal icon="fa-people-group" statisticTitle="Promotores a cargo"
                      color="primary" colorIcon="white" colorText="text-white" :statistic="total">
                      <template #btn-card>
                        <b-button variant="danger" size="sm" @click="crearPromotor()" class="mt-1 d-block" v-if="$can('write', 'promotores')" >
                          Crear Promotor
                        </b-button>
                      </template>
                </statistic-card-horizontal>
             </b-col>
          </b-row>
        </b-container>
      </template>
      <template #btn-action>
        <b-button type="variant" @click="agregarPromotor" v-if="$can('write', 'promotores')"
          class="d-flex flex-column justify-content-center">
          Agregar Promotor
        </b-button>
      </template>

      <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">
        <b-card class="mt-1">
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
              empty-text="No se encontró ningún Promotor" :sort-desc="isSortDirDesc" sticky-header="700px"
              :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md" thead-class="text-nowrap">

            <template #cell(ranking)="{index}">
              {{ index + 1}}
            </template>

            
            <!-- Column: User -->
            <template #cell(username)="{ item }">
             <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
              <template #aside>
                <b-avatar size="32" :src="`/storage/img-perfil/${item.imagen}`" :text="avatarText(`${item.nombre} ${item.apellido}`)"
                  :variant="`light-${resolveUserRoleVariant(item.rol.nombre)}`"
                  @click="mostrarAboutUsuario(item)"  />
              </template>
              <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
                class="font-weight-bold d-block text-nowrap p-0">
                {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre' }}
              </b-button>
              <small class="text-muted" v-if="item.username">{{ item.username }}</small>
            </b-media>
            </template>

            <template #cell(status)="{item}">
              <font-awesome-icon :icon="['fas','fa-circle']" size="2x" :color="getColorsStatus(item.status)" />
            </template>

            <template #cell(nivel)="{item}">
              {{ getNivels(item.nivel) }}
            </template>

            <template #cell(comision_mes)="{ item }">
              <span class="text-nowrap">
                {{ item.comision_mes ? item.comision_mes : 0  | currency(item.cuenta ? item.cuenta.divisa.iso : 'USD') }} {{ item.cuenta ? item.cuenta.divisa.simbolo : '$' }}
              </span>
            </template>

            <template #cell(lider_id)="{item}">
                   <b-media v-if="item.lider_id" vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item.lider)">
                    <template #aside>
                      <b-avatar size="32" :src="`/storage/img-perfil/${item.lider.imagen}`" :text="avatarText(`${item.lider.nombre} ${item.lider.apellido}`)"
                        :variant="`light-${resolveUserRoleVariant(item.lider.rol.nombre)}`"
                        @click="mostrarAboutUsuario(item.lider)"  />
                    </template>
                    <b-button @click="mostrarAboutUsuario(item.lider)" variant="outline-text" size="sm"
                      class="font-weight-bold d-block text-nowrap p-0">
                      {{ item.lider.nombre ? `${item.lider.nombre} ${item.lider.apellido}` : 'Sin definir nombre' }}
                    </b-button>
                    <small class="text-muted" v-if="item.lider.username">{{ item.lider.username }}</small>
                    <b-button size="sm" v-if="$store.getters['usuario/isRol']('Desarrollador')" variant="text" @click="quitarLider(item.id)" title="Quitar Lider">
                      <font-awesome-icon icon="fas fa-trash" class="my-0" color="#E11383" />
                    </b-button>
                  </b-media>

                  <b-button variant="primary" v-else-if="$store.getters['usuario/isRol']('Desarrollador')" @click="asignarLider(item.id)" size="sm" >
                    Asignar
                  </b-button>

                  <span v-else>
                    Sin Asignar
                  </span>
            </template>

            <template #cell(destino_id)="{item}">
                <b v-if="item.destino_id">
                  {{ item.destino.nombre }}
                </b>

                <b-button v-else size="sm" variant="danger" @click="showDestino(item)">
                  Asignar Destino
                </b-button>

            </template>
            
            <!-- Column: Actions -->
            <template #cell(actions)="{item}">
                <b-button size="sm" variant="primary" :to="{name:'promotor.ficha',params:{id:item.id}}">
                  <font-awesome-icon icon="fas fa-user" />
                  Ver Promotor
                </b-button>
            </template>
           

            </b-table>
          </b-card>

      </template>

    </listado>

    <b-sidebar v-model="showUsersLiders" title="Asignar Lider a Promotor" @shown="cargarUsers" backdrop>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardarAsignacion)">
          <b-container fluid>
            <b-row>
              <b-col cols="12"  >
                <b-form-group>
                  <template #label>
                    Lider: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="lider_id" rules="required" #default="{errors,valid}">
                    
                    <v-select v-model="formulario.lider_id" :state="valid" :options="lideres" :reduce="option => option.id" label="nombre">

                    </v-select>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <b-button-group size="sm">
                  <b-button variant="primary" type="submit" title="Guardar" v-loading="loading">
                    Asignar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>

    <b-sidebar v-model="showFormularioPromotor" title="Agregar Promotor" backdrop>
      <validation-observer ref="formValidatePromotor" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardarPromotor)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
               

                  <b-form-group label="Username" label-for="username">
                     <validation-provider #default="{ errors, valid }" name="username" rules="required">
                        <b-form-input id="username" v-model="form.username" autofocus
                          :state="valid" trim placeholder="" />

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                       </validation-provider>
                  </b-form-group>
               
                  <b-form-group label="Nombre" label-for="nombre">
                     <validation-provider #default="{ errors,valid }" name="nombre" rules="required">
                      <b-form-input id="nombre" v-model="form.nombre" autofocus
                        :state="valid" trim placeholder="" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                       </validation-provider>
                  </b-form-group>


                
                    <b-form-group label="Apellido" label-for="apellido">

                       <validation-provider #default="{ errors,valid }" name="apellido" rules="required">
                        <b-form-input id="apellido" v-model="form.apellido" autofocus
                          :state="valid" trim placeholder="Crespo" />

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                        </validation-provider>
                    </b-form-group>
                 

                   <!-- Email -->
                 
                    <b-form-group label="Email" label-for="email">
                       <validation-provider #default="{ errors,valid }" name="email" rules="required|email">
                          <b-form-input id="email" v-model="form.email"
                            :state="valid" trim />

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                          </validation-provider>
                    </b-form-group>

                    <b-form-group label-for="divisa" description="Divisa en la que va a recibir la comisión este promotor">
                        
                      <template #label>
                          Divisa: <span class="text-danger">*</span>
                        </template>

                        <validation-provider #default="{ errors, valid }" name="divisa_id" rules="required">
                          <v-select v-model="form.divisa_id" :reduce="option => option.id" label="nombre" :options="divisas.filter(val => val.iso != 'Tp')"></v-select>
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                          </validation-provider>
                    </b-form-group>

              </b-col>
            </b-row>


            <b-row>
              <b-col cols="12">
                <b-button-group size="sm">
                  <b-button variant="primary" type="submit" title="Guardar Promotor" v-loading="loading">
                    <font-awesome-icon icon="fas fa-save"/>
                    Guardar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>

    <b-sidebar v-model="isShowDestino" title="Destino" backdrop>
      <validation-observer ref="formValidateUser" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(asociarDestino)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Destino" description="Seleccione un destino">
                  <validation-provider name="destino_id" rules="required" #default="{valid,errors}">
                    <v-select v-model="formUser.destino_id" :options="destinos" label="nombre" :reduce="(option) => option.id"></v-select>

                    <b-form-invalid-feedback :state="valid">
                      {{  errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-button variant="primary" size="sm" v-loading="loading" type="submit" :disabled="loading">
                  <font-awesome-icon icon="fas fa-save"/>
                  {{ $t('Guardar') }}
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-sidebar>
 
  </section>

</template>


<script>

import store from '@/store'
import {computed,toRefs,ref,onMounted,watch,inject} from 'vue'
import { avatarText } from '@core/utils/filter'

import usePromotoresList from './usePromotoresList.js'

import {resolveUserRoleVariant, resolveUserRoleIcon } from '@core/utils/utils'
import {required,email} from '@validations'

import { getStatusLegendPromotor } from '@core/utils/utils'
import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BPagination,
  BFormCheckbox,
  BSidebar,
  BContainer,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BButtonGroup

} from 'bootstrap-vue';


import { ValidationObserver,ValidationProvider } from 'vee-validate'

import vSelect from 'vue-select'
export default {

  components:{
    Listado:() => import('components/Listado.vue'),
    BCard,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BDropdownItemButton,
    BPagination,
    BFormCheckbox,
    BSidebar,
    BContainer,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    BButtonGroup,
    StatisticCardHorizontal


  },


  props:{
    'liderId':{
      type:Number|String,
      required:false
    },
    id:Number|String
  },


  setup(props,{emit}){
    
    const {usuario,usuarios} = toRefs(store.state.usuario)
    const { liderId:lider_id } = toRefs(props)

    const userAbout = inject('userAbout')
    const showAboutProfile = inject('showAboutProfile')
    const showFormUser = inject('showFormUser')
    const tipoFormUser = inject('tipoFormUser')
    const lider_id_form = inject('liderId')

    const isShowDestino  = ref(false)
    const formUser = ref({})
    const lider = ref({
      id:null,
      rol:{
        nombre:'Lider'
      }
    })  

    const {destinos} = toRefs(store.state.destino)
    const {divisas} = toRefs(store.state.divisa)

    const actions = usePromotoresList(lider);
    
    const showUsersLiders = ref(false)
    const formValidate =ref(null)
    const formValidatePromotor = ref(null)
    const formValidateUser =ref(null)

    const showFormularioPromotor = ref(false)

    const form = ref({
      username:'',
      nombre:'',
      apellido:null,
      email:'',
      lider_id:null,
      divisa_id:null
    })

    const formulario = ref({
      lider_id:null,
      promotor_id:null
    })

    const cargarForm = () => {
      
      if(lider_id.value){
        lider.value.id = lider_id.value
        lider.value.rol = { nombre: 'Lider' }

      }

       if(!usuarios.value.length){
        store.dispatch('usuario/cargarLideres')
       }

       if(!divisas.value.length){
        store.dispatch('divisa/getDivisas')
       }

       if(store.getters['usuario/isRol']('Lider')){
          lider.value.id = usuario.value.id,
          lider.value.rol = usuario.value.rol 
       }


       setTimeout(() => actions.refetchData(), 1000)

    }

    cargarForm()

    watch(lider_id,() => cargarForm())


    watch(() => lider.value.id,() => {
      actions.refetchData()
    })

    watch(() => usuario.value.rol,() => {
      cargarForm()
    })

    const cambiarEstado = (user_id) => {

      store.dispatch('usuario/cambiarEstado',user_id).then(({result}) => {

        if(result){
          toast.success('Se ha cambiado con éxito el estado del promotor')
          actions.refetchData()
          emit('change')
        }else{
          toast.info('No se pudo cambiar el Estado del promotor')
          actions.refetchData();
          emit('change')

        }
      }).catch(e => console.log(e))
      
    }

    const asignarLider = (promotor_id)  => {
      formulario.value.promotor_id = promotor_id
      showUsersLiders.value = true;
    }
    const guardarAsignacion = () => {
      store.dispatch('usuario/asignarLiderPromotor',formulario.value).then(({result}) => {

        if(result){

          toast.success('Se ha asignado con éxito al lider')
          actions.refetchData();
          emit('change')


          formulario.value = {
              lider_id: null,
              promotor_id: null
          }

          showUsersLiders.value = false;


        }else{
          toast.info('No se pudo asignar al lider')

        }
      }).catch(e => {
        
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }

      })
    } 

    const agregarPromotor = () => {
      showFormularioPromotor.value = true;

    }


    const guardarPromotor = () => {

      if(['Lider'].includes(usuario.value.rol ? usuario.value.rol.nombre : '')){
        form.value.lider_id  = usuario.value.id
      }

      store.dispatch('usuario/guardarPromotor',form.value).then(({result}) => {

        if(result){
          toast.success('Se ha agregado con éxito al promotor')
          actions.refetchData();
          emit('change')

          form.value = {
            username: '',
            nombre: '',
            apellido: null,
            email: '',
            lider_id: null
          }
        showFormularioPromotor.value = false;
        }else{
           toast.info('No se pudo guardar, al promotor, inténtelo de nuevo mas tarde.')

        }
      }).catch(e => {

        if(e.response.status === 422){
          formValidatePromotor.value.setErrors(e.response.data.errors)
        }

        console.log(e)

      })
    }

    const cargarUsers = () => {
      store.dispatch('usuario/cargarLideres')
    }

    const showDestino = (user) => {

      if(!destinos.value.length){
        store.dispatch('destino/getDestinos')
      }

      formUser.value = user
      isShowDestino.value = true

    }

    const asociarDestino = () => {

      store.dispatch('usuario/guardar',formUser.value).then(({result}) => {

        if(result){
          toast.success('Se ha asociado con éxito destino al promotor')
          isShowDestino.value = false
          formUser.value = {}
          actions.refetchData()

        }else{
          toast.info('No se pudo asociar el destino, inténte de nuevo')
        }
      }).catch(e => {

        if(e.response.status === 422){
          formValidateUser.value.setErrors(e.response.data.errors)
        }else{
          console.log(e)
        }
      })
    }

    const getColorsStatus = (status) => {
      let colors = ['green','#F4B223','#E11383'];

      return colors[status -1];
    } 

    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }


    const crearPromotor  = () => {
      tipoFormUser.value = 2

      if(lider_id.value){
        lider_id_form.value = lider_id.value
      }
      showFormUser.value = true
    }


    return {
      mostrarAboutUsuario,
      crearPromotor,
      loading:computed(() => store.state.loading),
      actions,
      destinos,
      formValidateUser,
      formUser,
      refTable:actions.refTable,
      avatarText,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      divisas,
      cambiarEstado,
      asignarLider,
      showUsersLiders,
      showDestino,
      isShowDestino,
      formulario,
      formValidate,
      guardarAsignacion,
      lideres:computed(() => usuarios.value.filter((val) => ['Lider'].includes(val.rol ? val.rol.nombre : ''))),
      required,
      email,
      quitarLider:actions.quitarLider,
      agregarPromotor,
      form,
      showFormularioPromotor,
      guardarPromotor,
      formValidatePromotor,
      cargarUsers,
      getStatusLegendPromotor,
      asociarDestino,
      usuario,
      getColorsStatus,
      getNivels: (nivel = null) => {
        if(nivel){
          return nivel.nivel == null ? 'No activo' : nivel.nivel + 1
        }

        return 'No activo';
      } 
    }
  }

}
</script>