<template>
  <v-dialog
    v-model="showModalDeletePeriodo"
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
        <v-toolbar-title>Eliminar Periodo</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalDeletePeriodo({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar el periodo?</p>

        <template v-if="currentPeriodo">
          <ul>
            <li><strong>Nombre: </strong>{{ currentPeriodo.nombre}}</li>
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
          @click="replaceShowModalDeletePeriodo({ status: false })"
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
      showModalDeletePeriodo: state => state.periodos.showModalDeletePeriodo,
      currentPeriodo: state => state.periodos.currentPeriodo,
    }),
  },
  watch: {
    showModalDeletePeriodo(newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentPeriodo({ periodo: null })
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      replaceShowModalDeletePeriodo: 'periodos/replaceShowModalDeletePeriodo',
      replaceCurrentPeriodo: 'periodos/replaceCurrentPeriodo',
      deletePeriodo: 'periodos/deletePeriodo',
      getPeriodos: 'periodos/getPeriodos',
    }),
    launchDelete() {
      this.processingDelete = true;
      this.deletePeriodo({ periodoId: this.currentPeriodo.id })
        .then((response) => {
          this.processingDelete = false;
          this.replaceShowModalDeletePeriodo({ status: false });
          this.getPeriodos();
        })
        .catch(() => {
          this.processingDelete = false;
        });
    },
  },
};

</script>
