<template>
        <b-card>
            <b-card-title>
                <b-row>
                    <b-col cols="6">
                        <h3>Cajas registradas</h3>
                    </b-col>
                    <!-- <b-col cols="6">
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
                    </b-col> -->
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
                        <template v-slot:cell(Acción)="row">
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
                title="Datos de la caja"
                centered
                hide-footer
                size="lg"
                static
            >
                <BoxView 
                    :inicio="inicio"
                    :turno="turno" 
                    :efectivoV="efectivoV" 
                    :debitoV="debitoV"
                    :creditoV="creditoV"
                    :efectivoS="efectivoS"
                    :debitoS="debitoS"
                    :creditoS="creditoS"
                    :gastos="gastos"
                >
                </BoxView>
            </b-modal>
        </b-card>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import BoxView from '../components/BoxView.vue'

export default {
    name: 'ListBoxView',
    components: {BoxView},
    data() {
        return {
            fields:[
                {key: 'idBox', label:'Código', sortable: true,},
                {key: 'createdAt', label:'Fecha', sortable: true},
                {key: 'turno', sortable: true},
                {key: 'inicio',  sortable: true},
                {key: 'efectivoV', label: 'EfectivoV', sortable: true},
                {key: 'debitoV', label: 'DebitoV', sortable: true},
                {key: 'creditoV', label: 'CreditoV', sortable: true},
                {key: 'efectivoS', label: 'EfectivoS', sortable: true},
                {key: 'debitoS', label: 'DebitoS', sortable: true},
                {key: 'creditoS', label: 'CreditoS', sortable: true},
                {key: 'gastos', label: 'Gastos', sortable: true},
                {key: 'Acción', class:"text-center"}
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
            sortBy: 'idBox',
            sortDesc: true,

            inicio:0,
            turno:"turno",
            efectivoV:0,
            debitoV:0,
            creditoV:0,
            efectivoS:0,
            debitoS:0,
            creditoS:0,
            gastos:0,

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
        axios.get(this.api + '/api/box')
            .then(res => {
                this.products = res.data
                this.itemsRecord = res.data
            })
        },
    methods: {
        ///////////////////////////////////////////
        ////////////AGREGAR VENTA//////////////////

        showSale: function(box) {
            this.inicio=box.inicio
            this.turno=box.turno
            this.efectivoV=box.efectivoV
            this.debitoV=box.debitoV
            this.creditoV=box.creditoV
            this.efectivoS=box.efectivoS
            this.debitoS=box.debitoS
            this.creditoS=box.creditoS
            this.gastos=box.gastos
        },

        ////////////AGREGAR VENTA//////////////////
        ////////////////////////////////////////////

        ////////////////////////////////////////////
        ////////////BUSQUEDA EN TABLA///////////////
        // buscarEnTabla: function () {
        //     let dato = ''
        //     if (this.buscar != '') {
        //         dato = this.compararBusqueda(this.buscar, this.products)
        //     }
        //     this.llenarTabla(dato)
        // },
        // compararBusqueda: function (valor, tabla) {
        //     var Coincidencias = []

        //     for (let i = 0; i < tabla.length; i++) {
        //         var name = tabla[i].createdAt

        //         if (name.includes(valor)) {
        //             Coincidencias.push(tabla[i])
        //         }
        //     }

        //     return Coincidencias
        // },
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