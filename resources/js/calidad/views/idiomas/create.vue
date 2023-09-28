<script>
import form from './form.vue'
import {h} from 'vue'
import store from '@/store'
import router from '@/router'

export default{
  setup() {
    
    store.commit('idioma/clear')

    return () => h(form,{

      on:{
        save:(data,formValidate) => {

          store.dispatch('idioma/guardar',data).then(({result,idioma}) => {

            if(result){
              toast.success('Se ha guardado con éxito el idioma')
              router.push({name:'idioma.edit',params:{id:idioma.id}})
            }

          }).catch(e => {
              if(e.response.status === 422){
                  formValidate.setErrors(e.response.data.errors)
              }
              
          })


        }
      }
    })
  }
}
</script>
