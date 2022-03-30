<template>
    <b-container class="mt-4">
        <b-card>
            <b-card-title>
                <b-row>
                    <b-col cols="6">
                        <h3>Ventas</h3>
                    </b-col>
                    <b-col cols="6">
                        <b-input-group>
                            <b-form-input 
                            v-model="buscar" 
                            type="search" 
                            id="buscarEntrada" 
                            placeholder="Nombre del Cliente">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button @click="buscarEnTabla()">Buscar</b-button>
                        </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-card-title>
            <div id="tableSale">
                <div>
                    <b-table 
                        id="my-table"
                        :items="products"
                        :fields="fields"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        hover
                        striped
                        sort-icon-left 
                    >
                        <template v-slot:cell(productos)>
                            1
                        </template>
                        <template v-slot:cell(Agregar)="row">
                            <b-button
                                variant="info" 
                                size="sm" 
                                @click="showSale(row.item), modalShow = !modalShow"
                            >
                                Ver
                            </b-button>
                        </template>
                    </b-table>
                </div>
                <div id="pag">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"                        
                    >
                    </b-pagination>
                </div>
            </div>
            <b-modal 
                v-model="modalShow"
                title="Venta"
                centered
                hide-footer
                size="lg"
                static
            >
                <SaleView 
                    :dateSale="dateSale"
                    :cliente="cliente" 
                    :pago="pago" 
                    :detalles="detalles"
                    :productsSale="productsSale"
                    :subtotalSale="subtotalSale"
                >
                </SaleView>
            </b-modal>
        </b-card>
    </b-container>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import SaleView from '../components/SaleView'

export default {
    name: 'ListSaleView',
    components: {SaleView},
    data() {
        return {
            fields:[
                {key: 'idVenta', label:'Código', sortable: true,},
                {key: 'createdAt', label:'Fecha', sortable: true},
                {key: 'cliente', sortable: true},
                {key: 'pago',  sortable: true},
                {key: 'total', label: 'Monto', sortable: true},
                {key: 'productos'},
                {key: 'Agregar', class:"text-center"}
            ],
            itemsRecord: [],
            products: [],
            buscar: '',
            modalShow: false,
            cliente: '',
            pago: '',
            detalles: '',
            productsSale: [],
            subtotalSale: 0,
            dateSale: '',
            sortBy: 'idVenta',
            sortDesc: true,

            perPage: 10,
            currentPage: 1,
        }
    },
    computed: {
        ...mapGetters({
            cart: 'cart',
            api: 'api'
        }),
        rows() {
            return this.products.length
        }
    },
    mounted() {
        axios.get(this.api + '/api/sale')
            .then(res => {
                this.products = res.data
                this.itemsRecord = res.data
            })
        },
    methods: {
        ///////////////////////////////////////////
        ////////////AGREGAR VENTA//////////////////

        showSale: function(sale) {
            this.cliente = sale.cliente;
            this.pago = sale.pago;
            this.detalles = sale.detalles;
            this.productsSale = sale.productos;
            this.subtotalSale = sale.total;
            this.dateSale = sale.createdAt
        },

        ////////////AGREGAR VENTA//////////////////
        ////////////////////////////////////////////

        ////////////////////////////////////////////
        ////////////BUSQUEDA EN TABLA///////////////
        buscarEnTabla: function () {
            let dato = ''
            if (this.buscar != '') {
                dato = this.compararBusqueda(this.buscar, this.products)
            }
            this.llenarTabla(dato)
        },
        compararBusqueda: function (valor, tabla) {
            var Coincidencias = []

            for (let i = 0; i < tabla.length; i++) {
                var name = tabla[i].cliente.toLowerCase()

                if (name.includes(valor)) {
                    Coincidencias.push(tabla[i])
                }
            }

            return Coincidencias
        },
        llenarTabla: function (data) {
            if (data === '') {
                this.products = this.itemsRecord
            } else {
                this.products = data
            }
        }
        ////////////BUSQUEDA EN TABLA///////////////
        ////////////////////////////////////////////
    },

    montarProducto: function(){
        return 'hola'
    },
}

</script>

<style>
#tableSale{
    display: flex;
    flex-direction: column;
    align-content: center;
}
#pag{
    height: 40px;
    display: flex;
    align-self: center;
}
</style>