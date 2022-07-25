<template>

</template>

<script>

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {

  components:{
  },	

  data () {
    return {
    	titulo:'Observaciones',
    	busqueda:'',
    	showDialog:false,
    	data:{
				id      :{label:'#',sortable:false, width:"30px",responsivePriority:"1"},
				modulo  :{label:'Modulo',sortable:true},
				usuario :{label:'Usuario',sortable:true},
				atendido:{label:'Atendido',sortable:true},
				fecha   :{label:'Fecha',sortable:true},
				action  :{label:'Actions',sortable:false,width:'200px'},
    	}
    }	
  },


  computed:{
	  	...mapState(['loading']),
	  	...mapState('observaciones',['observaciones','observacion']),


	  	options(){
	  		return {
	  			ajax:{
					url:'/api/observaciones/listar',
					dataScr:(json) => {return json},
				},

				buttons:['csv','pdf'],
				// dom:"tr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7' pl>>",
				responsive:true,
				processing:true,
				searching:true,
				searchDelay:1500,
				destroy:false,
				ordering:true,
				lengthChange:true,
				serverSide:true,
				fixedHeader:true,
				saveState:true,
				scrollY:'auto',
				paging:false,
				autoWidth:true,
				order:[[0,'desc']],
				
	  		}
	  	}
  },

  mounted(){
	  this.cargarObservaciones();
  },

  methods:{
  	...mapActions('observaciones',['atendido','delete','cargarObservaciones']),
  	...mapMutations('observaciones',['putObservacion','capturarObservacion','clearObservacion']),


  	buscarTable(){
  		this.$refs.table.search(this.busqueda);
  	},

  	recargarTabla(){
		this.cargarObservaciones();
  		this.$refs.table.reload();
  	},

  	observacionAtendida(data){
  		this.atendido(data.id);

  		setTimeout(() => {
			  this.cargarObservaciones();
  			this.recargarTabla();
  		},3000);
		  this.cargarObservaciones();
  		this.recargarTabla();
  	},


  	mostrarObservacion(data){
  		this.capturarObservacion(data.id);
  		this.showDialog = true;
  	},

  	eliminarObservacion(data){

  		this.delete(data.id).then(respon => {

  			if(respon.data.success){
  				this.$notify.success('Observación eliminada exitosamente');
  				this.putObservacion(data.id);
  			}else{
				this.$notify.info('La observación no se pudo eliminar, inténtalo de nuevo mas tarde');
  			}

  		}).catch(e => {
  			console.log(e);
  		});
  	},

  	cerrarDialogoObservacion(){
  		this.clearObservacion();
  		this.showDialog = false;
  	}



  },

  watch:{
	 	
	 	observaciones(){
			//  this.cargarObservaciones();
	 		this.$refs.table.reload();
	 	}

  }

}
</script>

<style lang="css" scoped>
</style>