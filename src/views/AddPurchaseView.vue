<template>
    <b-container fluid="sm" class="mt-5">
      <b-row>
          <b-col></b-col>
          <b-col cols="10">
              <b-card  header="Datos del Gasto">
                <b-form-input class="mt-2" v-model="Compra.producto" placeholder="Producto"></b-form-input>
                  <b-row>
                      <b-col class="input" cols="4">
                          <b-form-input type="number" v-model="Compra.cantidad" placeholder="Cantidad"></b-form-input>
                      </b-col>
                      <b-col class="input" cols="4">
                          <b-form-input type="number" v-model="Compra.precio" placeholder="Precio total"></b-form-input>
                      </b-col>
                      <b-col class="input" cols="4">
                          <b-form-select v-model="seleccionCaja" :options="opcGastos" placeholder="Gasto de:"></b-form-select>
                      </b-col>
                      
                  </b-row>

                  <b-row>
                      <b-col class="input" >
                          <b-form-select v-model="seleccion" :options="opciones" placeholder="Cantidad"></b-form-select>
                      </b-col>
                  </b-row>

                  <b-form-input class="input" v-model="Compra.proveedor" placeholder="Proveedor"></b-form-input>
                  <b-form-textarea class="input mb-3" v-model="Compra.detalles" placeholder="Detalles"></b-form-textarea>

                  <b-row>
                        <b-col cols="12" class="mt-3">
                            <b-button :disabled="estadoVenta" @click="addPurchase()" variant="success" block>Agregar Compra</b-button>
                        </b-col>
                  </b-row>
              </b-card>
          </b-col>
          <b-col></b-col>
      </b-row>
    </b-container>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
    name: 'AddPurchaseView',
    data() {
        return {
            seleccion: null,
            seleccionCaja: 'Caja',
            opciones: [
                { value: null, text: 'Categoría' },
                { value: 'Consumos', text: 'Consumos' },
                { value: 'Insumos', text: 'Insumos' },
                { value: 'Repuestos', text: 'Repuestos' },
                { value: 'Servicios', text: 'Servicios' },
                { value: 'Herramientas', text: 'Herramientas' },
            ],
            opcGastos: [
                { value: 'Caja', text: 'Caja'},
                { value: 'Colateral', text: 'Colateral'}
            ],
            Compra: {},
            Box: {},
            Movement: {usuario: '', cliente: '', movimiento: '', motivo: ''},
            estadoVenta: true,
        }
    },
    computed: {
        ...mapGetters(['api', 'idBox', 'disVenta'])
    },

    mounted(){
        this.$forceUpdate();
        this.estadoVenta = this.disVenta
    },

    methods: {
        addPurchase: function(){
            this.Compra.categoria = this.seleccion

            axios.post(this.api + '/api/purchase', this.Compra)
                .then(res => {
                    if (res.status == 200) {
                        this.makeToast()
                        this.Movement.usuario = 'Sin definir'
                        this.Movement.cliente = 'Compra'
                        this.Movement.movimiento = this.Compra.producto
                        this.Movement.motivo = this.Compra.categoria

                        axios.post(this.api + '/api/movement', this.Movement)
                            .then(res => {
                                console.log(res.data)
                            })

                        if (this.seleccionCaja == 'Caja') {
                            console.log('----------------------')
                            axios.get(this.api + '/api/box/' + this.idBox)
                                .then(res => {
                                    console.log('----------------------')
                                    this.Box = res.data
                                    this.Compra.precio -= 1
                                    this.Compra.precio += 1
                                    this.Box.gastos += this.Compra.precio
                                    console.log(this.Box)
                                    axios.put(this.api + '/api/box', this.Box)
                                        .then(res => {
                                            console.log('Caja actualizada con exito')
                                            console.log(res.status)
                                        })
                                })
                        }
                    }
                    else {
                        this.makeToastError()
                    }
                })
            
        },

        makeToast(append = false) {
            this.$bvToast.toast('El gasto se registró con éxito', {
            title: 'Gasto registrado!',
            autoHideDelay: 1500,
            variant: 'success',
            solid: true,
            appendToast: append
            })
        },
        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente uno de los datos está mal cargado', {
            title: 'Error al registrar gasto',
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