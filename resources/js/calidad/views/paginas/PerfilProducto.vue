<template>
  <perfil-producto isStore :id="id"></perfil-producto>
</template>

<script>

export default {

  props:['id'],

  components: {
    PerfilProducto: () => import('views/tienda/productos/perfil.vue')
  }

}
</script>