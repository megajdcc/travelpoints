<script>

import { h } from '@vue/composition-api'
import Views from 'components/Views.vue'
export default {


   setup: () => {
      return () => h(Views)
   }
}
</script>