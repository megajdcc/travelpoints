<script>
import { h } from 'vue'

export default {

  setup: () => {
    return () => h(import('components/Views.vue'))
  }

}
</script>