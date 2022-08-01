<template>
   <layout-travel>
      <router-view />
   </layout-travel>
</template>

<script>


import LayoutTravel from '@core/layouts/layout-travel/LayoutTravel.vue';

export default {
   components: {
      LayoutTravel,
   },
}
</script>
