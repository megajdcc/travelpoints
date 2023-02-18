<script>

import {h} from '@vue/composition-api'

import View from 'components/Views.vue'

export default {
  
  setup(){
    return () => h(View)
  }
}
</script>