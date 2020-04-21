<template>
  <v-dialog v-model="showModalDeleteEncuesta" width="480px" persistent lazy scrollable>
    <v-card>
      <v-toolbar color="error" card dark>
        <v-toolbar-title>Eliminar Encuesta</v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="replaceShowModalDeleteEncuesta({ status: false })">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar la encuesta?</p>

        <template v-if="currentEncuesta">
          <ul>
            <li>
              <strong>Nombre:</strong>
              {{ currentEncuesta.nombre}}
            </li>
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
        >Eliminar</v-btn>
        <v-btn
          :disabled="processingDelete"
          @click="replaceShowModalDeleteEncuesta({ status: false })"
        >Cancelar</v-btn>
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
      showModalDeleteEncuesta: state => state.encuestas.showModalDeleteEncuesta,
      currentEncuesta: state => state.encuestas.currentEncuesta,
    }),
  },
  watch: {
    showModalDeleteEncuesta(newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentEncuesta({ encuesta: null })
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      replaceShowModalDeleteEncuesta: 'encuestas/replaceShowModalDeleteEncuesta',
      replaceCurrentEncuesta: 'encuestas/replaceCurrentEncuesta',
      deleteEncuesta: 'encuestas/deleteEncuesta',
      getPeriodoEncuestas: 'periodos/getPeriodoEncuestas',
    }),
    launchDelete() {
      this.processingDelete = true;
      this.deleteEncuesta({ encuestaId: this.currentEncuesta.id })
        .then((response) => {
          this.processingDelete = false;
          this.replaceShowModalDeleteEncuesta({ status: false });
          this.getPeriodoEncuestas({ periodoId: this.$route.params.id });
        })
        .catch(() => {
          this.processingDelete = false;
        });
    },
  },
};

</script>
