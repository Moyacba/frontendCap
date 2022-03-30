<template>
    <b-container>
        <b-card>
            <b-card-title>
                <b-container class="cardTitle">
                    <h4>Registro de venta</h4>
                    <h5>{{date}}</h5>
                </b-container>
            </b-card-title>
                <b-card>
                    <b-card-title>
                        <h6 class="ml-2">Datos del cliente</h6>
                    </b-card-title>
                    <b-row>
                        <b-col>
                            <b-form-input v-model="Venta.cliente" placeholder="Cliente"></b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-select v-model="Venta.pago" :options="opcionesPago"></b-form-select>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-form-input v-model="Venta.detalles" placeholder="Detalles"></b-form-input>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card class="mt-2">
                    <b-card-title>
                        <h6 class="ml-2">Productos</h6>
                    </b-card-title>
                    <PopoverCart></PopoverCart>
                    <div id="containerCart" class="containerBtn mt-4">
                        <b-button 
                            v-b-modal="'descuento'"
                            class="btnCart" 
                            size="sm"
                        >
                            Descuento: {{descuento}}
                        </b-button>
                        <b-modal id="descuento" title="Aplicar descuento" hide-footer centered>
                            <b-form-input v-model="descu" ></b-form-input>
                            <b-button 
                                class="mt-4" 
                                variant="success" 
                                block
                                @click="aplicarDescuento(descu), $bvModal.hide('descuento')"
                            >
                                Aplicar
                            </b-button>
                        </b-modal>
                        <b-button 
                            v-b-modal="'finalSale'"
                            class="btnCart ml-1" 
                            variant="success"
                            :disabled="dis"
                            @click="paga = (subtotal - descuento)"
                            >
                                Confirmar
                        </b-button>
                        <b-modal 
                            id="finalSale"
                            title="Ultimos detalles"
                            centered
                            hide-title
                            hide-footer
                            button-size="block"
                            >
                            <div>
                                <b-card class="mb-3">
                                    <div class="mb-3">
                                        <h6>Total:</h6>
                                        <b-form-input 
                                            size="lg" 
                                            disabled
                                            :value="total()"
                                        >
                                        </b-form-input>
                                    </div>
                                    <div class="mb-3">
                                        Paga con:
                                        <b-form-input
                                            size="lg"
                                            v-model="paga"
                                        >
                                        </b-form-input>
                                    </div>
                                </b-card>
                                <div>
                                    <b-button
                                        v-b-modal="'vuelto'"
                                        variant="success" 
                                        block
                                    >
                                        OK
                                    </b-button>
                                </div>
                            </div>
                            <b-modal 
                                id="vuelto"
                                title="Venta registrada con éxito"
                                centered
                                hide-title
                                hide-footer
                                button-size="block"
                                >
                                <div>
                                    <div class="mb-3">
                                        <h6>Vuelto:</h6>
                                        <b-form-input
                                            size="lg"
                                            :value="vuelto()"
                                        >
                                        </b-form-input>
                                    </div>
                                    <b-button
                                        @click="addSale(), limpiar()"
                                        :disabled="aprobarVenta()"
                                        variant="success" 
                                        block 
                                        to="/"
                                    >
                                        OK
                                    </b-button>
                                </div>
                            </b-modal>
                        </b-modal>
                    </div>
                </b-card>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import PopoverCart from '../components/PopoverCart'

export default {

    name: 'AddSaleView',
    data() {
        return {
            options: [],
            opcionesPago: [
                {value: 'Efectivo', text: 'Efectivo'},
                {value: 'Débito', text: 'Débito'},
                {value: 'Crédito', text: 'Crédito'}
            ],
            Venta: {total: 0, estado: '', productos: '', pago: 'Efectivo'},
            paga: 0,
            descu: 0,
            Movement: {},
            Box: {},
        }
    },
    props: {
        dis: Boolean,
    },
    components:{PopoverCart},

    

    computed: {
        ...mapGetters({
            date: 'date',
            cart: 'cart',
            subtotal: 'cartSubtotal',
            api: 'api',
            descuento: 'descu',
            idBox: 'idBox',
        })
    },

    methods: {
        ...mapActions(['deleteCart', 'aplicarDescuento']),
        addSale: function(){
            const finalCart = []
            for (const item of this.cart) {
                finalCart.push(item)
            }
            this.Venta.productos = ''
            this.Venta.cliente = this.validarVacio(this.Venta.cliente, 'Cliente');
            this.Venta.detalles = this.validarVacio(this.Venta.detalles, '-');
            this.Venta.total = (this.subtotal - this.descuento);
            this.Venta.estado = 'Procesado';
            this.Venta.productos = finalCart;

            this.registrarMovimiento(this.Venta);
            
            axios.post(this.api + '/api/sale', this.Venta)
                .then(res => {
                    if (res.status == 200) {
                        this.makeToast()
                        this.deleteCart()
                        for (const itemProduct of this.Venta.productos) {
                            axios.put(this.api + '/api/product', itemProduct)
                                .then(res => {
                                    console.log(res.status)
                                })
                        }
                        axios.get(this.api + '/api/box/' + this.idBox)
                                .then(res => {
                                    console.log('----------VENTA------------')
                                    this.Box = res.data
                                    this.Venta.total += 1
                                    this.Venta.total -= 1
                                    if (this.Venta.pago == 'Efectivo') {
                                        this.Box.efectivoV += this.Venta.total
                                    }
                                    else if (this.Venta.pago == 'Débito') {
                                        this.Box.debitoV += this.Venta.total
                                    }
                                    else if (this.Venta.pago == 'Crédito') {
                                        this.Box.creditoV += this.Venta.total
                                    }
                                    console.log(this.Box)
                                    axios.put(this.api + '/api/box', this.Box)
                                        .then(res => {
                                            console.log('Caja actualizada con exito')
                                            console.log(res.status)
                                            console.log('==================')
                                        })
                                })
                    }
                    else {
                        this.makeToastError()
                    }
                }
            )
        },
        validarVacio: function(validar, def){
            if (validar == undefined) {
                return def
            }
            else{
                return validar
            }
        },

        limpiar: function(){
            this.paga = 0,
            this.vuelto = 0,
            this.aplicarDescuento(0)
        },
        
        total(){
            return (this.subtotal - this.descuento)
        },
        vuelto() {
            if (this.paga >= (this.subtotal - this.descuento)) {
                return (this.paga - (this.subtotal - this.descuento))
            }
            else{
                return 'Error'
            }
        },
        aprobarVenta: function() {
            if (this.paga < (this.subtotal - this.descuento)) {
                console.log('----------VENTA------------')
                
                return true
            }
            else{
                return false
            }

        },

        registrarMovimiento(Sale){
            this.Movement.usuario = '-'
            this.Movement.cliente = Sale.cliente
            this.Movement.movimiento = 'Agregar Venta'
            this.Movement.motivo = Sale.total

            axios.post(this.api + '/api/movement', this.Movement)
                .then(res => {
                    console.log(res.data)
                })
        },

        makeToast(append = false) {
            this.$bvToast.toast('La venta se registró con éxito', {
            title: 'Venta registrada!',
            autoHideDelay: 1500,
            variant: 'success',
            solid: true,
            appendToast: append
            })
        },
        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente uno de los datos está mal cargado', {
            title: 'Error al registrar la venta',
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
.cardTitle{
    display: flex;
    justify-content: space-between;
}
#btnDescuento{
    height: 40px;
}
#containerCart{
    display: flex;
    align-content: space-between;
}
</style>