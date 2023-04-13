<template>
  <b-card no-body :bg-variant="color" class="card-horizontal" >
    <b-card-body class="d-flex justify-content-between align-items-center flex-column" style="position:relative; padding: 1rem;" >

      <section class="d-flex justify-content-between aling-items-center w-100">
        <div class="truncate">
          <h2 class="mb-25 font-weight-bolder" :class="[colorText]">

            <slot :statistic="statistic" >
              {{ statistic }}
            </slot>

          </h2>

          <slot name="titulo">
            <span v-html="statisticTitle" :class="[colorText]" />
          </slot>
       
        </div>
        <b-avatar :variant="`light-${colorIcon}`" class="avatar-icon" >
      
          <slot name="icon">
            <font-awesome-icon :icon="['fa-solid', icon]" size="3x"  />
          </slot>

        </b-avatar>
      </section>

      <div class="filtro-statistic w-100">
        <slot name="filtro">
        </slot>
      </div>

    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'
import {toRefs,computed} from 'vue';

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
    statistic: {
      type: [Number, String],
      required: false,
      default:0,
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
    colorText:{
      type:String,
      default:'text-black'
    }
  },


  setup(props){
    const {colorText} = toRefs(props)

    return {
      colorTexto:computed(() => colorText.value)
    }
    
  }
}
</script>

<style lang="scss" scoped>

// $color-text:v-bind(colorTexto);

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

  // .card-horizontal{
  //   h2, span{
  //     color: $color-text !important; 
  //   }
  // }

</style>
