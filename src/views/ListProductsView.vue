<template>
    <b-container class="mt-4">
        <b-card class="mb-4">
            <b-card-title>
                <b-row>
                    <b-col cols="6">
                        <h3>Productos</h3>
                    </b-col>
                    <b-col cols="6">
                        <b-input-group>
                            <b-form-input 
                            v-model="buscar" 
                            type="search" 
                            id="buscarEntrada" 
                            placeholder="Nombre del Producto">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button @click="buscarEnTabla()">Buscar</b-button>
                        </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-card-title>

            <!-- <div>
                <div>
                    <b-button size="sm" @click="gastototal()"> Calcular </b-button>
                    Total en productos: {{this.totalGastado}}
                </div>
            </div> -->

            <div id="tableProducts">
                <div>
                    <b-table 
                        id="tablaProductos"
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
                        <template v-slot:cell(Acciones)="row">
                            <div class="actionsBut">
                                <b-button 
                                    variant="primary" 
                                    size="sm" 
                                    @click="editShow(row.item)"
                                >
                                    Ver
                                </b-button>
                                <b-button 
                                    :disabled="estado"
                                    class="ml-1" 
                                    variant="success" 
                                    size="sm" 
                                    @click="addProductToCart(row.item)"
                                >
                                    Agregar
                                </b-button>
                            </div>
                        </template>
                    </b-table>
                </div>
                <div id="pag">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="tablaProductos"                        
                    >
                    </b-pagination>
                </div>
            </div>
        </b-card>
        <b-modal 
            v-model="itemShow"
            centered
            title="Datos del Producto"
            hide-footer
            size="lg"
        >
            <ProductView :Producto="productEdit"></ProductView>
        </b-modal>
    </b-container>
</template>

<script>

import ProductView from '../components/ProductView'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: "ListProductsView",

    components: {ProductView},

    data() {
        return {
            fields:[
                {key: 'idProduct', label:'Código', sortable: true,},
                {key: 'createdAt', label:'Fecha', sortable: true},
                {key: 'categoria', sortable: true},
                {key: 'producto', sortable: true},
                {key: 'precioVenta', label: 'Precio', sortable: true, class:'text-center'},
                {key: 'stock', sortable: true, class:'text-center'},
                {key: 'Acciones', class:'text-center'}
            ],
            perPage: 10,
            currentPage: 1,
            sortBy: 'idProduct',
            sortDesc: true,
            itemsRecord: [],
            products: [],
            buscar: '',
            itemShow: false,
            productEdit: {},
            totalGastado: 0,
            estado: true,
        }
    },
    computed: {
        ...mapGetters({
            cart: 'cart',
            api: 'api',
            disVenta: 'disVenta',
        }),
        rows() {
            return this.products.length
        },
        
    },

    mounted() {
        this.$forceUpdate();
        axios.get(this.api + '/api/product')
            .then(res => {
                this.products = res.data
                this.itemsRecord = res.data
            })
        this.estado = this.aprovVenta()
    },

    methods: {
        ...mapActions(['addToCart']),

        editShow: function(item){
            this.productEdit = item
            this.itemShow = !this.itemShow
        },
        ///////////////////////////////////////////
        ////////////AGREGAR VENTA//////////////////

        addProductToCart: function(product) {
            if (product.stock > 0) {
                product.stock = product.stock - 1
                this.addToCart(product)
            }
        },
        ////////////AGREGAR VENTA//////////////////
        ////////////////////////////////////////////

        ////////////////////////////////////////////
        ////////////BUSQUEDA EN TABLA///////////////
        buscarEnTabla: function () {
            let dato = ''
            if (this.buscar != '') {
                dato = this.compararBusqueda(this.buscar, this.itemsRecord)
            }
            this.llenarTabla(dato)
        },
        compararBusqueda: function (valor, tabla) {
            var Coincidencias = []

            for (let i = 0; i < tabla.length; i++) {
                var name = tabla[i].producto.toLowerCase()

                if (name.includes(valor.toLowerCase())) {
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
        },
        ////////////BUSQUEDA EN TABLA///////////////
        ////////////////////////////////////////////
        gastototal(){
            let total = 0
            for (const item of this.products) {
                if (item.stock < 300) {
                    if (item.stock > 0) {
                        total = total + (item.precioVenta * item.stock)
                    }
                    
                }
            }
                this.totalGastado = total
        },

        aprovVenta: function(){
            return this.disVenta
        }
    },
}

</script>

<style>
.actionsBut{
    display: flex;
}
#tableProducts{
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