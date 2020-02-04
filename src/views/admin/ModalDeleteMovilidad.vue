<template>
  <v-dialog
    v-model="showModalDeleteMovilidad"
    width="480px"
    persistent
    lazy
    scrollable
  >
    <v-card>
      <v-toolbar
        color="error"
        card
        dark
      >
        <v-toolbar-title>Eliminar Movilidad</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalDeleteMovilidad({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar el cargo Actual?</p>

        <template v-if="currentMovilidad">
          <ul>
            <li><strong>Nombre: </strong>{{ currentMovilidad.cargo_nombre }}</li>
            <li><strong>Fecha de inicio: </strong>{{ currentMovilidad.fecha_inicio }}</li>
          </ul>
        </template>
      </v-card-text>
      <v-divider />
      <div class="my-3 text-xs-center">
        <v-btn
          :disabled="processingDelete"
          :loading="processingDelete"
          color="error"
          @click="launchDelete()"
        >
          Eliminar
        </v-btn>
        <v-btn
          :disabled="processingDelete"
          @click="replaceShowModalDeleteMovilidad({ status: false })"
        >
          Cancelar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      processingDelete: false,
    };
  },
  computed: {
    ...mapState({
      showModalDeleteMovilidad: state => state.colaboradores.showModalDeleteMovilidad,
      currentMovilidad: state => state.colaboradores.currentMovilidad,
    }),
  },
  watch: {
    showModalDeleteMovilidad(newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentMovilidad({ movilidad: null })
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      replaceShowModalDeleteMovilidad: 'colaboradores/replaceShowModalDeleteMovilidad',
      replaceCurrentMovilidad: 'colaboradores/replaceCurrentMovilidad',
      deleteMovilidad: 'colaboradores/deleteMovilidad',
      getMovilidad: 'colaboradores/getMovilidad',
    }),
    launchDelete() {
      this.processingDelete = true;
      this.deleteMovilidad({ movilidadId: this.$route.params.id })
        .then((response) => {
          this.processingDelete = false;
          this.replaceShowModalDeleteMovilidad({ status: false });
          this.getMovilidad({ colaboradorId: this.$route.params.id });
        })
        .catch(() => {
          this.processingDelete = false;
        });
    },
  },
};

</script>
