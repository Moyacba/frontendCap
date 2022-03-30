<template>
    <div>
        <b-list-group v-for="(item, index) in this.cart" :key="index">
            <b-list-group-item class="mt-1">
                <div id="containerCart">
                    <p class="center"> 
                        {{item.producto}} 
                    </p>
                    <p class="center ml-4">
                        ${{item.precioVenta}}
                    </p>
                    <b-button
                    @click="deleteProductCart(item), editCart()"
                    v-show='editar' 
                    id="close" 
                    size="sm" 
                    class="ml-3 mr-0" 
                    variant="danger">
                    </b-button>
                </div>
            </b-list-group-item>
        </b-list-group>

        <div class="end mt-4">
            <h6 class="mr-3">SUBTOTAL: ${{(this.cartSubtotal - this.descu)}} </h6>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'PopoverCart',
    data() {
        return {
            subtotal: 0,
            desc: 0,
        }
    },
    computed: {
        ...mapGetters(['cart', 'cartSubtotal', 'editar', 'descu'])
    },
    methods: {
        ...mapActions(['deleteProductCart', 'editCart']),
        sumar: function(precio){
            this.subtotal = this.subtotal + precio
        },
    }
}
</script>

<style>
.btnCart{
    width: 120px
}
#containerCart{
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.center{
    display: flex;
    align-items: center;
    margin-bottom: 0px;
}
.end{
    height: 20px;
    display: flex;
    justify-content:flex-end;
}
#close{
    margin: 0;
    height: 20px;
}
.containerFinal{
    display: flex;
    justify-content: space-between;
}
</style>