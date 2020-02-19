<template>
  <v-dialog
    v-model="showModalDeleteCurso"
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
        <v-toolbar-title>Eliminar Curso</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalDeleteCurso({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar el curso?</p>

        <template v-if="currentCurso">
            <strong>Nombre: </strong>{{ currentCurso.curso_nombre }}
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
          @click="replaceShowModalDeleteCurso({ status: false })"
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
      showModalDeleteCurso: state => state.colaboradores.showModalDeleteCurso,
      currentCurso: state => state.colaboradores.currentCurso,
    }),
  },
  watch: {
    showModalDeleteCurso(newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentCurso({ curso: null })
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      replaceShowModalDeleteCurso: 'colaboradores/replaceShowModalDeleteCurso',
      replaceCurrentCurso: 'colaboradores/replaceCurrentCurso',
      deleteCurso: 'colaboradores/deleteCurso',
      getCursos: 'colaboradores/getCursos',
    }),
    launchDelete() {
      this.processingDelete = true;
      this.deleteCurso({ cursoId: this.currentCurso.id })
        .then((response) => {
          this.processingDelete = false;
          this.replaceShowModalDeleteCurso({ status: false });
          this.getCursos({ colaboradorId: this.$route.params.id });
        })
        .catch(() => {
          this.processingDelete = false;
        });
    },
  },
};

</script>
