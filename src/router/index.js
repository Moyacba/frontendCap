import Vue from 'vue'
import VueRouter from 'vue-router'

// Views
import AddProductsView from '../views/AddProductsView'
import ListProductsView from '../views/ListProductsView'
import AddSaleView from '../views/AddSaleView'
import ListSaleView from '../views/ListSaleView'
import AddServiceView from '../views/AddServiceView'
import ListServiceView from '../views/ListServiceView'
import AddPurchaseView from '../views/AddPurchaseView'
import ListPurchaseView from '../views/ListPurchaseView'
import Openbox from '../views/Openbox'
import Closebox from '../views/Closebox'
import home from '../views/home'
import ListBoxView from '../views/ListBoxView'

Vue.use(VueRouter)

const routes = [
  {
  path: '/addProducts',
  name: 'AddProductsView',
  component: AddProductsView,
  },
  {
  path: '/',
  name: 'home',
  component: home,
  },
  {
  path: '/Products',
  name: 'ListProductsView',
  component: ListProductsView,
  },
  {
  path: '/Sale',
  name: 'ListSaleView',
  component: ListSaleView,
  },
  {
  path: '/Cart',
  name: 'AddSaleView',
  component: AddSaleView,
  },
  {
  path: '/addService',
  name: 'AddServiceView',
  component: AddServiceView,
  },
  {
  path: '/Service',
  name: 'ListServiceView',
  component: ListServiceView,
  },
  {
  path: '/AddPurchase',
  name: 'AddPurchaseView',
  component: AddPurchaseView,
  },
  {
  path: '/Purchase',
  name: 'ListPurchaseView',
  component: ListPurchaseView,
  },
  {
  path: '/Openbox',
  name: 'Openbox',
  component: Openbox,
  },
  {
  path: '/Box',
  name: 'Box',
  component: ListBoxView,
  },
  {
  path: '/Closebox',
  name: 'Closebox',
  component: Closebox,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
