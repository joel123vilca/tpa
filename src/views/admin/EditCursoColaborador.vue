<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaboradores' },
          { name: 'Editar curso'}
        ]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Curso</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateCurso"
              >
                <v-container fluid grid-list-lg>

                  <v-autocomplete
                    v-model="form.curso_id"
                    :items="cursosDisponibles"
                    dense
                    outline
                    clearable
                    small-chips
                    label="Seleccionar curso"
                    item-text="nombre"
                    item-value="id"
                    :disabled="processingForm"
                    :error="!!formErrors.curso_id"
                    :error-messages="formErrors.curso_id"
                    @change="
                      () => {
                        formErrors.curso_id = undefined;
                        delete formErrors.curso_id;
                      }
                    "
                  />
                  <v-card
                  outlined
                  width="250"
                >
                <br>
                <center>
                <h4>Subir Archivo Diploma</h4>
                </center>
            <v-fab-transition>
              <v-btn
                v-show="diplomaUrl"
                color="pink"
                small
                dark
                absolute
                left
                fab
                @click="deleteDiploma()"
              >
              X
              </v-btn>
              </v-fab-transition>
              <v-fab-transition>
                <v-btn
                  v-show="form.url_diploma"
                  color="pink"
                  small
                  dark
                  absolute
                  left
                  fab
                  @click="deleteDiplomaSet()"
                >
                X
                </v-btn>
              </v-fab-transition>
              <center>
              <el-upload
                class="avatar-uploader"
                action=""
                name="diploma"
                :http-request="onFilePickedDiploma"
                :show-file-list="false"
              >
              <img
                v-if="form.url_diploma"
                src="data:image/png;base64,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"
                class="avatar"
              >
              <img
                v-if="diplomaUrl"
                :src="diplomaUrl"
                class="avatar"
              >
              <i
                v-if="!form.url_diploma && !diplomaUrl"
                class="el-icon-plus avatar-uploader-icon"
              />
              </el-upload>
                </center>
                </v-card>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Guardar Cambios
                  </v-btn>
                  <v-btn @click="$router.push({name: 'ListCursosColaborador', params: { id: form.colaborador_id }})">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {

  metaInfo() {
    return { title: "Asignar Curso" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      formErrors: {},
      diplomaName: '',
      diplomaUrl: '',
      diplomaFile: '',
      form: {
        curso_id: '',
        diploma: '',
        colaborador_id: '',
        url_diploma: '',
      },
      validForm: true,
      processingForm: false,
    };
  },
  computed: {
    ...mapState({
      cursosDisponibles: state => state.courses.cursosDisponibles,
      loadingCursosDisponibles: state => state.courses.loadingCursosDisponibles,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  created() {
     this.getCursosDisponibles({ colaboradorId: 3 });
     this.getCapacitacion({ capacitacionId: this.$route.params.id }).then(response => {
      const capacitacionInfo = response.data.data;
      this.setForm(capacitacionInfo);
    });
  },
  methods: {
    ...mapActions({
      getCursosDisponibles: 'courses/getCursosDisponibles',
      updateCapacitacion: 'colaboradores/updateCapacitacion',
      getCapacitacion: 'colaboradores/getByIdCapacitacion',
    }),
    deleteDiploma() {
      this.diplomaUrl = null;
    },
    deleteDiplomaSet() {
      this.form.url_diploma = null;
    },
    onFilePickedDiploma(e) {
      this.form.diploma = e.file;
      if(e.file !== undefined) {
        this.diplomaName = e.file.name;
        if(this.diplomaName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader()
        fr.readAsDataURL(e.file)
        fr.addEventListener('load', () => {
          this.diplomaUrl = 'data:image/png;base64,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';
          this.diplomaFile = e.file;
        })
      } else {
        this.diplomaName = '';
        this.diplomaFile = '';
        this.diplomaUrl = '';
      }
    },
    setForm(capacitacion) {
      this.form.curso_id = capacitacion.curso_id;
      this.form.url_diploma = capacitacion.url_diploma;
      this.form.colaborador_id = capacitacion.colaborador_id;
    },
    submitCreateCurso() {
      if (!this.$refs.form.validate()) return false;
      var formData = new FormData();
      formData.append("_method", 'PUT');
      formData.append("curso_id", this.form.curso_id);
      formData.append("diploma", this.form.diploma);
      formData.append("url_diploma", this.form.url_diploma);
      this.processingForm = true;
      this.updateCapacitacion({
        capacitacionId: this.$route.params.id,
        data: formData })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "ListCursosColaborador", params: { id: this.form.colaborador_id }});
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
