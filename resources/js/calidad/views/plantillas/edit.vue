<script>
import form from './form'

import { h, ref, toRefs, onMounted,watch } from '@vue/composition-api'

import store from '@/store';
import router from '@/router';

import { Notification } from 'element-ui';

export default {

   props:['id'],

   setup(props) {


      const { id } = toRefs(props)
      
      const { plantillas } = toRefs(store.state.plantilla)

      const cargarForm = () => {

            if(plantillas.value.length){
               store.commit('plantilla/capturar',id.value)

            }else{
               store.dispatch('plantilla/getPlantilla',id.value)

            }


      }

      watch([id,plantillas] , () => {
         cargarForm();
      })

      onMounted(() => cargarForm())

      return () => h(form,{
            on: {

               save: (data, formValidate) => {

                  store.dispatch('plantilla/guardar', data).then(({ result, plantilla }) => {

                     if (result) {
                        Notification.success({
                           message: 'Se ha guardado con éxito la plantilla',
                           position: 'bottom-right'
                        })

                        store.commit('plantilla/push', plantilla)

                     } else {
                        Notification.info({
                           message: 'No se pudo guardar, intentelo de nuevo mas tarde...',
                           position: 'bottom-right'
                        })
                     }

                  }).catch(e => {

                     if (e.response.status === 422) {
                        formValidate.setErrors(e.response.data.errors)
                     }


                  })


               }

            }
         }
      )

   },
}
</script>