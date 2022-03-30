<template>
    <b-container>
        <b-navbar fixed="top" toggleable="sm" type="dark" variant="dark">
            <b-navbar-toggle  target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand to="/" class="ml-4 ">MODOTECNO</b-navbar-brand>

            <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown
                    class="ml-5"
                    text="Productos"
                >
                    <b-dropdown-item class="ml-2" to="/addProducts">Agregar Producto</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item class="ml-2" to="/Products">Lista de Productos</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    class="ml-5"
                    text="Servicios"
                >
                    <b-dropdown-item class="ml-2" to="/addService">Agregar de Servicios</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item class="ml-2" to="/Service">Lista de Servicios</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    text="Gastos"
                    class="ml-5"
                >
                    <b-dropdown-item class="ml-2" to="/AddPurchase">Agregar Gastos</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item class="ml-2" to="/Purchase">Lista de Gastos</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    text="Ventas"
                    class="ml-5"
                >
                    <b-dropdown-item class="ml-2" to="/Sale">Lista de Venta</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    text="Cajas"
                    class="ml-5"
                >
                    <b-dropdown-item class="ml-2" @click="pedirPass()">Lista de Cajas</b-dropdown-item>
                </b-nav-item-dropdown>
                
            </b-navbar-nav>
            </b-collapse>

            <b-btn
                class="mr-5"
                variant="dark"
                :to="this.openOrClose"
            >
                {{this.boxState}}
            </b-btn>
            <b-button class="mr-4" id="popover-cart">
                <!-- <i class="bi bi-cart4"></i>
                <img class="imgcarrito" src="../assets/cart4.svg" alt="Bootstrap" width="32" height="32"> -->
                <b-icon class="mr-1" icon="cart-4" font-scale="1.5"></b-icon>
                {{this.cart.length}}
            </b-button>
            
            <b-popover 
             target="popover-cart"
             triggers="hover"
             placement="bottom"
             title="Productos en carrito"
            >
                <PopoverCart></PopoverCart>
                <div id="containerCart" class="containerBtn mt-4">
                    <b-button @click="editCart()" class="btnCart" size="sm">Editar carrito</b-button>
                    <b-button @click="noEditCart()" to="/cart" class="btnCart ml-1" size="sm" variant="success">Vender</b-button>
                </div>
            </b-popover>

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
                <b-btn block class="mt-2" :disabled="disBtn" variant="warning" to="/Box" @click="passwordView=false">Ver lista de cajas</b-btn>
            </b-modal>
        </b-navbar>
    </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PopoverCart from './PopoverCart'

export default {
    name: 'Navbar',
    components: {PopoverCart},
    data() {
        return {
            EstadoCaja: 'Caja: CERRADA',
            passwordView: false,
            disBtn: true,
            passrefresh: '',
        }
    },
    computed: {
        ...mapGetters(['cart', 'editar', 'boxState', 'openOrClose'])
    },
    methods: {
        ...mapActions(['editCart', 'changebox']),

        noEditCart: function(){
            if (this.editar == true) {
                this.editCart()
            }
        },

        pedirPass(){
            this.passwordView = !this.passwordView
            this.disBtn = true
            this.passrefresh = ''
        },

        comprobarPass: function(pass){
            if (pass == '3368') {
                this.disBtn = false
            }
            else {
                this.disBtn = true
            }
        }
    },
}
</script>

<style>
#containerCart{
    display: flex;
    justify-content: space-between;
    align-content: center;
}
</style>