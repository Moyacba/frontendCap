<template>
  <b-container class="mt-4">
    <b-card>
      <b-card-title>
        <b-row>
          <b-col cols="5">
            <h3>Anotador</h3>
          </b-col>
          <b-col>
            <b-form-input
              v-model="Nota.text"
              placeholder="Agregar nota"
            ></b-form-input>
          </b-col>
          <b-col cols="1">
            <b-button @click="agregarNota()" variant="info">+</b-button>
          </b-col>
        </b-row>
      </b-card-title>
      <b-card-body>
        <b-table id="tableNotes" :fields="Fields" :items="Notes" hover striped>
          <template v-slot:cell(Acciones)="row">
            <div>
              <b-button
                variant="danger"
                size="sm"
                @click="eliminarNota(row.item)"
              >
                Eliminar
              </b-button>
            </div>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  name: "home",
  data() {
    return {
      noww: {},
      Notes: [],
      arraySumplente: [],
      Fields: [
        { key: "text", label: "Notas", sortable: false },
        { key: "Acciones", class: "text-center" },
      ],
      Nota: { text: "" },
      Movement: { usuario: "", cliente: "", movimiento: "", motivo: "" },
    };
  },

  computed: {
    ...mapGetters(["api"]),
  },

  mounted() {
    this.$forceUpdate();
    axios.get(this.api + "/api/notes").then((res) => {
      this.Notes = res.data;
    });
  },

  methods: {
    now: () => {
      moment.locale("es");
      var day = moment().format("HH:mm:ss");
      console.log(day);
    },

    agregarNota: function () {
      axios.post(this.api + "/api/notes", this.Nota).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          let prevNota = this.Nota;
          this.Notes.push(prevNota);
          this.agregarMovimiento("Agregar Nota", this.Nota.text);
          this.Nota = {};
        }
      });
    },

    eliminarNota: function (row) {
      axios.put(this.api + "/api/notes", row).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          this.arraySumplente = [];
          for (let i = 0; i < this.Notes.length; i++) {
            if (this.Notes[i].text != row.text) {
              this.arraySumplente.push(this.Notes[i]);
            }
          }
          this.Notes = this.arraySumplente;
          this.agregarMovimiento("Eliminar Nota", row.text);
        }
      });
    },

    agregarMovimiento(movi, motivo) {
      this.Movement.usuario = "-";
      this.Movement.cliente = "Notas";
      this.Movement.movimiento = movi;
      this.Movement.motivo = motivo;

      axios.post(this.api + "/api/movement", this.Movement);
      // .then(res => {
      //     console.log(res.data)
      // })
    },
  },
};
</script>

<style>
</style>