<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Periodo' },
          { name: 'Cargar Resultados'}
        ]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Cargar Resultados</span>
            </v-card-title>
            <v-divider />
            <v-divider />
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Paso 1: Cargar Excel</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Resultados</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card-text class="pa-0">
                    <v-form
                      ref="form"
                      v-model="validForm"
                      lazy-validation
                      @submit.prevent="submitCargarResultado"
                    >
                      <v-container fluid grid-list-lg>
                        <v-alert
                          v-model="alert"
                          border="left"
                          close-text="Close Alert"
                          color="error"
                          dark
                          dismissible
                        >Solo se aceptan archivo en formato excel.</v-alert>
                        <br />
                        <v-card outlined width="250">
                          <br />
                          <center>
                            <h4>Subir Archivo Excel</h4>
                          </center>
                          <v-fab-transition>
                            <v-btn
                              v-show="resultadoUrl"
                              color="pink"
                              small
                              dark
                              absolute
                              left
                              fab
                              @click="deleteResultado()"
                            >X</v-btn>
                          </v-fab-transition>
                          <center>
                            <el-upload
                              class="avatar-uploader"
                              action
                              name="resultado"
                              :http-request="onFilePickedResultado"
                              :show-file-list="false"
                            >
                              <img v-if="resultadoUrl" :src="resultadoUrl" class="avatar" />
                              <i v-else class="el-icon-plus avatar-uploader-icon" />
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
                        >Guardar</v-btn>
                        <v-btn @click="$router.push({name: 'listaPeriodo'})">Cancelar</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <h3>Aqui iran los resultados</h3>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
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
    return { title: "cargar resultados" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      formErrors: {},
      resultadoName: '',
      resultadoUrl: '',
      resultadoFile: '',
      form: {
        file: '',
      },
      e1: 0,
      alert: false,
      validForm: true,
      processingForm: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/check'
    }),
  },
  methods: {
    ...mapActions({
      cargarExcel: 'periodos/cargarExcel',
    }),
    deleteResultado() {
      this.resultadoUrl = null;
    },
    onFilePickedResultado(e) {
      this.form.file = e.file;
      if(e.file !== undefined && e.file.name.indexOf("xls") > 0) {
        this.resultadoName = e.file.name;
        const fr = new FileReader()
        fr.readAsDataURL(e.file)
        fr.addEventListener('load', () => {
          this.resultadoUrl = 'https://cdn.icon-icons.com/icons2/1156/PNG/512/1486565571-microsoft-office-excel_81549.png'
            this.resultadoFile = e.file;
        })
      } else {
        this.resultadoName = '';
        this.resultadoFile = '';
        this.resultadoUrl = '';
        this.alert = true;
      }
    },
    submitCargarResultado() {
      if (!this.$refs.form.validate()) return false;
      var formData = new FormData();
      formData.append("file", this.form.file);
      this.processingForm = true;
      this.cargarExcel({
        periodoId: this.$route.params.id,
      data: formData })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listaPeriodo"});
          this.e1 = 2;
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
          this.e1 = 2;
        });
    }
  }
};
</script>
