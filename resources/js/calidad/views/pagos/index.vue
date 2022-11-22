<template>
   <div class="container-fluid px-0 mx-0">

      <div class="row w-100 px-0 mx-0">
         <div class="col-12 px-0 mx-0">
            <router-view></router-view>
         </div>

      </div>

   </div>

</template>

<script>
import {onMounted} from '@vue/composition-api';
import store from '@/store';

export default {

   setup() {
      
      onMounted(() => {
         store.dispatch('pago/cargarPagos');

      })
   },
}
</script>
