<template>
  <div id="app">
    <Navbar class="nav"></Navbar>
    <div class="separador">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from './components/Navbar'
import axios from 'axios'



export default {
  components: {Navbar},
  methods: {
        ...mapActions(['changebox', 'changeOpenOrClose', 'changeidBox', 'changeDisVenta']),

      },

  created() {
    axios.get('http://192.168.100.131:4000/api/box')
      .then(res => {
        if (res.data[res.data.length-1] != undefined) {
          if (res.data[res.data.length-1].active) {
            console.log('000000000000')
            console.log(res.data[res.data.length-1].idBox)
            this.changebox('Caja: Abierta')
            this.changeOpenOrClose('/Closebox')
            this.changeidBox(res.data[res.data.length-1].idBox)
            this.changeDisVenta(false)
          }
        }
      })
  }
}

</script>

<style>
.separador{
  margin-top: 80px;
}
#app{
  background: linear-gradient(148deg, rgba(255,255,255,1) 0%, rgba(198,198,198,1) 50%, rgba(255,255,255,1) 100%);
  height: 1000px;
}
</style>

<style>
</style>