
import axios from 'axios';
import { mapState } from 'vuex';

let optionsComponents = {


   data() {
      return {
         busqueda: '',
         paises: [],

         estados: [],
         ciudades: [],
         masked: true,
         mask: '+##(###) ###-##-##',
         regEspecial: {
            F: {
               pattern: /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/,
            }
         },
      }
   },


   computed: {
      ...mapState('usuario', ['usuario']),
      masks() {
         return this.mask.split('|');
      },
      
   },


   created() {
      this.cargarPaises()
   },

   methods: {

      regresar() {
         window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/home');
      },


      cargarPaises() {
         axios.get('/api/listar/paises').then(respon => {
            this.paises = respon.data;
         }).catch(e => {
            console.log(e);
         });
      },


      cargarEstados(pais) {
         axios.get(`/api/listar/estados/${pais}`).then(respon => {
            this.estados = respon.data;
         }).catch(e => {
            console.log(e);
         });
      },

      cargarCiudades(estado) {
         axios.get(`/api/listar/ciudades/${estado}`).then(respon => {
            this.ciudades = respon.data;
         }).catch(e => {
            console.log(e);
         });
      }


   }


}

export default optionsComponents;
