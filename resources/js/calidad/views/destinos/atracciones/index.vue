<script>

import {h,toRefs} from 'vue'
import views from 'components/Views.vue'

export default {

   setup(props){
      return () => h(views)
   }
   
}
</script>