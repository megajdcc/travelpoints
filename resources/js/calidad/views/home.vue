
<script>
import dashboard from 'views/dashboard/dashboard.vue'
import dashboardPromotor from 'views/dashboard/dashboardPromotor.vue'
import dashboardLider from 'views/dashboard/dashboardLider.vue'
import dashboardCoordinador from 'views/dashboard/dashboardCoordinador.vue'

import {h,computed} from 'vue'
import store from '@/store'

export default {

  setup(props){
    const rolName = computed(() => store.getters['usuario/rolName'])

    const componentMostrar = computed(() => {
      
      if(rolName.value == 'Promotor'){
        return dashboardPromotor;
      }else if(rolName.value == 'Lider'){
       return dashboardLider;
      } else if (rolName.value == 'Coordinador') {
        return  dashboardCoordinador;
      }else{
       return dashboard;
      }

    })


    return () => h(componentMostrar.value)
  }
}
</script>

