<script>
import form from './form.vue'
import {h,toRefs} from 'vue'
import store from '@/store'

export default{

  props:{
    id:Number|String
  },

  setup(props) {
    
    const {id} = toRefs(props)
    
    const cargarForm = () => {
        store.dispatch('idioma/fetch',id.value)
    } 

    cargarForm()

    return () => h(form,{

      on:{
        save:(data,formValidate) => {

          store.dispatch('idioma/guardar',data).then(({result}) => {

            if(result){
              toast.success('Se ha guardado con éxito el idioma')
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
