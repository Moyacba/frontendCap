<template>
    <b-container>
        <b-row>
            <b-col></b-col>
            <b-col cols="10">
                <b-card>
                    <b-card-title class="mb-3   ">
                        <b-container class="cardTitle mb-0">
                            <h4 >Servicio Técnico</h4>
                            <h5 >{{date}}</h5>
                        </b-container>
                    </b-card-title>
                        <b-card>
                            <b-card-title class="ml-2 mb-3">
                                <h6>Datos del Cliente</h6>
                            </b-card-title>
                            <b-row>
                                <b-col cols="6">
                                    <b-form-input v-model="Servicio.cliente" placeholder="Nombre"></b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input v-model="Servicio.telefono" placeholder="Teléfono"></b-form-input>
                                </b-col>
                            </b-row>
                        </b-card>
                        <b-card class="mt-3">
                            <b-card-title class="ml-2">
                                <h6>Datos del Producto</h6>
                            </b-card-title>
                            <b-row class="mt-4">
                                <b-col cols="6">
                                    <b-form-input v-model="Servicio.producto" placeholder="Producto (Marca y Modelo)"></b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input v-model="Servicio.categoria" placeholder="Categoría del producto"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-4">
                                <b-col cols="6">
                                    <b-form-input v-model="Servicio.motivo" placeholder="Ingresa por"></b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input v-model="Servicio.presupuesto" placeholder="Presupuesto"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-4">
                                <b-col cols="12">
                                    <b-form-input type="number" v-model="seña" placeholder="Seña"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-4">
                                <b-col cols="12">
                                    <b-form-input v-model="Servicio.detalles" placeholder="Detalles"></b-form-input>
                                </b-col>
                            </b-row>
                        </b-card>

                        <b-button :disabled="estadoVenta" to="/" @click="addService()" class="mt-3" block variant="success">Confirmar</b-button>
                </b-card>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'AddServiceView',

    data() {
        return {
            Servicio: {},
            Movement: {},
            Box: {},
            seña: null,
            estadoVenta: true,
        }
    },

    computed: {
        ...mapGetters(['date', 'api', 'idBox', 'disVenta'])
    },

    mounted() {
        this.$forceUpdate();
        this.estadoVenta = this.disVenta
    },

    methods: {
        addService: function(){
            this.Servicio.repuesto = 0;
            this.Servicio.pago = '-';
            this.Servicio.estado = 'Sin revisar';

            this.Servicio.cliente = this.validar(this.Servicio.cliente, '-')
            this.Servicio.telefono = this.validar(this.Servicio.telefono, '-')
            this.Servicio.producto = this.validar(this.Servicio.producto, '-')
            this.Servicio.categoria = this.validar(this.Servicio.categoria, 'Sin definir')
            this.Servicio.motivo = this.validar(this.Servicio.motivo, 'Sin definir')
            this.Servicio.presupuesto = this.validar(this.Servicio.presupuesto, '0')
            this.Servicio.detalles = this.validar(this.Servicio.detalles, '-')

            axios.post(this.api + '/api/service', this.Servicio)
                .then(res => {
                    if (res.status == 200) {
                        this.makeToast()
                        this.Movement.usuario = this.validar(this.Movement.usuario, 'Sin definir')
                        this.Movement.cliente = this.Servicio.cliente
                        this.Movement.movimiento = this.Servicio.estado
                        this.Movement.motivo = this.Servicio.producto

                        this.seña -= 1
                        this.seña += 1
                        if (this.seña > 0) {
                            axios.get(this.api + '/api/box/' + this.idBox)
                                .then(res => {
                                    this.Box = res.data
                                    this.Box.efectivoS += this.seña
                                    axios.put(this.api + '/api/box', this.Box)
                                        .then(res => {
                                            console.log(res.status)
                                            console.log('Un exito')
                                        })
                                })
                        }
                    }
                    else {
                        this.makeToastError
                    }
                })


            axios.post(this.api + '/api/movement', this.Movement)
                .then(res => {
                    console.log(res.data)
                })
        },

        validar: function(validar, def){
            if (validar == undefined) {
                return def
            }
            else{
                return validar
            }
        },

        makeToast(append = false) {
            this.$bvToast.toast('El Servicio se registró con éxito', {
            title: 'Servicio registrado!',
            autoHideDelay: 1500,
            variant: 'success',
            solid: true,
            appendToast: append
            })
        },
        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente uno de los datos está mal cargado', {
            title: 'Error al registrar el Servicio',
            autoHideDelay: 2000,
            variant: 'warning',
            solid: true,
            appendToast: append
            })
        },
    },
}
</script>

<style>

</style>