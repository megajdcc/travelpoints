<template>
  <b-card no-body :bg-variant="color" class="card-horizontal">
    <b-card-body class="d-flex justify-content-between align-items-center flex-column"
      style="position:relative; padding: 1rem;">

      <section class="d-flex justify-content-between aling-items-center w-100">
        <div class="truncate">
          <h2 class="mb-25 font-weight-bolder" :class="[colorText]">

            <slot>
              
            </slot>
            <slot name="statistic" :statistic="statistic" >
              {{ statistic }}
            </slot>

          </h2>

          <slot name="titulo">
            <span v-html="statisticTitle" :class="[colorText]" />
          </slot>

          <slot name="legend">
          
          </slot>

        </div>
        <section class="d-flex flex-column flex-nowrap">
          <b-avatar :variant="`light-${colorIcon}`" class="avatar-icon" @click="ir">
            <slot name="icon">
              <font-awesome-icon :icon="['fa-solid', icon]" size="3x" @click="ir" />
            </slot>
          </b-avatar>

          <slot name="btn-card">

          </slot>
        </section>
        
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
import { toRefs, computed } from 'vue';
import router from '@/router'

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
      default: 0,
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
      default: 'dark'
    },
    colorText: {
      type: String,
      default: 'text-black'
    },
    to:{
      type:Object,
      default:() =>({path:'#'}),  
      required:false
    },
  
  },


  setup(props) {
    const { colorText } = toRefs(props)
    const {to} = toRefs(props)
    return {  
      colorTexto: computed(() => colorText.value),
      ir:() => router.push(to.value)
    }

  }
}
</script>

<style lang="scss" scoped>
// $color-text:v-bind(colorTexto);

.avatar-icon {
  cursor: pointer;
  transition: 60ms ease;
  width: 60px;
  height: 60px;
  position: absolute;
  left: auto;
  right: 1rem;

  &:hover {
    height: 70px !important;
    width: 70px !important;
  }
}

// .card-horizontal{
//   h2, span{
//     color: $color-text !important; 
//   }
// }
</style>