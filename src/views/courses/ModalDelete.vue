<template>
  <v-dialog v-model="showModalDeleteCourse" width="480px" persistent lazy scrollable>
    <v-card>
      <v-toolbar color="error" card dark>
        <v-toolbar-title>Eliminar curso</v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="replaceShowModalDeleteCourse({ status: false })">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar los {{ selected.length }} usuarios seleccionados ?</p>
      </v-card-text>
      <v-divider />
      <div class="my-3 text-xs-center">
        <v-btn
          :disabled="processingDelete"
          :loading="processingDelete"
          color="error"
          @click="deleteCourse()"
        >
          Eliminar
        </v-btn>
        <v-btn :disabled="processingDelete" @click="replaceShowModalDeleteCourse({ status: false })">
          Cancelar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      processingDelete: false
    };
  },
  props: {
    selected: Array
  },
  computed: {
    ...mapState({
      showModalDeleteCourse: state => state.courses.showModalDeleteCourse,
      currentCourse: state => state.courses.currentCourse
    })
  },

  watch: {
    showModalDeleteCourse(newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentCourse({ users: null });
        return false;
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalDeleteCourse: "courses/replaceShowModalDeleteCourse",
      replaceCurrentCourse: "courses/replaceCurrentCourse",
      deleteCourse: "courses/deleteCourse",
      getCourses: "courses/getCourses"
    }),
    deleteCourse() {
      this.processingDelete = true;
      this.deleteCourse({ courseId: this.courseId })
        .then(response => {
          this.processingDelete = false;
          this.replaceShowModalDeleteCourse({ status: false });
          this.getCourses();
        })
        .catch(() => {
          this.processingDelete = false;
        });
    }
  }
};
</script>
