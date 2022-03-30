<template>
  <b-container fluid="sm" class="">
      <b-row>
          <b-col></b-col>
          <b-col cols="10">
              <b-card>
                <div class="content">
                    <div class="texto"><p class="mt-3">Producto:</p></div>
                    <b-form-input 
                        class="mt-2" 
                        v-model="Producto.producto" 
                        placeholder="Producto"
                    >
                    </b-form-input>
                </div>

                <div class="content">
                    <div class="texto"><p class="mt-2">Categoría:</p></div>
                    <b-form-input 
                        v-model="Producto.categoria" 
                        placeholder="Categoria"
                    >
                    </b-form-input>
                </div>

                <div class="content">
                    <div class="texto"><p class="mt-2">Stock:</p></div>
                    <b-form-input 
                        
                        type="number" 
                        v-model="Producto.stock" 
                        placeholder="Cantidad"
                    >
                    </b-form-input>
                </div>

                <div class="content">
                    <div class="texto"><p class="mt-2">Compra:</p></div>
                    <b-form-input 
                        type="number" 
                        v-model="Producto.precioCompra" 
                        placeholder="Precio de compra"
                    >
                    </b-form-input>
                </div>

                <div class="content">
                    <div class="texto"><p class="mt-2">Venta:</p></div>
                    <b-form-input 
                        type="number" 
                        v-model="Producto.precioVenta" 
                        placeholder="Precio de venta"
                    >
                    </b-form-input>
                </div>

                <div class="content">
                    <div class="texto"><p class="mt-2">Proveedor:</p></div>
                    <b-form-input 
                    v-model="Producto.proveedor" 
                    placeholder="Proveedor"
                    >
                    </b-form-input>
                </div>

                <div class="content">
                    <div class="texto"><p class="mt-2">Detalles:</p></div>
                    <b-form-textarea 
                        class="mb-3" 
                        v-model="Producto.detalles" 
                        placeholder="Detalles"
                    >
                    </b-form-textarea>
                </div>


            <b-row>
                <b-col cols="12" class="mt-3">
                    <b-button 
                        @click="pedirPass()"
                        variant="success" 
                        block
                    >
                        Actualizar
                    </b-button>
                </b-col>
            </b-row>
            
            <b-modal
                v-model="passwordView"
                centered
                title="Seguridad"
                header-border-variant="success"
                footer-border-variant="success"
                hide-footer
                ok-only
                ok-variant="success"
            >
                <b-form-input type="password" v-model="passrefresh"></b-form-input>
                <b-button @click="comprobarPass(passrefresh)" block variant="success" class="mt-3">
                    Ok
                </b-button>
            </b-modal>

            <b-modal
                v-model="show"
                centered
                title="Actualización"
                header-border-variant="success"
                footer-border-variant="success"
                hide-footer
                ok-only
                ok-variant="success"
            >
                <h6>Producto actualizado con éxito!</h6>
                <b-button to="/" block variant="success" class="mt-3">
                    Ok
                </b-button>
            </b-modal>

            </b-card>
          </b-col>
          <b-col></b-col>
      </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'ProductView',

    props:['Producto'],

    data() {
        return {
            dismissSecs: 3,
            dismissCountDown: 0,
            ProductPut: {},
            show: false,
            passwordView: false,
            Movement: {},
            passrefresh: '',
        }
    },
    computed: {
        ...mapGetters({
            api: 'api'
        })
    },



    methods: {
        hideModal: function(){
            this.$refs['show'].hide
        },

        pedirPass(){
            this.passwordView = !this.passwordView
        },

        comprobarPass: function(pass){
            if (pass == '3368') {
                this.mostrar3()
            }
            else {
                this.makeToastError()
            }
        },

        mostrar3: function (){
            // this.ProductPut.producto = this.Producto.producto
            this.ProductPut.producto = this.validar(this.Producto.producto, '-');
            this.ProductPut.idProduct = this.Producto.idProduct;
            this.ProductPut.categoria = this.validar(this.Producto.categoria, '-')
            this.ProductPut.stock = this.validar(this.Producto.stock, '0')
            this.ProductPut.precioCompra = this.validar(this.Producto.precioCompra, '0')
            this.ProductPut.precioVenta = this.validar(this.Producto.precioVenta, '0')
            this.ProductPut.proveedor = this.validar(this.Producto.proveedor, '-')
            this.ProductPut.detalles = this.validar(this.Producto.detalles, '-')

            this.registrarMovimiento(this.ProductPut)

            axios.put(this.api + '/api/product', this.ProductPut)
                .then(res => {
                    if (res.status == 200) {
                        this.show = !this.show
                    }
                    else {
                        this.makeToastError()
                    }
            })
            this.ProductoPut = {};
        },

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
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
            this.Movement.movimiento = 'Editar Producto'
            this.Movement.motivo = Producto.producto

            axios.post(this.api + '/api/movement', this.Movement)
                .then(res => {
                    console.log(res.data)
                })
        },

        makeToastError(append = false) {
            this.$bvToast.toast('Posiblemente la contraseña no es la correcta', {
            title: 'Error al actualizar producto',
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
.texto{
    width: 130px;
}
.input{
    margin-top: 20px;
}
.divtotal{
    display: block;
}
.content{
    display:flex;
    align-content: space-between;
}
</style>