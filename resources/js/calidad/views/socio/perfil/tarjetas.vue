<template>
    <b-card >
      <b-card-title>
        Mis Tarjetas
      </b-card-title>

      <b-card-body>
        <validation-observer ref="formValidate" #default="{handleSubmit}">

          <b-form @submit.prevent="handleSubmit(asociar)">
            <b-card-text>
              <strong class="text-danger">Nota:</strong>
              Si compraste una tarjeta a un promotor o en una de nuestras tiendas de destino, aquí puedes asociarla a tu cuenta, solo colocando el código de tu tarjeta ubicado en la parte posterior de la misma.

              <b-container fluid>
                <b-row v-if="!formulario.tarjeta_id">
                  <b-col cols="12">
                    <b-form-group label="Código de la tarjeta">
                      <validation-provider name="codigo" rules="required" #default="{errors,valid}">
                         <b-form-input v-model.lazy="formulario.codigo" v-mask="'########'" @blur="onInputChange('codigo',8)" type="text" :state="valid"  :disabled="formulario.tarjeta_id ? true : false"  placeholder="Código tarjeta" />

                         <b-form-invalid-feedback :state="valid">
                          {{ errors[0]  }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row v-if="!formulario.tarjeta_id">
                  <b-col cols="12">
                    <b-button-group size="sm">
                      <b-button variant="primary" type="submit" :disabled="formulario.tarjeta_id ? true : false" v-loading="loading">
                        <font-awesome-icon icon="fas fa-save"/>
                        Asociar
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row> 

                <b-row class="mt-1" v-else>
                  <b-col cols="12">
                    <el-divider content-position="left">Tarjetas asociadas</el-divider>
                   <b-table ref="refTable" :items="fetchTarjetas" responsive :fields="tableColumns" primary-key="id"
                    :sort-by="sortBy" empty-text="No se encontró ninguna tarjeta... " :sort-desc="isSortDirDesc"
                    sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
                    showEmpty small stacked="md">

                    <template #cell(tps)="{item}">
                      Tp${{ item.lote.tps }}
                    </template>

                    <template #cell(actions)="{ item }">
                        <b-button-group size="sm">
                          <b-button variant="danger" title="Cancelar Tarjeta" @click="cancelarTarjeta(item.id)">
                            <font-awesome-icon icon="fas fa-trash"/>
                          </b-button>
                        </b-button-group>
                    </template>

                 </b-table>
                  </b-col>
                </b-row>
              </b-container>
            </b-card-text>


          </b-form>
            
        </validation-observer>
     
      </b-card-body>

    </b-card>
</template>

<script>

import {onMounted,toRefs,ref, computed,inject,watch} from 'vue';
import store from '@/store'
import router from '@/store'
import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BCardTitle,
  BCardBody,
  BCardText,
  BForm,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BTable,
} from 'bootstrap-vue'


export default {
  

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BCardTitle,
  BCardBody,
  BCardText,
  ValidationObserver, 
  ValidationProvider,
  BForm,
  BButtonGroup,
    BButton,
  BFormInvalidFeedback,
  BTable,






  },

  setup(props){
    const {usuario} = toRefs(store.state.usuario);
    const formValidate = ref(null)
    const formulario = ref({
      codigo: usuario.value.tarjeta ? usuario.value.tarjeta.numero : '',
      tarjeta_id:computed({
        set:(val) => formulario.value.tarjeta_id = val,
        get:() => usuario.value.tarjeta_id
      }),
      tarjeta:computed({
        set:(val) => formulario.value.tarjeta = usuario.value.tarjeta,
        get:() => usuario.value.tarjeta
      })
    })
    const perPage = ref(10)
    const tarjetas = ref([])
    const tableColumns = ref([
      { key:"numero",label:'Número tarjeta',sortable:true},
      { key: "tps", label: 'Tps Adjudicado', sortable: true },
      { key: "actions", label: '', sortable: true },
    ])

    const sortBy = ref('numero')
    const isSortDirDesc = ref(false)

    const refTable = ref(null)
    const swal = inject('swal')
    const onInputChange = (tipo,cant = 5)  => {

         // Remover caracteres no numéricos
        formulario.value[tipo] = formulario.value[tipo].replace(/\D/g, '');

        // Agregar ceros a la izquierda si es necesario
        while (formulario.value[tipo].length < Number(cant)) {
          formulario.value[tipo] = '0' + formulario.value[tipo];
        }

        // Asegurarse de que no se exceda la longitud máxima
        if (formulario.value[tipo].length > Number(cant)) {
          formulario.value[tipo] = formulario.value[tipo].slice(0, Number(cant));
        }
     
    }


   
    const asociar = () => {
      
      swal({
        title:'¿Está seguro de asociar?',
        message:'Solo podrá asociar una tarjeta a la vez',
        icon: 'question',
        iconHtml: '?',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButton: true
      }).then(({isConfirmed,isDenied,isDimissed,value}) => {
        if(isConfirmed){
          store.dispatch('usuario/asociarTarjeta',formulario.value).then(({result,tarjeta}) => {

            if(result){
              swal({
                title:'Tarjeta asociada con éxito',
                icon:'success',
              })

            }else{
              toast.info('No se pudo asociar la tarjeta, inténte de nuevo')
            }
          }).catch(e => {
            if(e.response.status === 422){
              formValidate.value.setErrors(e.response.data.errors)
            }else{
              console.log(e)
            }
          })
        }
      })
   
      
    }

    const cancelarTarjeta = (tarjeta_id) => {
      swal({
        title:'¿Está seguro de eliminar la asociación de esta tarjeta?',
        message: 'Solo podrá asociar una tarjeta a la vez',
        icon: 'question',
        iconHtml: '?',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButton: true
      }).then(({isConfirmed,isDenied,value, isDimissed}) => {
        
        if(isConfirmed){
          
          store.dispatch('usuario/cancelarTarjeta',tarjeta_id).then(({result}) => {
            if(result){
              toast.success('Tarjeta quitada con éxito')
              refTable.value.refresh()
              formulario.value.codigo = ''
            }
          })

        }

      })
    }


    const fetchTarjetas = (ctx,next) => {
      if(usuario.value.tarjeta){
        tarjetas.value = [usuario.value.tarjeta]
        next(tarjetas.value)
       
      }else{
        next([])
      }

      // refTable.value.refresh()
    }

    watch([usuario],() => {
      
      if(refTable.value){
        refTable.value.refresh()
      }

    })

    return {
      loading:computed(() => store.state.loading),
      usuario,
      required,
      formValidate,
      formulario,
      asociar,
      onInputChange,
      refTable,
      tarjetas,
      tableColumns,
      isSortDirDesc,
      sortBy,
      cancelarTarjeta,
      perPage,
      fetchTarjetas
    }
  }

}
</script>