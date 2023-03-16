<template>
	<b-card>

		<validation-observer ref="formValidate" #default="{handleSubmit}">
			<b-form @submit.prevent="handleSubmit(guardar)">
				<b-container fluid>
					<b-row>
						<b-col cols="12" md="6">
							<b-form-group>
								<template #label>
									Nombre del permiso | <span class="text-danger">*</span>
								</template>

								<validation-provider name="nombre" rules="required" #default="{errors}">
									<b-form-input v-model="formulario.nombre" :state="errors.length ? false : null" />
									<b-form-invalid-feedback>
										{{ errors[0] }}

									</b-form-invalid-feedback>
								</validation-provider>
							</b-form-group>
						</b-col>

						<b-col cols="12" md="6">
							<b-form-group >
								<template #label>
									Panel | <span class="text-danger">*</span>
								</template>
						
								<validation-provider name="panel_id" rules="required" #default="{errors,valid}">
									<v-select v-model="formulario.panel_id" :reduce="(option) => option.id" :options="panels" label="panel" />
									<b-form-invalid-feedback :state="valid">
										{{ errors[0] }}
									</b-form-invalid-feedback>
								</validation-provider>
							</b-form-group>
						</b-col>

					</b-row>

					<b-row>
						<b-col cols="12">
							<b-button-group size="sm">

								<b-button variant="primary" type="submit" v-loading="loading">
									<feather-icon icon="SaveIcon" />
									guardar
								</b-button>

								<b-button @click="regresar" variant="secondary">
									<feather-icon icon="ArrowLeftIcon" />
									Regresar
								</b-button>
							</b-button-group>

						</b-col>
					</b-row>
				</b-container>
			</b-form>
		</validation-observer>
	</b-card>


</template> 


<script>

import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BButtonGroup,
  BFormInvalidFeedback,
  BContainer,
} from 'bootstrap-vue'
	import { ValidationObserver,ValidationProvider } from 'vee-validate';
	import {required } from '@validations'
	import { regresar } from '@core/utils/utils';

	import { ref,computed,toRefs,onMounted} from 'vue'
	import store from '@/store'

	import vSelect from 'vue-select'

	export default{  

		components: {
			BButton,
			BMedia,
			BAvatar,
			BRow,
			BCol,
			BFormGroup,
			BFormInput,
			BForm,
			BTable,
			BCard,
			BCardHeader,
			BCardTitle,
			BFormCheckbox,
			BButtonGroup,
			BFormInvalidFeedback,
			BContainer,
			ValidationObserver,
			ValidationProvider,
			vSelect
		},

		setup(props,{emit}){

				const PickerOptions = ref({
					disabledDate(time) {
						return time.getTime() > Date.now()
					}
				})
				const formValidate = ref(null)

				const { permiso:formulario } = toRefs(store.state.permiso)

				const {panels} = toRefs(store.state.panel)


				const guardar = () => {

					emit('save',formulario.value,formValidate.value)

				}

				const cargarForm = () => {

					if(!panels.value.length){
						store.dispatch('panel/getPanels')
					}

				}

				onMounted(() => cargarForm())

				return{
					required,
					regresar,
					guardar,
					formulario,
					loading:computed(() => store.state.loading),
					PickerOptions,
					panels
				}
			}

	} 

</script>