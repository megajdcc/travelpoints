
<script>
import dashboard from 'views/dashboard/dashboard.vue'
import dashboardPromotor from 'views/dashboard/dashboardPromotor.vue'
import dashboardLider from 'views/dashboard/dashboardLider.vue'
import dashboardCoordinador from 'views/dashboard/dashboardCoordinador.vue'

import {h,computed,toRefs,watch,ref} from 'vue'
import store from '@/store'

export default {

  setup(props){
    const rolName = computed(() => store.getters['usuario/rolName'])
    const {usuario} = toRefs(store.state.usuario)

    const propiedades = ref({})
    const dashboardShow = ref(null)

    const cargarDash = () => {

      if(rolName.value == 'Promotor') {
        dashboardShow.value  = dashboardPromotor
        propiedades.value.promotor = usuario.value
      } else if (rolName.value == 'Lider') {
         dashboardShow.value = dashboardLider
      } else if (rolName.value == 'Coordinador') {
         dashboardShow.value = dashboardCoordinador
      } else {
        dashboardShow.value = dashboard

      }

    }

  
    watch(rolName,() => cargarDash)

    cargarDash()

    return () => h(dashboardShow.value,{
      props:{
        ...propiedades.value
      }
    })
  }
}
</script>

