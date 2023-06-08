<template>
  <b-card
    text-variant="center"
    class="card card-congratulations"
  >
    <!-- images -->
    <b-img
      :src="decoreleft"
      class="congratulations-img-left"
    />
    <b-img
      :src="decoreRight"
      class="congratulations-img-right"
    />
    <!--/ images -->

    <b-avatar
      variant="primary"
      size="70"
      class="shadow mb-2"
    >
      <feather-icon
        size="28"
        icon="AwardIcon"
      />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">
      Congratulations John,
    </h1>
    <b-card-text class="m-auto w-75">
      You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.
    </b-card-text>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BAvatar, BCardText,
} from 'bootstrap-vue'
import decoreleft from '@/assets/images/elements/decore-left.png'
import decoreRight from '@/assets/images/elements/decore-right.png'

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },


  setup(){
    return {
      decoreleft,
      decoreRight
    }
  }
}
</script>
