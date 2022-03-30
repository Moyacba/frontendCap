<template>
  <b-container>
        <b-card>
            <b-card-title>
                <b-container class="cardTitle">
                    <h4>Registro:</h4>
                    <h5 class="mt-1">{{dateService}}</h5>
                </b-container>
            </b-card-title>
                <b-card>
                    <b-card-title>
                        <h6 class="mb-4">Datos del cliente</h6>
                    </b-card-title>
                    <b-row>
                        <b-col>
                            <b-form-input disabled v-model="cliente"></b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-input disabled v-model="pago"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-form-input disabled v-model="detalles"></b-form-input>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card class="mt-2">
                    <b-card-title>
                        <h6 class="mb-4">Datos del Servicio</h6>
                    </b-card-title>

                    <b-row>
                        <b-col>
                            <b-form-input disabled v-model="producto"></b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-input disabled v-model="motivo"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col cols="4">
                            <b-form-input disabled v-model="presupuesto"></b-form-input>
                        </b-col>
                        <b-col cols="2">
                            <b-button
                                :disabled="btnCambiar"
                                variant="info"
                                v-b-modal.presupuestoShow
                            >
                                Cambiar
                            </b-button>
                        </b-col>
                        <b-col>
                            <b-form-input disabled v-model="pago"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-form-input disabled v-model="detalles"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col cols="4">
                            <b-form-input disabled v-model="estado"></b-form-input>
                        </b-col>
                        <b-col cols="2">
                            <b-button
                                @click="cambiar(estado)"
                                :disabled="btnCambiar"
                                variant="info"
                                v-b-modal.estadoShow
                            >
                                Cambiar
                            </b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-form-input disabled v-model="dateModifi"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-button 
                                v-b-modal.entregarShow
                                block 
                                variant="success"
                                :disabled="btnCambiar"
                                @click="igualarTotal(presupuesto)"
                            >
                                ENTREGAR
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card>
                <b-modal
                    id="estadoShow"
                    centered
                    hide-footer
                    title="Cambiar estado"
                >
                    <b-row>
                        <b-col>
                            <b-form-select v-model="seleccion" :options="opcionesEstado"></b-form-select>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-button 
                                block 
                                to="/Service"
                                variant="success" 
                                @click="cambiarEstado(idServicio, seleccion)"
                            >
                                Confirmar cambio de estado
                            </b-button>
                        </b-col>
                    </b-row>
                </b-modal>
                <b-modal
                    id="presupuestoShow"
                    centered
                    hide-footer
                    title="Cambiar de presupuesto"
                >
                    <b-row>
                        <b-col>
                            <b-form-input type="number" v-model="prePresupuesto"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-button 
                                block 
                                to="/"
                                variant="success" 
                                @click="cambiarPresupuesto(idServicio, prePresupuesto)"
                            >
                                Confirmar cambio de presupuesto
                            </b-button>
                        </b-col>
                    </b-row>
                </b-modal>
                <b-modal
                    id="entregarShow"
                    centered
                    hide-footer
                    title="Entregar servicio"
                    size="lg"
                >
                    <b-card>
                        <b-card>
                            <b-row>
                                <b-col>
                                    <b-form-input disabled v-model="cliente"></b-form-input>
                                </b-col>
                                <b-col>
                                    <b-form-select :options="opcionesPago" v-model="metodoPago"></b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="mt-4">
                                <b-col>
                                    <b-form-input v-model="detalles"></b-form-input>
                                </b-col>
                            </b-row>
                        </b-card>
                        <div class="end mt-4">
                            <h6>Subtotal: {{presupuesto}}</h6>
                        </div>
                        <div class="end mt-2">
                            <h6>Descuento: {{Dinero.descuento}}</h6>
                        </div>
                        <div class="end mt-2">
                            <h5>Total: {{this.Dinero.total}}</h5>
                        </div>

                        <div class="contenedorBtnModal mt-4">
                            <div>
                                <b-button 
                                    v-b-modal.descuentoShow
                                    variant="secondary"
                                >
                                    Descuento
                                </b-button>
                            </div>
                            <div>
                                <b-button 
                                    v-b-modal.pagoShow
                                    variant="success"
                                    :disabled="estadoVenta"
                                >
                                    Entregar
                                </b-button>
                            </div>
                        </div>
                    </b-card>
                </b-modal>
                <b-modal
                    id="descuentoShow"
                    centered
                    hide-footer
                    title="Aplicar descuento"
                    size="sm"
                >
                    <div class="center">
                        <b-form-input v-model="Dinero.prev" palceholder="Descuento"></b-form-input>
                    </div>
                    <b-button 
                        class="mt-4" 
                        block 
                        variant="success"
                        @click="aplicarDescuento(Dinero.prev, presupuesto) ,$bvModal.hide('descuentoShow')"
                    >
                        Aplicar
                    </b-button>
                </b-modal>
                <b-modal
                    id="pagoShow"
                    centered
                    hide-footer
                    title="Pago"
                >
                    <div>
                        <b-card class="mb-3">
                            <div class="mb-3">
                                <h6>Total:</h6>
                                <b-form-input 
                                    size="lg" 
                                    v-model="Dinero.total"
                                >
                                </b-form-input>
                            </div>
                            <div class="mb-3">
                                <h6>Paga con:</h6>
                                <b-form-input
                                    size="lg"
                                    v-model="Dinero.pagaCon"
                                >
                                </b-form-input>
                            </div>
                        </b-card>
                        <div>
                            <b-button
                                v-b-modal.vueltoShow
                                variant="success" 
                                block
                                @click="vuelto()"
                            >
                                OK
                            </b-button>
                        </div>
                    </div>
                </b-modal>
                <b-modal
                    id="vueltoShow"
                    centered
                    hide-footer
                    title="Entregar producto"
                >
                    <div>
                        <div class="mb-3">
                            <h6>Vuelto:</h6>
                            <b-form-input
                                size="lg"
                                :value="Dinero.vuelto"
                            >
                            </b-form-input>
                        </div>
                        <b-button
                            variant="success" 
                            block 
                            @click="cambiarEstado(idServicio, 'Entregado')"
                            to="/"
                        >
                            OK
                        </b-button>
                    </div>
                </b-modal>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'ServiceView',
    props: [
        'idServicio',
        'dateService', 
        'dateModifi', 
        'cliente', 
        'telefono', 
        'presupuesto',
        'producto', 
        'motivo', 
        'estado', 
        'detalles', 
        'pago',
        'btnCambiar'
        ],
    data() {
        return {
            seleccion: 'Sin',
            prePresupuesto: 0,
            opcionesEstado: [
                'Sin revisar',
                'Revisando',
                'Revisado',
                'Listo',
                'Sin solucion',
            ],
            opcionesPago: [
                {value: 'Efectivo', text: 'Efectivo'},
                {value: 'Débito', text: 'Débito'},
                {value: 'Crédito', text: 'Crédito'}
            ],
            Service: {idService: '', estado: ''},
            ServicePre: {idService: '', presupuesto: ''},
            Movement: {},
            Dinero: {prev: 0, descuento: 0, total: 0, pagaCon: 0, vuelto: 0},
            Box: {},
            metodoPago: 'Efectivo',
            estadoVenta: true,
        }
    },

    computed: {
        actualizar: () => {
            this.metodoPago = this.pago
            return this.metodoPago
        },

        ...mapGetters({
            api: 'api',
            idBox: 'idBox',
            disVenta: 'disVenta'
        })
    },

    mounted() {
        this.estadoVenta = this.disVenta
    },

    methods: {

        cambiar: function(estado){
            this.seleccion = estado
        },

        cambiarEstado: function(id, estado){
            // if (this.Dinero.vuelto != 0) {
            //     this.Service.presupuesto = this.Dinero.total
            // }
            this.Service.idService = id
            this.Service.estado = estado
            this.Service.pago = this.metodoPago
            axios.put(this.api + '/api/service', this.Service)
                .then(res => {
                    console.log(res.status)
                })
                this.registrarMovimiento(estado, this.producto, this.cliente, this.idServicio)

            axios.get(this.api + '/api/box/' + this.idBox)
                    .then(res => {
                        console.log('----------SERVICIO------------')
                        this.Box = res.data
                        let total = this.Dinero.pagaCon
                        total -= 1
                        total += 1
                        if (this.Service.pago == 'Efectivo') {
                            this.Box.efectivoS += total
                        }
                        else if (this.Service.pago == 'Débito') {
                            this.Box.debitoS += total
                        }
                        else if (this.Service.pago == 'Crédito') {
                            this.Box.creditoS += total
                        }
                        console.log(this.Box)
                        axios.put(this.api + '/api/box', this.Box)
                            .then(res => {
                                console.log('Caja actualizada con exito')
                                console.log(res.status)
                                console.log('==================')
                            })
                    })
        },

        registrarMovimiento(seleccion, producto, cliente, idServicio){
            this.Movement.usuario = '-'
            this.Movement.cliente = cliente
            this.Movement.motivo = producto
            this.Movement.idMotivo = idServicio
            this.Movement.movimiento = 'Servicio: ' + seleccion

            console.log(this.Movement)

            axios.post(this.api + '/api/movement', this.Movement)
                .then(res => {
                    console.log(res.data)
                })
        },

        igualarTotal: function(subtotal){
            this.Dinero.total = subtotal - this.Dinero.descuento
            this.Dinero.pagaCon = subtotal 
        },
        
        aplicarDescuento: function(prev, subtotal){
            this.Dinero.descuento = prev
            this.Dinero.total = subtotal - this.Dinero.descuento
        },

        vuelto: function(){
            this.Dinero.vuelto = this.Dinero.pagaCon - this.Dinero.total
        },

        mostrar(id, estado){
            if (this.Dinero.vuelto != 0) {
                console.log('Cambiamos el total')
            }
            else{
                console.log('No cambiamos el total')
            }
            console.log(id, estado)
        },

        cambiarPresupuesto(id, presupuesto){
            this.ServicePre.idService = id,
            this.ServicePre.presupuesto = parseInt(presupuesto),
            console.log(this.ServicePre)
            axios.put(this.api + '/api/service', this.ServicePre)
                .then(res => {
                    console.log(res.status)
                })
                this.registrarMovimiento(presupuesto, this.producto, this.cliente, this.idServicio)
        }
    },
}
</script>

<style>

.btnCart{
    width: 120px
}
#containerCart{
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.center{
    display: flex;
    align-items: center;
    margin-bottom: 0px;
}
.end{
    height: 20px;
    display: flex;
    justify-content:flex-end;
}
#close{
    margin: 0;
    height: 20px;
}
.contenedorBtnModal{
    display: flex;
    justify-content: space-between;
}

</style>