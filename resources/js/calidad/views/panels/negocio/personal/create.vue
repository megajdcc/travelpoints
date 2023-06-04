<script>
import form from './form.vue'
import {h,onMounted} from 'vue'
import store from '@/store'
import router from '@/router'

export default {
   
   setup(){

      onMounted(() => store.commit('empleado/clear'))

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('empleado/guardar',data).then(({result,empleado,usuario}) => {

                  if(result){
                     toast.success('Se ha asociado como empleado correctamente.')
                     store.commit('empleado/push',empleado)
                     store.commit('usuario/updateUsuario',usuario)
                     router.push({name:'personal.edit',params:{id:empleado.id}})
                  }else{
                     toast.info('No se pudo asociar, inténtelo de nuevo')

                  }

               }).catch(e => {

                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }
                  console.log(e)
               })

               
            }

         }

      })
   }
}
</script>