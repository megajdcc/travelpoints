<template>
      <b-popover
        :target="target"
        triggers="click"
        :show.sync="popoverShow"
        placement="auto"
        container="my-container"
        ref="popover"
       
      >
        <template #title>
          <!-- <b-button @click="onClose" class="close" aria-label="Close">
            <span class="d-inline-block" aria-hidden="true">&times;</span>
          </b-button> -->
          {{ event.title }}
        </template>
      </b-popover>
</template>

<script>
import {BPopover} from 'bootstrap-vue'
import {onMounted} from '@vue/composition-api'
export default {
  components:{
    BPopover
  },

  props:['event','target','popoverShow'],


  setup(){
    onMounted( () => console.log('cargando'))
  }
}
</script>