<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Nuevo Cargo' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Cargo</span>
            </v-card-title>

            <v-divider />
            <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Paso 1: Datos Generales</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Datos Especificos</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">Paso 3: Documentos</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateArea"
              >
            <v-stepper-content step="1">
              <v-text-field
                v-model="form.nombre"
                :disabled="processingForm"
                label="NOMBRE"
                outline
                :rules="rules.nombre"
                :error="!!formErrors.nombre"
                :error-messages="formErrors.nombre"
                @change="verifyNombre"
                @keyup="
                  () => {
                    formErrors.nombre = undefined;
                    delete formErrors.nombre;
                  }
                "
              />
              <v-text-field
                v-model="form.nombre_fantasia"
                :disabled="processingForm"
                label="NOMBRE FANTASIA"
                outline
                :rules="rules.nombre_fantasia"
                :error="!!formErrors.nombre_fantasia"
                :error-messages="formErrors.nombre_fantasia"
                @keyup="
                  () => {
                    formErrors.nombre_fantasia = undefined;
                    delete formErrors.nombre_fantasia;
                  }
                "
              />
              <v-autocomplete
                v-model="form.nivel_jerarquico_id"
                :items="filterDataJerarquico"
                dense
                outline
                clearable
                small-chips
                label="SELECCIONAR NIVEL JERARQUICO"
                item-text="nivel_nombre"
                item-value="id"
                :disabled="processingForm"
                :rules="rules.nivel_jerarquico_id"
                :error="!!formErrors.nivel_jerarquico_id"
                :error-messages="formErrors.nivel_jerarquico_id"
                @change="
                  () => {
                    formErrors.nivel_jerarquico_id = undefined;
                    delete formErrors.nivel_jerarquico_id;
                  }
                "
              />
              <v-autocomplete
                v-model="form.supervisor_id"
                :items="cargos"
                dense
                outline
                clearable
                small-chips
                label="SELECCIONAR SUPERVISOR"
                item-text="nombre"
                item-value="id"
                :disabled="processingForm"
                :error="!!formErrors.supervisor_id"
                :error-messages="formErrors.supervisor_id"
                @change="selectCargo"
              />
              <v-autocomplete
                v-model="form.estado"
                :items="estados"
                dense
                outline
                clearable
                small-chips
                label="Seleccionar Estado"
                item-text="nombre"
                item-value="id"
                :disabled="processingForm"
                :rules="rules.estado"
                :error="!!formErrors.estado"
                :error-messages="formErrors.estado"
                @change="
                  () => {
                    formErrors.estado = undefined;
                    delete formErrors.estado;
                  }
                "
              />
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({ name: 'listacargo' })">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">

              <v-autocomplete
                v-model="form.padre_id"
                :items="filterData"
                outline
                clearable
                small-chips
                label="SELECCIONAR GERENCIA"
                item-text="nombre"
                item-value="id"
                :rules="rules.padre_id"
                :error="!!formErrors.padre_id"
                :error-messages="formErrors.padre_id"
                @keyup="() => {
                  formErrors.padre_id = undefined
                  delete formErrors.padre_id
                }"
              />
              <v-autocomplete
                v-model="form.segundo_padre_id"
                :items="filterDataSubgerencia"
                outline
                clearable
                small-chips
                label="SELECCIONAR SUBGERENCIA "
                item-text="nombre"
                item-value="id"
                :rules="rules.segundo_padre_id"
                :error="!!formErrors.segundo_padre_id"
                :error-messages="formErrors.segundo_padre_id"
                @keyup="() => {
                  formErrors.segundo_padre_id = undefined
                  delete formErrors.segundo_padre_id
                }"
              />
              <v-autocomplete
                v-model="form.tercer_padre_id"
                :items="filterDataArea"
                outline
                clearable
                small-chips
                label="SELECCIONAR AREA "
                item-text="nombre"
                item-value="id"
                :rules="rules.tercer_padre_id"
                :error="!!formErrors.tercer_padre_id"
                :error-messages="formErrors.tercer_padre_id"
                @keyup="() => {
                  formErrors.tercer_padre_id = undefined
                  delete formErrors.tercer_padre_id
                }"
              />
              <v-autocomplete
                v-model="form.cuarto_padre_id"
                :items="filterDataSubArea"
                outline
                clearable
                small-chips
                label="SELECCIONAR SUBAREA "
                item-text="nombre"
                item-value="id"
                :rules="rules.cuarto_padre_id"
                :error="!!formErrors.cuarto_padre_id"
                :error-messages="formErrors.cuarto_padre_id"
                @keyup="() => {
                  formErrors.cuarto_padre_id = undefined
                  delete formErrors.cuarto_padre_id
                }"
              />
                <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="e1 = 1">Volver</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
            <br>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-card
                  outlined
                  width="250"
                >
                <br>
                <center>
                <h4>Subir Archivo Descriptor</h4>
                </center>
            <v-fab-transition>
              <v-btn
                v-show="descriptorUrl"
                color="pink"
                small
                dark
                absolute
                left
                fab
                @click="deleteDescriptor()"
              >
              X
              </v-btn>
              </v-fab-transition>
              <center>
              <el-upload
                class="avatar-uploader"
                action=""
                name="descriptor"
                :http-request="onFilePickedDescriptor"
                :show-file-list="false"
              >
              <img
                v-if="descriptorUrl"
                :src="descriptorUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
              </el-upload>
                </center>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card
                  outlined
                  width="250"
                >
                <br>
                <center>
                <h4>Subir Archivo Organigrama</h4>
                </center>
            <v-fab-transition>
              <v-btn
                v-show="organigramaUrl"
                color="pink"
                small
                dark
                absolute
                fab
                @click="deleteOrganigrama()"
              >
              X
              </v-btn>
              </v-fab-transition>
              <center>
              <el-upload
                class="avatar-uploader"
                action=""
                name="organigrama"
                :http-request="onFilePickedOrganigrama"
                :show-file-list="false"
              >
              <img
                v-if="organigramaUrl"
                :src="organigramaUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
              </el-upload>
              </center>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <br>
        <v-btn
          type="submit"
          color="success"
          :loading="processingForm"
        >
          Guardar
        </v-btn>

        <v-btn @click="e1 = 2" color="error">Volver</v-btn>
      </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  metaInfo() {
    return { title: 'Nuevo Cargo' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },

  data() {
    return {
      formErrors: {},
      e1: 0,
      files: [],
      descriptorName: '',
      descriptorUrl: '',
      descriptorFile: '',
      organigramaName: '',
      organigramaUrl: '',
      organigramaFile: '',
      file: '',
      form: {
        nombre: '',
        supervisor_id: '',
        padre_id: 1,
        nivel_jerarquico_id: '',
        segundo_padre_id: '',
        tercer_padre_id: '',
        cuarto_padre_id: '',
        estado: 1,
        area_id: '',
        descriptor: '',
        organigrama: '',
        nombre_fantasia: '',
      },
      image: '',
      type: '',
      estados: [
        { id: 0, nombre: 'inactivo' },
        { id: 1, nombre: 'activo' },
      ],
      validForm: true,
      processingForm: false,
      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
        estado: [v => !!v || "El  estado es requerido"],
        area_id: [v => !!v || "El area es requerido"],
        nivel_jerarquico_id: [v => !!v || "El nivel jerarquico es requerido"],
      },
    };
  },
  computed: {
    ...mapState({
      nivelesJerarquico: state => state.nivelesJerarquico.nivelesJerarquico,
      loadingNivelesJerarquico: state => state.nivelesJerarquico.loadingNivelesJerarquico,
      areas: state => state.areas.areas,
      loadingAreas: state => state.areas.loadingAreas,
      cargos: state => state.cargos.cargos,
      loadingCargos: state => state.cargos.loadingCargos,
    }),
    filterDataJerarquico() {
      let nivelesJerarquico = this.nivelesJerarquico;
      return nivelesJerarquico.filter(o => o.estado === 1);
    },
    filterData() {
      let areas = this.areas;
      return areas.filter(o => o.tipoArea.nivel === 1 && o.estado === 1);
    },
    filterDataSubgerencia() {
      let areas = this.areas;
      return areas.filter(o => o.padre_id === this.form.padre_id && o.tipoArea.nivel === 2 && o.estado === 1);
    },
    filterDataArea() {
      let areas = this.areas
      if(this.form.segundo_padre_id != 0){
        return areas.filter(o => o.padre_id === this.form.segundo_padre_id && o.tipoArea.nivel === 3 && o.estado === 1);
      } else {
        return areas.filter(o => o.padre_id === this.form.padre_id && o.tipoArea.nivel === 3 && o.estado === 1);
      }
    },
    filterDataSubArea() {
      let areas = this.areas
      return areas.filter(o => o.padre_id === this.form.tercer_padre_id && o.estado === 1);
    },
  },
  created() {
    this.getNivelesJerarquico();
    this.getAreas();
    this.getCargos();
  },
  methods: {
    ...mapActions({
      createCargo: "cargos/createCargo",
      getNivelesJerarquico: "nivelesJerarquico/getNivelesJerarquico",
      getAreas: 'areas/getAreas',
      getCargos: 'cargos/getCargos',
      getAreasRelacionados: 'cargos/getAreasRelacionados',
      getVerify: 'cargos/getVerify',
    }),
    verifyNombre() {
      this.getVerify({
        nombre: this.form.nombre,
      })
        .then(response => {
          console.log(response)
        })
        .catch((error) => {
          this.formErrors = error.response.data.errors || {};
          this.step = 1;
        })

    },
    deleteDescriptor() {
      this.descriptorUrl = null;
    },
    deleteOrganigrama() {
      this.organigramaUrl = null;
    },
    pickFileDescriptor() {
      this.$refs.descriptor.click()
    },
    pickFileOrganigrama() {
      this.$refs.organigrama.click()
    },
    onFilePickedDescriptor(e) {
      this.form.descriptor = e.file;
      if(e.file !== undefined) {
        this.descriptorName = e.file.name;
        if(this.descriptorName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader()
        fr.readAsDataURL(e.file)
        fr.addEventListener('load', () => {
          this.descriptorUrl = 'data:image/png;base64,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';
          this.descriptorFile = e.file;
        })
      } else {
        this.descriptorName = '';
        this.descriptorFile = '';
        this.descriptorUrl = '';
      }
    },
    onFilePickedOrganigrama(e) {
      this.form.organigrama = e.file;
      if(e.file !== undefined) {
        this.organigramaName = e.file.name;
        if(this.organigramaName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader()
        fr.readAsDataURL(e.file)
        fr.addEventListener('load', () => {
          this.organigramaUrl = 'data:image/png;base64,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';
          this.organigramaFile = e.file;
        })
      } else {
        this.organigramaName = '';
        this.organigramaFile = '';
        this.organigramaUrl = '';
      }
    },
    selectCargo() {
      this.form.padre_id = '';
      this.form.segundo_padre_id = '';
      this.form.tercer_padre_id = '';
      this.form.cuarto_padre_id = '';
      this.getAreasRelacionados({ cargoId: this.form.supervisor_id }).then(response => {
        const AreasRelacionados = response.data.data;
        this.areasRelacionados= AreasRelacionados;
        this.form.padre_id = AreasRelacionados[1].id;
        if(AreasRelacionados[2].tipoArea.nivel === 3){
          this.form.tercer_padre_id = AreasRelacionados[2].id;
          this.form.cuarto_padre_id = AreasRelacionados[3].id;
        } else {
          this.form.segundo_padre_id = AreasRelacionados[2].id;
          this.form.tercer_padre_id = AreasRelacionados[3].id;
          this.form.cuarto_padre_id = AreasRelacionados[4].id;
        }
      });
    },
    submitCreateArea() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      if (this.form.padre_id === 1){
         this.form.area_id = 1;
      }
      if(this.form.padre_id > 1){
        this.form.area_id = this.form.padre_id;
      }
       if(this.form.segundo_padre_id !=''){
         this.form.area_id =this.form.segundo_padre_id;
       }
       if(this.form.tercer_padre_id !=''){
         this.form.area_id =this.form.tercer_padre_id;
       }
       if(this.form.cuarto_padre_id !=''){
         this.form.area_id =this.form.cuarto_padre_id;
       }

      var formData = new FormData();
      formData.append("nombre", this.form.nombre);
      formData.append("supervisor_id", this.form.supervisor_id);
      formData.append("nivel_jerarquico_id", this.form.nivel_jerarquico_id);
      formData.append("area_id", this.form.area_id);
      formData.append("estado", this.form.estado);
      formData.append("nombre_fantasia", this.form.nombre_fantasia);
      formData.append("descriptor", this.form.descriptor);
      formData.append("organigrama", this.form.organigrama);
      this.createCargo({ data: formData })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listacargo" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};

</script>
