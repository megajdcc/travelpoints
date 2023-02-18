<script>

import Views from 'components/Views.vue'
import {h} from '@vue/composition-api'

export default {

   setup(){
      return () => h(Views)
   }
}
</script>