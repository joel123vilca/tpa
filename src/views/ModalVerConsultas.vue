<template>
  <v-dialog
    v-model="showModalVerConsultas"
    width="480px"
    persistent
    lazy
    scrollable
  >
    <v-card>
      <v-toolbar
        color="success"
        card
        dark
      >
        <v-toolbar-title>Consulta</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalVerConsultas({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <strong> {{currentConsulta.tipoConsulta.tipo}} </strong>
      </v-card-title>
      <v-card-text>
        <template v-if="currentConsulta">
          <strong>{{ currentConsulta.texto}}</strong>
        </template>
      </v-card-text>
      <v-divider />
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
      showModalVerConsultas: state => state.consultas.showModalVerConsultas,
      currentConsulta: state => state.consultas.currentConsulta,
    }),
  },
  watch: {
  },
  methods: {
    ...mapActions({
      replaceShowModalVerConsultas: 'consultas/replaceShowModalVerConsultas',
      replaceCurrentConsulta: 'consultas/replaceCurrentConsulta',
    }),
  },
};

</script>
