
import store from '@/store'
import router from '@/router'
import {ref,computed} from 'vue'
import { initialAbility } from '@/libs/acl/config'
import ability from '@/libs/acl/ability'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default function useAuth(){

   const usuario = computed(() => store.state.usuario.usuario)

   const optionsAuth = ref({
      client_id: '860503848534-po9nnigudd7v9upbsip07iu4b93nvnf5.apps.googleusercontent.com', // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: 'signin', // optional
      itp_support: true,
      state_cookie_domain:window.location.origin,
      
   })

   const formValidate = ref(null)

   const formulario = ref({
      email:'',
      password:'',
      remember:false
   })

   const logout = () => {


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

      })

     
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
                  formValidate.value.setErrors(error.response.data.errors)
               }

               reject(error)

            })

         }).catch(e => {
          reject(e)
         })
      })
   }

   const authenticarGoogle = ({
      client_id,
      auto_select = false,
      cancel_on_tap_outside = false,
      context = "signin",
      ...otherOptions
   }, callback = sendResponseAuthGoogle) => {

      try{
         if (window.cookieStore.get('g_state')) {
            window.cookieStore.delete('g_state');
         }
      }catch(error){
         console.log(error)

      }

      if (!client_id) {
         throw new Error("client_id is required");
      }

      if (typeof window !== "undefined" && window.document) {

         setTimeout(() => {

            const contextValue = ["signin", "signup", "use"].includes(context)
               ? context
               : "signin";
            // const googleScript = document.createElement("script");

            // googleScript.src = "https://accounts.google.com/gsi/client";
            // googleScript.async = true;
            // googleScript.defer = true;
            // document.head.appendChild(googleScript);

            window.google.accounts.id.initialize({
               client_id: client_id,
               callback: callback,
               auto_select: auto_select,
               cancel_on_tap_outside: cancel_on_tap_outside,
               context: contextValue,
               ...otherOptions,
            });

            window.google.accounts.id.prompt();

         }, 2000);

         
      }
      
   }

   const authGoogle = () => {
      const isLoggedIn = (localStorage.getItem('token')) ? true : false;

      if(!isLoggedIn){
         authenticarGoogle(optionsAuth.value)
         // googleOneTap(optionsAuth.value, sendResponseAuthGoogle);
      }
   }

   // onMounted(() => {
   //    authGoogle();

   // })

   const sendResponseAuthGoogle = (response) => {
      // Send response to server
      // console.log(response);

      axios.post('/api/auth/google', response).then(({ data }) => {

         store.commit('setAuthMessage', null);
         store.commit('usuario/cargarUser', data.usuario);
         store.commit('setToken', data.accessToken);

         localStorage.setItem('token', data.accessToken);
         localStorage.setItem('habilidades', JSON.stringify(data.usuario.habilidades));
         localStorage.setItem('userData', JSON.stringify(data.usuario));

         ability.update(JSON.parse(localStorage.getItem('habilidades')));

         if (localStorage.getItem('token')) {
            store.commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
         }

         toast({
            component: ToastificationContent,
            props: {
               title: `Bienvenido ${usuario.value.nombre || usuario.value.username}`,
               icon: 'CoffeeIcon',
               variant: 'success',
               text: `Ha iniciado sesión correctamente como ${usuario.value.rol.nombre}. ¡Ahora puedes empezar a explorar!`,
            },
         }, {
            position: 'bottom-right',
            timeout: 4000
         })

         if (['/login','/register'].includes(window.location.pathname)){
            router.push({ name: 'inicio' })
         }


      }).catch(e => console.log(e))
   }  


   const isNegocios = computed(() => usuario.value.negocios.length > 0 ? true : false);


   return {
      logout,
      login,
      formValidate,
      formulario,
      authGoogle,
      is_loggin:computed(() => usuario.value.id ? true : false),
      authenticarGoogle,
      optionsAuth, 
      isNegocios
   };

}
