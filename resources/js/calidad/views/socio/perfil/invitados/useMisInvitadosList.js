
import { ref, watch, computed, onMounted } from '@vue/composition-api'
import store from '@/store';

export default function useMisInvitadosList(usuario_id){

   
   const perPage = ref(10)
   const currentPage = ref(1)
   const total = ref(0);
   const usuarios = ref([])


   const perPageOptions = ref([
      {
         label: '10',
         value: 10,
      },
      {
         label: '25',
         value: 25,
      },
      {
         label: '50',
         value: 50,
      },
      {
         label: '100',
         value: 100,
      },
      {
         label: 'Todas',
         value: 0,
      },

   ])

   const dataMeta = computed(() => {
      const localItemsCount = usuarios.value.length;
      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      fetchData((users) => {
         usuarios.value = users
      })
   } 


   

   watch([currentPage, perPage], () => {
      refetchData()
   })

   onMounted(() => refetchData())

   const fetchData = (next) => {

      store.dispatch('usuario/misReferidos',{
         usuario_id:usuario_id,
         perPage:perPage.value,
         currentPage:currentPage.value,
      }).then(({usuarios:users,total:all}) => {

         next(users)
         total.value = all

      }).catch(e => {
         toast.error('Error cargado data')
      })


   } 


   return {

      perPageOptions,
      currentPage,
      perPage,
      total,
      dataMeta,
      refetchData,
      fetchData,
      usuarios

   }

}
