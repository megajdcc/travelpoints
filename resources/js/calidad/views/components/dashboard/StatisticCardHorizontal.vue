<template>
  <b-card no-body :bg-variant="color" >
    <b-card-body class="d-flex justify-content-between align-items-center" style="position:relative; padding: 1rem;">
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">

          <slot name="valor" :statistic="statistic">
            {{ statistic }}
          </slot>

        </h2>
        <slot name="titulo">
          <span v-html="statisticTitle" />
        </slot>
       
      </div>
      <b-avatar :variant="`light-${colorIcon}`" class="avatar-icon" >
      
        <slot name="icon">
          <font-awesome-icon :icon="['fa-solid',icon]" size="3x"  />
        </slot>

      </b-avatar>

    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    fontAwesome:{
      type:Boolean,
      default:false
    },


    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String, 
    },

    colorIcon: {
      type: String,
      default:'dark'
    },
  },


  setup(props){


    return {


    }
    
  }
}
</script>

<style lang="scss">
.avatar-icon{
      cursor:pointer;
      transition: 60ms ease;
      width: 60px;
      height: 60px;
      position: absolute;
      left: auto;
      right: 1rem;

      &:hover{
        height:70px !important;
        width: 70px !important;
      }
  }
</style>
