<template>
  
  <v-select :value="usuarioId" :filter="filterUser" :reduce="option => option.id" @input="$emit('update:usuarioId',$event)" :options="usuarios">
    <template #option="{nombre,apellido,imagen}">
      <section class="d-flex">
        <b-avatar :src="`/storage/img-perfil/${imagen}`"  class="mr-1"/>
        <small>{{ `${nombre} ${apellido}` }}</small>
      </section>
    </template>

    <template #selected-option="{ nombre, apellido, imagen }">
        <section class="d-flex">
          <b-avatar :src="`/storage/img-perfil/${imagen}`"  class="mr-1"/>
          <small>{{ `${nombre} ${apellido}` }}</small>
        </section>
      </template>
  </v-select>

</template>

<script>

import {toRefs,computed} from 'vue'
import store from '@/store'

import {
  BAvatar,
  BImg,
} from 'bootstrap-vue';
import vSelect from 'vue-select';

export default {

  components:{
    vSelect,
    BAvatar,
    BImg
  },

  props:{
    usuarioId:Number
  },

  model:{
    prop:'usuarioId',
    event:'update:usuarioId'
  },

  setup(props,{emit}){
    const {usuarios} = toRefs(store.state.usuario)

    const cargarForm = () => {

      if(!usuarios.value.length){
        store.dispatch('usuario/cargarUsuarios')
      }

    }

    cargarForm();

    const filtrarUsuario = ({ nombre, apellido, email }, label, search) => {
      return ([nombre, apellido, email].toString() || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
    }

    return {
      usuarios,
      filterUser:(options,search) => {
          return options.filter(option => {

          let label = option.nombre

          return filtrarUsuario(option, label, search);
        });
      },
      filtrarUsuario
    }
  }

}
</script>