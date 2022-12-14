<script>

import views from 'components/Views.vue'
import {h} from '@vue/composition-api'

export default {
   
   setup(){
      return () => h(views)
   }
   
}
</script>