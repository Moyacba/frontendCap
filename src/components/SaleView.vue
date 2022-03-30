<template>
  <b-container>
        <b-card>
            <b-card-title>
                <b-container class="cardTitle">
                    <h4>Registro de venta</h4>
                    <h5 class="mt-1">{{dateSale}}</h5>
                </b-container>
            </b-card-title>
                <b-card>
                    <b-card-title>
                        <h6 class="mb-4">Datos del cliente</h6>
                    </b-card-title>
                    <b-row>
                        <b-col>
                            <b-form-input disabled v-model="cliente"></b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-input disabled v-model="pago"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col>
                            <b-form-input disabled v-model="detalles"></b-form-input>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card class="mt-2">
                    <b-card-title>
                        <h6 class="mb-3">Productos</h6>
                    </b-card-title>

                    <div>
                        <b-list-group v-for="(item, index) in productsSale" :key="index">
                            <b-list-group-item class="mt-1">
                                <div id="containerCart">
                                    <p class="center"> 
                                        {{item.producto}} 
                                    </p>
                                    <p class="center ml-4">
                                        ${{item.precioVenta}}
                                    </p>
                                </div>
                            </b-list-group-item>
                        </b-list-group>

                        <div class="end mt-4">
                            <h5 class="mr-3">SUBTOTAL: ${{subtotalSale}} </h5>
                        </div>
                    </div>
                </b-card>
        </b-card>
    </b-container>
</template>

<script>

export default {
    name: 'SaleView',
    props: ['dateSale' ,'cliente', 'pago', 'detalles', 'productsSale', 'subtotalSale'],

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

</style>