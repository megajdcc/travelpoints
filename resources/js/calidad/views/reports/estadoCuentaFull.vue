<script>
import movimientos from 'views/reports/cuenta.vue'

import {h,toRefs} from 'vue'

export default {
  
  props:{
    id:Number|String
  },
  
  setup(props){
    const {id} = toRefs(props)

    return () => h(movimientos,{
      props:{
        id:id.value,
        isReport:true,
        hideTitle:true
      }
    })
  }
}
</script>