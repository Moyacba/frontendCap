<template>
    <b-card class="mb-3">
        <b-row class="ml-1">
            Caja inicial:
        </b-row>
        <b-row>
            <b-col>
                <b-form-input disabled type="number" v-model="inicio" placeholder='Saldo Contabilizado'>
                </b-form-input>
            </b-col>
        </b-row>
        <b-row class="ml-1 mt-2">
            Turno:
        </b-row>
        <b-row>
            <b-col>
                <b-form-input disabled v-model="turno" :options="opciones">
                </b-form-input>
            </b-col>
        </b-row>
        <b-card class="mt-4">
            <b-card>
                <b-row>
                    <b-col cols="4"><b>Total Venta:</b></b-col>
                    <b-col cols="5"></b-col>
                    <b-col class="text-right tabla" cols="3">
                        <b>{{cash(suma("v"))}}</b>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">Efectivo</b-col>
                    <b-col class="text-right" cols="5">+</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(efectivoV)}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">Crédito</b-col>
                    <b-col class="text-right" cols="5">+</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(creditoV)}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">Débito</b-col>
                    <b-col class="text-right" cols="5">+</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(debitoV)}}
                    </b-col>
                </b-row>
            </b-card>
            <b-card>
                <b-row>
                    <b-col cols="5"><b>Total Servicios:</b></b-col>
                    <b-col cols="4"></b-col>
                    <b-col class="text-right tabla" cols="3">
                        <b>{{cash(suma("s"))}}</b>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">Efectivo</b-col>
                    <b-col class="text-right" cols="5">+</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(efectivoS)}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">Crédito</b-col>
                    <b-col class="text-right" cols="5">+</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(creditoS)}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">Débito</b-col>
                    <b-col class="text-right" cols="5">+</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(debitoS)}}
                    </b-col>
                </b-row>
            </b-card>
            <b-card>
                <b-row>
                    <b-col cols="4">Gastos</b-col>
                    <b-col class="text-right" cols="5">-</b-col>
                    <b-col class="text-right" cols="3">
                        {{cash(gastos)}}
                    </b-col>
                </b-row>
            </b-card>
            <b-container>
                <b-row class="mt-3">
                    <b-col class="" cols="7 "><b>Total Generado:</b></b-col>
                    <b-col class="" cols="2"></b-col>
                    <b-col class="text-right " cols="3">
                        <b>{{cash(suma("tot"))}}</b>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="tabla titulo" cols="6"><b>Total en caja:</b></b-col>
                    <b-col class="tabla" cols="1"></b-col>
                    <b-col class="text-right tabla titulo" cols="5">
                        <b>{{cash(suma("efe"))}}</b>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        <!-- <b-row class="mt-4">
            <b-col>
                <b-btn @click="cerrarCaja()" block variant="danger" to="/">Cerrar Caja</b-btn>
            </b-col>
        </b-row> -->
    </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })

export default {
    name: "BoxView",
    props: [
        'inicio',
        'turno',
        'efectivoV',
        'debitoV',
        'creditoV',
        'efectivoS',
        'debitoS',
        'creditoS',
        'gastos',
    ],

    data(){
        return{
            Box: {},
            seleccionTurno: null,
            opciones: [{value: null, text: 'Seleccionar turno'}, 'Turno Mañana', 'Turno Tarde']
        }
    },

    computed: {
        ...mapGetters(['date','boxState', 'api', 'idBox'])
    },

    mounted() {
    },

    methods: {
        ...mapActions(['changebox', 'changeOpenOrClose', 'changeDisVenta']),

        validar: function(validar, def){
            if (validar == undefined) {
                return def
            }
            else{
                return validar
            }
        },
        cash: function(monto){
            return formatter.format(monto)
        },
        suma: function(motivo){
            if (motivo == "v") {
                return (this.efectivoV + this.creditoV + this.debitoV)
            }
            else if (motivo == "s") {
                return (this.efectivoS + this.creditoS + this.debitoS)
            }
            else if (motivo == "efe") {
                return (this.inicio + this.efectivoV + this.efectivoS - this.gastos)
            }
            else if (motivo == "tot") {
                let sum = (this.efectivoV + this.creditoV + this.debitoV + this.efectivoS + this.creditoS + this.debitoS)
                let resta = (this.gastos)
                return (sum - resta)
            }
        },

        cerrarCaja: function (){
            this.Box.active = 0
            axios.put(this.api + '/api/box', this.Box)
                .then(res => {
                    if (res.status == 200) {
                        this.makeToast()
                        this.changeOpenOrClose('/Openbox')
                        this.changebox('Caja: Cerrada')
                        this.changeDisVenta(true)
                    }
                    else{
                        this.makeToastError()
                    }
                })
        },

        makeToast(append = false) {
            this.$bvToast.toast('La caja fue cerrada con éxito', {
            title: 'Caja cerrada!',
            autoHideDelay: 1500,
            variant: 'success',
            solid: true,
            appendToast: append
            })
        },
        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente uno de los datos estuvo mal cargado', {
            title: 'Error al cerrar caja',
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
.tabla{
    background:darkslategray;
    color: aliceblue;
}
.titulo{
    font-size: 20px;
}
</style>