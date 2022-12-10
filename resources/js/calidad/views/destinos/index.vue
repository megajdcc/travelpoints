<script>

import {h} from '@vue/composition-api'
import views from 'components/Views.vue'

export default{

   setup(){
      return () => h(views)
   }

}


</script>