
<script>
import {h} from 'vue'
// import tienda from 'views/tienda/productos/list.vue';
export default {
  

  setup(){
    const tienda = () => import('views/tienda/productos/list.vue');
    return () => h(tienda,{
      props:{
        isStore:true
      }
    })
  }

}
</script>