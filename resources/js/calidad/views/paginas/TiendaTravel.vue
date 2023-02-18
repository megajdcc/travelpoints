<template>
    <tienda isStore>
    </tienda>
</template>

<script>

export default {
  
  components:{
    tienda:() => import('views/tienda/productos/list.vue')
  }

}
</script>