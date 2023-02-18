<<<<<<< HEAD
<template>
   <div class="container-fluid px-0">

      <div class="row w-100 mx-0 px-0">
         <div class="col-12 px-0 mx-0">
            <transition :name="routerTransition" mode="out-in">
               <router-view />
            </transition>
         </div>
      </div>

   </div>
</template>



<script>

import useAppConfig from '@core/app-config/useAppConfig'


export default {

   setup(props) {
      let {
         routerTransition
      } = useAppConfig();

      return {
         routerTransition
      }
   }

}
</script>
=======

<script>

   import {h} from '@vue/composition-api'

   import Views from 'components/Views.vue'

   export default{

      setup(){
         return () => h(Views)
      }
   }
</script>
>>>>>>> vite
