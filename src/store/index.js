import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        date: moment(new Date()).local().format('DD-MM-YYYY'),
        api: 'http://192.168.100.131:4000',
        cart: [],
        cartSubtotal: 0,
        title: 'Producto state',
        editar: false,
        descu: 0,
        boxState: 'Caja: Cerrada',
        openOrClose: '/Openbox',
        idBox: 1,
        disVenta: true,
    },
    actions: {
        addToCart: ({commit}, product) => {
            commit('ADD_TO_CART', {product});
        },
        editCart: ({commit}) => {
            commit('EDIT_CART')
        },
        deleteProductCart: ({commit}, id) => {
            commit('DELETE_PRODUCT_CART', id)
        },
        deleteCart: ({commit}) => {
            commit('DELETE_CART')
        },
        aplicarDescuento: ({commit}, desc) => {
            commit('APLICAR_DESCUENTO', desc)
        },
        changebox: ({commit}, boxState) => {
            commit('CHANGE_BOX', boxState)
        },
        changeOpenOrClose: ({commit}, openOrClose) => {
            commit('CHANGE_OPENORCLOSE', openOrClose)
        },
        changeidBox: ({commit}, idBox) => {
            commit('CHANGE_IDBOX', idBox)
        },
        changeDisVenta: ({commit}, disVenta) => {
            commit('CHANGE_DISVENTA', disVenta)
        },
    },
    mutations: {
        ADD_TO_CART: (state, {product}) => {
            state.cart.push(product);
            state.cartSubtotal = 0;
            for (const item of state.cart) {
                state.cartSubtotal += item.precioVenta;
            }
        },
        EDIT_CART: (state) => {
            state.editar = !state.editar
        },
        DELETE_PRODUCT_CART: (state, id) => {
            let cont = 0;
            let ok = 0;
            for (const item of state.cart) {
                if (item.idProduct == id.idProduct && ok == 0) {
                    state.cart.splice(cont, 1)
                    ok = 1;
                }
                cont++
            }
            state.cartSubtotal = 0;
            for (const item of state.cart) {
                state.cartSubtotal += item.precioVenta;
            }
        },
        DELETE_CART: (state) => {
            state.cart = [];
            state.cartSubtotal = 0;
        },
        APLICAR_DESCUENTO: (state, desc) => {
            state.descu = desc;
        },
        CHANGE_BOX: (state, boxState) => {
            state.boxState = boxState;
        },
        CHANGE_OPENORCLOSE: (state, openOrClose) => {
            state.openOrClose = openOrClose;
        },
        CHANGE_IDBOX: (state, idBox) => {
            state.idBox = idBox;
        },
        CHANGE_DISVENTA: (state, disVenta) => {
            state.disVenta = disVenta;
        },
    },
    getters: {
        title: state => state.title,
        cart: state => state.cart,
        cartSubtotal: state => state.cartSubtotal,
        api: state => state.api,
        date: state => state.date,
        editar: state => state.editar,
        descu: state => state.descu,
        boxState: state => state.boxState,
        openOrClose: state => state.openOrClose,
        idBox: state => state.idBox,
        disVenta: state => state.disVenta,
    },
})