<template>
  <b-container fluid="sm" class="mt-5">
      <b-row>
          <b-col></b-col>
          <b-col cols="10">
              <b-card  header="Datos del Producto">
                <b-form-input class="mt-2" v-model="Producto.producto" placeholder="Producto"></b-form-input>
                  <b-row>
                      <b-col class="input" cols="8">
                            <b-form-input list="selectCategoria" v-model="Producto.categoria" placeholder="Categoria"></b-form-input>
                            <datalist id="selectCategoria">
                                <option v-for="item in this.categorias" :key="item">{{item}}</option>
                            </datalist>
                      </b-col>
                      <b-col class="input" cols="4">
                          <b-form-input type="number" v-model="Producto.stock" placeholder="Cantidad"></b-form-input>
                      </b-col>
                  </b-row>

                  <b-row>
                      <b-col class="input" cols="6">
                          <b-form-input type="number" v-model="Producto.precioCompra" placeholder="Precio de compra"></b-form-input>
                      </b-col>
                      <b-col class="input" cols="6">
                          <b-form-input type="number" v-model="Producto.precioVenta" placeholder="Precio de venta"></b-form-input>
                      </b-col>
                  </b-row>

                  <b-form-input class="input" v-model="Producto.proveedor" placeholder="Proveedor"></b-form-input>
                  <b-form-textarea class="input mb-3" v-model="Producto.detalles" placeholder="Detalles"></b-form-textarea>

                  <b-row>
                        <b-col cols="12" class="mt-3">
                            <b-button @click="showAlert(), mostrar2()" variant="success" block>Agregar Producto</b-button>
                        </b-col>
                  </b-row>
                  <b-alert
                        :show="dismissCountDown"
                        dismissible
                        variant="success"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                        >
                            <p>Producto agregado con éxito</p>
                            <b-progress
                                variant="success"
                                :max="dismissSecs"
                                :value="dismissCountDown"
                                height="2px"
                            ></b-progress>
                        </b-alert>
              </b-card>
          </b-col>
          <b-col></b-col>
      </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'AddProductsView',
    data() {
        return {
            Producto: {},
            dismissSecs: 3,
            dismissCountDown: 0,
            categorias: [
                'Celulares',
                'Computadoras',
                'Vehiculos',
                'Parlantes',
                'Otros',
            ],
            Movement: {},
            estadoVenta: true,
        }
    },
    computed: {
        ...mapGetters({
            api: 'api',
            disVenta: 'disVenta',
        })
    },

    mounted(){
        this.$forceUpdate();
        this.estadoVenta = this.disVenta
    },

    methods: {
        mostrar2: function (){
            this.Producto.producto = this.validar(this.Producto.producto, '-')
            this.Producto.categoria = this.validar(this.Producto.categoria, '-')
            this.Producto.stock = this.validar(this.Producto.stock, '0')
            this.Producto.precioCompra = this.validar(this.Producto.precioCompra, '0')
            this.Producto.precioVenta = this.validar(this.Producto.precioVenta, '0')
            this.Producto.proveedor = this.validar(this.Producto.proveedor, '-')
            this.Producto.detalles = this.validar(this.Producto.detalles, '-')
            axios.post(this.api + '/api/product', (this.Producto))
                .then(res => {
                    if (res.status == 200) {
                        this.makeToast()
                        this.registrarMovimiento(this.Producto);
                    }
                    else {
                        this.makeToastError()
                    }
            })
            this.Producto = {};
        },

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },

        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        validar: function(validar, def){
            if (validar == undefined) {
                return def
            }
            else{
                return validar
            }
        },

        registrarMovimiento(Producto){
            this.Movement.usuario = '-'
            this.Movement.cliente = '-'
            this.Movement.movimiento = 'Agregar Producto'
            this.Movement.motivo = Producto.producto

            axios.post(this.api + '/api/movement', this.Movement)
                .then(res => {
                    console.log(res.data)
                })
        },

        makeToast(append = false) {
            this.$bvToast.toast('El Producto se registró con éxito', {
            title: 'Producto registrado!',
            autoHideDelay: 1500,
            variant: 'success',
            solid: true,
            appendToast: append
            })
        },
        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente uno de los datos está mal cargado', {
            title: 'Error al registrar el Producto',
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
.input{
    margin-top: 20px;
}
.divtotal{
    display: block;
}
</style>