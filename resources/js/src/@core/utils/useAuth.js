
import store from '@/store'
import router from '@/router'
import {ref,computed} from '@vue/composition-api'
import { initialAbility } from '@/libs/acl/config'
import ability from '@/libs/acl/ability'

export default function useAuth(){

   const usuario = computed(() => store.state.usuario.usuario)

   const formValidate = ref(null)

   const formulario = ref({
      email:'',
      password:'',
      remember:false
   })

   const logout = () => {

      store.commit('toggleLoading')

      store.dispatch('cerrarSesion').then(({data}) => {
      localStorage.removeItem('token')
      localStorage.removeItem('habilidades');
      localStorage.removeItem('userData');

      store.commit('usuario/limpiarUsuario')
      ability.update(initialAbility)
      

      router.push({name:'login'})

      }).catch(e => {

         console.log(e)

         if(e.response.status === 419 ){

            router.push({name:'login'})

         }

      }).then(() => store.commit('toggleLoading'))

     
   }

   const login = () => {


      return new Promise((resolv,reject) => {

         axios.get('/sanctum/csrf-cookie').then(res => {

            axios.post('/api/auth/login', formulario.value).then(({ data }) => {

                  axios.defaults.headers.common = { 'Authorization': `bearer ${data.accessToken}` }

                  store.commit('setAuthMessage', null);
                  store.commit('usuario/cargarUser', data.usuario);
                  store.commit('setToken', data.accessToken);

                  localStorage.setItem('token', data.accessToken);
                  localStorage.setItem('habilidades', JSON.stringify(data.usuario.habilidades));
                  localStorage.setItem('userData', JSON.stringify(data.usuario));

                  ability.update(JSON.parse(localStorage.getItem('habilidades')));

                  resolv(data.result)

            }).catch((error) => {
              
               if (error.response && error.response.status === 422) {
                  loginForm.value.setErrors(error.response.data.errors)
               }

               reject(error)

            })

         }).catch(e => {
          reject(e)
         })
      })
   }

   return {
      logout,
      login,
      formValidate,
      formulario
   };

}
