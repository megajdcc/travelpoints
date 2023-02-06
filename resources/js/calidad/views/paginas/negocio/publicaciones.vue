<template>
    <section class="mt-2">
        <h4 class="display-4">Publicaci<strong class="text-warning">ones</strong> </h4>
        <listado :actions="actions" class="mt-1">
            <template #contenido="{ items }">
                <b-container fluid>
                    <b-row>
                        <b-col cols="12" class="px-0 mx-0">
        
                            <b-card class="my-2" header-class="py-0 px-1" v-for="(item, i) in items" :key="i">
                                <section class="d-flex w-100">
                                    <article class="flex-shrink-1 flex-grow-0 d-flex flex-column justify-content-center"
                                        v-if="item.imagenes.length">
                                        <b-carousel id="carousel-fade"
                                            style="text-shadow: 0px 0px 2px #000;min-width:314px;max-width:314px" fade controls
                                            indicators img width="314" img-height="220px">
                                            <b-carousel-slide v-for="({ imagen }, i) in item.imagenes" :key="i"
                                                :img-src="`/storage/publicaciones/${imagen}`" img-height="200px"
                                                style="max-height:200px;height:200px; object-fit: containt;">
                                            </b-carousel-slide>
        
                                        </b-carousel>
                                    </article>
        
                                    <main class="flex-grow-1 d-flex flex-column align-items-start ml-1">
                                        <h4 :title="item.titulo" class="mt-1">
                                            {{ item.titulo }}
                                        </h4>
        
                                        <p class="text-justify" style="max-height:150px; overflow-y:scroll">
                                            {{ item.contenido }}
                                        </p>
        
                                    </main>
                                </section>
        
        
        
                            </b-card>
                        </b-col>
        
                    </b-row>
                </b-container>
            </template>
        </listado>
    </section>
   
</template>

<script>

import usePublicacionesList from 'views/publicaciones/usePublicacionesList.js'

import store from '@/store'

import {toRefs, ref, computed,onMounted,watch} from '@vue/composition-api';

import {
    BCard,
    BContainer,
    BRow,
    BCol,
    BButtonGroup,
    BButton,
    VBPopover,
    BCarousel,
    BCarouselSlide,
    BMedia,

} from 'bootstrap-vue'


export default {

    components:{
        Listado:() => import('components/Listado.vue'),

        BCard,
        BContainer,
        BRow,
        BCol,
        BButtonGroup,
        BButton,
        BCarousel,
        BCarouselSlide,
        BMedia,


    },  

    directives:{
        'b-popover' : VBPopover
    },

    setup(){
        const {negocio} = toRefs(store.state.negocio)


        const actions = usePublicacionesList(negocio);

        watch(negocio, () => actions.refetchData())


        return {
            loading:computed(() => store.state.loading),
            negocio,
            actions
        }
    }


}

</script>