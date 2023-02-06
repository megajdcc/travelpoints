<template>
    <b-container fluid>
        <b-row class="mt-1">
            <b-col cols="12">
                <!-- Opiniones del negocio -->
                <h2 class="display-4">Opiniones sobre este <strong class="text-warning">negocio</strong></h2>
                
                <section class="d-flex flex-column ">
                    <reviews-opinion :promedioCalificacion="promedioCalificacion" :cantidad="negocio.opinions.length"
                        :porcentajeOpinions="porcentajeOpinions" :model="{ model_id: negocio.id, model_type: negocio.modelType }"
                        class="mt-1 px-0 mx-0" />
                </section>
            </b-col>
        </b-row>
    </b-container>
  
</template>

<script>

import {toRefs,ref,computed,onMounted}  from '@vue/composition-api'
import store from '@/store'

import {
    BContainer,
    BRow,
    BCol,

} from 'bootstrap-vue'

export default {
    

    components:{
        ReviewsOpinion:() => import('components/ReviewsOpinion.vue'),
        BContainer,
        BRow,
        BCol,

    },


    setup(){

        const {negocio} = toRefs(store.state.negocio)

        return {
            negocio,
            promedioCalificacion: computed(() => store.getters['negocio/promedioCalificacion'](negocio.value)),
            porcentajeOpinions: (cal) => store.getters['negocio/porcentajeOpinions'](cal),

        }
    }
}
</script>