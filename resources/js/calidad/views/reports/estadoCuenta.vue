<script>
import movimientos from 'views/socio/perfil/cuenta.vue'
import {h} from 'vue'

export default {
  
  
  setup(props){

    return () => h(movimientos,{
      props:{
        isReport:true
      }
    })
  }
}
</script>