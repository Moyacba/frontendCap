<template>
  <b-container class="mt-4">
      <b-row align-h="center">
          <b-col cols="8">

      <b-card class="mb-4">
        <b-card-title class="mt-2 mb-3">
            <b-container class="cardTitle mb-0">
                <h3>{{this.boxState}}</h3>
                <h5 class="mt-1">{{date}}</h5>
            </b-container>
        </b-card-title>
        <b-card-text>
            <b-row align-h="center">
                <b-col cols="10">
                    <b-card class="mb-3">
                        <b-row align-h="center">
                            <b-card-title class="mt-2 ml-3 mb-4">
                                <h6>Datos de la caja</h6>
                            </b-card-title>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-input type="number" v-model="Box.inicio" placeholder='Saldo Contabilizado'>

                                </b-form-input>
                            </b-col>
                        </b-row>

                        <b-row class="mt-4">
                            <b-col>
                                <b-form-select v-model="seleccionTurno" :options="opciones">

                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-row class="mt-4">
                            <b-col>
                                <b-btn @click="abrirCaja()" to="/" block variant="success" >Abrir Caja</b-btn>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-text>
    </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: "Openbox",

    data(){
        return{
            Box: {},
            seleccionTurno: null,
            opciones: [{value: null, text: 'Seleccionar turno'}, 'Turno Mañana', 'Turno Tarde']
        }
    },

    computed: {
        ...mapGetters(['date','boxState', 'api'])
    },
    methods: {
        ...mapActions(['changebox', 'changeOpenOrClose', 'changeidBox', 'changeDisVenta']),

        validar: function(validar, def){
            if (validar == undefined) {
                return def
            }
            else{
                return validar
            }
        },

        abrirCaja: function(){
            this.Box.inicio = this.validar(this.Box.inicio, '0')
            this.Box.turno = this.validar(this.seleccionTurno, '-')
            this.Box.efectivoV = 0
            this.Box.debitoV = 0
            this.Box.creditoV = 0
            this.Box.efectivoS = 0
            this.Box.debitoS = 0
            this.Box.creditoS = 0
            this.Box.gastos = 0
            this.Box.active = 1
            axios.post(this.api + '/api/box', (this.Box))
                .then(res => {
                    if (res.status == 200) {
                        this.makeToast()
                        this.changeOpenOrClose('/Closebox')
                        this.changebox('Caja: Abierta')
                        this.changeDisVenta(false)
                        axios.get(this.api + '/api/box')
                            .then(ress => {
                                this.changeidBox(ress.data[ress.data.length-1].idBox)
                            })
                    }
                    else {
                        this.makeToastError()
                    }
                })
            this.Box = {}
        },

        makeToast(append = false) {
            this.$bvToast.toast('La caja se abrió con éxito', {
            title: 'Caja abierta',
            autoHideDelay: 1500,
            variant: 'success',
            solid: true,
            appendToast: append
            })
        },
        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente uno de los datos está mal cargado', {
            title: 'Error al abrir caja',
            autoHideDelay: 4000,
            variant: 'danger',
            solid: true,
            appendToast: append
            })
        },
    },

}
</script>

<style>

</style>