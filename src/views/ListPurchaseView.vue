<template>
    <b-container class="mt-4">
        <b-card class="mb-4">
            <b-card-title>
                <b-row>
                    <b-col cols="6">
                        <h3>Compras</h3>
                    </b-col>
                    <!-- <b-col cols="6">
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
                    </b-col> -->
                </b-row>
            </b-card-title>

            <!-- <div>
                <div>
                    <b-button size="sm" @click="gastototal()"> Calcular </b-button>
                    Total Gastado: {{this.totalGastado}}
                </div>
            </div> -->

            <div id="tableProducts">
                <div>
                    <b-table
                        :items="purchases"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        hover
                        striped
                        sort-icon-left 
                    >

                    </b-table>
                </div>
            </div>
        </b-card>
    </b-container>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
    name: 'ListPurchaseView',

    data() {
        return {
            fields:[
                {key: 'idCompra', label:'Código', sortable: true,},
                {key: 'createdAt', label:'Fecha', sortable: true},
                {key: 'categoria', sortable: true},
                {key: 'producto', sortable: true},
                {key: 'cantidad', sortable: true, class:'text-center'},
                {key: 'precio', sortable: true, class:'text-center'}
            ],
            purchases: {},
            totalGastado: 0,
            sortBy: 'idCompra',
            sortDesc: true,
        }
    },

    computed: {
        ...mapGetters(['api'])
    },

    mounted() {
        axios.get(this.api + '/api/purchase')
            .then(res => {
                this.purchases = res.data
            })
    },
    
    methods: {
        gastototal(){
            let total = 0
            for (const item of this.purchases) {
                if (item.createdAt < "05") {
                    console.log(item.createdAt)
                }
                total = total + item.precio
            }
            this.totalGastado = total
        }
    },
}
</script>

<style>

</style>