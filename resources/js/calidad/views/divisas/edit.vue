
<script>

import form from './form.vue'

import store from '@/store'

import { onMounted, h,toRefs,watch } from '@vue/composition-api'

export default {
   props:['id'],

   setup(props) {

      const {id} = toRefs(props)

      const {divisas} = toRefs(store.state.divisa)

      const cargarForm = () => {
         if(!divisas.value.length){

            store.dispatch('divisa/fetch',id.value).then((data) => {
               // console.log(data)
               store.commit('divisa/setDivisa',data)
            })

         }else{
            store.commit('divisa/capturar',id.value)
         }
         
      }


      onMounted(() => cargarForm())
      watch([divisas,id],() => cargarForm())

      
      return () => h(form, {

         on: {
            save: (data, formValidate) => {

               store.dispatch('divisa/guardar', data).then(({ result, divisa }) => {

                  if (result) {
                     toast.success('Se ha guardar con éxito la divisa.')
                  } else {
                     toast.info('No se pudo guardar la divisa, intentelo de nuevo mas tarde')
                  }

               }).catch(e => {

                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  }

               })


            }

         }
      });

   }


}

</script>