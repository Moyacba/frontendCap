<template>
    <b-container>
        <b-card>
            <b-card-title>
                <b-row>
                    <b-col cols="4">
                        <h3>Servicios Técnicos</h3>
                    </b-col>
                    <b-col cols="2">
                        <b-button-group>
                            <b-button 
                                size="sm"
                                :variant=varianteSE
                                @click="filtrarSE('name') , cambiarVariante(varianteSE)"
                            >
                                S/E
                            </b-button>
                            <b-button 
                                size="sm"
                                :variant=varianteTodos
                                @click="llenarTabla('') , cambiarVariante(varianteTodos)"
                            >
                                Todos
                            </b-button>
                        </b-button-group>
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
            <div class="tableService">
                <div>
                    <b-table
                        id="tablaService"
                        :fields='fields'
                        :items='items'
                        :per-page="perPage"
                        :current-page="currentPage"
                        :sort-by.sync="sortBy" 
                        :sort-desc.sync="sortDesc"
                        hover
                        striped
                        sort-icon-left
                    >
                        <template v-slot:cell(acciones)="row">
                            <b-button 
                                id="btnEstado"
                                :variant=color(row.item.estado) 
                                @click="editService(row.item), editarShow = !editarShow" 
                                size="sm"
                            >
                                {{row.item.estado}}
                            </b-button>
                        </template>
                    </b-table>
                </div>
                <div id="pag">
                    <b-pagination
                        aria-controls="tablaService"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                    >
                    </b-pagination>
                </div>
            </div>
        </b-card>
        <b-modal 
            v-model="editarShow"
            title="Servicio Técnico"
            centered
            hide-footer
            size="lg"
            static
        >
            <ServiceView
                :idServicio="idServicio"
                :dateService="dateService"
                :dateModifi="dateModifi"
                :cliente="cliente"
                :telefono="telefono"
                :presupuesto="presupuesto"
                :producto="producto"
                :motivo="motivo"
                :estado="estado"
                :detalles="detalles"
                :pago="pago"
                :btnCambiar="btnCambiar"
            >
            </ServiceView>
        </b-modal>
    </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ServiceView from '../components/ServiceView'

export default {
    name: 'ListServiceView',

    data() {
        return {
            fields: [
                {key: 'idServicio', label:'Codigo', sortable: true},
                {key: 'cliente', sortable: true},
                {key: 'telefono', sortable: true},
                {key: 'presupuesto', label: 'Monto', sortable: true},
                {key: 'producto', sortable: true},
                {key: 'motivo', sortable: true},
                {key: 'acciones', class:"text-center"},
            ],
            items: [],
            buscar: '',
            itemsRecord: [],
            editarShow: false,
            entregarShow: false,
            perPage: 10,
            currentPage: 1,
            sortBy: 'idServicio',
            sortDesc: true,
            
            idServicio: 0,
            dateService: '',
            dateModifi: '',
            cliente: '',
            telefono: '',
            presupuesto: '',
            producto: '',
            motivo: '',
            estado: '',
            detalles: '',
            pago: '',
            btnCambiar: false,
            varianteSE: 'outline-primary',
            varianteTodos: 'primary',

            arrayprueba: [
                {name: "jose", age: 23},
                {name: "Manuel", age: 10},
                {name: "juan", age: 30},
            ]
        }
    },

    components: {ServiceView},

    computed: {
        ...mapGetters(['api']),
        rows() {
            return this.items.length
        }
    },

    mounted() {
        this.$forceUpdate();
        axios.get(this.api + '/api/service')
            .then(res => {
                this.items = res.data
                this.itemsRecord = res.data
            })
    },

    methods: {
        color(item) {
            let color = ''
            switch(item){
                case 'Sin revisar':
                    color = 'danger'
                    break;
                case 'Revisando':
                    color = 'info'
                    break;
                case 'Revisado':
                    color = 'info'
                    break;
                case 'Sin solucion':
                    color = 'secondary'
                    break;
                case 'Listo':
                    color = 'warning'
                    break;
                case 'Entregado':
                    color = 'success'
                    break;
            }
            return color;
        },
        editService: function(Service){
            this.idServicio = Service.idServicio
            this.dateService = Service.createdAt
            this.dateModifi = Service.updatedAt
            this.cliente = Service.cliente
            this.telefono = Service.telefono
            this.presupuesto = Service.presupuesto
            this.producto = Service.producto
            this.motivo = Service.motivo
            this.estado = Service.estado
            this.detalles = Service.detalles
            this.pago = Service.pago
            if (this.estado == 'Entregado') {
                this.btnCambiar = true
            }else{
                this.btnCambiar = false
            }
        },
        cambiarVariante: function(valor){
            if (valor !== 'primary') {
                var suplente = this.varianteSE
                this.varianteSE = this.varianteTodos
                this.varianteTodos = suplente
            }
        },
        ////////////////////////////////////////////
        ////////////BUSQUEDA EN TABLA///////////////
        buscarEnTabla: function () {
            let dato = ''
            if (this.buscar != '') {
                dato = this.compararBusqueda(this.buscar, this.itemsRecord)
            }
            this.llenarTabla(dato)
        },
        compararBusqueda: function (valor, items) {
            var Coincidencias = []

            for (let i = 0; i < items.length; i++) {
                var name = items[i].producto.toLowerCase()
                var cliente = items[i].cliente.toLowerCase()
    
                if (name.includes(valor)) {
                    Coincidencias.push(items[i])
                }
                else if
                    (cliente.includes(valor)) {
                        Coincidencias.push(items[i])
                    }
            }

            return Coincidencias
        },
        llenarTabla: function (data) {
            if (data === '') {
                this.items = this.itemsRecord
            } else {
                this.items = data
            }
        },

        filtrarSE: function () {
            this.items = this.items.filter(item => 
                item.estado !== "Entregado"
            );
        },
        ////////////BUSQUEDA EN TABLA///////////////
        ////////////////////////////////////////////
    },
}
</script>

<style>
.tableService{
    display: flex;
    flex-direction: column;
    align-content: center;
}
#pag{
    height: 40px;
    display: flex;
    align-self: center;
}
#btnEstado{
    width: 100px;
}
</style>