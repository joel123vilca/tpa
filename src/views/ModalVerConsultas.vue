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
        <v-text-field
          v-if="currentConsulta"
          v-model="currentConsulta.tipoConsulta.tipo"
          label="TIPO DE CONSULTA"
          outline
          readonly
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <template v-if="currentConsulta">
          <v-textarea
            v-model="currentConsulta.texto"
            outline
            readonly
            name="input-7-4"
            label="Texto"
            ></v-textarea>
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
